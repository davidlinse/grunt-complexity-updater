### grunt-complexity-updater

Reads _"maintainability"_ threshold from _.complexityrc_, runs `grunt-complexity` and auto-updates it when _"increased maintainability"_ was detected.

[![Dependency Status][dm_svg]][dm_url]

[dm_svg]: https://david-dm.org/davidlinse/grunt-complexity-updater.svg
[dm_url]: https://david-dm.org/davidlinse/grunt-complexity-updater

_Note:_ It's assumed that you're already using the [_grunt-complexity_][grunt_complexity] module so it's **not** included as dependency.

[grunt_complexity]: https://github.com/vigetlabs/grunt-complexity

#### Usage
```
$ npm install grunt-complexity-updater
```

```node
// in your Gruntfile.js
grunt.initConfig({
  complexity: {
    generic: {
      src: ['lib/*.js'],
      options: grunt.file.readJSON('.complexityrc')
    }
  }
});

grunt.loadNpmTasks('grunt-complexity-updater');

// a little shortcut
grunt.registerTask('test', ['update-grunt-complexity-values'])
```

Create a `.complexityrc` file and make it look like:
```json
{
  "maintainability":      1,      // initial value, will be updated on next run
  "broadcast":            true,   // make grunt-complexity broadcasting data

  // following settings are up to you
  //
  "breakOnErrors":        true|false,
  "errorsOnly":           true|false,
  "cyclomatic":           0,
  "halstead":             0,
  "hideComplexFunctions": false,
}
```
You're done. Now run `$ grunt update-grunt-complexity-values`.


#### Licence

(The MIT License)

Copyright (c) 2014 David Linse <davidlinse@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
THEWARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
