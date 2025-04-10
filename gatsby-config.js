/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Gatsby i18n GitBook`,
    siteUrl: `https://yourdomain.com`,
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
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // Name from gatsby-source-filesystem
        defaultNS: "translation",
        ns: ["translation"], // default namespace
        languages: [`en`, `pt`],
        defaultLanguage: `en`,
        siteUrl: `https://www.yourdomain.tld`, // Already in siteMetadata, just repeat here
        i18nextOptions: {
          interpolation: {
            escapeValue: false, // React already does escaping
          },
        },
      },
    },    
    {
      resolve: `gatsby-source-filesystem`,  // Source for the doc folder
      options: {
        name: `docs`,
        path: `${__dirname}/doc`,
      },
    },    
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-mdx`,
    `gatsby-plugin-sass`,

]
};