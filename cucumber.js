// cucumber.js configuration

const common = [
  '--require-module ts-node/register',
  '--require features/step_definitions/**/*.ts',
];

module.exports = {
  default: {
    format: [
      'progress',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    paths: ['features/**/*.feature'],
    publishQuiet: true,
    parallel: 2,
    tags: 'not @wip'
  },
  
  // Configuration for running one feature
  pwd: [
    ...common,
    '--format progress',
    '--format html:reports/cucumber-report.html',
    'features/tools/pwd.feature'
  ]
};
