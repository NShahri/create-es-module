const presets = [['@babel/preset-env'], '@babel/preset-react', '@babel/preset-flow'];
const plugins = ['@babel/plugin-proposal-class-properties'];

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

    plugins.push('@babel/plugin-transform-runtime');
}


module.exports = {presets, plugins};
