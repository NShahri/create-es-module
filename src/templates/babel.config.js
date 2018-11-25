const presets = [['@babel/preset-env'], '@babel/preset-react', '@babel/preset-flow'];

if (process.env['BABEL_ENV'] === 'esm') {
    presets[0] = [
        '@babel/preset-env',
        {
            loose: false,
            modules: false,
            targets: {
                esmodules: true,
            },
            shippedProposals: true,
        },
    ];
}

const plugins = ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties'];

module.exports = {presets, plugins};
