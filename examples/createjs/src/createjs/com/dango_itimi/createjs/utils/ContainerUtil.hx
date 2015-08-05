package com.dango_itimi.createjs.utils;
import com.dango_itimi.as3_and_createjs.display.IDisplayObjectContainer;
import com.dango_itimi.as3_and_createjs.utils.IContainerUtil;
import createjs.easeljs.DisplayObject;
import createjs.easeljs.Container;
class ContainerUtil implements IContainerUtil{
	private var container:Container;

	public function new(container:Container){
		this.container = container;
	}
	public function addChild(child:IDisplayObjectContainer):DisplayObject{
		return container.addChild(cast child);
	}
	public function removeChild(child:IDisplayObjectContainer):Bool{
		return container.removeChild(cast child);
	}
}
