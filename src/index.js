#!/usr/bin/env node

const chalk = require('chalk');
const commander = require('commander');
const fs = require('fs-extra');
const os = require('os');
const path = require('path');

const packageJson = require('../package.json');
const checkAppName = require('./checkAppName');
const copyTemplateFiles = require('./copyTemplateFiles');
const isSafeToCreateProjectIn = require('./isSafeToCreateProjectIn');

let projectName = '';

const program = new commander.Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')} [options]`)
    .action(name => {
        projectName = name;
    })
    .allowUnknownOption()
    .on('--help', () => {
        console.log(`    Only ${chalk.green('<project-directory>')} is required.`);
    })
    .parse(process.argv);

if (!projectName) {
    console.error('Please specify the project directory:');
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`);
    console.log();
    console.log('For example:');
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-es-module')}`);
    console.log();
    console.log(`Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`);
    process.exit(1);
}

const root = path.resolve(projectName);
const appName = path.basename(root);

checkAppName(appName);
fs.ensureDirSync(projectName);

if (!isSafeToCreateProjectIn(root, appName)) {
    process.exit(1);
}

const enablePrettier = true;
const enablePreCommit = undefined;
const enableFlow = undefined;
const enableLinting = undefined;

const modulePackageJson = {
    name: appName,
    version: '0.1.0',
    private: true,
    main: 'build/cjs/index.js',
    module: 'build/esm/index.js',
    files: ['build/**/*'],
    scripts: {
        test: 'jest',
        prepublish: 'npm run build',
        prebuild: 'rimraf build/',
        build: 'npm run build:cjs && npm run build:esm',
        'build:esm': 'BABEL_ENV=esm babel src --out-dir build/esm/ --ignore "src/**/*.test.js"',
        'build:cjs': 'BABEL_ENV=cjs babel src --out-dir build/cjs/ --ignore "src/**/*.test.js"',
        format:
            enablePrettier &&
            'prettier --config ./.prettierrc --write "src/**/*.{js,jsx,css,scss,html,json}" && module-grouping \'src/**/*.{js,jsx}\' --write',
        lint: 'eslint src',
        precomit: enablePreCommit && 'lint-staged',
    },
    devDependencies: {
        '@babel/cli': '^7.1.5',
        '@babel/core': '^7.1.6',
        '@babel/plugin-proposal-class-properties': '^7.1.0',
        '@babel/plugin-transform-runtime': '^7.1.0',
        '@babel/preset-env': '^7.1.6',
        '@babel/preset-flow': '^7.0.0',
        '@babel/preset-react': '^7.0.0',
        'babel-core': '^7.0.0-bridge.0',
        'babel-jest': '^23.6.0',
        jest: '^23.6.0',
        rimraf: '^2.6.2',
        prettier: '^1.15.2',
        'module-grouping-cli': enablePrettier && '^0.1.0',
        'lint-staged': enablePreCommit && '^8.1.0',
        'flow-bin': enableFlow && '^0.89.0',
        "eslint-config-prettier": enableLinting && "^3.0.1",
        "eslint-plugin-flowtype": enableLinting && "^3.0.0",
        "eslint-plugin-import": enableLinting && "^2.13.0",
        "eslint-plugin-jsx-a11y": enableLinting && "^6.1.0",
        "eslint-plugin-react": enableLinting && "^7.10.0",
    },
    dependencies: {
        '@babel/runtime': '^7.1.5',
    },
    'lint-staged': enablePreCommit && {
        '*.{scss,css,html,json}': ['prettier --config ./.prettierrc --write', 'git add'],
        '*.{js,jsx}': ['prettier --config ./.prettierrc --write', 'module-grouping --write', 'git add'],
    },
};

fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(modulePackageJson, null, 2) + os.EOL);

copyTemplateFiles(root);
