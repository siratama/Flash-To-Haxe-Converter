package tmpl.as3;
import haxe.Template;
class Sound {

	static public var template:Template = new Template(
"package ::packageStr::;
extern class ::className:: extends flash.media.Sound{
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
