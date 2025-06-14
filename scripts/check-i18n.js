import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localesDir = path.join(__dirname, '../i18n/locales');

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

function main() {
  const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));
  const allTranslations = {};
  const allKeys = new Set();
  const report = [];

  files.forEach(file => {
    const fullPath = path.join(localesDir, file);
    const rawContent = fs.readFileSync(fullPath, 'utf-8');

    let json;
    try {
      json = JSON.parse(rawContent);
    } catch (err) {
      console.error(`❌ Erreur de syntaxe dans ${file} :\n${err.message}`);
      process.exit(1);
    }

    const sorted = sortObject(json);
    allTranslations[file] = sorted;
    Object.keys(sorted).forEach(key => allKeys.add(key));

    // Réécriture du fichier avec les virgules corrigées
    const formatted = formatJsonWithCorrectCommas(sorted);
    fs.writeFileSync(fullPath, formatted, 'utf-8');
  });

  // Comparaison des clés entre fichiers
  for (const file of files) {
    const keysInFile = Object.keys(allTranslations[file]);
    const missing = [...allKeys].filter(k => !keysInFile.includes(k));
    const duplicates = keysInFile.filter((item, idx, arr) => arr.indexOf(item) !== idx);

    if (missing.length || duplicates.length) {
      report.push(`\n📂 Fichier : ${file}`);
      if (missing.length) {
        report.push(`  ❌ Clés manquantes (${missing.length}) : ${missing.join(', ')}`);
      }
      if (duplicates.length) {
        report.push(`  ⚠️ Doublons détectés : ${[...new Set(duplicates)].join(', ')}`);
      }
    }
  }

  if (report.length === 0) {
    console.log('✅ Tous les fichiers sont triés, corrigés, et cohérents 🎉');
  } else {
    console.log(report.join('\n'));
  }
}

main();
