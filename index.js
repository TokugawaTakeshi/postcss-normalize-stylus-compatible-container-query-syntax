/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = () => {
  // No options currently supported; reserved for future use.

  return {

    postcssPlugin: 'postcss-normalize-stylus-compatible-container-query-syntax',

    // Perform a very simple, global string replacement across the whole CSS.
    // It converts Stylus-compatible irregular syntax
    //   @media container and (...)
    // into the standard CSS container query at-rule:
    //   @container (...)
    // This mirrors the requested implementation: CSS.replaceAll("@media container and", "@container").
    Once(root) {

      const postcss = require('postcss')
      const original = root.toString()
      const replaced = original.replaceAll('@media container and', '@container')

      if (replaced !== original) {
        const newRoot = postcss.parse(replaced)
        // Replace existing tree content with the new parsed tree
        root.removeAll()
        newRoot.each((node) => root.append(node))
      }

    }
  }
}

module.exports.postcss = true
