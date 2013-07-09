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
    private function getMovieClipTemplateStr():String{
        return "";
	}
	private function getTextFieldTemplateStrForInner():String{
		return "";
	}
	private function getMovieClipTemplateStrForInner():String{
		return "";
	}
    private function getMovieClipPath():String{
        return "";
    }

    public function new() {
    }

    public function createInner(baseInnerMovieClip:InnerMovieClip):String{

        var movieClipPropertyLines = getMovieClipPropertyLines(baseInnerMovieClip, true);
        var textFieldPropertyLines = getTextFieldPropertyLines(baseInnerMovieClip, true);

        var classTemplate = new Template(getClassTemplateStr());
        var lines = classTemplate.execute({
            className: baseInnerMovieClip.className,
            field: textFieldPropertyLines + "\n" + movieClipPropertyLines
        });

        return lines + "\n" + getInnerMovieClipLines(baseInnerMovieClip);
    }
    private function getMovieClipPropertyLines(baseInnerMovieClip:InnerMovieClip, inner:Bool = false):String{

		var func = (!inner) ? getMovieClipTemplateStr : getMovieClipTemplateStrForInner;
        var lineSet = new Array<String>();
        for(innerMovieClip in baseInnerMovieClip.innerMovieClipSet){

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
    private function getTextFieldPropertyLines(baseInnerMovieClip:InnerMovieClip, inner:Bool = false):String{

		var func = (!inner) ? getTextFieldTemplateStr : getTextFieldTemplateStrForInner;
        var lineSet = new Array<String>();
        for(textFieldName in baseInnerMovieClip.textFieldNameSet){

            var textFieldTemplate = new Template(func());
            var line = textFieldTemplate.execute({
                propertyName: textFieldName
            });
            lineSet.push(line);
        }
        return lineSet.join("\n");
    }
    private function getInnerMovieClipLines(baseInnerMovieClip:InnerMovieClip):String{

        var lineSet = new Array<String>();
        for(innerMovieClip in baseInnerMovieClip.innerMovieClipSet){

            if(!innerMovieClip.hasInner()) continue;

            var lines = createInner(innerMovieClip);
            lineSet.push(lines);
        }
        return lineSet.join("\n");
    }
}
