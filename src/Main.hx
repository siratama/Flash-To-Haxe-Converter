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
    public function new(
		flaFileUri:String, flashHaxeUri:String, createJsHaxeUri:String, symbolNameSpace:String, ?initializedOutputDirectory:Bool = false) {

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

		initializeOutputDirectory(flashHaxeUri, createJsHaxeUri, outputtedFlashHaxe, initializedOutputDirectory);

		for(i in 0...itemsLength){

			var item = items[i];
			var itemType = item.itemType;

			if(createFolder(flashHaxeUri, createJsHaxeUri, item, outputtedFlashHaxe)) continue;

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
		Flash.trace("finish");
    }
	private function initializeOutputDirectory(flashHaxeUri:String, createJsHaxeUri:String, outputtedFlashHaxe:Bool, initializedOutputDirectory:Bool){

		if(!initializedOutputDirectory) return;

		if(FLfile.exists(createJsHaxeUri)){

			if(!FLfile.remove(createJsHaxeUri))
				Flash.trace("initialize error:" + createJsHaxeUri);
			else
				FLfile.createFolder(createJsHaxeUri);
		}
		if(outputtedFlashHaxe && FLfile.exists(flashHaxeUri)){

			if(!FLfile.remove(flashHaxeUri))
				Flash.trace("initialize error:" + flashHaxeUri);
			else
				FLfile.createFolder(flashHaxeUri);
		}
	}
	private function createFolder(flashHaxeUri:String, createJsHaxeUri:String, item:Item, outputtedFlashHaxe:Bool):Bool{

		if(item.itemType != "folder") return false;

		var flashHaxeFolderURI = flashHaxeUri + item.name;
		var createJsHaxeFolderURI = createJsHaxeUri + item.name;

		if(outputtedFlashHaxe && !FLfile.exists(flashHaxeFolderURI)){
			if(!FLfile.createFolder(flashHaxeFolderURI))
				Flash.trace("create error: " + flashHaxeFolderURI);
		}

		if(!FLfile.exists(createJsHaxeFolderURI) && !FLfile.createFolder(createJsHaxeFolderURI))
			Flash.trace("create error: " + createJsHaxeFolderURI);

		return true;
	}
	private function getOutputLinesForAs3(itemName:String, itemType:String, packageStr:String, className:String):String{

		var outputLines = "";
		switch(itemType){
			case "movie clip":
				outputLines = tmpl.as3.MovieClip.create(packageStr, className, new Field(itemName, true));
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
				outputLines = tmpl.haxe.MovieClip.create(packageStr, className, new Field(itemName, false), namespace, nativeClassName);
			case "sound":
				outputLines = tmpl.haxe.Sound.create(packageStr, className, nativeClassName);
			case "bitmap":
				outputLines = tmpl.haxe.Bitmap.create(packageStr, className, namespace, nativeClassName);
		}
		return outputLines;
	}
	private function output(baseUri:String, itemName:String, outputLines:String){

		var filePath = baseUri + itemName + ".hx";
		//Flash.trace(filePath);
		FLfile.write(filePath, outputLines);
	}
}

