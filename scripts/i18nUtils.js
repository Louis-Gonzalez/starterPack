export function sortObject(obj) {
  return Object.keys(obj).sort().reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {});
}

export function formatJsonWithCorrectCommas(obj) {
  const entries = Object.entries(obj);
  const lines = ['{'];

  entries.forEach(([key, value], index) => {
    const comma = index < entries.length - 1 ? ',' : '';
    lines.push(`  "${key}": ${JSON.stringify(value)}${comma}`);
  });

  lines.push('}');
  return lines.join('\n');
}
