module.exports = function (api) {
  api.cache(true)

  const presets = [
    ['@babel/preset-env', {
      'targets': {
        'browsers': ['iOS >= 8', 'Android >= 4']
      }
    }]
  ]
  const plugins = ['@babel/plugin-transform-runtime', '@babel/plugin-transform-react-jsx']

  return {
    presets,
    plugins
  }
}
