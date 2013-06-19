package jsfl_panel;
import flash.events.MouseEvent;
import flash.events.Event;
import flash.display.MovieClip;
import jsfl.Flash;
class Main {

	private var stage:MovieClip;
	private var view:View;
	private var flashFileDirectory:String;

	private static inline var AS3_TEXT_KEY = "AS3";
	private static inline var HAXE_TEXT_KEY = "HAXE";
	private static inline var JS_NAMESPACE_TEXT_KEY = "JS";

	public static function main(){
		new Main();
	}
	public function new(){

		stage = flash.Lib.current;
		view = new View();
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
		flashFileDirectory =  arr.join("/") + "/";
	}
	private function setDefaultText(){

		var recordedAs3Text = getDataFromDocument(AS3_TEXT_KEY);
		if(recordedAs3Text != "0") view.asOutputPathText.text = recordedAs3Text;

		var recordedHaxeText = getDataFromDocument(HAXE_TEXT_KEY);
		if(recordedHaxeText != "0") view.hxOutputPathText.text = recordedHaxeText;

		var recordedJsNamespaceText = getDataFromDocument(JS_NAMESPACE_TEXT_KEY);
		if(recordedJsNamespaceText != "0") view.jsSymbolNamespaceText.text = recordedJsNamespaceText;
	}
	private function onMouseDownClose(event){
		closeDialog();
	}
	private function onMouseDownRun(event){

		var jsflUri = executeJsflCommand("fl.configURI;") + "FlashToHaxeConverter/main.jsfl";
		executeJsflCommand('fl.runScript("$jsflUri");');

		var as3Directory = view.asOutputPathText.text;
		var haxeDirectory = view.hxOutputPathText.text;
		var jsSymbolNamespace = view.jsSymbolNamespaceText.text;
		executeJsflCommand('new Main("$flashFileDirectory", "$as3Directory", "$haxeDirectory", "$jsSymbolNamespace");');
		closeDialog();

		addDataToDocument(AS3_TEXT_KEY, as3Directory);
		addDataToDocument(HAXE_TEXT_KEY, haxeDirectory);
		addDataToDocument(JS_NAMESPACE_TEXT_KEY, jsSymbolNamespace);
	}
	private function executeJsflCommand(command:String):Dynamic{

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
