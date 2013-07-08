package tmpl.openfl;
import haxe.Template;
class MovieClip {

	static public var template:Template = new Template(
"package ::packageStr::;
import flash.display.MovieClip;
import openfl.Assets;
abstract ::className::(MovieClip){
    public function new()
        this = Assets.getMovieClip('::swfName:::::packageStr::.::className::');
    @:to public function getInstance():MovieClip
        return this;
::field::
}"
	);

    public static function create(packageStr:String, className:String, swfName:String, field:Field):String{

		var fileLines = template.execute({
			packageStr: packageStr,
			className: className,
            swfName: swfName,
			field: field.getLines()
		});
		return fileLines;
    }
}
