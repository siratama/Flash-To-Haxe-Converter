package ;
import tmpl.Field;
import haxe.Template;
import jsfl.Layer;
import jsfl.Library;
import jsfl.FLfile;
import jsfl.Item;
import jsfl.Flash;
class Main {

	public static function main(){
	}
    public function new(flaFileUri:String, flashHaxeUri:String, createJsHaxeUri:String, symbolNameSpace:String) {

		Flash.openDocument(flaFileUri);
		Flash.outputPanel.clear();

		var outputtedFlashHaxe = flashHaxeUri != "";

		var library = Flash.getDocumentDOM().library;
		Field.initialize(library);

		var items:Array<Item> = library.getSelectedItems();
		var itemsLength = items.length;

		if(itemsLength == 0){
			Flash.trace("Select item in library.");
			return;
		}

		for(i in 0...itemsLength){

			var item = items[i];
			var itemType = item.itemType;

			if(itemType == "folder"){

				if(outputtedFlashHaxe)
					jsfl.FLfile.createFolder(flashHaxeUri + item.name);

				jsfl.FLfile.createFolder(createJsHaxeUri + item.name);
				continue;
			}

			var pathNames = item.name.split("/");
			var nativeClassName = pathNames.join("");
			var className = pathNames.pop();
			var packageStr = pathNames.join(".");

			if(outputtedFlashHaxe){
				var outputLinesForAs3 = getOutputLinesForAs3(item.name, itemType, packageStr, className);
				output(flashHaxeUri, item.name, outputLinesForAs3);
			}

			var outputLinesForHaxe = getOutputLinesForHaxe(item.name, itemType, packageStr, className, symbolNameSpace, nativeClassName);
			output(createJsHaxeUri, item.name, outputLinesForHaxe);
		}
    }
	private function getOutputLinesForAs3(itemName:String, itemType:String, packageStr:String, className:String):String{

		var outputLines = "";
		switch(itemType){
			case "movie clip":
				outputLines = tmpl.as3.MovieClip.create(packageStr, className, Field.create(itemName, true));
			case "sound":
				outputLines = tmpl.as3.Sound.create(packageStr, className);
			case "bitmap":
				outputLines = tmpl.as3.Bitmap.create(packageStr, className);
		}
		return outputLines;
	}

	private function getOutputLinesForHaxe(itemName:String, itemType:String, packageStr:String, className:String, namespace:String, nativeClassName:String):String{

		var outputLines = "";
		switch(itemType){
			case "movie clip":
				outputLines = tmpl.haxe.MovieClip.create(packageStr, className, Field.create(itemName, false), namespace, nativeClassName);
			case "sound":
				outputLines = tmpl.haxe.Sound.create(packageStr, className);
			case "bitmap":
				outputLines = tmpl.haxe.Bitmap.create(packageStr, className, namespace, nativeClassName);
		}
		return outputLines;
	}
	private function output(baseUri:String, itemName:String, outputLines:String){

		var filePath = baseUri + itemName + ".hx";
		Flash.trace(filePath);
		FLfile.write(filePath, outputLines);
	}
}

