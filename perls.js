"use strict"

var
  nr= require("named-js-regexp")

var
  replacePattern= /([^\\]*?)\$(?:(\d+)|(?:\+\{(\w+)\}))/g

function process(text){

	var
	  capture= captureText(text),
	  remainder= capture.index,
	  replace= replaceText(text.substring(index))
	return {capture,replace}
	  
}

function findSplit( text){
	while( true){
		var i= text.indexOf( "/")
		if( i == -1){
			return
		}
		if( text[i-1]=== "\\"){
			continue
		}
		return i
	}
}

function findTail( text, min){
	while( true){
		var i= text.lastIndexOf( "/")
		if( i == -1){
			return
		}
		if( text[i-1]=== "\\"){
			continue
		}
		if( i<= min){
			return
		}
		return i
	}
}

function regex( text, flags){
	//text= text.replace("\\", "\\\\")
	return nr(new RegExp( text, flags))
}

function replace( text){
	var
	  values= [],
	  lastIndex= 0
	while( true){
		var exec= replacePattern.exec(text)
		if(!exec){
			break
		}
		values.push(exec[1])
		if(values[2] !== undefined){
			values.push( parseInt(exec[2]))
		}else{
			values.push( exec[3])
		}
		lastIndex= exec.index + exec[0].length
	}
	var remainder= text.substring(lastIndex)
	if(remainder){
		values.push(remainder)
	}
	return values
}
 

function parse( text){
	var split= findSplit( text)
	if( split=== undefined){
		return
	}
	var
	  tail= findTail( text, split),
	  flags= ""
	if( tail!== undefined){
		flags= text.substring( tail)
	}else{
		tail= text.length
	}
	return {
		capture: regex( text.substring( 0, split), flags),
		replace: replace( text.substring( split+ 1, tail)),
		exec
	}
}

function exec( text){
	var capture= this.capture.exec( text)
	if( !capture){
		return
	}
	var results= []
	for(var i= 0; i< this.replace.length; ++i){
		var val= this.replace[i]
		// static strings and values will be zipped, use modulus to branch on each type
		if( i% 2){
			if( isNaN( val)){
				// textual entries are group names
				results.push( capture.group( val))
			}else{
				// numerical entries are  positional values
				results.push( capture[ va])
			}
		}else{
			// static string
			results.push( val)
		}
	}
	return results.join("")
}

function perls(strings, ...values){
	var
	  text= String.raw( strings, values),
	  ctx= parse( text)
	return ctx
}

module.exports= perls
module.exports.parse= parse
module.exports.perls= perls
module.exports.regex= regex
module.exports.replace= replace
