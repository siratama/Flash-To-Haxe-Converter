package tmpl.flash;
import haxe.Template;
import parser.InnerMovieClip;
class MovieClip extends tmpl.MovieClip {

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
{ > MovieClipType,
::field::
}");
	}

	override private function getTextFieldTemplateStr():String{
		return "\tpublic var ::propertyName:::flash.text.TextField;";
	}

	override private function getLinkageClassTemplateStr():String{
		return "\tpublic var ::propertyName:::::linkageClassName::;";
	}

	override private function getMovieClipTemplateStr():String{
		return "\tpublic var ::propertyName:::::className::;";
	}

	override private function getMovieClipTemplateStrForInner():String{
		return getMovieClipTemplateStr();
	}

	override private function getMovieClipPath():String{
		return "flash.display.MovieClip";
	}

	public function create(baseInnerMovieClip:InnerMovieClip, external:Bool, packageStr:String):String{

		var movieClipPropertyLines = getMovieClipPropertyLines(baseInnerMovieClip, false);
		var textFieldPropertyLines = getTextFieldPropertyLines(baseInnerMovieClip);
		var linkageClassPropertyLines = getLinkageClassPropertyLines(baseInnerMovieClip);

		var baseClassTemplate = new Template(getBaseClassTemplateStr());
		var lines = baseClassTemplate.execute({
			packageStr: packageStr,
			external: (external) ? "extern " : "",
			className: baseInnerMovieClip.className,
			superClassName: baseInnerMovieClip.isMovieClip() ? "MovieClip" : "Sprite",
			field: [textFieldPropertyLines, linkageClassPropertyLines, movieClipPropertyLines].join("\n")
		});

		return lines + "\n" + getInnerMovieClipLines(baseInnerMovieClip);
	}
}
