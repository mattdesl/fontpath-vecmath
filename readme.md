# fontpath-vecmath

Some vector utilities for dealing with font glyph positioning in 2D and 3D space.

# API

```js
var util = require('fontpath-vecmath');
var Font = require('./myfonts/Font.ttf.js');

var glyph = Font.glyphs["A"];

var matrix = util.toGlyphMatrix3(Font, glyph, fontPtSize, x, y);

//example using canvas context.setTransform
var val = matrix.val;
var scale = val[0],
	xoff = val[6],
	yoff = val[7];
context.setTransform(scale, 0, 0, -scale, xoff, yoff);

//... draw some paths ...
```

# demo

For more detailed examples, see the demos in [fontpath-shape2d](https://github.com/mattdesl/fontpath-shape2d).