package tmpl.haxe;
import haxe.Template;
class MovieClip {

	static public var template:Template = new Template(
'package ::packageStr::;
@:native("::namespace::.::nativeClassName::")
extern class ::className:: extends createjs.easeljs.MovieClip, implements Dynamic{
::field::
}'
	);

	public static function create(
		packageStr:String, className:String, fieldSet:Array<String>,
		namespace:String, nativeClassName:String
	):String{

		var fileLines = template.execute({
			namespace: namespace,
			nativeClassName: nativeClassName,
			packageStr: packageStr,
			className: className,
			field: fieldSet.join("\n")
		});
		return fileLines;
	}
}
