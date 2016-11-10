# Perls

A normative substitution tagged-template function (s// replacement for js). The s/ is implicit.

Supports both regular JS expressions and `(?:<named>match)` matching. Retrieve matches with `$+{named}`.

Uses [`named-regexp`](https://github.com/cho45/named-regexp.js) to power named groups.

```
var perls= require("perls")
var lukesDad= perls`vader/anakin/`("vader") //=> "anakin"
var threeCheers= perls`(:<cheer>(huzzah|cheers))/
