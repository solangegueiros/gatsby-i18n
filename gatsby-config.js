/**
 * @type {import('gatsby').GatsbyConfig}
 */
const i18nConfig = require('./i18n-config');
const siteUrl = process.env.URL || `http://localhost:8000`;

module.exports = {
  siteMetadata: {
    title: `Gatsby i18n GitBook`,
    description: `Gatsby GitBook with Localization`,
    twitterUsername: `@solangegueiros`,
    image: `/icon.png`,    
    siteUrl,
  },
  plugins: [    
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    },    
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `blog`,
        path: `${__dirname}/blog`,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,  // Source for the doc folder
      options: {
        name: `docs`,
        path: `${__dirname}/docs`,
      },
    },    
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        ...i18nConfig,
        siteUrl: siteUrl, // Already in siteMetadata, just repeat here
        i18nextOptions: {
          fallbackLng: i18nConfig.defaultLanguage,
          supportedLngs: i18nConfig.languages,
          defaultNS: i18nConfig.defaultNS,          
          interpolation: {
            escapeValue: false, // React already does escaping
          },
          //keySeparator: false,
          //nsSeparator: false,          
        },
        // pages: [
        //   {
        //     matchPath: '/:lang?/docs/:uid',
        //     getLanguageFromPath: true,
        //   },
        // ],    
      },    
    },    
    `gatsby-plugin-mdx`,    
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
  ]
};