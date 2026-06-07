const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "src");
const screenDir = path.join(root, "screens");
const violations = [];

function walk(dir, callback) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, callback);
    } else if (entry.name.endsWith(".js")) {
      callback(fullPath);
    }
  }
}

walk(root, (file) => {
  const content = fs.readFileSync(file, "utf8");

  if (content.includes("fetch(")) {
    violations.push(`${file}: fetch nao deve ser usado`);
  }

  if (file.startsWith(screenDir) && /axios\.(get|post|put|patch|delete)/.test(content)) {
    violations.push(`${file}: chamada axios encontrada em tela`);
  }

  if (/\/products\?.+/.test(content) || /\/auth\?.+/.test(content)) {
    violations.push(`${file}: use params do axios em vez de query string`);
  }
});

if (violations.length) {
  console.error(violations.join("\n"));
  process.exit(1);
}

console.log("Regras principais de axios verificadas.");
