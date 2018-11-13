import React from 'react'
import { Link } from 'gatsby'
import styles from './logo.module.css'

export default ({ theme = 'dark' }) => (
  <div className={styles.logoWrap}>
    <Link to="/contact">
      {theme === 'dark' ?
        <img src="/logo-poster-white.png" className={styles.logo} width="100" />
        :
        <video width="100" height="100" loop autoPlay playsInline className={styles.logo} poster="/logo-poster-black.png">
          <source src="/logo.webm" type="video/webm"/>
          <source src="/logo.mp4" type="video/mp4"/>
        </video>
      }
    </Link>
  </div>
)
