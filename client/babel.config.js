module.exports = (api) => {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            components: './src/components',
            pages: './src/pages',
            theme: './src/theme',
            utils: './src/utils',
            slices: './src/slices',
            api: './src/api/api'
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],

  }
}
