package tmpl.createjs;
import haxe.Template;
import parser.InnerMovieClip;
class MovieClip extends tmpl.MovieClip {

	override private function getBaseClassTemplateStr():String{
		return (
'package ::packageStr::;
@:native("::namespace::.::nativeClassName::")
extern class ::className:: extends createjs.easeljs.::superClassName::{
	public var nominalBounds:createjs.easeljs.Rectangle;
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
		return "createjs.easeljs.MovieClip";
	}

	public function create(
		baseInnerMovieClip:InnerMovieClip, packageStr:String,
		namespace:String, nativeClassName:String
	):String{

		var movieClipPropertyLines = getMovieClipPropertyLines(baseInnerMovieClip, false);
		var textFieldPropertyLines = getTextFieldPropertyLines(baseInnerMovieClip);
		var linkageClassPropertyLines = getLinkageClassPropertyLines(baseInnerMovieClip);

		var baseClassTemplate = new Template(getBaseClassTemplateStr());
		var lines = baseClassTemplate.execute({
			namespace: namespace,
			nativeClassName: nativeClassName,
			packageStr: packageStr,
			className: baseInnerMovieClip.className,
			superClassName: baseInnerMovieClip.isMovieClip() ? "MovieClip" : "Container",
			field: [textFieldPropertyLines, linkageClassPropertyLines, movieClipPropertyLines].join("\n")
		});

		return lines + "\n" + getInnerMovieClipLines(baseInnerMovieClip);
	}
}
