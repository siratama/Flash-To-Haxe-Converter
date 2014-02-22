package tmpl.openfl;
import haxe.Template;
class Sound {

	static public var template:Template = new Template(
"package ::packageStr::;
import flash.media.Sound;
import openfl.Assets;
abstract ::className::(Sound){
    public function new()
        this = Assets.getSound('::packageStr::.::className::');
    @:to public function getInstance():Sound
        return this;
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
