"use strict"

function main( example){
	function main(){
		var
		  args= process.argv.splice(2),
		  quiet= false
		for(var i in args){
			var dropArg= true
			if( args[i] === "-q"){
				quiet= true
			}else{
				dropArg= false
			}
			if( dropArg){
				args.splice( i, 1)
			}
		}
		var
		  input= process.argv.length<= 2?
			module.exports.defaults.sampleText:
			process.argv.splice( 2).join( " "),
		  output= example.exports( `hello one, hello all!`)
		if(!quiet && !module.exports.defaults.quiet){
			console.log( "input:", input)
			console.log( "expression:", example.exports.expression)
			console.log( "output:", output)
		}else{
			console.log(output)
		}
	}
	if(require.main=== example){
		process.nextTick(_ => example.exports.main())
	}
	return main
}

module.exports.main= main
module.exports.defaults= {
	sampleText: `hello one, hello all!`,
	quiet: false
}
