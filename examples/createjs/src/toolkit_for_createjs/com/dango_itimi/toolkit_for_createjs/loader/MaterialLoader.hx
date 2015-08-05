package com.dango_itimi.toolkit_for_createjs.loader;

import com.dango_itimi.createjs.net.LoaderWithLoadQueue;
import js.Lib;
import createjs.soundjs.Sound;

class MaterialLoader{

	private var images:Dynamic;
	private var loader:LoaderWithLoadQueue;
	private var mainFunction:Dynamic;
	private var manifest:Array<ManifestItem>;
	
	public function new(manifest:Array<ManifestItem>){
		
		this.manifest = manifest;	
		
		images = Lib.eval("window.images||{}");
		loader = new LoaderWithLoadQueue(false, Sound);
	}
	public function run(){
		
		mainFunction();
	}
	public function load(){
		
		loader.loadManifest(manifest);
		mainFunction = waitToFinishLoaded;
	}
	private function waitToFinishLoaded(){

		if(loader.isFinished())
			setImages();
	}
	private function setImages(){
		
		for(i in 0...manifest.length){

			var id:String = manifest[i].src;
			var result = loader.getLoadQueue().getResult(id);
			var item = loader.getLoadQueue().getItem(id);

			if(result != null && item.type == "image"){
				images[item.id] = result;
			}
		}
		mainFunction = finish;
	}
	private function finish(){
	}	
	public function isFinished():Bool{

		return Reflect.compareMethods(mainFunction, finish);
	}
}
