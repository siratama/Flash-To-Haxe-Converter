package ;
import js.html.ButtonElement;
import js.Lib;
import jsfl.PersistentReturnData;
import haxe.Unserializer;
import haxe.Timer;
import jsfl.PersistentDataType;
import flash_extension.csinterface.CSInterfaceUtil;
import jQuery.JQuery;
import js.Browser;
class Main {

	private static var csInterfaceUtil:CSInterfaceUtil;
	public var mainFunction:Void->Void;
	private var timer:Timer;
	private static inline var TIMER_SPEED_DEFAULT = 250;
	private static inline var TIMER_SPEED_RUNNING = 50;

	private var haxeElement:JQuery;
	private var optionElement:JQuery;
	private var inputAllElement:JQuery;
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
		inputAllElement = new JQuery("input");

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

		callFlashToHaxeConverterScript("isOpenedFlashDocument()", function(result){

			if(!Unserializer.run(result)){
				initializeToWaitDocumentOpened();
				return;
			}

			callFlashToHaxeConverterScript("isNewDocument()", function(result){

				if(Unserializer.run(result))
					initializeToWaitDocumentSaved();
				else
					initializeToGetDocumentData();
			});
		});
	}
	private function initializeToWaitDocumentOpened(){

		documentChanged = false;
		startRunning(waitDocumentOpened, TIMER_SPEED_DEFAULT);
	}
	private function waitDocumentOpened(){

		checkDocumentChanged();
		if(documentChanged)
			checkDocumentOpenedAndStopTimer();
	}
	private function checkDocumentChanged(){

		callFlashToHaxeConverterScript("removeDocumentChangedEvent()", function(result){
		    if(Unserializer.run(result) && !documentChanged)
				documentChanged = true;
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

		callFlashToHaxeConverterScript("isNewDocument()", function(result){
			if(Unserializer.run(result) && !documentSaved)
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

		inputAllElement.unbind("change").removeAttr(DISABLED);
		runButtonElement.removeAttr(DISABLED);

		setTextFieldCommon(PersistentDataKey.FLASH_EXTERN, PersistentDefaultDirectoryData.FLASH_EXTERN, savedFlashExternDocumentData);
		setTextFieldCommon(PersistentDataKey.FLASH, PersistentDefaultDirectoryData.FLASH, savedFlashDocumentData);
		setTextFieldCommon(PersistentDataKey.CREATEJS, PersistentDefaultDirectoryData.CREATEJS, savedCreateJSDocumentData);
		setTextFieldCommon(PersistentDataKey.OPENFL, PersistentDefaultDirectoryData.OPENFL, savedOpenFLJSDocumentData);
		setTextFieldCommon(PersistentDataKey.JS_NAMESPACE, PersistentDefaultDirectoryData.JS_NAMESPACE, savedJSNamespaceDocumentData);

		initializeToWaitUserControlled();
	}
	private function setTextFieldCommon(key:PersistentDataKey, defaultValue:PersistentDefaultDirectoryData,  value:String){

		if(value == cast PersistentReturnData.NULL) value = cast defaultValue;

		var inputElement = getInputElement(key);
		inputElement.val(value);

		inputElement.change(function(event){
			csInterfaceUtil.addDataToDocument(cast key, PersistentDataType.STRING, inputElement.val());
		});
	}
	private function getInputElement(key:PersistentDataKey):JQuery{

		return inputAllElement.eq(getInputId(key));
	}
	private function getInputId(key:PersistentDataKey):Int{

		return switch(key){
			case PersistentDataKey.FLASH_EXTERN: 0;
			case PersistentDataKey.FLASH: 1;
			case PersistentDataKey.CREATEJS: 2;
			case PersistentDataKey.OPENFL: 3;
			case PersistentDataKey.JS_NAMESPACE: 4;
		}
	}

	//
	private function initializeToWaitUserControlled(){

		runButtonClicked = false;
		documentChanged = false;
		mainFunction = waitUserControlled;
	}
	private function waitUserControlled(){

		checkDocumentChanged();
		if(documentChanged)
			destroy();

		else if(runButtonClicked)
			prepareToRunFlashToHaxeConverter();
	}

	//
	private function prepareToRunFlashToHaxeConverter(){

		csInterfaceUtil.flTrace(ClassName.FLASH_TO_HAXE_CONVERTER + ": Library Analysis Start...");

		inputAllElement.attr(DISABLED, DISABLED);
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

		var flashExternDirectory = getInputElement(PersistentDataKey.FLASH_EXTERN).val();
		var flashDirectory = getInputElement(PersistentDataKey.FLASH).val();
		var createJsDirectory = getInputElement(PersistentDataKey.CREATEJS).val();
		var openflDirectory = getInputElement(PersistentDataKey.OPENFL).val();
		var jsSymbolNamespace = getInputElement(PersistentDataKey.JS_NAMESPACE).val();

		csInterfaceUtil.evalScript('var $INSTANCE_NAME = new ${ClassName.FLASH_TO_HAXE_CONVERTER}("$flashFileDirectory", "$flashExternDirectory", "$flashDirectory", "$createJsDirectory", "$openflDirectory", "$jsSymbolNamespace");');

		documentChanged = false;
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

		inputAllElement.removeAttr(DISABLED);
		runButtonElement.removeAttr(DISABLED);
		runButtonElement.text(BUTTON_RUN_TEXT);

		setTimer(TIMER_SPEED_DEFAULT);
		initializeToWaitUserControlled();
	}

	//
	private function destroy(){

		inputAllElement.val("");
		inputAllElement.attr(DISABLED, DISABLED);
		runButtonElement.attr(DISABLED, DISABLED);
		runButtonElement.text(BUTTON_RUN_TEXT);

		checkDocumentOpenedAndStopTimer();
	}
}
