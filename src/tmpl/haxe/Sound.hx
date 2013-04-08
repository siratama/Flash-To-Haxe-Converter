package tmpl.haxe;
import haxe.Template;
class Sound {

	static public var template:Template = new Template(
'package ::packageStr::;
extern class ::className::{
	public static inline var id:String = "::nativeClassName::";
}'
	);

	public static function create(packageStr:String, className:String, nativeClassName:String):String{

		var fileLines = template.execute({
			packageStr: packageStr,
			className: className,
			nativeClassName: nativeClassName
		});
		return fileLines;
	}
}
