// See: http://24ways.org/2013/grunt-is-not-weird-and-hard/
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
			dev: {
				options: {
					style: 'expanded'
				},
				files: {
					'css/application.css':'dev/sass/application.scss'
				}
			},
			dist: {
				options: {
					style: 'compressed'
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
					collapseWhitespace: true
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
		jade: {
			dev: {
				options: {
					pretty: true
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
			dev: {
				src: ['.sass-cache/','**/*.map','img/**/*.{png,jpg,gif}','js/**/*']
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
			scripts: {
				files: [
				{
					expand: true,
					cwd: 'dev/js/',
					src: ['**'],
					dest: 'js/',
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
				files: ['css/application.css'],
				tasks: ['autoprefixer'],
				options: {
					spawn: false,
				}
			},
			jade: {
				files: ['dev/jade/**/*.jade'],
				tasks: ['jade:dev', 'htmlmin'],
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
			copy_scripts: {
				files: ['dev/js/**'],
				tasks: ['copy:scripts'],
				options: {
					spawn: false,
					event: ['added', 'changed'],
				}
			},
			remove_images: {
				files: ['dev/img/**'],
				tasks: ['clean:dev','copy:images'],
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
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	grunt.registerTask('default', ['sass:dist','autoprefixer','jade','htmlmin','clean','copy','imagemin']);
	grunt.registerTask('serve', ['connect:server','watch','notify:server']);
};
