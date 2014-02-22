package tmpl.openfl;
import haxe.Template;
class Bitmap {

	static public var template:Template = new Template(
"package ::packageStr::;
import flash.display.BitmapData;
import openfl.Assets;
abstract ::className:: (BitmapData){
	function new()
        this = Assets.getBitmap('::swfName:::::packageStr::.::className::');
    @:to public function getInstance():BitmapData
        return this;
}"
	);

	public static function create(packageStr:String, className:String, swfName:String):String{

		var fileLines = template.execute({
			packageStr: packageStr,
			className: className,
			swfName: swfName
		});
		return fileLines;
	}
}
