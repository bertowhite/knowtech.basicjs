module.exports = function(grunt) {
	grunt.initConfig({
		connect: {
		    server: {
		      options: {
		        port: 9001,
		        base: './',
		        keepalive: true
		      }
    		}
	  	},
	  	less: {
		  development: {
		    files: {
		      "./styles.css": "./styles.less"
		    }
		  }
	  	}
	});

	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-less");
}