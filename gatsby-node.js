const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const videoContent = new Promise((resolve, reject) => {
    const video = path.resolve('./src/templates/video.js')
    resolve(
      graphql(
        `
          {
            allContentfulVideoPortfolio {
              edges {
                node {
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
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulVideoPortfolio.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/video/${post.node.slug}/`,
            component: video,
            context: {
              slug: post.node.slug
            },
          })
        })
      })
    )
  })

  const stillContent = new Promise((resolve, reject) => {
    const still = path.resolve('./src/templates/still.js')
    resolve(
      graphql(
        `
          {
            allContentfulStillPortfolio {
              edges {
                node {
                  title
                  slug
                  date(formatString: "MMMM Do, YYYY")
                  categories { 
                    title
                    slug
                  }
                  size
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulStillPortfolio.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/still/${post.node.slug}/`,
            component: still,
            context: {
              slug: post.node.slug
            },
          })
        })
      })
    )
  })

  return [videoContent, stillContent];
}
