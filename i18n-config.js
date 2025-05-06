const { join } = require('path')
const { readdirSync, lstatSync } = require('fs')

//Based in: https://github.com/NewRoman/gatsby-tutor/blob/gatsby-internationalization-final/languages.js

const defaultLanguage = 'en';

//// using the directories in locales, create an array of supported languages
const languages = readdirSync(join(__dirname, 'locales')).filter((fileName) => {
  const joinedPath = join(join(__dirname, 'locales'), fileName)
  const isDirectory = lstatSync(joinedPath).isDirectory()
  return isDirectory
});
//console.log("\n  languages", JSON.stringify(languages, null, 2));

//default language first
languages.splice(languages.indexOf(defaultLanguage), 1);
languages.unshift(defaultLanguage);

// i18n-config.js
module.exports = {
  localeJsonSourceName: `locale`, // Name from gatsby-source-filesystem
  defaultNS: "translation", // default namespace  
  ns: ["translation", "blog", "404"],
  languages,
  defaultLanguage,
  fallbackLng: defaultLanguage,
};
