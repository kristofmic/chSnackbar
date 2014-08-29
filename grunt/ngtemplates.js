module.exports = {
  my_procur: {
    src: [
      '<%= htmlPath %>/**/*.html'
    ],
    dest: '<%= jsPath %>/templates_module.js',
    options: {
      module: 'ch.Snackbar.Templates',
      standalone: true,
      htmlmin: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true
      },
      url: function(url) {
        var
          urlArr = url.split('/');

        return urlArr[urlArr.length-1];
      }
    }
  }
};