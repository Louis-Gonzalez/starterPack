import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localesDir = path.join(__dirname, '../i18n/locales');

function sortObject(obj) {
  return Object.keys(obj).sort().reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {});
}

function autoFixTrailingCommas(rawContent) {
  const lines = rawContent.trim().split('\n');
  const cleanLines = lines.filter(line => line.trim() !== '');

  if (cleanLines.length < 3) return rawContent;

  for (let i = 1; i < cleanLines.length - 2; i++) {
    if (!cleanLines[i].trim().endsWith(',')) {
      cleanLines[i] += ',';
    }
  }

  const lastKeyLineIndex = cleanLines.length - 2;
  cleanLines[lastKeyLineIndex] = cleanLines[lastKeyLineIndex].replace(/,(\s*)$/, '');

  return cleanLines.join('\n') + '\n';
}

function formatJsonWithCorrectCommas(sortedObj) {
  const entries = Object.entries(sortedObj);
  const lines = ['{'];

  entries.forEach(([key, value], index) => {
    const comma = index < entries.length - 1 ? ',' : '';
    lines.push(`  "${key}": ${JSON.stringify(value)}${comma}`);
  });

  lines.push('}');
  return lines.join('\n');
}

async function handleRawJsonWithDuplicates(rawContent, filename) {
  const rl = readline.createInterface({ input, output });
  const lines = rawContent.trim().split('\n');

  const keyValueMap = {};
  const keyOccurrences = {};
  // RegExp simple qui capture "clé": valeur,
  // (attention cette regex suppose que les valeurs sont en JSON sur une ligne)
  const keyValueRegex = /^\s*"(.+?)"\s*:\s*(.+?)(,?)\s*$/;

  for (const line of lines) {
    const match = keyValueRegex.exec(line);
    if (match) {
      const [, rawKey, rawValue] = match;
      const key = rawKey.trim();

      let value;
      try {
        value = JSON.parse(rawValue.trim().replace(/,$/, ''));
      } catch {
        // si parse échoue, on prend la valeur brute (ex: string sans guillemets)
        value = rawValue.trim().replace(/,$/, '');
      }

      if (keyOccurrences[key]) {
        const prev = keyOccurrences[key].value;

        console.log(`\n⚠️ Doublon détecté dans ${filename} pour la clé "${key}"`);
        console.log(`1️⃣ Première valeur : ${JSON.stringify(prev)}`);
        console.log(`2️⃣ Nouvelle valeur : ${JSON.stringify(value)}`);

        const choice = await rl.question('Quel choix garder ? (1/2/m=manuel) : ');

        let finalValue;
        if (choice === '1') {
          finalValue = prev;
        } else if (choice === '2') {
          finalValue = value;
        } else {
          const manual = await rl.question('Entre la valeur à utiliser (JSON valide) : ');
          try {
            finalValue = JSON.parse(manual);
          } catch {
            finalValue = manual;
          }
        }

        keyValueMap[key] = finalValue;
        keyOccurrences[key] = { value: finalValue };
      } else {
        keyValueMap[key] = value;
        keyOccurrences[key] = { value };
      }
    }
  }

  rl.close();
  return keyValueMap;
}

async function main() {
  const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));
  const allTranslations = {};
  const allKeys = new Set();
  const report = [];

  for (const file of files) {
    const fullPath = path.join(localesDir, file);
    let rawContent = fs.readFileSync(fullPath, 'utf-8');

    rawContent = autoFixTrailingCommas(rawContent);

    let resolved;
    try {
      resolved = await handleRawJsonWithDuplicates(rawContent, file);
    } catch (err) {
      console.error(`❌ Erreur dans le traitement interactif de ${file} :`, err);
      process.exit(1);
    }

    const sorted = sortObject(resolved);

    allTranslations[file] = sorted;
    Object.keys(sorted).forEach(key => allKeys.add(key));

    const formatted = formatJsonWithCorrectCommas(sorted);
    fs.writeFileSync(fullPath, formatted, 'utf-8');
  }

  for (const file of files) {
    const keysInFile = Object.keys(allTranslations[file]);
    const missing = [...allKeys].filter(k => !keysInFile.includes(k));

    if (missing.length) {
      report.push(`\n📂 Fichier : ${file}`);
      report.push(`  ❌ Clés manquantes (${missing.length}) : ${missing.join(', ')}`);
    }
  }

  if (report.length === 0) {
    console.log('✅ Tous les fichiers sont valides, triés, sans doublons et complets ✅');
  } else {
    console.log(report.join('\n'));
  }
}

main();
