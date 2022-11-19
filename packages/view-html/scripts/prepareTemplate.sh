echo "prepare"
cd scripts

echo "generate html"
mkdir preparedTemplate

cp -Rf ../src preparedTemplate
mv preparedTemplate/src/bookTemplate.html preparedTemplate/src/index.html
npx vite build
node generateBookTemplate.js

rm -Rf preparedTemplate

echo "css to js"
node prepareCss.js
node prepareKatex.js

echo "Done!"