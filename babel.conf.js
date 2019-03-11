module.exports = function (vendor) {
  const presets = [
    ['@babel/preset-env', {
      'targets': {
        'browsers': ['iOS >= 8', 'Android >= 4']
      },
      useBuiltIns: 'usage'
    }]
  ]

  if (vendor === 'vue') {
    presets.push('@vue/babel-preset-jsx')
  }

  const plugins = ['@babel/plugin-transform-runtime']

  if (vendor === 'react') {
    plugins.push('@babel/plugin-transform-react-jsx')
  }
  else if (vendor === 'vanilla') {
    plugins.push(['@babel/plugin-transform-react-jsx', { pragma: 'createElement' }])
  }

  return { presets, plugins }
}
