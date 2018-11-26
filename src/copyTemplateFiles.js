const fs = require('fs-extra');
const path = require('path');

module.exports = function copyTemplateFiles(root) {
    fs.copySync(require.resolve('./templates/.editorconfig'), path.join(root, '.editorconfig'));

    fs.copySync(require.resolve('./templates/.gitignore'), path.join(root, '.gitignore'));

    fs.copySync(require.resolve('./templates/babel.config.js'), path.join(root, 'babel.config.js'));

    fs.copySync(require.resolve('./templates/README.md'), path.join(root, 'README.md'));

    fs.copySync(require.resolve('./templates/index.js'), path.join(root, 'src/index.js'));

    fs.copySync(require.resolve('./templates/index.test.js'), path.join(root, 'src/index.test.js'));
};
