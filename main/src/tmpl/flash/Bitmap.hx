package tmpl.flash;
import haxe.Template;
class Bitmap {

	static public var template:Template = new Template(
"package ::packageStr::;
::external::class ::className:: extends flash.display.BitmapData{
	function new(width:Int = 0, height:Int = 0, transparent:Bool = true, fillColor:UInt = 0xFFFFFFFF):Void;
}"
	);

	public static function create(packageStr:String, className:String, external:Bool):String{

		var fileLines = template.execute({
			packageStr: packageStr,
			className: className,
            external: (external) ? "extern ": ""
		});
		return fileLines;
	}
}
