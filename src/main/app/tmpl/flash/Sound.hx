package tmpl.flash;
import haxe.Template;
class Sound {

	static public var template:Template = new Template(
"package ::packageStr::;
::external::class ::className:: extends flash.media.Sound{
}"
	);

	public static function create(packageStr:String, className:String, external:Bool):String{

		var fileLines = template.execute({
			packageStr: packageStr,
			className: className,
			external: (external) ? "extern " : ""
		});
		return fileLines;
	}
}
