package tmpl.haxe;
import haxe.Template;
class Bitmap {

	static public var template:Template = new Template(
'package ::packageStr::;
@:native("::namespace::.::nativeClassName::")
extern class ::className:: extends createjs.easeljs.Bitmap{
	public static inline var manifestId:String = "::nativeClassName::";
	public function new():Void;
}'
	);

	public static function create(
		packageStr:String, className:String,
		namespace:String, nativeClassName:String
	):String{

		var fileLines = template.execute({
			namespace: namespace,
			nativeClassName: nativeClassName,
			packageStr: packageStr,
			className: className
		});
		return fileLines;
	}
}
