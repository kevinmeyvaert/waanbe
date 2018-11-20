import React from 'react'
import { graphql, navigate } from 'gatsby'
import Helmet from 'react-helmet'
import Vimeo from '@u-wave/react-vimeo';
import KeyHandler, { KEYDOWN } from 'react-key-handler';

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

  goBack() {
    const post = get(this.props, 'data.contentfulStillPortfolio');
    const allPhotos = get(this.props, 'data.allContentfulStillPortfolio.edges').map(({ node }) => node.slug);
    const currentIndex = allPhotos.findIndex(photoSlug => photoSlug === post.slug);
    if (currentIndex === 0) {
      return navigate(`/still/${allPhotos[allPhotos.length - 1]}`);
    }
    return navigate(`/still/${allPhotos[currentIndex - 1]}`);
  }

  goNext() {
    const post = get(this.props, 'data.contentfulStillPortfolio');
    const allPhotos = get(this.props, 'data.allContentfulStillPortfolio.edges').map(({ node }) => node.slug);
    const currentIndex = allPhotos.findIndex(photoSlug => photoSlug === post.slug);
    if (currentIndex === (allPhotos.length - 1)) {
      return navigate(`/still/${allPhotos[0]}`);
    }
    return navigate(`/still/${allPhotos[currentIndex + 1]}`);
  }

  render() {
    const { theme } = this.state;
    const post = get(this.props, 'data.contentfulStillPortfolio');
    return (
      <Layout location={this.props.location} theme={theme} clean >
        <KeyHandler
          keyEventName={KEYDOWN}
          keyValue="ArrowLeft"
          onKeyHandle={() => this.goBack()}
        />
        <KeyHandler
          keyEventName={KEYDOWN}
          keyValue="ArrowRight"
          onKeyHandle={() => this.goNext()}
        />
        <KeyHandler
          keyEventName={KEYDOWN}
          keyValue="Escape"
          onKeyHandle={() => navigate(`/still`)}
        />
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
    allContentfulStillPortfolio(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          slug
        }
      }
    }
  }
`
