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
					'css/app.css':'source/sass/app.scss'
				}
			},
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/app.css':'source/sass/app.scss'
				}
			}
		},
		autoprefixer: {
			dev: {
				options: {
				  browsers: ['last 2 version', 'ie 9', 'BlackBerry 10', 'Android 4']
				},
				no_dest: {
					src: 'css/app.css'
				}
			},
			dist: {
				options: {
				  browsers: ['last 2 version', 'ie 9', 'BlackBerry 10', 'Android 4']
				},
				no_dest: {
					src: 'css/app.css'
				}
			}
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'img/'
				}]
			}
		},
		bake: {
			dev: {
				files: {
					"index.html": "source/index.html"
				}
			},
			dist: {
				files: {
					"index.html": "source/index.html"
				}
			}
		},
		clean: {
			main: {
				src: ['img/**/*.{png,jpg,gif}']
			}
		},
		copy: {
			dist: {
				files: [
				{
					src: 'source/favicon.ico',
					dest: 'favicon.ico',
					filter: 'isFile'
				},
				{
					src: 'source/apple-touch-icon.png',
					dest: 'apple-touch-icon.png',
					filter: 'isFile'
				},
				{
					src: 'source/apple-touch-icon-precomposed.png',
					dest: 'apple-touch-icon-precomposed.png',
					filter: 'isFile'
				},
				{
					expand: true,
					cwd: 'source/img/',
					src: ['**'],
					dest: 'img/',
					filter: 'isFile'
				}]

			},
			dev: {
				files: [
				{
					expand: true,
					cwd: 'source/img/',
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
				files: ['source/sass/*.scss'],
				tasks: ['sass:dev'],
				options: {
					spawn: false,
				}
			},
			styles: {
				files: ['css/app.css'],
				tasks: ['autoprefixer:dev'],
				options: {
					spawn: false,
				}
			},
			copy_images: {
				files: ['source/img/**'],
				tasks: ['copy:dev'],
				options: {
					spawn: false,
					event: ['added', 'changed'],
				}
			},
			remove_images: {
				files: ['source/img/**'],
				tasks: ['clean','copy:dev'],
				options: {
					event: ['deleted'],
					spawn: false,
				}
			},
			bake: {
				files: ['source/*.html'],
				tasks: ['bake:dev'],
				options: {
					spawn: false,
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-bake');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['sass:dist','autoprefixer:dist','clean','copy:dist','imagemin']);
};
