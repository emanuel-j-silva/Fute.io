import { ConfigAPI } from "@babel/core";

module.exports = function (api: ConfigAPI) {
    api.cache.using(()=> process.env.NODE_ENV);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        ['module:react-native-dotenv', {
          moduleName: '@env',
          path: '.env',
          safe: false,
          allowUndefined: true
        }]
      ]
    };
  };
  