package com.dango_itimi.createjs.net.manifest;

class ManifestItemSet {

	public var itemSet(default, null):Array<ManifestItem>;

	public function new(){
		
		itemSet = [];
	}
	public function add(src:String, ?id:String = null){
	
		itemSet.push(
			new ManifestItem(src, id)
		);
	}
	public function createManifest(){
		
		var manifest:Array<Dynamic> = [];
		
		for(i in 0...itemSet.length){
			manifest.push(itemSet[i].getManifestItem());
		}
		return manifest;
	}
}
