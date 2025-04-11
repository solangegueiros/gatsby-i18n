import * as React from "react"
//import { LocaleContext, LocalesList, LocalizedLink as Link, useLocalization } from 'gatsby-plugin-react-i18next'
import { useI18next } from 'gatsby-plugin-react-i18next';
//import { useLocalization } from 'gatsby-plugin-react-i18next'
import { LocaleContext } from 'gatsby-plugin-react-i18next'
import { Link } from 'gatsby-plugin-react-i18next'
import Layout from '../components/Layout'
// import LocalesList from '../components/LocalesList'



const Locales = () => {
  const pageContext = useI18next()
  const { config } = useI18next()
  const { language } = useI18next()
  const { languages } = useI18next()
  const { defaultLanguage } = useI18next()

  const locale = pageContext.language
  const locales = pageContext.config



/*
  
  const localeContext = React.useContext(LocaleContext)
  const locale = localeContext.language
  const locales = localeContext.config

  const localNames = locales.map(item => item.localName)
  const names = locales.map(item => item.name)
  const languageIndex = languages.indexOf(language)
  const localNameIndex = languages.indexOf(locale)
  const nameIndex = languages.indexOf(locale)
  const languageName = languages[languageIndex]
  const localName = localNames[localNameIndex]
  const name = names[nameIndex]
  const languageConfig = locales[languageIndex]
  const localNameConfig = locales[localNameIndex]
  const nameConfig = locales[nameIndex]
  const languageConfigName = languageConfig.name
  const localNameConfigName = localNameConfig.name
  const nameConfigName = nameConfig.name
  const languageConfigLocalName = languageConfig.localName
  const localNameConfigLocalName = localNameConfig.localName
  const nameConfigLocalName = nameConfig.localName
  const languageConfigCode = languageConfig.code
  const localNameConfigCode = localNameConfig.code
  const nameConfigCode = nameConfig.code
  const languageConfigLanguage = languageConfig.language
  const localNameConfigLanguage = localNameConfig.language
  const nameConfigLanguage = nameConfig.language
  const languageConfigNs = languageConfig.ns
  const localNameConfigNs = localNameConfig.ns
  const nameConfigNs = nameConfig.ns
  const languageConfigData = languageConfig.data

  
/*  
  const { config, locale } = useLocalization()
  const localeContext = React.useContext(LocaleContext)

  return (
        <h1>{locale}</h1>
        <p>LocaleContext: {localeContext}</p> 



  )
*/
  return (
    <Layout pageContext={pageContext}>
      <h1>Language: {language}</h1>
      <p>Default Language: {defaultLanguage}</p>
      <p>Languages: {languages.join(', ')}</p>

      <h1>pageContext</h1>
      <p>{JSON.stringify(pageContext, null, 2)}</p>

      <h1>locale</h1>
      <p>locale: {JSON.stringify(locale, null, 2)}</p>
      <p>locales: {JSON.stringify(locales, null, 2)}</p>


      <h3>Config</h3>
      <pre>{JSON.stringify(config, null, 2)}</pre>       

    </Layout>
  )
} 
/*
const Locales = ({ pageContext }) => {
  const { config, locale } = useLocalization()
  const localeContext = React.useContext(LocaleContext)
  

  return (
    <Layout pageContext={pageContext}>
      <h1>{locale}</h1>

      <p>LocaleContext: {localeContext}</p>

      <h3>Select</h3>
      <nav>
        <ul>
          {config.map(item => (
            <li key={item.code}>
              <Link to="/" language={item.code}>
                {item.localName} ({item.name})
              </Link>
            </li>
          ))}          
        </ul>
      </nav>

      <h3>Locales List</h3>
      <LocalesList />

      <h3>Config</h3>
      <pre>{JSON.stringify(config, null, 2)}</pre>

      
    </Layout>
  )
}
*/

export default Locales
