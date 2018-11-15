import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import { Link } from 'gatsby'

import styles from './still.module.css'
import Layout from '../components/layout'

const masonryOptions = {
  transitionDuration: 1
};

class Still extends React.Component {
  constructor(props) {
    super(props);
    this.allPhotos = get(this, 'props.data.allContentfulStillPortfolio.edges');
    this.state = {
      photos: this.allPhotos,
      filter: null,
    }
  }

  filter(filterValue) {
    return this.setState(({ filter: filterValue, photos: this.allPhotos.filter(({ node }) => node.categories.title === filterValue) }));
  }

  render() {
    const categories = get(this, 'props.data.allContentfulStillCategories.edges')
    const { photos, filter } = this.state;

    const categoryLinks = categories && categories.map(({ node }) => {
      return (
        <button key={node.title} onClick={() => this.filter(node.title)} style={{ borderColor: filter === node.title ? 'black' : '#FCFCFF' }}>{node.title}</button>
      )
    })

    const childElements = photos && photos.map(({ node }) => {
      return (
        <li key={node.slug} className={node.size === "big" ? styles.photoItemBig : styles.photoItemSmall}>
            <Link to={`/still/${node.slug}`}><Img alt={node.title} fluid={node.photo.fluid} /></Link>
        </li>
      )
    });

    return (
      <Layout location={this.props.location} >
        <Helmet>
          <title>WAAN. | Still</title>
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
        <div className={styles.stillPage}>
          <div className={styles.filterRow}>
            <button onClick={() => this.setState({ photos: this.allPhotos, filter: null })} style={{ borderColor: !filter ? 'black' : '#FCFCFF' }}>All</button>
            {categoryLinks}
          </div>
          <Masonry
            className={styles.masonry} // default ''
            elementType={'ul'} // default 'div'
            options={masonryOptions} // default {}
          >
            {childElements}
          </Masonry>
        </div>
      </Layout>
    )
  }
}

export default Still

export const pageQuery = graphql`
  query StillQuery {
    allContentfulStillPortfolio(sort: { fields: [date], order: DESC }) {
      edges {
        node {
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
    }
    allContentfulStillCategories {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`
