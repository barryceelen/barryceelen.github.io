// See: http://24ways.org/2013/grunt-is-not-weird-and-hard/
var path = require('path');

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			server: {
				options: {
					livereload: true,
					port: 8000
				}
			}
		},
		sass: {
			options: {
				implementation: require('sass'),
				sourceMap: false,
				quietDeps: true,
				silenceDeprecations: ['legacy-js-api', 'import']
			},
			dev: {
				options: {
					outputStyle: 'expanded'
				},
				files: {
					'css/application.css':'dev/sass/application.scss'
				}
			},
			dist: {
				options: {
					outputStyle: 'compressed',
					sourceMap: false
				},
				files: {
					'css/application.css':'dev/sass/application.scss'
				}
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					collapseInlineTagWhitespace: false
				},
				files: {
					'index.html': 'index.html'
				}
			}
		},
		autoprefixer: {
			main: {
				options: {
				  browsers: ['last 2 version', 'ie 9', 'BlackBerry 10', 'Android 4']
				},
				no_dest: {
					src: 'css/application.css'
				}
			}
		},
		pug: {
			dev: {
				options: {
					basedir: path.resolve(),
					pretty: true
				},
				files: {
					"index.html": "dev/pug/index.pug"
				}
			},
			dist: {
				options: {
					basedir: path.resolve(),
					data: {
						debug: false
					}
				},
				files: {
					"index.html": "dev/pug/index.pug"
				}
			}
		},
		imagemin: {
			main: {
				files: [{
					expand: true,
					cwd: 'img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'img/'
				}]
			}
		},
		clean: {
			dev: {
				src: ['.sass-cache/','**/*.map','img/**/*.{png,jpg,gif}','js/**/*','*.orig']
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: [
					'dev/js/vendor/jquery-3.1.0.slim.min.js',
					'dev/js/vendor/viewport-units-buggyfill.js',
					'dev/js/vendor/lazysizes.min.js',
					'dev/js/vendor/ls.unveilhooks.js',
					'dev/js/vendor/fingerprint2.min.js',
					'dev/js/app.js',
				],
				dest: 'js/app.js',
			},
		},
		uglify: {
			dist: {
				files: {
					'js/app.js': ['js/app.js']
				}
			}
		},
		copy: {
			images: {
				files: [
				{
					expand: true,
					cwd: 'dev/img/',
					src: ['**'],
					dest: 'img/',
					filter: 'isFile'
				}]
			},
			icons: {
				files: [
				{
					expand: true,
					cwd: 'dev/app-icons/',
					src: ['**'],
					dest: '',
					filter: 'isFile'
				}]
			},
			fonts: {
				files: [
				{
					expand: true,
					cwd: 'dev/fonts/',
					src: ['**'],
					dest: 'fonts/',
					filter: 'isFile'
				}]
			}
		},
		watch: {
			options: {
				atBegin: true,
				livereload: true,
			},
			sass: {
				files: ['dev/sass/*.scss'],
				tasks: ['sass:dev'],
				options: {
					spawn: false,
				}
			},
			styles: {
				files: ['css/application.css'],
				tasks: ['autoprefixer'],
				options: {
					spawn: false,
				}
			},
			pug: {
				files: ['dev/pug/**/*.pug'],
				tasks: ['pug:dev'],
				options: {
					spawn: false,
				}
			},
			copy_images: {
				files: ['dev/img/**'],
				tasks: ['copy:images'],
				options: {
					spawn: false,
					event: ['added', 'changed'],
				}
			},
			copy_icons: {
				files: ['dev/app-icons/**'],
				tasks: ['copy:icons'],
				options: {
					spawn: false,
					event: ['added', 'changed'],
				}
			},
			concat: {
				files: ['dev/js/**'],
				tasks: ['concat:dist'],
				options: {
					spawn: false,
					event: ['added', 'changed'],
				}
			},
			remove_images: {
				files: ['dev/img/**'],
				tasks: ['copy:images'],
				options: {
					event: ['deleted'],
					spawn: false,
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['connect:server','watch','notify:server']);
	grunt.registerTask('build', ['clean','sass:dist','autoprefixer','concat:dist','uglify:dist','pug','copy', 'imagemin']);
};
