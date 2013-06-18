package jsfl_panel;
import flash.events.MouseEvent;
import flash.events.Event;
import flash.display.MovieClip;
import jsfl.Flash;
class Main {

	private var stage:MovieClip;
	private var view:View;
	private var flashFileDirectory:String;

	public static function main(){
		new Main();
	}
	public function new(){

		stage = flash.Lib.current;
		view = new View();
		stage.addChild(view);

		view.closeButton.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDownClose);
		view.runButton.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDownRun);

		flashFileDirectory = getFlashFileDirectory();
	}
	private function getFlashFileDirectory(){

		var path:String = executeJsflCommand("fl.getDocumentDOM().pathURI;");
		var arr = path.split("/");
		arr.pop();
		return arr.join("/") + "/";
	}
	private function onMouseDownClose(event){
		closeDialog();
	}
	private function onMouseDownRun(event){

		var jsflUri = executeJsflCommand("fl.configURI;") + "Commands/flash_to_haxe/FlashToHaxe.jsfl";
		executeJsflCommand('fl.runScript("$jsflUri");');

		var as3Directory = view.asOutputPathText.text;
		var haxeDirectory = view.hxOutputPathText.text;
		var jsSymbolNamespace = view.jsSymbolNamespaceText.text;
		executeJsflCommand('new Main("$flashFileDirectory", "$as3Directory", "$haxeDirectory", "$jsSymbolNamespace");');
		closeDialog();
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
}
