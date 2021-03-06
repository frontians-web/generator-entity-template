'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the Entity Generator ' + chalk.red('generator-entity-template') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'name:',
      default: "Entity"
    }, {
        type: 'input',
        name: 'version',
        message: 'version:',
        default: "1.0.0"
      }, {
        type: 'input',
        name: 'description',
        message: 'description:',
        default: "Mongoose Schema Model"
      }, {
        type: 'input',
        name: 'author',
        message: 'author:'
      }];

    this.prompt(prompts, function (props) {
      this.props = props;
      
      /*this.log(this.props.name);
      this.log(this.props.version);
      this.log(this.props.description);
      this.log(this.props.author);*/
      done();
    }.bind(this));
  },

  writing: function () {
    // Copy templates
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'), {
        name: this.props.name.toLowerCase(),
        version: this.props.version,
        description: this.props.description,
        author: this.props.author
      }
    );
    this.fs.copyTpl(
      this.templatePath('_index.ts'),
      this.destinationPath('index.ts'), {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('_lib/_EntityModel.ts'),
      this.destinationPath('lib/' + this.props.name + 'Model.ts'), {
        name: this.props.name,
        nameToLower: this.props.name.toLowerCase()
      }
    );
    this.fs.copyTpl(
      this.templatePath('_lib/_IEntityModel.ts'),
      this.destinationPath('lib/I' + this.props.name + 'Model.ts'), {
        name: this.props.name,
        nameToLower: this.props.name.toLowerCase()
      }
    );
    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'), {
        name: this.props.name.toLowerCase()
      }
    );
    this.fs.copyTpl(
      this.templatePath('_lib/_test/_test.ts'),
      this.destinationPath('lib/test/test.ts'), {
        name: this.props.name
      }
    );

    //Copy static files
    this.fs.copy(
      this.templatePath('_typings/_index.d.ts'),
      this.destinationPath('typings/index.d.ts')
    );
    this.fs.copy(
      this.templatePath('_gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );
    this.fs.copy(
      this.templatePath('_typings.json'),
      this.destinationPath('typings.json')
    );
    this.fs.copy(
      this.templatePath('_tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('_LICENSE'),
      this.destinationPath('LICENSE')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
