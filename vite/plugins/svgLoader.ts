import svgLoader from 'vite-svg-loader'

export default () =>
  svgLoader({
    svgo: true,
    svgoConfig: {
      plugins: [
        {
          name: 'removeDimensions'
        },
      ]
    }
  })
