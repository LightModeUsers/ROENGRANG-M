module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};

// module.exports = function (api) {
//   api.cache(true);

//   const presets = ['module:metro-react-native-babel-preset'];
//   const plugins = ['@babel/plugin-proposal-export-namespace-from'];

//   return {
//     presets,
//     plugins,
//   };
// };
