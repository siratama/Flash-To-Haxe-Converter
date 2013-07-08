package tmpl;
import jsfl.Element;
import jsfl.Library;
import jsfl.Layer;
import jsfl.Flash;
import haxe.Template;
class Field {

	private static var library:Library;
	public static function initialize(library:Library){
		Field.library = library;
	}

	public var isMovieClip(default, null):Bool;
	private var fieldLines:Array<String>;

	public function new(itemName:String){

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

                var line = getLine(element);
				fieldLines.push(line);
			}
		}
	}
    private function getLine(element:Element):String{
        return "";
    }
	public function getLines():String{
		return fieldLines.join("\n");
	}
}
