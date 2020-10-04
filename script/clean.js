function clean() {
  const { execSync } = require('child_process');
  execSync('sh -c \'rm -rf dist out temp\'');
}

clean();
