import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Vimeo from '@u-wave/react-vimeo';

import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import styles from './still.module.css'
import { Link } from 'gatsby'

class StillTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'dark',
    };
  }

  render() {
    const { theme } = this.state;
    const post = get(this.props, 'data.contentfulStillPortfolio');

    return (
      <Layout location={this.props.location} theme={theme} clean >
        <div className={styles.stillPage}>
          <h2 className={styles.stillTitle}>{post.title}</h2>
          <Link to="/still"><Img alt={post.title} fluid={post.photo.fluid} /></Link>
        </div>
      </Layout>
    )
  }
}

export default StillTemplate

export const pageQuery = graphql`
  query StillPortfolioBySlug($slug: String!) {
    contentfulStillPortfolio(slug: { eq: $slug }) {
      title
      slug
      date(formatString: "MMMM Do, YYYY")
      photo {
        fluid(
          maxWidth: 1180
          resizingBehavior: PAD
          background: "rgb:000000"
        ) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      categories { 
        title
        slug
      }
      size
    }
  }
`
