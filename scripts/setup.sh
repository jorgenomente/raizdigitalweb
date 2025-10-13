#!/usr/bin/env bash
set -e

if command -v pnpm &> /dev/null; then
  pnpm i
elif command -v yarn &> /dev/null; then
  yarn
else
  npm i
fi

git init
git add .
git commit -m "chore: bootstrap from raiz-next-template"

echo "✓ Proyecto listo. Corre 'pnpm dev' (o 'npm run dev')."
