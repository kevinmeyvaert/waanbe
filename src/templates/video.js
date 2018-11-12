import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Vimeo from '@u-wave/react-vimeo';

import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import styles from './video.module.css'

class VideoTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoIsEnded: false,
      theme: 'light',
    };
  }

  handleVideoEndedMessage() {
    return (
      <div className={styles.videoEndedMessage}>
        <p>
          If you enjoyed this video, go <a href="https://vimeo.com/waan" target="_blank">follow</a> to my Vimeo channel.
        </p>
      </div>
    )
  }

  render() {
    const { videoIsEnded, theme } = this.state;
    const post = get(this.props, 'data.contentfulVideoPortfolio');

    return (
      <Layout location={this.props.location} theme={theme} >
        <div className={styles.videoPage}>
          <Helmet title={`WAAN. | ${post.title}`} />
          <h2 className={styles.videoTitle}>{post.title}</h2>
          <p className={styles.videoMeta}>{post.client}, {post.date.substr(post.date.length - 4)}, {post.duration}</p>
          <Vimeo
            className={styles.videoFrame}
            width={typeof window !== 'undefined' && window.innerWidth < 400 ? 400 : 830}
            video={post.vimeoId}
            onPause={() => this.setState({ theme: 'light' })}
            onPlay={() => this.setState({ videoIsEnded: false, theme: 'dark' })}
            onEnd={() => this.setState({ videoIsEnded: true, theme: 'light' })}
          />
          {videoIsEnded ? this.handleVideoEndedMessage() : null}
          <div className={styles.videoDescription} dangerouslySetInnerHTML={{__html: post.description.childMarkdownRemark.html}} />
        </div>
      </Layout>
    )
  }
}

export default VideoTemplate

export const pageQuery = graphql`
  query VideoPortfolioBySlug($slug: String!) {
    contentfulVideoPortfolio(slug: { eq: $slug }) {
      title
      slug
      date(formatString: "MMMM Do, YYYY")
      client
      duration
      vimeoId
      description {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
