/**
 * invalid
 * 
 * console.log()
 * console.error()
 * console.warn()
 * 
 * valid
 * 
 * console
 * log
 */

const disallowedMethods = ["log", "warn", "baz", "info"];

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
        const isConsoleCall = looksLike(node, {
          name: "console",
          parent: {
            type: "MemberExpression",
            property: {
              name: val => disallowedMethods.includes(val)
            }
          }
        });
        if (isConsoleCall) {
          context.report({
            node,
            message: "Using console is not allowed"
          });
        }
      }
    };
  }
};

function looksLike(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every(bKey => {
      const bVal = b[bKey];
      const aVal = a[bKey];
      if (typeof bVal === "function") {
        return bVal(aVal);
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal);
    })
  );
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val);
}
