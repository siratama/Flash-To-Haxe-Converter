package tmpl.createjs;
import haxe.Template;
import parser.InnerMovieClip;
class MovieClip extends tmpl.MovieClip{

    override private function getBaseClassTemplateStr():String{
        return (
'package ::packageStr::;
@:native("::namespace::.::nativeClassName::")
extern class ::className:: extends createjs.easeljs.::superClassName::{
	public var nominalBounds:createjs.easeljs.Rectangle;
	public var frameBounds:Array<createjs.easeljs.Rectangle>;
::field::
}');
    }
    override private function getClassTemplateStr():String{
        return (
"extern class ::className:: extends createjs.easeljs.MovieClip{
::field::
}");
    }
    override private function getTextFieldTemplateStr():String{
        return "\tpublic var ::propertyName:::createjs.easeljs.Text;";
    }
    override private function getMovieClipTemplateStr():String{
        return "\tpublic var ::propertyName:::::className::;";
    }
	override private function getTextFieldTemplateStrForInner():String{
		return getTextFieldTemplateStr();
	}
	override private function getMovieClipTemplateStrForInner():String{
		return getMovieClipTemplateStr();
	}
    override private function getMovieClipPath():String{
        return "createjs.easeljs.MovieClip";
    }

    public function create(
        baseInnerMovieClip:InnerMovieClip, packageStr:String,
        namespace:String, nativeClassName:String
    ):String{

        var movieClipPropertyLines = getMovieClipPropertyLines(baseInnerMovieClip);
        var textFieldPropertyLines = getTextFieldPropertyLines(baseInnerMovieClip);

        var baseClassTemplate = new Template(getBaseClassTemplateStr());
        var lines = baseClassTemplate.execute({
            namespace: namespace,
            nativeClassName: nativeClassName,
            packageStr: packageStr,
            className: baseInnerMovieClip.className,
            superClassName: baseInnerMovieClip.isMovieClip() ? "MovieClip" : "Container",
            field: textFieldPropertyLines + "\n" + movieClipPropertyLines
        });

        return lines + "\n" + getInnerMovieClipLines(baseInnerMovieClip);
    }
}
