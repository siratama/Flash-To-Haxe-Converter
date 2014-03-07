package ;
import haxe.Unserializer;
import haxe.Timer;
import flash_extension.csinterface.CSInterfaceUtil;
import jQuery.JQuery;
import js.Browser;
import DocumentState;
class Main {

	private static var csInterfaceUtil:CSInterfaceUtil;
	public var mainFunction:Void->Void;
	private var timer:Timer;
	private static inline var TIMER_SPEED_DEFAULT = 250;
	private static inline var TIMER_SPEED_RUNNING = 50;

	private var inputTextSet:InputTextSet;
	private var haxeElement:JQuery;
	private var optionElement:JQuery;
	private var runButtonElement:JQuery;
	private var runButtonMessageElement:JQuery;
	private var runButtonClicked:Bool;
	private static inline var SLIDE_SPEED = "fast";

	private var savedFlashExternDocumentData:String;
	private var savedFlashDocumentData:String;
	private var savedCreateJSDocumentData:String;
	private var savedOpenFLJSDocumentData:String;
	private var savedJSNamespaceDocumentData:String;

	private var flashFileDirectory:String;
	private var documentChanged:Bool = false;
	private var documentOpened:Bool = false;
	private var documentSaved:Bool = false;
	private var runFinished:Bool = false;

	private static inline var INSTANCE_NAME = "main";
	private static inline var DISABLED = "disabled";
	private static inline var BUTTON_RUN_TEXT = "RUN";
	private static inline var BUTTON_RUNNING_TEXT = "RUNNING";

	private static inline var WAIT_INTERVAL = 2;
	private var waitIntervalCount:Int;


	public static function main(){
		new Main();
	}
	public function new(){
		Browser.window.addEventListener("load", initialize);
	}
	private function initialize(event){

		csInterfaceUtil = CSInterfaceUtil.create();

		haxeElement = new JQuery("#haxe");
		optionElement = new JQuery("#option");
		runButtonElement = new JQuery("#button button");
		runButtonMessageElement = new JQuery("#button .message");

		inputTextSet = new InputTextSet(csInterfaceUtil);

		setTitleBar("title_haxe", haxeElement);
		setTitleBar("title_option", optionElement);
		setRunButton();

		callFlashToHaxeConverterScript("setEventListener()");
		checkDocumentOpened();
	}

	private function callFlashToHaxeConverterScript(script:String, ?callback:Dynamic->Void){
		csInterfaceUtil.evalScript('${ClassName.FLASH_TO_HAXE_CONVERTER}.$script', callback);
	}
	private function setTitleBar(titleBarId:String, slideElement:JQuery){

		var titleElement = new JQuery("#" + titleBarId);
		titleElement.mousedown(function(event){

			if(slideElement.is(":hidden"))
				slideElement.slideDown(SLIDE_SPEED);
			else
				slideElement.slideUp(SLIDE_SPEED);
		});
	}
	private function setRunButton(){
		runButtonElement.mousedown(function(event){
			runButtonClicked = true;
		});
	}

	//
	private function startRunning(func:Void->Void, speed:Int){
		setTimer(speed);
		mainFunction = func;
	}
	private function setTimer(speed:Int){
		timer = new Timer(speed);
		timer.run = run;
	}
	private function run(){
		mainFunction();
	}

	//
	private function checkDocumentOpenedAndStopTimer(){

		timer.stop();
		checkDocumentOpened();
	}
	private function checkDocumentOpened(){

		documentChanged = false;
		callFlashToHaxeConverterScript("isOpenedFlashDocument()", function(result){

			if(!Unserializer.run(result)){
				initializeToWaitDocumentOpened();
				return;
			}

			callFlashToHaxeConverterScript("getDocumentState()", function(result){

				var jsflApiCalledResult:DocumentState = Unserializer.run(result);
				switch(jsflApiCalledResult){
					case DocumentState.CLOSED_DOCUMENT: checkDocumentOpened();
					case DocumentState.IS_NOT_SAVED_NEW_DOCUMENT: initializeToWaitDocumentSaved();
					case DocumentState.SAVED_DOCUMENT: initializeToGetDocumentData();
				}
			});
		});
	}
	private function initializeToWaitDocumentOpened(){

		startRunning(waitDocumentOpened, TIMER_SPEED_DEFAULT);
	}
	private function waitDocumentOpened(){

		checkDocumentChanged();
		if(documentChanged)
			checkDocumentOpenedAndStopTimer();
	}
	private function checkDocumentChanged(){

		callFlashToHaxeConverterScript("removeDocumentChangedEvent()", function(result){
		    if(Unserializer.run(result) && !documentChanged){
				documentChanged = true;
			}
		});
	}

	//
	private function initializeToWaitDocumentSaved(){

		documentSaved = false;
		runButtonMessageElement.css("display", "block");
		startRunning(waitDocumentSaved, TIMER_SPEED_DEFAULT);
	}
	private function waitDocumentSaved(){

		checkDocumentChanged();
		if(documentChanged){
			runButtonMessageElement.css("display", "none");
			checkDocumentOpenedAndStopTimer();
			return;
		}

		callFlashToHaxeConverterScript("getDocumentState()", function(result){

		    var jsflApiCalledResult:DocumentState = Unserializer.run(result);
			switch(jsflApiCalledResult){
			    case DocumentState.CLOSED_DOCUMENT | DocumentState.IS_NOT_SAVED_NEW_DOCUMENT: return;
				case DocumentState.SAVED_DOCUMENT:
					if(!documentSaved)
						documentSaved = true;
			}

			if(!Unserializer.run(result) && !documentSaved)
				documentSaved = true;
		});
		if(documentSaved){
			runButtonMessageElement.css("display", "none");
			initializeToGetDocumentData();
		}
	}

	//
	private function initializeToGetDocumentData(){

		flashFileDirectory = null;
		savedFlashExternDocumentData = null;
		savedFlashDocumentData = null;
		savedCreateJSDocumentData = null;
		savedOpenFLJSDocumentData = null;
		savedJSNamespaceDocumentData = null;

		callFlashToHaxeConverterScript("getFlashFileDirectory()", function(n){
			flashFileDirectory = n;
		});
		csInterfaceUtil.getDataFromDocument(cast PersistentDataKey.FLASH_EXTERN, function(n){
			savedFlashExternDocumentData = n;
		});
		csInterfaceUtil.getDataFromDocument(cast PersistentDataKey.FLASH, function(n){
			savedFlashDocumentData = n;
		});
		csInterfaceUtil.getDataFromDocument(cast PersistentDataKey.CREATEJS, function(n){
			savedCreateJSDocumentData = n;
		});
		csInterfaceUtil.getDataFromDocument(cast PersistentDataKey.OPENFL, function(n){
			savedOpenFLJSDocumentData = n;
		});
		csInterfaceUtil.getDataFromDocument(cast PersistentDataKey.JS_NAMESPACE, function(n){
			savedJSNamespaceDocumentData = n;
		});
		startRunning(waitToGetDocumentData, TIMER_SPEED_DEFAULT);
	}
	private function waitToGetDocumentData(){

	    if(
			flashFileDirectory != null &&
			savedFlashExternDocumentData != null &&
			savedFlashDocumentData != null &&
			savedCreateJSDocumentData != null &&
			savedOpenFLJSDocumentData != null &&
			savedJSNamespaceDocumentData != null
		)
			setTextField();
	}
	private function setTextField(){

	    inputTextSet.inputAllElement.removeAttr(DISABLED);
		runButtonElement.removeAttr(DISABLED);

		inputTextSet.initialize(
			savedFlashExternDocumentData,
			savedFlashDocumentData,
			savedCreateJSDocumentData,
			savedOpenFLJSDocumentData,
			savedJSNamespaceDocumentData
		);

		initializeToWaitUserControlled();
	}

	//
	private function initializeToWaitUserControlled(){

		runButtonClicked = false;
		mainFunction = waitUserControlled;
	}
	private function waitUserControlled(){

		checkDocumentChanged();
		if(documentChanged){
			destroy();
			return;
		}

		inputTextSet.run();

		if(runButtonClicked){

			runButtonClicked = false;

			var flashExternDirectory = inputTextSet.getValue(PersistentDataKey.FLASH_EXTERN);
			var flashDirectory = inputTextSet.getValue(PersistentDataKey.FLASH);
			var createJsDirectory = inputTextSet.getValue(PersistentDataKey.CREATEJS);
			var openflDirectory = inputTextSet.getValue(PersistentDataKey.OPENFL);
			var jsSymbolNamespace = inputTextSet.getValue(PersistentDataKey.JS_NAMESPACE);

			if(flashExternDirectory == "" && flashDirectory == "" && createJsDirectory == "" && openflDirectory == ""){
				csInterfaceUtil.flTrace("Set output directory");
			}
			else
				prepareToRunFlashToHaxeConverter();
		}
	}

	//
	private function prepareToRunFlashToHaxeConverter(){

		csInterfaceUtil.flTrace(ClassName.FLASH_TO_HAXE_CONVERTER + ": Library Analysis Start...");

		inputTextSet.inputAllElement.attr(DISABLED, DISABLED);
		runButtonElement.attr(DISABLED, DISABLED);
		runButtonElement.text(BUTTON_RUNNING_TEXT);

		waitIntervalCount = 0;
		timer.stop();
		startRunning(countIntervalToRunFlashToHaxeConverter, TIMER_SPEED_RUNNING);
	}
	private function countIntervalToRunFlashToHaxeConverter(){

		if(++waitIntervalCount >= WAIT_INTERVAL)
			initializeToRunFlashToHaxeConverter();
	}
	private function initializeToRunFlashToHaxeConverter(){

		var flashExternDirectory = inputTextSet.getValue(PersistentDataKey.FLASH_EXTERN);
		var flashDirectory = inputTextSet.getValue(PersistentDataKey.FLASH);
		var createJsDirectory = inputTextSet.getValue(PersistentDataKey.CREATEJS);
		var openflDirectory = inputTextSet.getValue(PersistentDataKey.OPENFL);
		var jsSymbolNamespace = inputTextSet.getValue(PersistentDataKey.JS_NAMESPACE);

		csInterfaceUtil.evalScript('var $INSTANCE_NAME = new ${ClassName.FLASH_TO_HAXE_CONVERTER}("$flashFileDirectory", "$flashExternDirectory", "$flashDirectory", "$createJsDirectory", "$openflDirectory", "$jsSymbolNamespace");');

		runFinished = false;
		mainFunction = runFlashToHaxeConverter;
	}
	public function runFlashToHaxeConverter(){

		checkDocumentChanged();
		if(documentChanged){
			csInterfaceUtil.flTrace("interrupted convert");
			destroy();
			return;
		}

		csInterfaceUtil.evalScript('$INSTANCE_NAME.run();');
		csInterfaceUtil.evalScript('$INSTANCE_NAME.isFinished();', function(result){

			if(!runFinished && Unserializer.run(result)) runFinished = true;
		});
		if(runFinished){
			destroyToRunFlashToHaxeConverter();
		}
	}
	private function destroyToRunFlashToHaxeConverter(){

		inputTextSet.inputAllElement.removeAttr(DISABLED);
		runButtonElement.removeAttr(DISABLED);
		runButtonElement.text(BUTTON_RUN_TEXT);

		timer.stop();
		setTimer(TIMER_SPEED_DEFAULT);
		initializeToWaitUserControlled();
	}

	//
	private function destroy(){

		inputTextSet.inputAllElement.val("");
		inputTextSet.inputAllElement.attr(DISABLED, DISABLED);
		runButtonElement.attr(DISABLED, DISABLED);
		runButtonElement.text(BUTTON_RUN_TEXT);

		checkDocumentOpenedAndStopTimer();
	}
}
