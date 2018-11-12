import React from 'react'
import { Link } from 'gatsby'
import styles from './videoItem.module.css'

export default ({ node }) => (
  <div className={styles.videoRow} key={node.title}>
    <div className={styles.videoColumn}>
      <div className={styles.videoPreviewWrapper}>
        <img src={node.videoThumbnail.file.url} className={styles.videoPreview} width="480" />
        <div className={styles.videoPreviewBorder}/>
      </div>
    </div>
    <div className={styles.videoColumn} style={{ alignItems: 'center', flexDirection: 'column' }}>
      <h2 className={styles.videoTitle}><Link to={`/video/${node.slug}`}>{node.title}</Link></h2>
      <p className={styles.videoMeta}>{node.client}, {node.date.substr(node.date.length - 4)}, {node.duration}</p>
      {node.categories.map(category => <p className={styles.videoCategory} key={category.slug}>{category.title}</p>)}
    </div>
  </div>
)
