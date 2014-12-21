module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    clean: ['public/*'],
    
    sass: {
      options: {
        outputStyle: "compressed"
      },
      dist: {
        files: {
          'public/index.css': 'assets/css/app.scss'
        }
      }
    },

    browserify: {
      dist: {
        files: {
          'public/index.js': ['assets/js/index.js']
        }
      }
    },

    express: {
      web: {
        options: {
          port: 3000,  
          script: 'app.js'
        }
      }
    },

    watch: {
      assets: {
        files: ['assets/js/**.js', 'assets/css/**/*.scss', 'views/**/*'],
        tasks: ['build']
      },

      server: {
        files: ['app.js', 'service/**/*.js'],
        tasks: ['express:web'],
        options: {
          atBegin: true,
          spawn: false
        }
      }
    }

  });


  // Default task(s).
  grunt.registerTask('build',['clean','sass', 'browserify']);
  grunt.registerTask('default', ['build', 'watch']);

};