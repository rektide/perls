var
  perls= require( "../perls"),
  tape= require( "tape")

var
  capture= perls.capture,
  replaces= perls.replaces

tape("capture gets a trivial expression"), function(t){
	var val= capture.exec("hello//")
	t.equal(val[1], "hello")
	t.end()
})

tape("capture gets a trivial expression & replacement"), function(t){
	var val= capture.exec("hello/hi/")
	t.equal(val[1], "hello")
	t.end()
})

tape("capture gets a matching expression"), function(t){
	var val= capture.exec("hel(lo)//")
	t.equal(val[1], "hel(lo)")
	t.end()
})

tape("capture gets a named matching expression"), function(t){
	var val= capture.exec("hel(?<greet>lo)//")
	t.equal(val[1], "hel(lo)")
	t.end()
})





