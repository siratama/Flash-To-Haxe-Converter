package jsfl_panel;
import haxe.Unserializer;
import flash.text.TextField;
import flash.events.MouseEvent;
import flash.events.Event;
import flash.display.MovieClip;
import jsfl.Flash;
class Main {

	private var stage:MovieClip;
	private var view:View;
	private var analysisView:AnalysisView;
	private var runningView:RunningView;
	private var flashFileDirectory:String;
	private var mainFunction:Void->Void;

	private static inline var TEXT_KEY_FLASH_EXTERN = "FLASH_EXTERN";
	private static inline var TEXT_KEY_FLASH = "FLASH";
	private static inline var TEXT_KEY_CREATEJS = "CREATEJS";
	private static inline var TEXT_KEY_OPENFL = "OPENFL";
	private static inline var TEXT_KEY_JS_NAMESPACE = "JS";

	private static var LIBRARY_ANALYSIS_PREPARATION_COUNT = 10;
	private var libraryAnalysisPreparationCount = 0;

	public static function main(){
		new Main();
	}
	public function new(){

		view = new View();
		analysisView = new AnalysisView();
		runningView = new RunningView();

		stage = flash.Lib.current;
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

		setDefaultTextCommon(TEXT_KEY_FLASH_EXTERN, view.flashExternOutputPathText);
		setDefaultTextCommon(TEXT_KEY_FLASH, view.flashOutputPathText);
		setDefaultTextCommon(TEXT_KEY_CREATEJS, view.createJsOutputPathText);
		setDefaultTextCommon(TEXT_KEY_OPENFL, view.openflOutputPathText);
		setDefaultTextCommon(TEXT_KEY_JS_NAMESPACE, view.jsSymbolNamespaceText);
	}
	private function setDefaultTextCommon(textKey:String, textField:TextField){

		var text = getDataFromDocument(textKey);
		if(text != "0") textField.text = text;
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
		executeJsflCommand('var main = new Main("$flashFileDirectory", "$flashExternDirectory", "$flashDirectory", "$createJsDirectory", "$openflDirectory", "$jsSymbolNamespace");');

		addDataToDocument(TEXT_KEY_FLASH_EXTERN, flashExternDirectory);
		addDataToDocument(TEXT_KEY_FLASH, flashDirectory);
		addDataToDocument(TEXT_KEY_CREATEJS, createJsDirectory);
		addDataToDocument(TEXT_KEY_OPENFL, openflDirectory);
		addDataToDocument(TEXT_KEY_JS_NAMESPACE, jsSymbolNamespace);

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
	private function addDataToDocument(key:String, data:String){
		executeJsflCommand('document.addDataToDocument("$key", "string", "$data");');
	}
	private function getDataFromDocument(key:String):String{
		return executeJsflCommand('document.getDataFromDocument("$key");');
	}
}
