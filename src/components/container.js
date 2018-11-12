import React from 'react'
import styles from './container.module.css'

export default ({ children, theme = 'dark' }) => (
  <div className={theme === 'dark' ? styles.dark : styles.light}>
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>{children}</div>
  </div>
)
