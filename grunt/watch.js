module.exports = {
  scripts: {
    files: ['<%= jsPath %>/**/*.js'],
    tasks: ['concat'],
    options: {

    }
  },
  templates: {
    files: ['<%= htmlPath %>/**/*.html'],
    tasks: ['ngtemplates'],
    options: {

    }
  }
};