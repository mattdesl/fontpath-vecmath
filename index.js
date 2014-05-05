var util = require('fontpath-util');
var Matrix3 = require('vecmath').Matrix3;
var Vector3 = require('vecmath').Vector3;

var tmpVec = new Vector3();

/**
 * Prepares a Matrix3 from the given font and glyph info, which
 * is expected to be in the form of fontpath output, i.e.:
 *
 * { resolution, size, units_per_EM }
 *
 * You can transform a 2D pixel-space point by this matrix and
 * it will line the glyph up to match Canvas fillText rendering
 * (i.e. lower-left origin for text rendering). 
 *
 * If no `outMatrix` is specified, a new Matrix3 will be created.
 * 
 * @param  {Number} font      the font object which defines resolution, size, and units_per_em
 * @param  {Number} glyph     the glyph object from fontpath output
 * @param  {Number} fontSize  the desired font size, or defaults to font.size
 * @param  {Number} x         the desired x position in pixel space, defaults to 0
 * @param  {Number} y         the desired y position in pixel space, defaults to 0
 * @param  {Matrix3} outMatrix the output matrix to use
 * @return {Matrix3}           the output matrix
 */
module.exports.toGlyphMatrix3 = function(font, glyph, fontSize, x, y, outMatrix) {
	fontSize = fontSize||fontSize===0 ? fontSize : font.size;
	x = x||0;
	y = y||0;

	var pxSize = util.pointsToPixels(fontSize, font.resolution);

	var pointScale = (32/font.size) * pxSize / font.units_per_EM;

	if (!outMatrix)
		outMatrix = new Matrix3();
	else
		outMatrix.idt();
	outMatrix.translate( tmpVec.set(x, y) );
	outMatrix.scale( tmpVec.set(pointScale, -pointScale) );
	outMatrix.translate( tmpVec.set(-glyph.hbx, 0) );
	return outMatrix;
}