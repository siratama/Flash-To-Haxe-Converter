package ;
//import jsfl.Flash;
class Publish {

	/*
	public static function main(){

		var JSFL_MAIN_URI = "H:/eclipse/workspace/FlashToHaxeConverter/trunk/jsfl/FlashToHaxe.jsfl";
		var FLA_FILE_URI = "H:/eclipse/workspace/FlashToHaxeConverter/trunk/examples/1/fla/view.fla";
		var PUBLISH_DIRECTORY = "H:/eclipse/workspace/FlashToHaxeConverter/trunk/examples/1/src/";
		var FLASH_HAXE_DIRECTORY = "swf_as3/";
		var CREATEJS_HAXE_DIRECTORY = "swf_haxe/";
		var SYMBOL_NAMESPACE = "lib";

		var PRE_URI:String = "file:///";
		Flash.runScript(PRE_URI + JSFL_MAIN_URI);
		untyped new Main(PRE_URI + FLA_FILE_URI, PRE_URI + PUBLISH_DIRECTORY + FLASH_HAXE_DIRECTORY, PRE_URI + PUBLISH_DIRECTORY + CREATEJS_HAXE_DIRECTORY, SYMBOL_NAMESPACE);
	}
	*/

	public static function main(){
	}
	public static function __init__(){

		var JSFL_MAIN_URI = "H:/eclipse/workspace/FlashToHaxeConverter/trunk/jsfl/FlashToHaxe.jsfl";
		var FLA_FILE_URI = "H:/eclipse/workspace/FlashToHaxeConverter/trunk/examples/1/fla/view.fla";
		var PUBLISH_DIRECTORY = "H:/eclipse/workspace/FlashToHaxeConverter/trunk/examples/1/src/";
		var FLASH_HAXE_DIRECTORY = "swf_as3/";
		var CREATEJS_HAXE_DIRECTORY = "swf_haxe/";
		var SYMBOL_NAMESPACE = "lib";

		var PRE_URI:String = "file:///";
		untyped fl.runScript(PRE_URI + JSFL_MAIN_URI);
		untyped new Main(PRE_URI + FLA_FILE_URI, PRE_URI + PUBLISH_DIRECTORY + FLASH_HAXE_DIRECTORY, PRE_URI + PUBLISH_DIRECTORY + CREATEJS_HAXE_DIRECTORY, SYMBOL_NAMESPACE);
	}
}
