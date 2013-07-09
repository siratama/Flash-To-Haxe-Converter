package tmpl.openfl;
import haxe.Template;
import parser.InnerMovieClip;
class MovieClip extends tmpl.MovieClip{

    override private function getBaseClassTemplateStr():String{
        return (
"package ::packageStr::;
import flash.display.MovieClip;
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
		return "
	public var ::propertyName::(get, never):flash.text.TextField;
	function get_::propertyName::(){
		return cast(this.getChildByName('::propertyName::'), flash.text.TextField);
	}
";
    }
/*
	override private function getMovieClipTemplateStr():String{
		return "
	public var ::propertyName::(get, never):::className::;
	function get_::propertyName::(){
		return cast(this.getChildByName('::propertyName::'), ::className::);
	}
";
	}
*/

	private function getMovieClipTemplateStrNotHasInner():String{
		return "
	public var ::propertyName::(get, never):::className::;
	function get_::propertyName::(){
		return cast(this.getChildByName('::propertyName::'), ::className::);
	}
";
	}
    private function getMovieClipTemplateStrHasInner():String{
        return "
	public var ::propertyName::(get, never):::className::;
	function get_::propertyName::(){
		return new ::className::(cast this.getChildByName('::propertyName::'));
	}
";
    }
    override private function getMovieClipPath():String{
        return "flash.display.MovieClip";
    }

	override private function getTextFieldTemplateStrForInner():String{
		//return "\tpublic var ::propertyName:::flash.text.TextField;";
		return getTextFieldTemplateStr();
	}
	/*
	override private function getMovieClipTemplateStrForInner():String{
		return "\tpublic var ::propertyName:::::className::;";
	}
	*/

    public function create(baseInnerMovieClip:InnerMovieClip, packageStr:String, swfName:String):String{

        var movieClipPropertyLines = getMovieClipPropertyLines(baseInnerMovieClip);
        var textFieldPropertyLines = getTextFieldPropertyLines(baseInnerMovieClip);

        var baseClassTemplate = new Template(getBaseClassTemplateStr());
        var lines = baseClassTemplate.execute({
            packageStr: packageStr,
            className: baseInnerMovieClip.className,
            swfName: swfName,
            field: textFieldPropertyLines + "\n" + movieClipPropertyLines
        });

        return lines + "\n" + getInnerMovieClipLines(baseInnerMovieClip);
    }
	override private function getMovieClipPropertyLines(baseInnerMovieClip:InnerMovieClip, inner:Bool = false):String{

		//var func = (!inner) ? getMovieClipTemplateStr : getMovieClipTemplateStrForInner;
		var lineSet = new Array<String>();
		for(innerMovieClip in baseInnerMovieClip.innerMovieClipSet){

			var className = (innerMovieClip.hasInner()) ? innerMovieClip.className : getMovieClipPath();
			var func = (innerMovieClip.hasInner()) ? getMovieClipTemplateStrHasInner: getMovieClipTemplateStrNotHasInner;

			var movieClipTemplate = new Template(func());
			var line = movieClipTemplate.execute({
				propertyName: innerMovieClip.propertyName,
				className: className
			});
			lineSet.push(line);
		}
		return lineSet.join("\n");
	}
}
