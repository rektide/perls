# perl s(ubstitution)

> A `s///`-alike search-and-replace/substitution tagged-template-string for JS.

Makes *Search-and-replace* regex, or *substitutions,* available in JS. Use handy ``perls`find this/replace with/g` `` to do text substiution.

```
var perls= require("perls")
var lukesDad= perls`vader/anakin/`("vader") //=> "anakin"
var threeCheers= perls`(:<cheer>(huzzah|cheers))/*$+{cheer}* *$+{cheer}* *$+{cheer}*/`("huzzah") //=> "*huzzah* *huzzah* *huzzah*"
```

# Background

In JavaScript, `RegExp.prototype.exec` is used to get results out of regexp groups. If just trying to do some text substitution, that means writing a fairly gnarly string to concattenate together some output literal, from that `exec` output. This library exists to bring a more convenient means of doing text substitution to JavaScript.

In other non-JS environments, there's a s/find this/replace with this/ substitution one can run-

| language | example |
| --- | --- |
| perl | `$myFav =~ s/replace this/with this/` |
| vim | `:s/replace this/with this/g 10000` |

# Usage

* *Find and replace*
```js
perls`change this text/now a replacement/`("it's a good start. change this text.") //=> "it's a good stat. now a replacement"
```

* *Use a capture group*
```js
perls`find (\w+)/$1 once, $2 twice/`("find this") //=> "this once, this twice"
```

* *Use a named capture grou*
```
perls`more (:<noun>)/$+{noun}! $+{noun}! $+{noun}`("more obama") //=> "obama! obama! obama!"
```

Run the substitution [./.example](./.example)s or their [./.test](./.test)s to see usage.

# Install

Perls is distributed on npm.

## Package

From inside the project you want to add perls to:

`npm install --save perls`

## Dependencies

Shout to to these fabulous libraries for their assistance:

[`named-js-regexp`](https://github.com/edvinv/named-js-regexp) to power named group matching.
