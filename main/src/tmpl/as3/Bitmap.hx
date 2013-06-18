package tmpl.as3;
import haxe.Template;
class Bitmap {

	static public var template:Template = new Template(
"package ::packageStr::;
extern class ::className:: extends flash.display.BitmapData{
	function new(width:Int = 0, height:Int = 0, transparent:Bool = true, fillColor:UInt = 0xFFFFFFFF):Void;
}"
	);

	public static function create(packageStr:String, className:String):String{

		var fileLines = template.execute({
			packageStr: packageStr,
			className: className
		});
		return fileLines;
	}
}
