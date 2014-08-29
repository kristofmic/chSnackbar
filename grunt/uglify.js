module.exports = {
  dist: {
    options: {
      compress: {
        drop_console: false
      }
    },
    files: {
      '<%= distPath %>/chSnackbar.min.js': [
        '<%= distPath %>/chSnackbar.js'
      ]
    }
  }
};