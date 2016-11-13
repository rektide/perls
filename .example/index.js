#!/usr/bin/env node
"use strict"

module.exports= {
	hello: require( "./hello"),
	helloHi: require( "./helloHi"),
     helloGlobal: require( "./helloGlobal"),
	helloGroup: require( "./helloGroup"),
	helloNamedGroup: require( "./helloNamedGroup")
}

if( require.main=== module){
	for(var i in module.exports){
		var example= module.exports[i]
		if(example.main){
			example.main()
		}
	}
}
