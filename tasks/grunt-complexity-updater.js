/**

  Helper task driven by `grunt-complexity`.

  Reads value for 'maintainability' from .complexityrc and
  auto-updates its value with data broadcasted from 'grunt-complexity'.

  author:  david linse
  version: 0.1.0
  license: MIT

  TODO: (event-reporter): implement handling of 'complexity' values
  TODO: (updater): evaluate 'maintainabillity' on a per file basis

*/

module.exports = function(grunt) {

  'use strict';

  grunt.registerTask('update-grunt-complexity-values',
                     'Update grunt-complexity metrics', function() {

    var _ = require('lodash');

    var infos = {
      files: {},
      globals: {
        lowest: null
      }
    };

    var _lowest_maintainability = function reduce() {
      return _.reduce(infos.files, function(lowest, k){
        if (k.maintainability < lowest) {
          lowest = k.maintainability;
        }
        return +lowest;
      }, Number.MAX_VALUE);
    };

    grunt.config.requires('complexity');

    grunt.event.on('grunt-complexity.maintainability', function(data) {
      if (!!data.filepath && !infos[data.filepath]) {
        infos.files[data.filepath] = data;
      }
    });

    grunt.event.on('grunt-complexity.complexity', function(data) {
      if (data.length && data[0].filepath && !infos[data.filepath]) {
        infos.files[data.filepath].complexity = data;
      }
    });

    grunt.event.on('grunt-complexity.start', function() {
      if (!grunt.file.exists('.complexityrc')) {
        grunt.file.write('.complexityrc', JSON.stringify({
          'breakOnErrors': true,
          'errorsOnly': false,
          'cyclomatic': 3,
          'halstead': 10.34,
          'maintainability': 1,
          'hideComplexFunctions': false
        }));
        grunt.log.ok('Written initial .complexityrc file ..');
      }
    });

    grunt.event.on('grunt-complexity.finish', function() {

      var rc_file = grunt.file.readJSON('.complexityrc');

      var expected_maintainability = rc_file.maintainability;

      var lowest_maintainability =  _lowest_maintainability();

      // TODO: compare on file basis
      if (grunt.config.get('grunt-complexity.options.history')) {
        grunt
          .file
          .write('.complexity_history', JSON.stringify(infos, null, 2));
      }

      if (lowest_maintainability > expected_maintainability) {

        grunt.log.ok('Detected increased maintainability..');
        grunt.log.ok('Updating from %d to %d ',
                      expected_maintainability,
                      lowest_maintainability);

        rc_file.maintainability = lowest_maintainability;

        rc_file = JSON.stringify(rc_file, null, /*indent*/ 2) + '\n';

        grunt.file.write('.complexityrc', rc_file);
      }
    });

    grunt.task.run(['complexity']);
  });

};
