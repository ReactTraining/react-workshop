// https://jestjs.io/docs/en/webpack#handling-static-assets

// Since our CSS Modules strategy is to always use .component
// and use in JS as styles.component, this will prevent "undefined"
// errors in the tests
exports.default = { component: '' }
