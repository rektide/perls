#!/usr/bin/env node
"use strict"

var
  examples= require( "../.example"),
  perls= require( "../perls"),
  tape= require( "tape")

var parse= perls.parse

tape( "read the replace from a empty-replacement", function( t){
	var val= parse( "hello/")
	t.equal( val.replace.toString(), "")
	t.end()
})

tape( "read in replace from a replacement expression", function( t){
	var val= parse( "hello/hi")
	t.equal( val.replace.toString(), "hi")
	t.end()
})

tape( "read in replace from a empty-replacement expression with a flag", function( t){
	var val= parse( "hello//g")
	t.equal( val.replace.toString(), "")
	t.end()
})

tape( "read in replace from a replacement expression with a flag", function( t){
	var val= parse( "hello/hi/g")
	t.equal( val.replace.toString(), "hi")
	t.end()
})

tape( "read in replace from a matching group expression", function( t){
	var val= parse( "hel(lo)//")
	t.equal( val.replace.toString(), "")
	t.end()
})

tape( "read in replace from a named matching expression", function( t){
	var val= parse( "hel(:<greet>lo)//")
	t.equal( val.replace.toString(), "")
	t.end()
})

tape( "read in replace from an expression with a literal forward-slash", function( t){
	var val= parse( "hello\\\/goodbye/wave")
	t.equal( val.replace.toString(), "wave")
	t.end()
})
