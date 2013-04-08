package tmpl;
import jsfl.Library;
import jsfl.Layer;
import jsfl.Flash;
import haxe.Template;
class Field {

	private static var fieldTemplate:Template = new Template(
		"\tvar ::name:: : ::type::;"
	);

	private static var library:Library;
	public static function initialize(library:Library){
		Field.library = library;
	}

	private var isMovieClip:Bool;
	private var fieldLines:Array<String>;

	public function new(itemName:String, forAs3:Bool){

		isMovieClip = false;
		fieldLines = [];

		//Flash.trace(itemName);
		library.editItem(itemName);
		var layers:Array<Layer> = Flash.getDocumentDOM().getTimeline().layers;

		for(layer in layers){

			var layerType = layer.layerType;

			if(layerType == "folder") continue;

			if(!isMovieClip && layer.frames.length > 1)
				isMovieClip = true;

			for(element in layer.frames[0].elements){

				if(element.name == "") continue;

				var type =
					(element.elementType == "instance" && forAs3) ? "flash.display.MovieClip" :
					(element.elementType == "text" && forAs3) ?  "flash.text.TextField" :
					(element.elementType == "instance") ? "createjs.easeljs.MovieClip" : "createjs.easeljs.Text";

				var line = fieldTemplate.execute({
					name: element.name,
					type: type
				});
				fieldLines.push(line);
			}
		}
	}
	public function isMovieClipFrame():Bool{
		return isMovieClip;
	}
	public function getLines():String{
		return fieldLines.join("\n");
	}
}
