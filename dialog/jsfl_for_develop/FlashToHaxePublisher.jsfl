var JSFL_MAIN_URI = "H:/eclipse/workspace/FlashToHaxeConverter/trunk/jsfl/FlashToHaxe.jsfl";
var BASE_DIRECTORY = "H:/eclipse/workspace/FlashToHaxeConverter/trunk/jsfl_panel/fla/";

var PRE_URI = "file:///";
fl.runScript(PRE_URI + JSFL_MAIN_URI);

new Main(PRE_URI + BASE_DIRECTORY, "../src/swf_as3", "", "lib");

