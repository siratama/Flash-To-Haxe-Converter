package com.dango_itimi.toolkit_for_createjs;

class MaterialURI {
	
	private var baseDirectory:String;
	private var baseSoundsDirectory:String;

	public static inline var EXT_HTML = ".html";
	public static inline var EXT_MP3 = ".mp3";
	public static inline var EXT_OGG = ".ogg";

	public function new (
		baseDirectoryName:String, ?baseSoundsDirectoryName:String = ""){
			
		this.baseDirectory = baseDirectoryName + "/";
		this.baseSoundsDirectory =
			(baseSoundsDirectoryName != "") ? baseSoundsDirectoryName + "/" : "";
	}
	public function getTemplateHtmlUri(materialDirectoryName:String){

		return baseDirectory + materialDirectoryName + "/" + materialDirectoryName + EXT_HTML;
	}
	private function getMaterialDirectory(materialDirectoryName:String):String{

		return  baseDirectory + materialDirectoryName + "/";
	}
	private function getSoundsDirectory(materialDirectoryName:String):String{

		var soundsDirectory = (baseSoundsDirectory == "") ? baseDirectory : baseSoundsDirectory;
		return soundsDirectory + materialDirectoryName + "/";
	}
	public function addUri(manifest:Array<Dynamic>, materialDirectoryName:String){

		var materialDirectory:String =  getMaterialDirectory(materialDirectoryName);
		var soundsDirectory = getSoundsDirectory(materialDirectoryName);

		for(i in 0...manifest.length){
			manifest[i].src = convertSrc(materialDirectory, soundsDirectory, manifest[i].src);
		}
	}
	public function addUriToImgSrcMap(imgSrcMap:Dynamic, materialDirectoryName:String){

		var materialDirectory:String =  getMaterialDirectory(materialDirectoryName);
		var soundsDirectory = getSoundsDirectory(materialDirectoryName);

		var fields = Reflect.fields(imgSrcMap);
		for(propertyName in fields){
			var src:String = convertSrc(materialDirectory, soundsDirectory, Reflect.field(imgSrcMap, propertyName));
			Reflect.setField(imgSrcMap, propertyName, src);
		}
	}
	private function convertSrc(materialDirectory:String, soundsDirectory:String, src:String){

		if(src.indexOf(MaterialURI.EXT_MP3) == -1)
			return materialDirectory + src;
		else
			return soundsDirectory + src;
	}
}
