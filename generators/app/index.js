'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  prompting: function() {
    var done = this.async();
    this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Name your PIE:',
      default: this.appname
    },{
      type: 'input',
      name: 'className',
      message: 'Enter the class name for the custom element:'
    }]).then(function(answers) {
      this.props = answers;
      this.log(answers.name);
      done();
    }.bind(this));
  },

  writing: function() {
    var variables = {
      pieName: this.props.name,
      className: this.props.className,
      version: "1.0.0"
    };

    var files = [
      '.gitignore',
      'README.md',
      'package.json',
      'controller/package.json',
      'controller/src/index.js',
      'docs/demo/.gitignore',
      'docs/demo/config.json',
      'docs/demo/index.html',
      'src/index.js',
      'src/index.less'
    ];

    for (var i in files) {
      this.fs.copyTpl(
        this.templatePath(function() {
          var parts = files[i].split('/'), last = parts.pop();
          return parts.length == 0 ? '_' + last : parts.join('/') + '/_' + last;
        }()),
        this.destinationPath(files[i]),
        variables
      );
    }
  }

});
