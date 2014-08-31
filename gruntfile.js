module.exports = gruntConfig;

function gruntConfig(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    jsPath: 'assets/javascripts',
    htmlPath: 'assets/templates',
    cssPath: 'assets/stylesheets',
    componentsPath: 'assets/components',
    distPath: 'dist',

    concat: require('./grunt/concat'),
    watch: require('./grunt/watch'),
    uglify: require('./grunt/uglify'),
    ngtemplates: require('./grunt/ngtemplates'),
    sass: require('./grunt/sass'),
    //bgShell: require('./grunt/bgShell'),
    karma: require('./grunt/karma')
  });

  for (var task in pkg.devDependencies) {
    if (task !== 'grunt' && !task.indexOf('grunt')) {
      grunt.loadNpmTasks(task);
    }
  }

  grunt.registerTask('build:dev', [
    'ngtemplates',
    'concat',
    'sass'
  ]);
  grunt.registerTask('build:dist', [
    'build:dev',
    'uglify',
  ]);
  //grunt.registerTask('protractor', ['bgShell:protractor']);
  grunt.registerTask('test:dev', [
    'build:dev',
    'karma:dev'
    //'protractor'
  ]);
  grunt.registerTask('default', [
    'build:dist'
  ]);
}