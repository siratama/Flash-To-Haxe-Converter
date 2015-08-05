package com.dango_itimi.createjs.net;

import createjs.preloadjs.LoadQueue;
class LoaderWithLoadQueue {
	
	public var loadQueue(default, null):LoadQueue;
	public var loadedEventSet(default, null):Array<Dynamic>;
	private var error:Bool;

	public function new(?useXHR:Bool = false, ?plugin:Dynamic = null){

		loadedEventSet = [];
		initialize(useXHR, plugin);
	}
	public function initialize(?useXHR:Bool = false, ?plugin:Dynamic = null){
		
		loadQueue = new LoadQueue(useXHR);
		loadQueue.addEventListener("fileload", onFileLoad);
		loadQueue.addEventListener("error", onFileError);
		loadQueue.addEventListener("complete", onComplete);

		if(plugin != null) loadQueue.installPlugin(plugin);
	}
	public function removeEventListener(){

		loadQueue.removeEventListener("fileload", onFileLoad);
		loadQueue.removeEventListener("error", onFileError);
		loadQueue.removeEventListener("complete", onComplete);
	}
	public function loadFile(url:String){
		loadQueue.loadFile(url);
	}
	public function loadManifest(manifest:Array<Dynamic>){
		loadQueue.loadManifest(manifest);
	}
	private function onFileLoad(event){
		loadedEventSet.push(event);
	}
	private function onFileError(event){
		//trace("error", event);
		error = true;
	}
	private function onComplete(event){
	}
	public function isFinished():Bool{
		//trace("finish");
		return loadQueue.loaded;
	}
	public function isError():Bool{
		return error;
	}
	public function getLoadQueue():LoadQueue{
		return loadQueue;
	}
}
