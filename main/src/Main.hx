package;
import parser.LibraryParser;
import parser.OutputData;
import haxe.xml.Fast;
import haxe.Template;
import jsfl.Layer;
import jsfl.Library;
import jsfl.FLfile;
import jsfl.Item;
import jsfl.Flash;

@:expose("Main")
class Main {

	private var baseDirectory:String;

	private var flashExternDirectory:String;
	private var flashDirectory:String;
	private var createJsDirectory:String;
	private var openflDirectory:String;

	private var symbolNameSpace:String;

	private var outputtedFlashExtern:Bool;
	private var outputtedFlash:Bool;
	private var outputtedCreateJs:Bool;
	private var outputtedOpenfl:Bool;

	private var swfName:String;
	private var libraryParser:LibraryParser;

	public static function main(){
	}

	public function new(
		baseDirectory:String, flashExternDirectory:String, flashDirectory:String, createJsDirectory:String, openflDirectory:String,
		symbolNameSpace:String = "lib"
	){

		Flash.outputPanel.clear();

		this.outputtedFlashExtern = flashExternDirectory != "";
		this.outputtedFlash = flashDirectory != "";
		this.outputtedCreateJs = createJsDirectory != "";
		this.outputtedOpenfl = openflDirectory != "";

		if(!outputtedFlashExtern && !outputtedFlash && !outputtedCreateJs && !outputtedOpenfl){
			Flash.trace("Set output directory");
			return;
		}

		this.baseDirectory = baseDirectory;
		this.symbolNameSpace = symbolNameSpace;

		this.flashExternDirectory = getOutputDirectory(flashExternDirectory);
		this.flashDirectory = getOutputDirectory(flashDirectory);
		this.createJsDirectory = getOutputDirectory(createJsDirectory);
		this.openflDirectory = getOutputDirectory(openflDirectory);

		libraryParser = new LibraryParser();
		libraryParser.execute();

		createOutputDirectory();
		setSwfName();
		createFolder();
		outputData();

		untyped __js__("delete String.prototype.__class__");
		untyped __js__("delete Array.prototype.__class__");

		Flash.trace("finish");
	}
	private function getOutputDirectory(outputDirectory:String){

		if(outputDirectory.charAt(outputDirectory.length - 1) != "/") outputDirectory += "/";
		return baseDirectory + outputDirectory;
	}
	private function createOutputDirectory(){

		createOutputDirectoryCommon(outputtedFlashExtern, flashExternDirectory);
		createOutputDirectoryCommon(outputtedFlash, flashDirectory);
		createOutputDirectoryCommon(outputtedCreateJs, createJsDirectory);
		createOutputDirectoryCommon(outputtedOpenfl, openflDirectory);
	}
	private function createOutputDirectoryCommon(outputted:Bool, outputDirectory:String){

		if(outputted && !FLfile.exists(outputDirectory)) FLfile.createFolder(outputDirectory);
	}
	private function setSwfName(){

		var profileXML = Xml.parse(Flash.getDocumentDOM().exportPublishProfileString());
		var fastXML = new Fast(profileXML.firstElement());
		swfName = fastXML.node.PublishFormatProperties.node.flashFileName.innerData.split(".")[0];
	}

	//
	private function createFolder(){

		for(key in libraryParser.packageDirectoryMap.keys()){
			createFolderCommon(outputtedFlashExtern, flashExternDirectory + key);
			createFolderCommon(outputtedFlash, flashDirectory + key);
			createFolderCommon(outputtedCreateJs, createJsDirectory + key);
			createFolderCommon(outputtedOpenfl, openflDirectory + key);
		}
	}
	private function createFolderCommon(outputted:Bool, directoryUri:String){

		if(outputted && !FLfile.exists(directoryUri)){

			if(!FLfile.createFolder(directoryUri))
				Flash.trace("create error: " + directoryUri);
			else
				Flash.trace(directoryUri);
		}
	}

	//
	private function outputData(){

		for(outputData in libraryParser.outputDataSet){

			if(outputtedFlashExtern){
				var outputLines = getOutputLinesForFlash(outputData, true);
				output(flashExternDirectory, outputData.outputPath, outputLines);
			}
			if(outputtedFlash){
				var outputLines = getOutputLinesForFlash(outputData, false);
				output(flashDirectory, outputData.outputPath, outputLines);
			}
			if(outputtedCreateJs){
				var outputLines = getOutputLinesForCreateJs(outputData);
				output(createJsDirectory, outputData.outputPath, outputLines);
			}
			if(outputtedOpenfl){
				var outputLines = getOutputLinesForOpenfl(outputData);
				output(openflDirectory, outputData.outputPath, outputLines);
			}
		}
	}
	private function getOutputLinesForFlash(outputData:OutputData, external:Bool):String{

		var outputLines = "";
		switch(outputData.itemType){
			case "movie clip":
				var templateMovieClip = (external) ? new tmpl.flash.MovieClipForExtern() : new tmpl.flash.MovieClip();
				outputLines = templateMovieClip.create(outputData.baseInnerMovieClip, external, outputData.packageStr);
			case "sound":
				outputLines = tmpl.flash.Sound.create(outputData.packageStr, outputData.className, external);
			case "bitmap":
				outputLines = (external) ?
				tmpl.flash.BitmapForExtern.create(outputData.packageStr, outputData.className) :
				tmpl.flash.Bitmap.create(outputData.packageStr, outputData.className);
		}
		return outputLines;
	}
	private function getOutputLinesForCreateJs(outputData:OutputData):String{

		var outputLines = "";
		switch(outputData.itemType){
			case "movie clip":
				var templateMovieClip = new tmpl.createjs.MovieClip();
				outputLines = templateMovieClip.create(outputData.baseInnerMovieClip, outputData.packageStr, symbolNameSpace, outputData.nativeClassName);
			case "sound":
				outputLines = tmpl.createjs.Sound.create(outputData.packageStr, outputData.className, outputData.nativeClassName);
			case "bitmap":
				outputLines = tmpl.createjs.Bitmap.create(outputData.packageStr, outputData.className, symbolNameSpace, outputData.nativeClassName);
		}
		return outputLines;
	}
	private function getOutputLinesForOpenfl(outputData:OutputData):String{

		var outputLines = "";
		switch(outputData.itemType){
			case "movie clip":
				var templateMovieClip = new tmpl.openfl.MovieClip();
				outputLines = templateMovieClip.create(outputData.baseInnerMovieClip, outputData.packageStr, swfName);
			case "sound":
				outputLines = tmpl.openfl.Sound.create(outputData.packageStr, outputData.className);
			case "bitmap":
				outputLines = tmpl.openfl.Bitmap.create(outputData.packageStr, outputData.className, swfName);
		}
		return outputLines;
	}
	private function output(baseUri:String, itemName:String, outputLines:String){

		var filePath = baseUri + itemName + ".hx";
		FLfile.write(filePath, outputLines);
		Flash.trace(filePath);
	}
}

