const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const errorLogFilePatterns = ['npm-debug.log', 'yarn-error.log', 'yarn-debug.log'];

const validFiles = [
    '.DS_Store',
    'Thumbs.db',
    '.git',
    '.gitignore',
    '.idea',
    'README.md',
    'LICENSE',
    '.hg',
    '.hgignore',
    '.hgcheck',
    '.npmignore',
    'mkdocs.yml',
    'docs',
    '.travis.yml',
    '.gitlab-ci.yml',
    '.gitattributes',
];

module.exports = function isSafeToCreateProjectIn(root, name) {
    const conflicts = fs
        .readdirSync(root)
        .filter(file => !validFiles.includes(file))
        // IntelliJ IDEA creates module files before CRA is launched
        .filter(file => !/\.iml$/.test(file))
        // Don't treat log files from previous installation as conflicts
        .filter(file => !errorLogFilePatterns.some(pattern => file.indexOf(pattern) === 0));

    if (conflicts.length > 0) {
        console.log(`The directory ${chalk.green(name)} contains files that could conflict:`);
        console.log();
        for (const file of conflicts) {
            console.log(`  ${file}`);
        }
        console.log();
        console.log('Either try using a new directory name, or remove the files listed above.');

        return false;
    }

    // Remove any remnant files from a previous installation
    const currentFiles = fs.readdirSync(path.join(root));
    currentFiles.forEach(file => {
        errorLogFilePatterns.forEach(errorLogFilePattern => {
            // This will catch `(npm-debug|yarn-error|yarn-debug).log*` files
            if (file.indexOf(errorLogFilePattern) === 0) {
                fs.removeSync(path.join(root, file));
            }
        });
    });
    return true;
};
