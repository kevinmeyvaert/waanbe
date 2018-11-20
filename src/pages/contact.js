import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import styles from './contact.module.css'
import Layout from '../components/layout'

class RootIndex extends React.Component {
  render() {
    return (
      <Layout location={this.props.location} >
        <Helmet>
          <title>WAAN. | Contact</title>
          <link rel="shortcut icon" href="favicon.png" />
          <meta property="og:title" content="WAAN" />
          <meta property="og:site_name" content="WAAN" />
          <meta property="og:url" content="http://waan.be/" />
          <meta property="og:type" content="website" />
          <meta property="og:description" content="Video direction & montage" />
          <meta property="og:image" content="http://waan.be/og.jpg" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="http://waan.be/" />
          <meta name="twitter:title" content="WAAN" />
          <meta name="twitter:image" content="http://waan.be/og.jpg" />
          <style>
          @import url('https://fonts.googleapis.com/css?family=Lato:400,700');
          @import url('https://fonts.googleapis.com/css?family=Lora:400,400i');
          </style>
        </Helmet>
        <div className={styles.contactPage}>
          <h2 className={styles.pageTitle}>Waan</h2>
          Faster than your shadow - editor / making you say “WAANzin”.<br/>
          Made in Antwerp, and for rent.
          <h2 className={styles.pageTitle} style={{ marginTop: '20px' }}>Contact</h2>
          <p style={{ margin: 0 }}><a href="mailto:hello@waan.be">hello@waan.be</a> &middot; +32 495 35 58 31 &middot; BTW BE 0700.748.685</p>
          Main base: Vooruitzichtstraat 22, 2140 Borgerhout (Antwerp).
          <h2 className={styles.pageTitle} style={{ marginTop: '20px' }}>Past renders</h2>
          ZMo &middot; VRT &middot; Woestijnvis &middot; SBS &middot; Colruyt &middot; Carrefour &middot; Wunderman &middot; BBDO &middot; Undefined &middot; Bowling &middot; Red Dust &middot; Vbm &middot; Crammerock &middot; Goose &middot; Lokerse Feesten
        </div>
      </Layout>
    )
  }
}

export default RootIndex