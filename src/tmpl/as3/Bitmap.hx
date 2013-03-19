package tmpl.as3;
import haxe.Template;
class Bitmap {

	static public var template:Template = new Template([
	"package ::packageStr::;",
	"extern class ::className:: extends flash.display.BitmapData, implements Dynamic{",
	"}"
	].join("\n"));

	public static function create(packageStr:String, className:String):String{

		var fileLines = template.execute({
			packageStr: packageStr,
			className: className
		});
		return fileLines;
	}
}
