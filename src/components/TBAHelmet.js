import React from 'react'
import Helmet from 'react-helmet'

const TBAHelmet = (props) => (
  <Helmet
    defaultTitle="The Blue Alliance"
    titleTemplate="%s - The Blue Alliance"
  >
    {props.children}
  </Helmet>
)

export default TBAHelmet
