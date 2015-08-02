package ;
import DocumentState;
import jsfl.EventType;
import jsfl.FLfile;
import jsfl.Lib;
import jsfl.ItemType;
import haxe.Serializer;
import parser.LibraryParser;
import parser.OutputData;
import haxe.xml.Fast;
import jsfl.Flash;
import tmpl.createjs.Sound;
import tmpl.openfl.Bitmap;
import tmpl.flash.BitmapForExtern;

@:expose("FlashToHaxeConverter")
class FlashToHaxeConverter {

	private static var OUTPUT_LOOP_ONCE = 2;

	private var baseDirectory:String;

	private var flashExternDirectory:String;
	private var flashDirectory:String;
	private var createJsDirectory:String;
	private var openflDirectory:String;
	private var gafDirectory:String;

	private var symbolNameSpace:String;

	private var outputtedFlashExtern:Bool;
	private var outputtedFlash:Bool;
	private var outputtedCreateJs:Bool;
	private var outputtedOpenfl:Bool;
	private var outputtedGAF:Bool;

	private var swfName:String;
	private var libraryParser:LibraryParser;
	private var mainFunction:Void->Void;

	public static function main(){
	}
	public function new(
		baseDirectory:String, flashExternDirectory:String, flashDirectory:String, createJsDirectory:String, openflDirectory:String, gafDirectory:String,
		symbolNameSpace:String = "lib"
	){
		Lib.fl.outputPanel.clear();

		if(isHtml5CanvasDocument()){
			if(openflDirectory != "" || gafDirectory != "")
				Lib.fl.trace("HTML5 canvas document is not supported OpenFL or GAF output.");
			openflDirectory = "";
			gafDirectory = "";
		}

		outputtedFlashExtern = flashExternDirectory != "";
		outputtedFlash = flashDirectory != "";
		outputtedCreateJs = createJsDirectory != "";
		outputtedOpenfl = openflDirectory != "";
		outputtedGAF = gafDirectory != "";

		if(!outputtedFlashExtern && !outputtedFlash && !outputtedCreateJs && !outputtedOpenfl && !outputtedGAF){
			Lib.fl.trace("Set output directory");
			return;
		}

		this.baseDirectory = baseDirectory;
		this.symbolNameSpace = symbolNameSpace;

		this.flashExternDirectory = getOutputDirectory(flashExternDirectory);
		this.flashDirectory = getOutputDirectory(flashDirectory);
		this.createJsDirectory = getOutputDirectory(createJsDirectory);
		this.openflDirectory = getOutputDirectory(openflDirectory);
		this.gafDirectory = getOutputDirectory(gafDirectory);

		parseLibrary();
	}
	private function getOutputDirectory(outputDirectory:String){

		if(outputDirectory.charAt(outputDirectory.length - 1) != "/") outputDirectory += "/";
		return baseDirectory + outputDirectory;
	}

	public function run(){
		mainFunction();
	}

	//
	private function parseLibrary(){

		libraryParser = new LibraryParser();
		libraryParser.execute();

		mainFunction = createOutputDirectory;
	}

	//
	private function createOutputDirectory(){

		createOutputDirectoryCommon(outputtedFlashExtern, flashExternDirectory);
		createOutputDirectoryCommon(outputtedFlash, flashDirectory);
		createOutputDirectoryCommon(outputtedCreateJs, createJsDirectory);
		createOutputDirectoryCommon(outputtedOpenfl, openflDirectory);
		createOutputDirectoryCommon(outputtedGAF, gafDirectory);

		mainFunction = (outputtedOpenfl || outputtedGAF) ? setSwfName: createFolder;
	}
	private function createOutputDirectoryCommon(outputted:Bool, outputDirectory:String){

		if(outputted && !FLfile.exists(outputDirectory)) FLfile.createFolder(outputDirectory);
	}

	//
	private function setSwfName(){

		var profileXML = Xml.parse(Lib.fl.getDocumentDOM().exportPublishProfileString());
		var fastXML = new Fast(profileXML.firstElement());

		/*
		Lib.fl.trace("check");
		Lib.fl.trace(fastXML.node.PublishFormatProperties.node);
		Lib.fl.trace(fastXML.node.PublishFormatProperties.node.hasNode.innerData);
		mainFunction = finish;
		*/

		try{

			var swfPath:String = fastXML.node.PublishFormatProperties.node.flashFileName.innerData;

			//
			// split path
			//
			// test.swf -> test
			// ../sample/test.swf -> test.swf -> test
			// ..\sample\test.swf -> test.swf -> test
			// ..\sample/test.swf -> test.swf -> test
			swfName = swfPath.split("/").slice(-1)[0].split("\\").slice(-1)[0].split(".swf")[0];
		}
		catch(error:String){

			Lib.fl.trace(error);
			Lib.fl.trace("This document is not supported the OpenFL or GAF output.");
			outputtedOpenfl = false;
			outputtedGAF = false;
		}
		mainFunction = createFolder;
	}

	//
	private function createFolder(){

		for(key in libraryParser.packageDirectoryMap.keys()){
			createFolderCommon(outputtedFlashExtern, flashExternDirectory + key);
			createFolderCommon(outputtedFlash, flashDirectory + key);
			createFolderCommon(outputtedCreateJs, createJsDirectory + key);
			createFolderCommon(outputtedOpenfl, openflDirectory + key);
			createFolderCommon(outputtedGAF, gafDirectory + key);

			libraryParser.packageDirectoryMap.remove(key);
			return;
		}

		mainFunction = outputData;
	}
	private function createFolderCommon(outputted:Bool, directoryUri:String){

		if(outputted && !FLfile.exists(directoryUri)){

			if(!FLfile.createFolder(directoryUri))
				Lib.fl.trace("create error: " + directoryUri);
			else
				Lib.fl.trace(directoryUri);
		}
	}

	//
	private function outputData(){

		var outputCount = 0;
		while(libraryParser.outputDataSet.length > 0){

			var outputData = libraryParser.outputDataSet.shift();

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
			if(outputtedGAF){
				var outputLines = getOutputLinesForGAF(outputData);
				output(gafDirectory, outputData.outputPath, outputLines);
			}
			if(++outputCount >= OUTPUT_LOOP_ONCE) return;
		}
		mainFunction = initializeToFinish;
	}
	private function getOutputLinesForFlash(outputData:OutputData, external:Bool):String{

		var outputLines = "";
		switch(outputData.itemType){
			case ItemType.MOVIE_CLIP:
				var templateMovieClip = (external) ? new tmpl.flash.MovieClipForExtern() : new tmpl.flash.MovieClip();
				outputLines = templateMovieClip.create(outputData.baseInnerMovieClip, external, outputData.packageStr);
			case ItemType.SOUND:
				outputLines = tmpl.flash.Sound.create(outputData.packageStr, outputData.className, external);
			case ItemType.BITMAP:
				outputLines = (external) ?
					tmpl.flash.BitmapForExtern.create(outputData.packageStr, outputData.className) :
					tmpl.flash.Bitmap.create(outputData.packageStr, outputData.className);
		}
		return outputLines;
	}
	private function getOutputLinesForCreateJs(outputData:OutputData):String{

		var outputLines = "";
		switch(outputData.itemType){
			case ItemType.MOVIE_CLIP:
				var templateMovieClip = new tmpl.createjs.MovieClip();
				outputLines = templateMovieClip.create(outputData.baseInnerMovieClip, outputData.packageStr, symbolNameSpace, outputData.nativeClassName);
			case ItemType.SOUND:
				outputLines = tmpl.createjs.Sound.create(outputData.packageStr, outputData.className, outputData.nativeClassName);
			case ItemType.BITMAP:
				outputLines = tmpl.createjs.Bitmap.create(outputData.packageStr, outputData.className, symbolNameSpace, outputData.nativeClassName);
		}
		return outputLines;
	}
	private function getOutputLinesForOpenfl(outputData:OutputData):String{

		var outputLines = "";
		switch(outputData.itemType){
			case ItemType.MOVIE_CLIP:
				var templateMovieClip = new tmpl.openfl.MovieClip();
				outputLines = templateMovieClip.create(outputData.baseInnerMovieClip, outputData.packageStr, swfName);
			case ItemType.SOUND:
				outputLines = tmpl.openfl.Sound.create(outputData.packageStr, outputData.className);
			case ItemType.BITMAP:
				outputLines = tmpl.openfl.Bitmap.create(outputData.packageStr, outputData.className, swfName);
		}
		return outputLines;
	}
	private function getOutputLinesForGAF(outputData:OutputData):String{

		var outputLines = "";
		switch(outputData.itemType){
			case ItemType.MOVIE_CLIP:
				var templateMovieClip = new tmpl.gaf.MovieClip();
				outputLines = templateMovieClip.create(outputData.baseInnerMovieClip, outputData.packageStr, swfName);
			case ItemType.SOUND:
				"";
			case ItemType.BITMAP:
				"";
		}
		return outputLines;
	}
	private function output(baseUri:String, itemName:String, outputLines:String){

		var filePath = baseUri + itemName + ".hx";
		FLfile.write(filePath, outputLines);
		Lib.fl.trace(filePath);
	}

	//
	private function initializeToFinish(){

		untyped __js__("delete String.prototype.__class__");
		untyped __js__("delete Array.prototype.__class__");

		Lib.fl.trace("finish");

		mainFunction = finish;
	}
	private function finish(){
	}
	public function isFinished():String{
		return Serializer.run(
			Reflect.compareMethods(mainFunction, finish)
		);
	}

	/*
	 * for Flash CC Extension
	 */
	private static var documentChanged:Bool = false;
	public static function setEventListener(){
	    Lib.fl.addEventListener(EventType.DOCUMENT_CHANGED, onDocumentChanged);
	}
	private static function onDocumentChanged(){
		documentChanged = true;
	}
	public static function removeDocumentChangedEvent():String{
		var n = documentChanged;
		documentChanged = false;
		return Serializer.run(n);
	}
	public static function isOpenedFlashDocument():String{
		return Serializer.run(Lib.fl.getDocumentDOM() != null);
	}
	public static function getDocumentState():String{

	    if(Lib.fl.getDocumentDOM() == null)
			return Serializer.run(DocumentState.CLOSED_DOCUMENT);

		return Serializer.run(
			Lib.fl.getDocumentDOM().pathURI == null ?
				DocumentState.IS_NOT_SAVED_NEW_DOCUMENT : DocumentState.SAVED_DOCUMENT
		);
	}
	public static function getFlashFileDirectory():String{

		var path = Lib.fl.getDocumentDOM().pathURI;
		var arr = path.split("/");
		arr.pop();
		return arr.join("/") + "/";
	}

	public static function isHtml5CanvasDocument():Bool{
		return Lib.fl.getDocumentDOM().exportPublishProfileString().indexOf("JavaScript/HTML") != -1;
	}
}


