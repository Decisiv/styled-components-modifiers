// https://www.wisdomgeek.com/development/web-development/how-to-setup-jest-typescript-babel-webpack-project/
module.exports = (api) => {
  /**
   * Cache the returned value forever and don't call this function again. This is the default behavior but since we
   * are reading the env value above, we need to explicitly set it after we are done doing that, else we get a
   * caching was left unconfigured error.
   */
  api.cache(true);

  return {
    presets: [
      [
        // Allows smart transpilation according to target environments
        '@babel/preset-env',
        {
          // Specifying which browser versions you want to transpile down to
          targets: '> 0.25%, not dead',

          modules: 'commonjs',
        },
      ],
      // Enabling Babel to understand TypeScript
      '@babel/preset-typescript',
    ],
  };
};
