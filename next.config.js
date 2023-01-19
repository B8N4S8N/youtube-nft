module.exports = {
    webpack: (config, { isServer }) => {
      // Enable the use of web3.js
      config.resolve.alias['web3'] = 'web3-eth-contract';
      return config;
    },
  }
  