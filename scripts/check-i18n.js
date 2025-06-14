// i18n JSON fixer & validator script
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

function formatJsonWithCorrectCommas(obj) {
  const entries = Object.entries(obj);
  const lines = ['{'];

  entries.forEach(([key, value], index) => {
    const comma = index < entries.length - 1 ? ',' : '';
    lines.push(`  "${key}": ${JSON.stringify(value)}${comma}`);
  });

  lines.push('}');
  return lines.join('\n');
}

async function askValidLine(line, filename, lineNumber) {
  const regex = /^\s*"(.+?)"\s*:\s*"(.*)"\s*,?\s*$/;
  while (!regex.test(line.trim())) {
    console.log(`\n❌ Ligne mal formée dans ${filename} (ligne ${lineNumber}):`);
    console.log(`> ${line}`);
    line = await rl.question('Corrige cette ligne (format attendu: "key": "value") : ');
  }
  return line;
}

async function processFile(filepath, globalKeySet) {
  const filename = path.basename(filepath);
  const raw = fs.readFileSync(filepath, 'utf-8');
  const lines = raw.trim().split('\n');
  const rawLines = lines.slice(1, lines.length - 1); // Remove { and }
  const fixedLines = [];

  for (let i = 0; i < rawLines.length; i++) {
    const lineNumber = i + 2;
    const fixedLine = await askValidLine(rawLines[i], filename, lineNumber);
    fixedLines.push(fixedLine.trim().replace(/,$/, ''));
  }

  const keyValueRegex = /^\s*"(.+?)"\s*:\s*(.+?)\s*$/;
  const allValuesPerKey = {};

  for (const line of fixedLines) {
    const match = keyValueRegex.exec(line);
    if (match) {
      const [, key, rawValue] = match;
      let parsedValue;
      try {
        parsedValue = JSON.parse(rawValue.trim());
      } catch {
        parsedValue = rawValue.trim();
      }
      if (!allValuesPerKey[key]) {
        allValuesPerKey[key] = [];
      }
      allValuesPerKey[key].push(parsedValue);
    }
  }

  const finalObj = {};
  for (const [key, values] of Object.entries(allValuesPerKey)) {
    const uniqueValues = [...new Set(values.map(v => JSON.stringify(v)))].map(v => JSON.parse(v));

    if (uniqueValues.length === 1) {
      finalObj[key] = uniqueValues[0];
    } else {
      console.log(`\n⚠️ Clé "${key}" trouvée plusieurs fois avec des valeurs différentes :`);
      uniqueValues.forEach((val, idx) => {
        console.log(`  ${idx + 1}. ${JSON.stringify(val)}`);
      });
      let choice = await rl.question(`Quelle valeur veux-tu conserver pour "${key}" ? (1-${uniqueValues.length}, m = manuel, s = sauter) : `);
      while (!['s', 'm', ...uniqueValues.map((_, i) => (i + 1).toString())].includes(choice)) {
        choice = await rl.question(`Choix invalide. Recommence (1-${uniqueValues.length}, m, s): `);
      }

      if (choice === 's') {
        finalObj[key] = uniqueValues[uniqueValues.length - 1];
      } else if (choice === 'm') {
        const manual = await rl.question(`Entre la valeur manuelle pour "${key}" : `);
        try {
          finalObj[key] = JSON.parse(manual);
        } catch {
          finalObj[key] = manual;
        }
      } else {
        finalObj[key] = uniqueValues[parseInt(choice) - 1];
      }
    }
  }

  const sorted = sortObject(finalObj);
  const formatted = formatJsonWithCorrectCommas(sorted);
  fs.writeFileSync(filepath, formatted, 'utf-8');
  console.log(`\n✅ ${filename} corrigé et sauvegardé.`);
  return Object.keys(sorted);
}

async function main() {
  const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));
  const globalKeySet = new Set();
  const allKeysByFile = {};

  for (const file of files) {
    const filepath = path.join(localesDir, file);
    const keys = await processFile(filepath, globalKeySet);
    allKeysByFile[file] = new Set(keys);
    keys.forEach(k => globalKeySet.add(k));
  }

  let hasMissing = false;
  for (const [file, keySet] of Object.entries(allKeysByFile)) {
    const missing = [...globalKeySet].filter(k => !keySet.has(k));
    if (missing.length) {
      hasMissing = true;
      console.log(`\n📂 Fichier : ${file}`);
      console.log(`  ❌ Clés manquantes (${missing.length}) : ${missing.join(', ')}`);
    }
  }

  if (!hasMissing) {
    console.log('\n✅ Tous les fichiers sont valides, triés, sans doublons et complets ✅');
  }

  rl.close();
}

main();