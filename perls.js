"use strict"

var
  nr= require("named-js-regexp")

var
  capturePattern= /^([^(?:\\\/)]+)\//,
  replacePattern= /([^\\]*?)\$(?:(\d+)|(?:\+\{(\w+)\}))/g

function process(text){
	var
	  capture= captureText(text),
	  remainder= capture.index,
	  replace= replaceText(text.substring(index))
	return {capture,replace}
	  
}

function captureText(text){
	var
	  match= capturePattern.exec(text),
	  regex= new RegExp(match),
	  namedRegex= nr(regex)
	console.log("m", match)
	return namedRegex
}

function replaceText(text){
	var
	  values= [],
	  lastIndex= 0
	while(true){
		var exec= replacePattern.exec(text)
		if(!exec){
			break
		}
		values.push(exec[1])
		if(values[2] !== undefined){
			values.push(parseInt(exec[2]))
		}else{
			values.push({group: exec[3]})
		}
		lastIndex= exec.index + exec[0].length
	}
	var remainder= text.substring(lastIndex)
	if(remainder){
		values.push(remainder)
	}
	return values
}
 
function perls(strings, ...values){
	var text= String.raw(strings, values)
	return process(text)

	  matchText= capture.exec(text), // match part of pattern
	  match= nr(new RegExp(matchText)),
	  replaceText= text.substring(matchText[0].length) // substitution part of pattern
	  result= [],
	  exec
	if(!exec){
		return replaceText
	}
	  
	 
}

module.exports.capturePattern= capturePattern
module.exports.capture= captureText
module.exports.replacePattern= replacePattern
module.exports.replace= replaceText
