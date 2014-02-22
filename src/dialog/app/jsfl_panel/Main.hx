package jsfl_panel;
import jsfl.PersistentReturnData;
import jsfl.PersistentDataType;
import PersistentDataKey;
import PersistentDefaultDirectoryData;
import haxe.Unserializer;
import flash.text.TextField;
import flash.events.MouseEvent;
import flash.events.Event;
import flash.display.MovieClip;
import flash.Lib;
class Main {

	private var stage:MovieClip;
	private var view:View;
	private var analysisView:AnalysisView;
	private var runningView:RunningView;
	private var flashFileDirectory:String;
	private var mainFunction:Void->Void;

	private static var LIBRARY_ANALYSIS_PREPARATION_COUNT = 10;
	private var libraryAnalysisPreparationCount = 0;

	public static function main(){
		new Main();
	}
	public function new(){

		view = new View();
		analysisView = new AnalysisView();
		runningView = new RunningView();

		stage = Lib.current;
		stage.addChild(view);

		setFlashFileDirectory();
		setDefaultText();

		view.closeButton.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDownClose);
		view.runButton.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDownRun);
	}
	private function setFlashFileDirectory(){

		var path:String = executeJsflCommand("fl.getDocumentDOM().pathURI;");
		var arr = path.split("/");
		arr.pop();
		flashFileDirectory = arr.join("/") + "/";
	}
	private function setDefaultText(){

		setDefaultTextCommon(PersistentDataKey.FLASH_EXTERN, view.flashExternOutputPathText, PersistentDefaultDirectoryData.FLASH_EXTERN);
		setDefaultTextCommon(PersistentDataKey.FLASH, view.flashOutputPathText, PersistentDefaultDirectoryData.FLASH);
		setDefaultTextCommon(PersistentDataKey.CREATEJS, view.createJsOutputPathText, PersistentDefaultDirectoryData.CREATEJS);
		setDefaultTextCommon(PersistentDataKey.OPENFL, view.openflOutputPathText, PersistentDefaultDirectoryData.OPENFL);
		setDefaultTextCommon(PersistentDataKey.JS_NAMESPACE, view.jsSymbolNamespaceText, PersistentDefaultDirectoryData.JS_NAMESPACE);
	}
	private function setDefaultTextCommon(textKey:PersistentDataKey, textField:TextField, defaultDirectory:PersistentDefaultDirectoryData){

		var text = getDataFromDocument(textKey);
		textField.text = (text != cast PersistentReturnData.NULL) ? text : cast defaultDirectory;
	}
	private function onMouseDownClose(event){
		closeDialog();
	}
	private function onMouseDownRun(event){

		stage.removeChild(view);
		stage.addChild(analysisView);

		view.closeButton.removeEventListener(MouseEvent.MOUSE_DOWN, onMouseDownClose);
		view.runButton.removeEventListener(MouseEvent.MOUSE_DOWN, onMouseDownRun);

		mainFunction = waitToPrepareLibraryAnalysis;
		stage.addEventListener(Event.ENTER_FRAME, run);
	}

	public function run(event:Event){
		mainFunction();
	}

	//一定時間待機しないと描画切り替えが正常に行われない
	private function waitToPrepareLibraryAnalysis(){

		if(++libraryAnalysisPreparationCount > LIBRARY_ANALYSIS_PREPARATION_COUNT)
			mainFunction = initializeToExecute;
	}
	private function initializeToExecute(){

		stage.removeChild(analysisView);
		stage.addChild(runningView);

		var jsflUri = executeJsflCommand("fl.configURI;") + "FlashToHaxeConverter/main.jsfl";
		executeJsflCommand('fl.runScript("$jsflUri");');

		var flashExternDirectory = view.flashExternOutputPathText.text;
		var flashDirectory = view.flashOutputPathText.text;
		var createJsDirectory = view.createJsOutputPathText.text;
		var openflDirectory = view.openflOutputPathText.text;

		var jsSymbolNamespace = view.jsSymbolNamespaceText.text;
		executeJsflCommand('var main = new ${ClassName.FLASH_TO_HAXE_CONVERTER}("$flashFileDirectory", "$flashExternDirectory", "$flashDirectory", "$createJsDirectory", "$openflDirectory", "$jsSymbolNamespace");');

		addDataToDocument(PersistentDataKey.FLASH_EXTERN, flashExternDirectory);
		addDataToDocument(PersistentDataKey.FLASH, flashDirectory);
		addDataToDocument(PersistentDataKey.CREATEJS, createJsDirectory);
		addDataToDocument(PersistentDataKey.OPENFL, openflDirectory);
		addDataToDocument(PersistentDataKey.JS_NAMESPACE, jsSymbolNamespace);

		mainFunction = execute;
	}
	private function execute(){
		executeJsflCommand('main.run();');
		if(Unserializer.run(
			executeJsflCommand('main.isFinished();')
		))
			finish();
	}
	private function finish(){

		stage.removeEventListener(Event.ENTER_FRAME, run);
		closeDialog();
	}

	//
	private function executeJsflCommand(command:String):String{
		return untyped __global__["adobe.utils.MMExecute"](command);
	}
	private function flTrace(text:String){
		executeJsflCommand('fl.trace("$text");');
	}
	private function closeDialog(){
		executeJsflCommand("fl.xmlui.cancel();");
	}
	private function addDataToDocument(key:PersistentDataKey, data:String){

		executeJsflCommand('document.addDataToDocument("$key", "${PersistentDataType.STRING}", "$data");');
	}
	private function getDataFromDocument(key:PersistentDataKey):String{
		return executeJsflCommand('document.getDataFromDocument("$key");');
	}
}
