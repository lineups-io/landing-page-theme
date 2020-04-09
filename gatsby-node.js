// gatsby-node.js
exports.onCreateWebpackConfig = function onCreateWebpackConfig({ actions, stage, getConfig }) {
  const config = getConfig()
  if (stage === 'develop') {
    config.entry.commons.unshift(require.resolve('core-js'))
    actions.replaceWebpackConfig(config)
  }
}
