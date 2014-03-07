package ;
import flash_extension.csinterface.CSInterfaceUtil;
import jsfl.PersistentDataType;
import jsfl.PersistentReturnData;
import jQuery.JQuery;
class InputTextSet {

	public var inputAllElement(default, null):JQuery;
	private var csInterfaceUtil:CSInterfaceUtil;
	private var set:Array<InputText>;

	public function new(csInterfaceUtil:CSInterfaceUtil){
		this.csInterfaceUtil = csInterfaceUtil;
		inputAllElement = new JQuery("input");
	}
	public function initialize(
		savedFlashExternDocumentData:String,
		savedFlashDocumentData:String,
		savedCreateJSDocumentData:String,
		savedOpenFLJSDocumentData:String,
		savedJSNamespaceDocumentData:String
	){
		set = [];
		add(PersistentDataKey.FLASH_EXTERN, savedFlashExternDocumentData);
		add(PersistentDataKey.FLASH, savedFlashDocumentData);
		add(PersistentDataKey.CREATEJS, savedCreateJSDocumentData);
		add(PersistentDataKey.OPENFL, savedOpenFLJSDocumentData);
		add(PersistentDataKey.JS_NAMESPACE, savedJSNamespaceDocumentData);
	}
	private function add(key:PersistentDataKey, savedValue:String){

		var inputId = getInputId(key);
		var inputElement = inputAllElement.eq(inputId);
	    set[inputId] = new InputText(csInterfaceUtil, inputElement, key, savedValue);
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
	public function getValue(key:PersistentDataKey):String{

		return set[getInputId(key)].inputElement.val();
	}
	public function run(){

		for(inputText in set){
		    inputText.run();
		}
	}
}
private class InputText{

	public var inputElement(default, null):JQuery;
	private var key:PersistentDataKey;
	private var csInterfaceUtil:CSInterfaceUtil;

	private var beforeValue:String;

	public function new(csInterfaceUtil:CSInterfaceUtil, inputElement:JQuery, key:PersistentDataKey, savedValue:String){

		this.csInterfaceUtil = csInterfaceUtil;
		this.key = key;
		this.inputElement = inputElement;

		var defaultValue = getDefaultValue();

		if(savedValue == cast PersistentReturnData.NULL) savedValue = cast defaultValue;
		inputElement.val(savedValue);
		beforeValue = savedValue;
		//csInterfaceUtil.addDataToDocument(cast key, PersistentDataType.STRING, savedValue);
	}
	private function getDefaultValue():PersistentDefaultDirectoryData{

		return switch(key){
			case PersistentDataKey.FLASH_EXTERN: PersistentDefaultDirectoryData.FLASH_EXTERN;
			case PersistentDataKey.FLASH: PersistentDefaultDirectoryData.FLASH;
			case PersistentDataKey.CREATEJS: PersistentDefaultDirectoryData.CREATEJS;
			case PersistentDataKey.OPENFL: PersistentDefaultDirectoryData.OPENFL;
			case PersistentDataKey.JS_NAMESPACE: PersistentDefaultDirectoryData.JS_NAMESPACE;
		}
	}
	public function run(){

		if(beforeValue == inputElement.val()) return;

		var value = inputElement.val();
		csInterfaceUtil.addDataToDocument(cast key, PersistentDataType.STRING, value);
		beforeValue = value;
	}
}
