package tmpl;
import parser.InnerMovieClip;
import jsfl.Flash;
import haxe.Template;
class MovieClip {

	private function getBaseClassTemplateStr():String{
		return "";
	}
	private function getClassTemplateStr():String{
		return "";
	}
	private function getTextFieldTemplateStr():String{
		return "";
	}
	private function getLinkageClassTemplateStr():String{
		return "";
	}
	private function getMovieClipTemplateStr():String{
		return "";
	}
	private function getMovieClipTemplateStrForInner():String{
		return "";
	}
	private function getMovieClipPath():String{
		return "";
	}

	public function new(){
	}

	public function createInner(baseInnerMovieClip:InnerMovieClip):String{

		var movieClipPropertyLines = getMovieClipPropertyLines(baseInnerMovieClip, true);
		var textFieldPropertyLines = getTextFieldPropertyLines(baseInnerMovieClip);
		var linkageClassPropertyLines = getLinkageClassPropertyLines(baseInnerMovieClip);

		var classTemplate = new Template(getClassTemplateStr());
		var lines = classTemplate.execute({
		className: baseInnerMovieClip.className,
		field: [textFieldPropertyLines, linkageClassPropertyLines, movieClipPropertyLines].join("\n")
		});

		return lines + "\n" + getInnerMovieClipLines(baseInnerMovieClip);
	}

	private function getMovieClipPropertyLines(baseInnerMovieClip:InnerMovieClip, inner:Bool):String{

		var func = (!inner) ? getMovieClipTemplateStr : getMovieClipTemplateStrForInner;
		var lineSet = new Array<String>();
		for(innerMovieClip in baseInnerMovieClip.innerMovieClipSet){

			if(innerMovieClip.linkageClassName != null) continue;

			var className = (innerMovieClip.hasInner()) ? innerMovieClip.className : getMovieClipPath();

			var movieClipTemplate = new Template(func());
			var line = movieClipTemplate.execute({
			propertyName: innerMovieClip.propertyName,
			className: className
			});
			lineSet.push(line);
		}
		return lineSet.join("\n");
	}

	private function getTextFieldPropertyLines(baseInnerMovieClip:InnerMovieClip):String{

		var lineSet = new Array<String>();
		for(textFieldName in baseInnerMovieClip.textFieldNameSet){

			var textFieldTemplate = new Template(getTextFieldTemplateStr());
			var line = textFieldTemplate.execute({
			propertyName: textFieldName
			});
			lineSet.push(line);
		}
		return lineSet.join("\n");
	}

	private function getLinkageClassPropertyLines(baseInnerMovieClip:InnerMovieClip):String{

		var lineSet = new Array<String>();
		for(innerMovieClip in baseInnerMovieClip.innerMovieClipSet){

			if(innerMovieClip.linkageClassName == null) continue;

			var template = new Template(getLinkageClassTemplateStr());
			var line = template.execute({
			propertyName: innerMovieClip.propertyName,
			linkageClassName: innerMovieClip.linkageClassName
			});
			lineSet.push(line);
		}
		return lineSet.join("\n");
	}

	private function getInnerMovieClipLines(baseInnerMovieClip:InnerMovieClip, isOpenFL:Bool = false):String{

		var lineSet = new Array<String>();
		for(innerMovieClip in baseInnerMovieClip.innerMovieClipSet){

			if(!innerMovieClip.hasInner()) continue;
			if(!isOpenFL && innerMovieClip.linkageClassName != null) continue;

			var lines = createInner(innerMovieClip);
			lineSet.push(lines);
		}
		return lineSet.join("\n");
	}
}
