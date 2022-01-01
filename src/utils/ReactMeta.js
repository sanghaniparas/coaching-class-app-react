import React from "react"

import { Helmet } from "react-helmet"


function ReactMeta({ description, lang, meta, title }) {
  
  const metaTitle = title ;
  const metaDescription = description ;

  return (
    <Helmet defer={false}
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${metaTitle}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: 'admisure',
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

ReactMeta.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}


  
  export default ReactMeta;