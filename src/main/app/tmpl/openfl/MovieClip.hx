package tmpl.openfl;
import haxe.Template;
import parser.InnerMovieClip;
class MovieClip extends tmpl.MovieClip {

	override private function getBaseClassTemplateStr():String{
		return (
"package ::packageStr::;
import flash.display.MovieClip;
import flash.text.TextField;
import openfl.Assets;
abstract ::className::(MovieClip){
    public function new()
        this = Assets.getMovieClip('::swfName:::::packageStr::.::className::');
    @:to public function getInstance():MovieClip
        return this;
::field::
}");
	}

	override private function getClassTemplateStr():String{
		return (
"abstract ::className::(MovieClip){
    public function new(mc:MovieClip)
        this = mc;
    @:to public function getInstance():MovieClip
        return this;
::field::
}");
	}

	override private function getTextFieldTemplateStr():String{
		return (
"	public var ::propertyName::(get, never):TextField;
	function get_::propertyName::(){
		return cast(this.getChildByName('::propertyName::'), TextField);
	}
");
	}

	private function getMovieClipTemplateStrNotHasInner():String{
		return (
"	public var ::propertyName::(get, never):::className::;
	function get_::propertyName::(){
		return cast(this.getChildByName('::propertyName::'), ::className::);
	}
");
	}

	private function getMovieClipTemplateStrHasInner():String{
		return (
"	public var ::propertyName::(get, never):::className::;
	function get_::propertyName::(){
		return new ::className::(cast this.getChildByName('::propertyName::'));
	}
");
	}

	override private function getMovieClipPath():String{
		return "flash.display.MovieClip";
	}

	public function create(baseInnerMovieClip:InnerMovieClip, packageStr:String, swfName:String):String{

		var movieClipPropertyLines = getMovieClipPropertyLines(baseInnerMovieClip, false);
		var textFieldPropertyLines = getTextFieldPropertyLines(baseInnerMovieClip);
		var linkageClassPropertyLines = getLinkageClassPropertyLines(baseInnerMovieClip);

		var baseClassTemplate = new Template(getBaseClassTemplateStr());
		var lines = baseClassTemplate.execute({
			packageStr: packageStr,
			className: baseInnerMovieClip.className,
			swfName: swfName,
			field: [textFieldPropertyLines, linkageClassPropertyLines, movieClipPropertyLines].join("\n")
		});

		return lines + "\n" + getInnerMovieClipLines(baseInnerMovieClip, true);
	}

	override private function getMovieClipPropertyLines(baseInnerMovieClip:InnerMovieClip, inner:Bool):String{

		var lineSet = new Array<String>();
		for(innerMovieClip in baseInnerMovieClip.innerMovieClipSet){

			var className = (innerMovieClip.hasInner()) ? innerMovieClip.className : getMovieClipPath();
			var func = (innerMovieClip.hasInner()) ? getMovieClipTemplateStrHasInner : getMovieClipTemplateStrNotHasInner;

			var movieClipTemplate = new Template(func());
			var line = movieClipTemplate.execute({
				propertyName: innerMovieClip.propertyName,
				className: className
			});
			lineSet.push(line);
		}
		return lineSet.join("\n");
	}
	override private function getLinkageClassPropertyLines(baseInnerMovieClip:InnerMovieClip):String{
		return "";
	}

}
