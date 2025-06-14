import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const localesDir = path.join(process.cwd(), 'i18n/locales');

const rl = readline.createInterface({ input, output });

function sortObject(obj) {
  return Object.keys(obj).sort().reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {});
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

async function correctMalformedLines(rawLines, filename) {
  const keyValueRegex = /^\s*"(.+?)"\s*:\s*(.+?)(,?)\s*$/;

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    if (
      line.trim() !== '{' &&
      line.trim() !== '}' &&
      line.trim() !== ''
    ) {
      const match = keyValueRegex.exec(line);
      if (!match) {
        console.log(`\n⚠️ Ligne mal formée détectée dans ${filename} (ligne ${i + 1}):`);
        console.log(`> ${line}`);
        let newLine = await rl.question('Corrige cette ligne (format "key": value,) ou appuie sur Entrée pour ignorer : ');
        while (newLine.trim() !== '') {
          if (keyValueRegex.test(newLine.trim())) break;
          console.log('Format invalide, assure-toi que la ligne soit au format: "clé": valeur,');
          newLine = await rl.question('Corrige cette ligne ou appuie sur Entrée pour ignorer : ');
        }
        if (newLine.trim() !== '') {
          rawLines[i] = newLine;
          console.log(`Ligne corrigée en: ${newLine}`);
        } else {
          console.log('Ignoré, la ligne reste inchangée.');
        }
      } else {
        const rawValue = match[2].trim().replace(/,$/, '');
        try {
          const parsed = JSON.parse(rawValue);
          if (typeof parsed === 'string' && (parsed === '' || parsed === '"' || parsed === '\\')) {
            throw new Error('Valeur JSON invalide ou suspecte');
          }
        } catch {
          console.log(`\n⚠️ Valeur JSON invalide ou suspecte détectée dans ${filename} (ligne ${i + 1}):`);
          console.log(`> ${line}`);
          let newLine = await rl.question('Corrige cette ligne (format "key": value,) ou appuie sur Entrée pour ignorer : ');
          while (newLine.trim() !== '') {
            if (keyValueRegex.test(newLine.trim())) {
              try {
                const val = JSON.parse(newLine.trim().match(keyValueRegex)[2].replace(/,$/, ''));
                if (typeof val === 'string' && (val === '' || val === '"' || val === '\\')) {
                  throw new Error('Valeur JSON invalide');
                }
                break;
              } catch {
                // continue la boucle
              }
            }
            console.log('Format invalide, assure-toi que la ligne soit au format: "clé": valeur, avec valeur JSON valide');
            newLine = await rl.question('Corrige cette ligne ou appuie sur Entrée pour ignorer : ');
          }
          if (newLine.trim() !== '') {
            rawLines[i] = newLine;
            console.log(`Ligne corrigée en: ${newLine}`);
          } else {
            console.log('Ignoré, la ligne reste inchangée.');
          }
        }
      }
    }
  }
  return rawLines;
}

async function processFile(filepath) {
  const filename = path.basename(filepath);
  let rawContent = fs.readFileSync(filepath, 'utf-8');
  let rawLines = rawContent.trim().split('\n');

  rawLines = await correctMalformedLines(rawLines, filename);

  // Extraire les paires clé-valeur corrigées
  const obj = {};
  const keyValueRegex = /^\s*"(.+?)"\s*:\s*(.+?)(,?)\s*$/;

  for (const line of rawLines) {
    const match = keyValueRegex.exec(line);
    if (match) {
      const [, key, rawValue] = match;
      try {
        obj[key] = JSON.parse(rawValue.replace(/,$/, '').trim());
      } catch {
        obj[key] = rawValue.replace(/,$/, '').trim();
      }
    }
  }

  const sorted = sortObject(obj);
  const formatted = formatJsonWithCorrectCommas(sorted);
  fs.writeFileSync(filepath, formatted, 'utf-8');
  console.log(`\n✅ ${filename} corrigé et sauvegardé.`);

  return sorted; // retourne l'objet trié pour collecte globale
}

async function main() {
  const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));
  const allTranslations = {};
  const allKeys = new Set();

  // 1) Correction + collecte de tous les objets
  for (const file of files) {
    const fullPath = path.join(localesDir, file);
    const translations = await processFile(fullPath);
    allTranslations[file] = translations;
    Object.keys(translations).forEach(k => allKeys.add(k));
  }

  // 2) Rapport des clés manquantes par fichier
  const report = [];
  for (const file of files) {
    const keysInFile = Object.keys(allTranslations[file]);
    const missing = [...allKeys].filter(k => !keysInFile.includes(k));
    if (missing.length) {
      report.push(`\n📂 Fichier : ${file}`);
      report.push(`  ❌ Clés manquantes (${missing.length}) : ${missing.join(', ')}`);
    }
  }

  rl.close();

  if (report.length === 0) {
    console.log('\n✅ Tous les fichiers sont valides, triés, sans doublons et complets ✅');
  } else {
    console.log(report.join('\n'));
  }
}

main();
