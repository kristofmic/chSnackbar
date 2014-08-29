module.exports = {
  dev: {
    options: {
      style: 'expanded'
    },
    files: {
      '<%= distPath %>/snackbar.css': '<%= cssPath %>/snackbar.scss'
    }
  },
  dist: {
    options: {
      style: 'compressed'
    },
    files: {
      '<%= distPath %>/snackbar.min.css': '<%= distPath %>/snackbar.css'
    }
  }
};