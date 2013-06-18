package;
import tmpl.Field;
import haxe.Template;
import jsfl.Layer;
import jsfl.Library;
import jsfl.FLfile;
import jsfl.Item;
import jsfl.Flash;
class Main {

	private var baseDirectory:String;
	private var as3Directory:String;
	private var haxeDirectory:String;
	private var symbolNameSpace:String;
	private var outputtedAs3:Bool;
	private var outputtedHaxe:Bool;
	private var packageDirectoryMap:Map<String, Bool>;
	private var outputDataSet:Array<OutputData>;

	public static function main(){
	}
    public function new(
		baseDirectory:String, as3Directory:String, haxeDirectory:String, symbolNameSpace:String = "lib") {

		Flash.outputPanel.clear();

		this.outputtedAs3 = as3Directory != "";
		this.outputtedHaxe = haxeDirectory != "";

		if(!outputtedAs3 && !outputtedHaxe){
			Flash.trace("Set output directory of as or hx.");
			return;
		}

		this.baseDirectory = baseDirectory;
		this.symbolNameSpace = symbolNameSpace;

		if(as3Directory.charAt(as3Directory.length -1) != "/") as3Directory += "/";
		if(haxeDirectory.charAt(haxeDirectory.length -1) != "/") haxeDirectory+= "/";
		this.as3Directory = this.baseDirectory + as3Directory;
		this.haxeDirectory = this.baseDirectory + haxeDirectory;

		packageDirectoryMap = new Map();
		outputDataSet = [];

		initializeOutputDirectory();
		parseLibraryItem();
		createFolder();
		outputData();

		Flash.trace("finish");
    }
	private function initializeOutputDirectory(){

		if(outputtedAs3 && !FLfile.exists(as3Directory))
			FLfile.createFolder(as3Directory);

		if(outputtedHaxe && !FLfile.exists(haxeDirectory))
			FLfile.createFolder(haxeDirectory);
	}
	private function parseLibraryItem(){

		var library = Flash.getDocumentDOM().library;
		Field.initialize(library);
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

			outputDataSet.push(new OutputData(itemName, itemType, packageStr, className, nativeClassName));
		}
	}
	private function createFolder(){

	    for(key in packageDirectoryMap.keys()){

			var as3DirectoryURI = as3Directory + key;
			var haxeDirectoryURI = haxeDirectory + key;

			if(outputtedAs3 && !FLfile.exists(as3DirectoryURI)){

				if(!FLfile.createFolder(as3DirectoryURI))
					Flash.trace("create error: " + as3DirectoryURI);
				else
					Flash.trace(as3DirectoryURI);
			}
			if(outputtedHaxe && !FLfile.exists(haxeDirectoryURI)){
				if(!FLfile.createFolder(haxeDirectoryURI))
					Flash.trace("create error: " + haxeDirectoryURI);
				else
					Flash.trace(haxeDirectoryURI);
			}
		}
	}

	private function outputData(){

		for(outputData in outputDataSet){

			if(outputtedAs3){
				var outputLinesForAs3 = getOutputLinesForAs3(outputData);
				output(as3Directory, outputData.itemName, outputLinesForAs3);
			}
			if(outputtedHaxe){
				var outputLinesForHaxe = getOutputLinesForHaxe(outputData);
				output(haxeDirectory, outputData.itemName, outputLinesForHaxe);
			}
		}
	}
	private function getOutputLinesForAs3(outputData:OutputData):String{

		var outputLines = "";
		switch(outputData.itemType){
			case "movie clip":
				outputLines = tmpl.as3.MovieClip.create(outputData.packageStr, outputData.className, new Field(outputData.itemName, true));
			case "sound":
				outputLines = tmpl.as3.Sound.create(outputData.packageStr, outputData.className);
			case "bitmap":
				outputLines = tmpl.as3.Bitmap.create(outputData.packageStr, outputData.className);
		}
		return outputLines;
	}
	private function getOutputLinesForHaxe(outputData:OutputData):String{

		var outputLines = "";
		switch(outputData.itemType){
			case "movie clip":
				outputLines = tmpl.haxe.MovieClip.create(outputData.packageStr, outputData.className, new Field(outputData.itemName, false), symbolNameSpace, outputData.nativeClassName);
			case "sound":
				outputLines = tmpl.haxe.Sound.create(outputData.packageStr, outputData.className, outputData.nativeClassName);
			case "bitmap":
				outputLines = tmpl.haxe.Bitmap.create(outputData.packageStr, outputData.className, symbolNameSpace, outputData.nativeClassName);
		}
		return outputLines;
	}
	private function output(baseUri:String, itemName:String, outputLines:String){

		var filePath = baseUri + itemName + ".hx";
		FLfile.write(filePath, outputLines);
		Flash.trace(filePath);
	}
}

