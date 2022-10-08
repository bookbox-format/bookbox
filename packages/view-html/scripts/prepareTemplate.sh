echo "prepare"
node scripts/copyPrepare.js
cd scripts

npx vite build
node generate.js
rm -Rf dist

node removePrepare.js