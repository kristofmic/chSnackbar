module.exports = {
  dev: {
    options: {
      process: function(src, filepath) {
        return '\n// ' + filepath + '\n' + src;
      }
    },
    src: [
      '<%= jsPath %>/templates_module.js',
      '<%= jsPath %>/snackbar_module.js',
      '<%= jsPath %>/**/*.js'
    ],
    dest: '<%= distPath %>/chSnackbar.js'
  }
};
