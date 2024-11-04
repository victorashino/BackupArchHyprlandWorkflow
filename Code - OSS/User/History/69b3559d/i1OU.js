const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    transformer,
    resolver,
  } = await getDefaultConfig();

  return {
    transformer: {
      ...transformer,
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();
