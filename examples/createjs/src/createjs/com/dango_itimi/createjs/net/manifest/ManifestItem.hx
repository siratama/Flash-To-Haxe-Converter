package com.dango_itimi.createjs.net.manifest;

import js.Lib;

class ManifestItem {
	
	private var src:String;
	private var id:String;

	public function new(src:String, ?id:String = null){
		
		this.src = src;
		this.id = id;
	}
	public function getSrc(){
		return src;
	}
	public function getId(){
		return id;
	}
	public function getManifestItem():Dynamic{
		
		if(id != null)  
			return {src:src, id:id};
		else
			return {src:src};
	}
}
