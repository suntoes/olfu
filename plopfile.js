const reactComponent = require('./lib/plop/configs/react-component')

module.exports = function (plop) {
    plop.setGenerator(reactComponent.name, reactComponent.config)
}
