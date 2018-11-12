const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
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
}
