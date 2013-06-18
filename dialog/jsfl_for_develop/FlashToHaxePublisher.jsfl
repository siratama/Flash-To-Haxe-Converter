var JSFL_MAIN_URI = "H:/eclipse/workspace/FlashToHaxeConverter/trunk/jsfl/FlashToHaxe.jsfl";
var FLA_FILE_URI = "H:/eclipse/workspace/FlashToHaxeConverter/trunk/jsfl_panel/fla/";

var PRE_URI = "file:///";
fl.runScript(PRE_URI + JSFL_MAIN_URI);

new Main(PRE_URI + FLA_FILE_URI, "../src/swf_as3", "", "lib");

//publish swf
//fl.publishDocument(PRE_URI + FLA_FILE_URI);

//publish Toolkit for CreateJS
//fl.runScript(PRE_URI + "C:/Users/username/AppData/Local/Adobe/Flash CS6/ja_JP/Configuration/CreateJS/jsfl/Publish for CreateJS.jsfl");
