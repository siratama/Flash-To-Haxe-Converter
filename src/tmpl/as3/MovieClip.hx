package tmpl.as3;
import haxe.Template;
class MovieClip {

	static public var template:Template = new Template(
"package ::packageStr::;
extern class ::className:: extends flash.display.::superClassName::{
::field::
}"
	);

    public static function create(packageStr:String, className:String, field:Field):String{

		var fileLines = template.execute({
			packageStr: packageStr,
			className: className,
			field: field.getLines(),
			superClassName: field.isMovieClipFrame() ? "MovieClip": "Sprite"
		});
		return fileLines;
    }
}
