function stripComment(line) {
  let inStr = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inStr && c === '\\') { i++; continue; }
    if (c === '"') inStr = !inStr;
    else if (c === '#' && !inStr) return line.slice(0, i);
  }
  return line;
}

function mapOutside(line, f) {
  return line.split(/("(?:[^"\\]|\\.)*")/).map((part, i) => i % 2 ? part : f(part)).join('');
}

function translate(src) {
  const out = [];
  for (const raw of src.split('\n')) {
    let line = stripComment(raw).trim();
    if (line === '') { out.push(''); continue; }

    line = mapOutside(line, s => s
      .replace(/\byes\b/g, 'true')
      .replace(/\bno\b/g, 'false')
      .replace(/\band\b/g, '&&')
      .replace(/\bor\b/g, '||')
      .replace(/\bnot\b/g, '!'));

    let m;
    if ((m = line.match(/^import\s+\w+/))) { out.push('// ' + line); continue; }
    if ((m = line.match(/^say\s+(.+)$/))) line = `say(${m[1]});`;
    else if ((m = line.match(/^else\s+if\s+(.+)$/))) line = `} else if (${m[1]}) { tick();`;
    else if (line === 'else') line = '} else {';
    else if ((m = line.match(/^if\s+(.+)$/))) line = `if (${m[1]}) { tick();`;
    else if ((m = line.match(/^repeat\s+(.+)$/))) line = `for (let __i = 0; __i < (${m[1]}); __i++) { tick();`;
    else if ((m = line.match(/^while\s+(.+)$/))) line = `while (${m[1]}) { tick();`;
    else if ((m = line.match(/^fn\s+(\w+)\s*(.*)$/))) {
      const params = m[2].split(',').map(s => s.trim()).filter(Boolean).join(', ');
      line = `function ${m[1]}(${params}) {`;
    }
    else if ((m = line.match(/^give\s+(.+)$/))) line = `return ${m[1]};`;
    else if (line === 'end') line = '}';
    else if ((m = line.match(/^(\w+)\s*=\s*ask\s+(.+)$/))) line = `var ${m[1]} = input(${m[2]});`;
    else if ((m = line.match(/^ask\s+(.+)$/))) line = `input(${m[1]});`;
    else if (/^\w+\s*=(?!=)/.test(line)) line = 'var ' + line + ';';
    else if (!/[;{}]$/.test(line)) line += ';';

    out.push(line);
  }
  return out.join('\n');
              }
