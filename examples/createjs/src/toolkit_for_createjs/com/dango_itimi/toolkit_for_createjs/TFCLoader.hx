package com.dango_itimi.toolkit_for_createjs;

import com.dango_itimi.toolkit_for_createjs.loader.MaterialLoader;
import js.Lib;

/**
 * TFC: Toolkit For CreateJS
 */
class TFCLoader {

	public var propertiesSet(default, null):Array<Properties>;
	
	private var mainFunction:Void->Void;
	private var materialURI:MaterialURI;
	private var materialDirectorySet:Array<String>;

	private var materialLoader:MaterialLoader;
	
	public function new(
		baseDirectoryName:String,
		?baseSoundsDirectoryName:String = ""
	){
		materialURI = new MaterialURI(baseDirectoryName, baseSoundsDirectoryName);
		materialDirectorySet = [];
		propertiesSet = [];

		mainFunction = parseManifest;
	}
	public function addMaterialDirectory(symbolNameSpace:String, materialDirectoryName:String){

		var properties = Lib.eval('window.$symbolNameSpace.properties');
		propertiesSet.push(properties);
		materialDirectorySet.push(materialDirectoryName);
	}
	public function getFps(elementIndex:Int = 0):Int{
		return propertiesSet[elementIndex].fps;
	}
	public function run(){
		mainFunction();
	}
	private function parseManifest(){

		var manifest:Array<ManifestItem> = [];
		for(i in 0...materialDirectorySet.length){

			var materialDirectoryName = materialDirectorySet[i];
			var properties = propertiesSet[i];

			materialURI.addUri(properties.manifest, materialDirectoryName);
			manifest = manifest.concat(properties.manifest);
		}
		if(manifest.length == 0)
			mainFunction = finish;
		else
			initializeToLoadMaterial(manifest);
	}
	private function initializeToLoadMaterial(manifest:Array<ManifestItem>){

		materialLoader = new MaterialLoader(manifest);
		materialLoader.load();
		mainFunction = loadMaterial;
	}
	private function loadMaterial(){
		
		materialLoader.run();
		if(materialLoader.isFinished())
			mainFunction = finish;
	}
	private function finish(){
	}
	public function isFinished():Bool{
		return Reflect.compareMethods(mainFunction, finish);
	}
	private function error(){
	}
	public function isError():Bool{
		return Reflect.compareMethods(mainFunction, error);
	}
}

