package parser;
import jsfl.DocumentEnterEditMode;
import jsfl.Lib;
import jsfl.ElementType;
import jsfl.LayerType;
import jsfl.ItemType;
import jsfl.Document;
import jsfl.Instance;
import parser.InnerMovieClip;
import jsfl.Item;
import jsfl.Flash;
import jsfl.Library;
import jsfl.Layer;
class LibraryParser {

	public var packageDirectoryMap(default, null):Map<String, Bool>;
	public var outputDataSet(default, null):Array<OutputData>;
	private var library:Library;

	public function new(){

		library = Lib.fl.getDocumentDOM().library;
		packageDirectoryMap = new Map();
		outputDataSet = [];
	}

	public function execute(){

		var items:Array<Item> = library.items;
		var itemsLength = items.length;
		for(i in 0...itemsLength){

			var item = items[i];

			var itemName = item.name;
			var itemType = item.itemType;

			if(itemType == ItemType.FOLDER) continue;
			if(item.linkageClassName == null) continue;

			var pathNames = item.linkageClassName.split(".");
			var outputPath = pathNames.join("/");
			var nativeClassName = pathNames.join("");
			var className = pathNames.pop();
			var packageStr = pathNames.join(".");

			var directory = pathNames.join("/") + "/";
			packageDirectoryMap[directory] = true;

			//
			//Flash.trace(":::" + itemName + ":" + className);
			var baseInnerMovieClip:InnerMovieClip = null;
			if(itemType == ItemType.MOVIE_CLIP){

				library.editItem(itemName);
				baseInnerMovieClip = new InnerMovieClip(className, className, item.linkageClassName);
				search(baseInnerMovieClip);
			}
			outputDataSet.push(new OutputData(outputPath, itemType, packageStr, className, nativeClassName, baseInnerMovieClip));
		}
	}

	public function search(parentInnerMovieClip:InnerMovieClip){

		var documentDom = Lib.fl.getDocumentDOM();
		var layers:Array<Layer> = documentDom.getTimeline().layers;

		//Flash.trace(parentInnerMovieClip.propertyName);
		for(layer in layers){

			var layerType = layer.layerType;
			if(layerType == LayerType.FOLDER) continue;
			if(layerType == LayerType.GUIDE) continue;

			var layerLocked = layer.locked;
			if(layerLocked) layer.locked = false;

			var layerVisible = layer.visible;
			if(!layerVisible) layer.visible = true;

			if(parentInnerMovieClip.isFrameLengthZero())
				parentInnerMovieClip.setFramesLength(layer.frames.length);

			for(element in layer.frames[0].elements){

				if(element.name == "") continue;

				if(element.elementType != ElementType.INSTANCE){

					parentInnerMovieClip.addTextFieldName(element.name);
					continue;
				}

				var linkageClassName:String = cast(element, Instance).libraryItem.linkageClassName;
				var innerMovieClip = parentInnerMovieClip.create(element.name, linkageClassName);

				documentDom.selectNone();
				documentDom.selection = [element];

				documentDom.enterEditMode(DocumentEnterEditMode.IN_PLACE);
				search(innerMovieClip);
			}

			if(layerLocked) layer.locked = true;
			if(!layerVisible) layer.visible = false;
		}
		documentDom.exitEditMode();
	}
}

