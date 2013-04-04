package tmpl.haxe;
import haxe.Template;
class Sound {

	static public var template:Template = new Template(
"package ::packageStr::;
extern class ::className::, implements Dynamic{
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
