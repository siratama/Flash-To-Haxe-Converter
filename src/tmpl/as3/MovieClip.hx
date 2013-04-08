package tmpl.as3;
import haxe.Template;
class MovieClip {

	static public var template:Template = new Template(
"package ::packageStr::;
extern class ::className:: extends flash.display.MovieClip{
::field::
}"
	);

    public static function create(packageStr:String, className:String, fieldSet:Array<String>):String{

		var fileLines = template.execute({
			packageStr: packageStr,
			className: className,
			field: fieldSet.join("\n")
		});
		return fileLines;
    }
}
