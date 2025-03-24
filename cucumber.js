// cucumber.js configuration

const common = [
  '--require-module ts-node/register',
  '--require features/step_definitions/**/*.ts',
];

module.exports = {
  default: {
    format: [
      'summary',
    ],
    paths: ['features/**/*.feature'],
    parallel: 2,
    tags: 'not @wip'
  },
};
