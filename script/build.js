/* eslint-disable no-console */

function build() {
  const { execSync } = require('child_process');
  const name = require('../package.json').name;
  const registry = 'registry.don.red';
  console.log(execSync(`docker build -t ${registry}/${name} ./script`).toString());
  console.log(execSync(`docker push ${registry}/${name}`).toString());
}

build();
