import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const localesDir = path.join(process.cwd(), 'i18n/locales'); // adapte selon ton dossier

const rl = readline.createInterface({ input, output });

function sortObject(obj) {
  return Object.keys(obj).sort().reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {});
}

function formatJson(obj) {
  const keys = Object.keys(obj);
  const lines = ['{'];
  keys.forEach((key, i) => {
    const comma = i < keys.length - 1 ? ',' : '';
    lines.push(`  "${key}": ${JSON.stringify(obj[key])}${comma}`);
  });
  lines.push('}');
  return lines.join('\n');
}

async function askValidLine(originalLine, filename, lineNumber) {
  const regex = /^\s*"([^"]+)"\s*:\s*"([^"]*)"\s*,?\s*$/; // clé: "valeur" strict, virgule optionnelle

  let line = originalLine;
  while (!regex.test(line.trim())) {
    console.log(`\n❌ Ligne mal formée dans ${filename} (ligne ${lineNumber}):`);
    console.log(`> ${line}`);
    line = await rl.question('Corrige la ligne (doit être au format  "key": "value", ) : ');
  }
  return line;
}

async function processFile(filepath) {
  const filename = path.basename(filepath);
  const raw = fs.readFileSync(filepath, 'utf-8');
  const lines = raw.trim().split('\n');

  // On ignore la première et dernière ligne { }
  const contentLines = lines.slice(1, lines.length - 1);
  const fixedLines = [];

  for (let i = 0; i < contentLines.length; i++) {
    const lineNumber = i + 2; // +2 car on a enlevé la 1ere ligne '{'
    const line = contentLines[i];

    const fixedLine = await askValidLine(line, filename, lineNumber);
    fixedLines.push(fixedLine.trim().replace(/,$/, '')); // on enlève virgule pour l'instant
  }

  // Extraire clé-valeur en objet
  const obj = {};
  for (const line of fixedLines) {
    const match = line.match(/^\s*"([^"]+)"\s*:\s*"([^"]*)"\s*$/);
    if (match) {
      const [, key, value] = match;
      obj[key] = value;
    }
  }

  // Trier par clé
  const sorted = sortObject(obj);

  // Réécrire JSON avec virgules bien placées
  const formatted = formatJson(sorted);

  // Écrire fichier corrigé
  fs.writeFileSync(filepath, formatted, 'utf-8');
  console.log(`\n✅ ${filename} corrigé et sauvegardé.`);
}

async function main() {
  const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const filepath = path.join(localesDir, file);
    await processFile(filepath);
  }

  rl.close();
  console.log('\n🎉 Tous les fichiers ont été traités !');
}

main();
