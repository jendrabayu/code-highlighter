// https://cli.vuejs.org/config/#runtimecompiler

module.exports = {
    runtimeCompiler: true,
    publicPath: process.env.NODE_ENV === 'production'
        ? '/code-highlighter/'
        : '/'
}