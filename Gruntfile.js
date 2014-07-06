// See: http://24ways.org/2013/grunt-is-not-weird-and-hard/
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dev: {
				options: {
					style: 'expanded',
					sourcemap: true
				},
				files: {
					'css/app.css':'dev/sass/app.scss'
				}
			},
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/app.css':'dev/sass/app.scss'
				}
			}
		},
		autoprefixer: {
			main: {
				options: {
				  browsers: ['last 2 version', 'ie 9', 'BlackBerry 10', 'Android 4']
				},
				no_dest: {
					src: 'css/app.css'
				}
			}
		},
		jade: {
			dev: {
				options: {
					pretty: true,
					data: {
						debug: true
					}
				},
				files: {
					"index.html": "dev/jade/index.jade"
				}
			},
			dist: {
				options: {
					data: {
						debug: false
					}
				},
				files: {
					"index.html": "dev/jade/index.jade"
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
			main: {
				src: ['**/*.map','img/**/*.{png,jpg,gif}']
			}
		},
		copy: {
			dev: {
				files: [
				{
					expand: true,
					cwd: 'dev/img/',
					src: ['**'],
					dest: 'img/',
					filter: 'isFile'
				}]
			},
			dist: {
				files: [
				{
					expand: true,
					cwd: 'dev/app-icons/',
					src: ['**'],
					dest: '',
					filter: 'isFile'
				},
				{
					expand: true,
					cwd: 'dev/img/',
					src: ['**'],
					dest: 'img/',
					filter: 'isFile'
				}]

			}
		},
		watch: {
			options: {
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
				files: ['css/app.css'],
				tasks: ['autoprefixer'],
				options: {
					spawn: false,
				}
			},
			jade: {
				files: ['dev/jade/**/*.jade'],
				tasks: ['jade:dev'],
				options: {
					spawn: false,
				}
			},
			copy_images: {
				files: ['dev/img/**'],
				tasks: ['copy:dev'],
				options: {
					spawn: false,
					event: ['added', 'changed'],
				}
			},
			remove_images: {
				files: ['dev/img/**'],
				tasks: ['clean:dev','copy:dev'],
				options: {
					event: ['deleted'],
					spawn: false,
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['sass:dist','autoprefixer','clean','copy:dist','imagemin']);
};
