module.exports = function (grunt) {

	//Configuracion de Grunt
	var settings = {
		less: {
			style: {
				files: { //ARchivos a compilar
					"style.css": "less/style.less" //destino, origen
				}
			}
		},
		watch: {
			style: {
				files : ["less/*.less"], //observa cualquier cambio en archivos LESS
				tasks: ["less"], //ejecuta la compilacion LESS
				options: {
					spawn: false //par que no se quee tostado (creo)
				}

				
			}
		}
	};

	//Cargamos configuracion de Grunt
	grunt.initConfig(settings);

	//Cargamos plugins
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');


	//Definimos tareas disponibles para grunt-cli
	grunt.registerTask('default',['less', 'watch']);
	grunt.registerTask('production', ['less']);


};