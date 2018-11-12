import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import VideoItem from '../components/videoItem'

class RootIndex extends React.Component {
  render() {
    const videos = get(this, 'props.data.allContentfulVideoPortfolio.edges')
    return (
      <Layout location={this.props.location} >
        <Helmet>
          <title>WAAN.</title>
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
        {videos.map(({ node }) => 
          <VideoItem node={node} key={node.title} />
        )}
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulVideoPortfolio(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          title
          slug
          date(formatString: "MMMM Do, YYYY")
          client
          duration
          vimeoId
          videoThumbnail {
            file {
              url
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
          categories { 
            title
            slug
          }
        }
      }
    }
  }
`
