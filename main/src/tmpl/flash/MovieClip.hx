package tmpl.flash;
import haxe.Template;
class MovieClip {

	static public var template:Template = new Template(
"package ::packageStr::;
::external::class ::className:: extends flash.display.::superClassName::{
::field::
}"
	);

    public static function create(packageStr:String, className:String, external:Bool, field:Field):String{

		var fileLines = template.execute({
			packageStr: packageStr,
			className: className,
            external: (external) ? "extern ": "",
			field: field.getLines(),
			superClassName: field.isMovieClip ? "MovieClip": "Sprite"
		});
		return fileLines;
    }
}
