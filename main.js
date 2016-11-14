#!/usr/bin/env node
"use strict"

var
  byline = require( "byline"),
  perls= require( ".")

function main(){
	var
	  lines= byline( process.stdin),
	  expression= process.argv.splice( 2).join( " "),
	  sub= perls`${expression}`
	lines.on( "data", function( line){
		console.log(sub(line.toString()))
	})
}

if( require.main=== module){
	main()
}

module.exports= main
module.exports.main= main
