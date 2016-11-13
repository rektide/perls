"use strict"

var
  nr= require("named-js-regexp")

var
  replacePattern= /([^\\]*?)\$(?:(\d+)|(?:\+\{(\w+)\}))/g

/**
 * Find the first / in the expression, marking end of match part. Ignore \/.
 * @returns {int} index of first /
 */
function findSplit( text){
	var i= 0
	while( true){
		i= text.indexOf( "/", i)
		if( i == -1){
			return
		}
		if( text[i-1]=== "\\"){
			i += 1
			continue
		}
		return i
	}
}

/**
 * Find last / in the expression, marking end of substitution/beginning of flags. Ignore \/.
 * @returns {int} index of final /
 */
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

/**
 * Create a named regex match for the text expression.
 */
function regex( text, flags){
	return nr(new RegExp( text, flags))
}

/**
 * Parse the replacement value of an expression into a zipped string/{named,numbered}-group array.
 * @returns {array} the parsed version of the array
 */
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
		if(exec[2] !== undefined){
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

/**
 * Generate a function that will perform a Perl style substitution for an input text.
 * @returns {function} function to process the substitution asked for
 */
function parse( expression){
	var split= findSplit( expression)
	if( split=== undefined){
		return
	}
	var
	  tail= findTail( expression, split),
	  flags= ""
	if( tail!== undefined){
		flags= expression.substring( tail+ 1)
	}else{
		tail= expression.length
	}

	// this ought be a clone of exec (with this replaced with arguments.callee) but 'no good alternative' in strict mode.
	// but https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments/callee#A_use_of_arguments.callee_with_no_good_alternative
	var perls= function( expression){
		var search= perls.search.exec( expression)
		if( !search){
			return
		}
		var results= []
		for(var i= 0; i< perls.replace.length; ++i){
			var val= perls.replace[i]
			// static strings and values will be zipped, use modulus to branch on each type
			if( i% 2){
				if( isNaN( val)){
					// expressionual entries are group names
					results.push( search.group( val))
				}else{
					// numerical entries are  positional values
					results.push( search[ val])
				}
			}else{
				// static string
				results.push( val)
			}
		}
		return results.join("")
	}
	var
	  searchText= expression.substring( 0, split),
	  replaceText= expression.substring( split+ 1, tail)
	perls.search= regex( searchText, flags)
	perls.replace= replace( replaceText)
	perls.exec= exec
	perls.toString= function(){ return "[perls`"+ perls.expression+ "`]"}
	perls.expression= expression
	return perls
}

/**
 * This function performs a substitution. Expects a `this` with the search/replace properties of a `parse`.
 */
function exec( expression){
	var search= this.search.exec( expression)
	if( !search){
		return
	}
	var results= []
	for(var i= 0; i< this.replace.length; ++i){
		var val= this.replace[i]
		// static strings and values will be zipped, use modulus to branch on each type
		if( i% 2){
			if( isNaN( val)){
				// textual entries are group names
				results.push( search.group( val))
			}else{
				// numerical entries are  positional values
				results.push( search[ val])
			}
		}else{
			// static string
			results.push( val)
		}
	}
	return results.join("")
}

/**
 * Tagged template string that accepts a Perl style substitution, returns a
 * function to perform that substitution on a string. Wraps parse.
 */
function perls(strings, ...values){
	var
	  expression= String.raw( strings, values),
	  perls= parse( expression)
	return perls
}

module.exports= perls
module.exports.exec= exec
module.exports.findSplit= findSplit
module.exports.findTail= findTail
module.exports.parse= parse
module.exports.perls= perls
module.exports.regex= regex
module.exports.replace= replace
