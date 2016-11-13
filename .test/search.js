#!/usr/bin/env node
"use strict"

var
  examples= require( "../.example"),
  perls= require( "../perls"),
  tape= require( "tape")

var parse= perls.parse

tape( "read the search from a empty-replacement", function( t){
	var val= parse( "hello/")
	t.equal( val.search.toString(), "/hello/")
	t.end()
})

tape( "read in search from a replacement expression", function( t){
	var val= parse( "hello/hi")
	t.equal( val.search.toString(), "/hello/")
	t.end()
})

tape( "read in search from a empty-replacement expression with a flag", function( t){
	var val= parse( "hello//g")
	t.equal( val.search.toString(), "/hello/g")
	t.end()
})

tape( "read in search from a replacement expression with a flag", function( t){
	var val= parse( "hello/hi/g")
	t.equal( val.search.toString(), "/hello/g")
	t.end()
})

tape( "read in search from a matching group expression", function( t){
	var val= parse( "hel(lo)//")
	t.equal( val.search.toString(), "/hel(lo)/")
	t.end()
})

tape( "read in search from a named matching expression", function( t){
	var val= parse( "hel(:<greet>lo)//")
	t.equal( val.search.toString(), "/hel(lo)/")
	t.end()
})

tape( "read in search from an expression with a literal forward-slash", function( t){
	var val= parse( "hello\\\/goodbye/wave")
	t.equal( val.search.toString(), "/hello\\/goodbye/")
	t.end()
})
