module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@service': './src/service',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@navigation': './src/navigation',
          '@features': './src/features',
          '@styles': './src/styles',
          '@state': './src/state',
        },
      },
    ],
  ],
};
