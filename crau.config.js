function isProd(valProd, valDev) {
  return process.env.NODE_ENV === 'production' ? valProd : valDev;
}

module.exports = {
  modifyWebpack: config => {
    const newConfig = {
      ...config,
      output: {
        ...config.output,
        libraryTarget: 'commonjs2'
      },
      entry: isProd('./server/app.js', './server/index.js'),
    };
    return newConfig;
  }
};
