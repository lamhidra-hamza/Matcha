const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
                '@primary-color': '#fd5068',
                '@tabs-title-font-size': ''
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};