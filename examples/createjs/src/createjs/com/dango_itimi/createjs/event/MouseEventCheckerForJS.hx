package com.dango_itimi.createjs.event;

import com.dango_itimi.as3_and_createjs.event.MouseEventChecker;
import createjs.easeljs.DisplayObject;
import createjs.easeljs.MouseEvent;

class MouseEventCheckerForJS extends MouseEventChecker{

	private var displayObject:DisplayObject;
	public var touchEventMap(default, null):Map<Int, Touch>;

	public function new(displayObject:DisplayObject){

		this.displayObject = displayObject;
		touchEventMap = new Map();
		super();
	}
	override public function addEventListener(){
		displayObject.addEventListener("click", onClick);
		displayObject.addEventListener("mousedown", onMouseDown);
		displayObject.addEventListener("pressup", onMouseUp);
		displayObject.addEventListener("pressmove", onMouseMove);
	}
	override public function removeEventListener(){
		displayObject.removeEventListener("click", onClick);
		displayObject.removeEventListener("mousedown", onMouseDown);
		displayObject.removeEventListener("pressup", onMouseUp);
		displayObject.removeEventListener("pressmove", onMouseMove);

		for(key in touchEventMap.keys()){
			if(touchEventMap[key] == null) continue;
			switch(touchEventMap[key]){
				case Touch.DOWN(touchEvent): removeEventListenerCommon(touchEvent);
				case Touch.MOVE(touchEvent): removeEventListenerCommon(touchEvent);
				case Touch.UP(touchEvent): removeEventListenerCommon(touchEvent);
			}
		}
	}
	private function removeEventListenerCommon(touchEvent:MouseEvent){
		if(touchEvent != null)	touchEvent.removeAllEventListeners();
	}
	override private function onMouseDown(event:MouseEvent){

		if(event.nativeEvent.type == "touchstart"){
			touchEventMap[event.pointerID] = Touch.DOWN(event);
		}
		super.onMouseDown(event);
	}
	override private function onMouseMove(event:MouseEvent){

		if(event.nativeEvent.type == "touchmove"){
			touchEventMap[event.pointerID] = Touch.MOVE(event);
		}
		super.onMouseMove(event);
	}
	override private function onMouseUp(event:MouseEvent){

		if(event.nativeEvent.type == "touchend" || event.nativeEvent.type == "touchcancel"){
			touchEventMap[event.pointerID] = Touch.UP(event);
		}
		super.onMouseUp(event);
	}
	override public function reset(){

		super.reset();

		for(key in touchEventMap.keys()){

			if(touchEventMap[key] == null) continue;

			switch(touchEventMap[key]){
				case Touch.DOWN(touchEvent): continue;
				case Touch.MOVE(touchEvent): touchEventMap[key] = Touch.DOWN(touchEvent);
				case Touch.UP(touchEvent): touchEventMap.remove(key);
			}
		}
	}
	override public function destroy(){

		touchEventMap = new Map();
	}
}


