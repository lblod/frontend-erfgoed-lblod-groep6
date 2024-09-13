'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    babel: {
      plugins: [
        // ... any other plugins
        require.resolve('ember-concurrency/async-arrow-task-transform'),
      ],
    },
    // Add options here
    sassOptions: {
      includePaths: ['node_modules/@appuniversum/ember-appuniversum'],
    },
  });

  return app.toTree();
};
