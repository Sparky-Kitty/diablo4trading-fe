// tsconfig-link-shared.js
const fs = require('fs');

const tsconfigFileBase = './tsconfig.base.json'
const tsconfigFileShared = './tsconfig.shared.json';
const packageName = '@sanctuaryteam/shared';

// Read the tsconfig files
const tsconfigShared = JSON.parse(fs.readFileSync(tsconfigFileShared, 'utf8'));
const tsconfigBase = JSON.parse(fs.readFileSync(tsconfigFileBase, 'utf8'));

// Check environment variable or any other logic
if (process.env.SHARED_LINK === 'true') {
  tsconfigShared.compilerOptions.paths[packageName] = [`${process.env.SHARED_PATH}/src`];
} else {
  delete tsconfigShared.compilerOptions.paths[packageName];
}

tsconfigShared.compilerOptions = {...tsconfigBase.compilerOptions, ...tsconfigShared.compilerOptions}

// Write the modified tsconfig back to the file
fs.writeFileSync(tsconfigFileShared, JSON.stringify(tsconfigShared, null, 2));
