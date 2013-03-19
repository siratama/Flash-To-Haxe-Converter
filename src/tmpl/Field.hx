package tmpl;
import jsfl.Library;
import jsfl.Layer;
import jsfl.Flash;
import haxe.Template;
class Field {

	private static var fieldTemplate:Template = new Template(
	"\tvar ::name:: : ::type::;"
	);

	private static var originalPropertyName:Template = new Template(
	'\tpublic static inline var ::name::OriginalPropertyName = "::name::";'
	);

	private static var library:Library;
	public static function initialize(library:Library){
		Field.library = library;
	}

	public static function create(itemName:String, forAs3:Bool){

		var fieldLines:Array<String> = [];

		//Flash.trace(itemName);
		library.editItem(itemName);
		var layers:Array<Layer> = Flash.getDocumentDOM().getTimeline().layers;

		for(layer in layers){
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

				if(!forAs3){
					line = originalPropertyName.execute({ name: element.name });
					fieldLines.push(line);
				}
			}
		}
		return fieldLines;
	}
}
