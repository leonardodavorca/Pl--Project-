(function (global) {
  'use strict';

  var MAX_STEPS = 200000;
  var MAX_FRAMES = 300;

  function stripComment(line) {
    var inStr = false;
    for (var i = 0; i < line.length; i++) {
      var c = line[i];
      if (inStr && c === '\\') { i++; continue; }
      if (c === '"') inStr = !inStr;
      else if (c === '#' && !inStr) return line.slice(0, i);
    }
    return line;
  }

  function mapOutside(line, f) {
    return line.split(/("(?:[^"\\]|\\.)*")/).map(function (part, i) {
      return i % 2 ? part : f(part);
    }).join('');
  }

  function translate(src) {
    var out = [];
    var lines = String(src).split('\n');
    for (var n = 0; n < lines.length; n++) {
      var line = stripComment(lines[n]).trim();
      if (line === '') { out.push(''); continue; }

      line = mapOutside(line, function (s) {
        return s
          .replace(/\byes\b/g, 'true')
          .replace(/\bno\b/g, 'false')
          .replace(/\band\b/g, '&&')
          .replace(/\bor\b/g, '||')
          .replace(/\bnot\b/g, '!');
      });

      var m;
      if ((m = line.match(/^import\s+\w+/))) { out.push('// ' + line); continue; }
      if ((m = line.match(/^say\s+(.+)$/))) line = 'say(' + m[1] + ');';
      else if ((m = line.match(/^else\s+if\s+(.+)$/))) line = '} else if (' + m[1] + ') { tick();';
      else if (line === 'else') line = '} else {';
      else if ((m = line.match(/^if\s+(.+)$/))) line = 'if (' + m[1] + ') { tick();';
      else if ((m = line.match(/^repeat\s+(.+)$/))) line = 'for (let __i = 0; __i < (' + m[1] + '); __i++) { tick();';
      else if ((m = line.match(/^while\s+(.+)$/))) line = 'while (' + m[1] + ') { tick();';
      else if ((m = line.match(/^fn\s+(\w+)\s*(.*)$/))) {
        var params = m[2].split(',').map(function (s) { return s.trim(); }).filter(Boolean).join(', ');
        line = 'function ' + m[1] + '(' + params + ') {';
      }
      else if ((m = line.match(/^give\s+(.+)$/))) line = 'return ' + m[1] + ';';
      else if (line === 'end') line = '}';
      else if ((m = line.match(/^(\w+)\s*=\s*ask\s+(.+)$/))) line = 'var ' + m[1] + ' = input(' + m[2] + ');';
      else if ((m = line.match(/^ask\s+(.+)$/))) line = 'input(' + m[1] + ');';
      else if (/^\w+\s*=(?!=)/.test(line)) line = 'var ' + line + ';';
      else if (!/[;{}]$/.test(line)) line += ';';

      out.push(line);
    }
    return out.join('\n');
  }

  function show(v) {
    if (v === true) return 'yes';
    if (v === false) return 'no';
    if (Array.isArray(v)) {
      return '[' + v.map(function (x) {
        return typeof x === 'string' ? '"' + x + '"' : show(x);
      }).join(', ') + ']';
    }
    return String(v);
  }

  function makeOutput(target) {
    if (target._plTimer) { clearTimeout(target._plTimer); target._plTimer = null; }
    target.innerHTML = '';

    var con = document.createElement('div');
    con.style.cssText = 'display:none;background:#111827;color:#e5e7eb;border-radius:10px;padding:12px 14px;' +
      'font:14px/1.6 Consolas,"Courier New",monospace;white-space:pre-wrap;max-height:260px;overflow:auto;margin:8px 0';
    var extras = document.createElement('div');
    target.appendChild(con);
    target.appendChild(extras);
    return { con: con, extras: extras };
  }

  function run(source, target) {
    if (!target) {
      target = document.createElement('div');
      document.body.appendChild(target);
    }
    var o = makeOutput(target);
    var steps = 0;

    function line(text, isError) {
      o.con.style.display = 'block';
      var d = document.createElement('div');
      d.textContent = text;
      if (isError) d.style.color = '#fca5a5';
      o.con.appendChild(d);
      o.con.scrollTop = o.con.scrollHeight;
    }
    function say(v) { line(show(v)); }
    function input(q) {
      var a = window.prompt(String(q));
      return a === null ? '' : a;
    }
    function len(x) { return x.length; }
    function tick() {
      if (++steps > MAX_STEPS) throw new Error('Loop ran too long. Check your loop condition.');
    }

        var game = {
      frames: [], cur: [], n: 0,
      clear: function () { this.cur = []; },
      circle: function (x, y, r, color) { this.cur.push({ t: 'c', x: x, y: y, r: r, color: color }); },
      rect: function (x, y, w, h, color) { this.cur.push({ t: 'r', x: x, y: y, w: w, h: h, color: color }); },
      text: function (x, y, s, color) { this.cur.push({ t: 't', x: x, y: y, s: String(s), color: color }); },
      running: function () {
        this.frames.push(this.cur);
        this.cur = [];
        this.n++;
        return this.n < MAX_FRAMES;
      }
    };

        var web = {
      pages: {},
      start: function (path, handler) { this.pages[path] = String(handler()); }
    };

        var ai = {
      learn: function (xs, ys) {
        var n = xs.length, i;
        var mx = xs.reduce(function (a, b) { return a + b; }, 0) / n;
        var my = ys.reduce(function (a, b) { return a + b; }, 0) / n;
        var num = 0, den = 0;
        for (i = 0; i < n; i++) {
          num += (xs[i] - mx) * (ys[i] - my);
          den += (xs[i] - mx) * (xs[i] - mx);
        }
        var slope = den ? num / den : 0;
        var offset = my - slope * mx;
        return {
          guess: function (x) { return Math.round((slope * x + offset) * 10000) / 10000; }
        };
      }
    };

    try {
      var js = translate(source);
      var program = new Function('say', 'input', 'len', 'tick', 'game', 'web', 'ai', js);
      program(say, input, len, tick, game, web, ai);
      if (game.cur.length) game.frames.push(game.cur);
    } catch (err) {
      line('Error: ' + err.message, true);
    }

    showGame(game.frames, o.extras, target);
    showWeb(web.pages, o.extras);
  }

  function showGame(frames, box, target) {
    if (!frames.length) return;
    var canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    canvas.style.cssText = 'display:block;width:100%;max-width:400px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;margin:8px 0';
    box.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var i = 0;

    function draw(ops) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 400, 300);
      for (var k = 0; k < ops.length; k++) {
        var o = ops[k];
        ctx.fillStyle = o.color || '#111827';
        if (o.t === 'c') { ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2); ctx.fill(); }
        else if (o.t === 'r') ctx.fillRect(o.x, o.y, o.w, o.h);
        else if (o.t === 't') { ctx.font = '16px sans-serif'; ctx.fillText(o.s, o.x, o.y); }
      }
    }
    function step() {
      draw(frames[i] || []);
      i = (i + 1) % frames.length;
      target._plTimer = setTimeout(step, 33);
    }
    step();
  }

  function showWeb(pages, box) {
    var html = pages['/'] !== undefined ? pages['/'] : Object.keys(pages).map(function (k) { return pages[k]; })[0];
    if (html === undefined) return;
    var frame = document.createElement('iframe');
    frame.setAttribute('sandbox', '');
    frame.style.cssText = 'display:block;width:100%;height:320px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;margin:8px 0';
    frame.srcdoc = html;
    box.appendChild(frame);
  }

  function targetFor(tag) {
    var sel = tag.getAttribute('data-target');
    if (sel) {
      var found = document.querySelector(sel);
      if (found) return found;
    }
    var box = document.createElement('div');
    box.className = 'pl-output';
    tag.parentNode.insertBefore(box, tag.nextSibling);
    return box;
  }

  function runAll() {
    var tags = document.querySelectorAll('script[type="text/pl"]');
    Array.prototype.forEach.call(tags, function (tag) {
      var box = targetFor(tag);
      var src = tag.getAttribute('src');
      if (src) {
        fetch(src)
          .then(function (r) {
            if (!r.ok) throw new Error('Could not load ' + src + ' (' + r.status + ')');
            return r.text();
          })
          .then(function (code) { run(code, box); })
          .catch(function (err) {
            box.textContent = 'Error: ' + err.message;
            box.style.color = '#dc2626';
          });
      } else {
        run(tag.textContent, box);
      }
    });
  }

  global.PL = { translate: translate, run: run, runAll: runAll };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', runAll);
  else runAll();
})(window);
