/**
 * invalid
 * 
 * console.log()
 * console.error()
 * console.warn()
 */

module.exports = {
  meta: {
    docs: {
      description: "Disallow use of Console",
      category: "Best Practices",
      recomanded: true
    }
  },
  create(context) {
    return {
      Identifier(node) {
        if (node.name !== "console") return;

        context.report({
          node,
          message: "Using console is not allowed"
        });
      }
    };
  }
};
