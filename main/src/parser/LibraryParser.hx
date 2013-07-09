package parser;
import parser.InnerMovieClip;
import jsfl.Item;
import jsfl.Flash;
import jsfl.Library;
import jsfl.Layer;
class LibraryParser {

    public var packageDirectoryMap(default, null):Map<String, Bool>;
    public var outputDataSet(default, null):Array<OutputData>;
    private var library:Library;

    public function new() {

        library = Flash.getDocumentDOM().library;
        packageDirectoryMap = new Map();
        outputDataSet = [];
    }
    public function execute() {

        var items:Array<Item> = library.items;
        var itemsLength = items.length;
        for(i in 0...itemsLength){

            var item = items[i];

            var itemName = item.name;
            var itemType = item.itemType;

            if(itemType == "folder") continue;
            if(item.linkageClassName == null) continue;

            var pathNames = itemName.split("/");
            var nativeClassName = pathNames.join("");
            var className = pathNames.pop();
            var packageStr = pathNames.join(".");

            var directory = pathNames.join("/") + "/";
            packageDirectoryMap[directory] = true;

            //
            Flash.trace(":::" + itemName + ":" + className);
			var baseInnerMovieClip:InnerMovieClip = null;
			if(itemType == "movie clip"){

				library.editItem(itemName);
				baseInnerMovieClip = new InnerMovieClip(className, className);
				search(baseInnerMovieClip);
			}
            outputDataSet.push(new OutputData(itemName, itemType, packageStr, className, nativeClassName, baseInnerMovieClip));
        }
    }
    public function search(parentInnerMovieClip:InnerMovieClip){

        var documentDom = Flash.getDocumentDOM();
        var layers:Array<Layer> = documentDom.getTimeline().layers;

        //Flash.trace(parentInnerMovieClip.propertyName);

        for(layer in layers){

            var layerType = layer.layerType;
            if(layerType == "folder") continue;

            if(parentInnerMovieClip.isFrameLengthZero())
                parentInnerMovieClip.setFramesLength(layer.frames.length);

            for(element in layer.frames[0].elements){

                if(element.name == "") continue;

                if(element.elementType != "instance"){
                    parentInnerMovieClip.addTextFieldName(element.name);
                    continue;
                }
                var innerMovieClip = parentInnerMovieClip.create(element.name);

                documentDom.selectNone();
                documentDom.selection = [element];

                documentDom.enterEditMode("inPlace");
                search(innerMovieClip);
            }
        }
        documentDom.exitEditMode();
    }
}

