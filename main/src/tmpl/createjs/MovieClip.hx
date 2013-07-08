package tmpl.createjs;
import haxe.Template;
class MovieClip {

	static public var template:Template = new Template(
'package ::packageStr::;
@:native("::namespace::.::nativeClassName::")
extern class ::className:: extends createjs.easeljs.::superClassName::{
::field::
	public var nominalBounds:createjs.easeljs.Rectangle;
	public var frameBounds:Array<createjs.easeljs.Rectangle>;
}'
	);

	public static function create(
		packageStr:String, className:String, field:Field,
		namespace:String, nativeClassName:String
	):String{

		var fileLines = template.execute({
			namespace: namespace,
			nativeClassName: nativeClassName,
			packageStr: packageStr,
			className: className,
			field: field.getLines(),
			superClassName: field.isMovieClip ? "MovieClip": "Container"
		});
		return fileLines;
	}
}
