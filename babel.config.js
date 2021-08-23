module.exports = function(api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo'],
    plugins: [['babel-plugin-inline-import',
    {
      'extensions': ['.svg']
    }], 'module:react-native-dotenv']
  };
};
