package tmpl.flash;
import haxe.Template;
import parser.InnerMovieClip;
class MovieClip extends tmpl.MovieClip{

    override private function getBaseClassTemplateStr():String{
        return (
"package ::packageStr::;
::external::class ::className:: extends flash.display.::superClassName::{
::field::
}");
    }
	override private function getClassTemplateStr():String{
		return (
"typedef ::className:: =
{ > flash.display.MovieClip,
::field::
}");
	}
    override private function getTextFieldTemplateStr():String{
        return "\tpublic var ::propertyName:::flash.text.TextField;";
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
        return "flash.display.MovieClip";
    }

    public function create(baseInnerMovieClip:InnerMovieClip, external:Bool, packageStr:String):String{

        var movieClipPropertyLines = getMovieClipPropertyLines(baseInnerMovieClip);
        var textFieldPropertyLines = getTextFieldPropertyLines(baseInnerMovieClip);

        var baseClassTemplate = new Template(getBaseClassTemplateStr());
        var lines = baseClassTemplate.execute({
            packageStr: packageStr,
            external: (external) ? "extern ": "",
            className: baseInnerMovieClip.className,
            superClassName: baseInnerMovieClip.isMovieClip() ? "MovieClip" : "Sprite",
            field: textFieldPropertyLines + "\n" + movieClipPropertyLines
        });

        return lines + "\n" + getInnerMovieClipLines(baseInnerMovieClip);
    }
}
