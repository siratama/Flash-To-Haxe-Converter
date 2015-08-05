package com.dango_itimi.createjs.utils;

import com.dango_itimi.as3_and_createjs.utils.IAbstractMovieClip;
import createjs.tweenjs.Timeline;
import createjs.easeljs.MovieClip;
import createjs.easeljs.DisplayObject;

class AbstractMovieClip implements IAbstractMovieClip{

	public var mc(default, null):MovieClip;
	public var timeline(default, null):Timeline;

	public var totalFrames(default, null):Int;
	public var currentFrame(default, null):Int;
	private static inline var FIRST_FRAME = 0;

	public function new(mc:MovieClip){

		this.mc = mc;
		timeline = mc.timeline;
		totalFrames = (timeline != null) ? timeline.duration - 1: 0;
		currentFrame = FIRST_FRAME;
	}
	public function gotoFirstFrame(){
		currentFrame = FIRST_FRAME;
	}
	public function gotoLastFrame(){
		currentFrame = totalFrames;
	}
	public function gotoAndStop(frame:Int){
		currentFrame = frame - 1;
	}
	public function nextFrame(){
		if(currentFrame < totalFrames)
			currentFrame++;
	}
	public function prevFrame(){
		if(currentFrame > FIRST_FRAME)
			currentFrame--;
	}
	public function loopFrame(){

		if(currentFrame < totalFrames)
			currentFrame++;
		else
			gotoFirstFrame();
	}
	public function getCurrentFrame():Int{
		return currentFrame + 1;
	}
	public function getCurrentFrameBaseCreateJS():Int{
		return currentFrame;
	}
	public function getTotalFrames():Int{
		return totalFrames + 1;
	}
	public function isLastFrame():Bool{
		return currentFrame == totalFrames;
	}
	public function isFirstFrame():Bool{
		return currentFrame == FIRST_FRAME;
	}
	public function setPosition(position:{x:Float, y:Float}){
		mc.x = position.x;
		mc.y = position.y;
	}

	//can't use text object
	public function contains(objectString:String):Bool{

		return untyped mc[objectString]._off != true;
	}
	public function draw()
	{
		mc.gotoAndStop(currentFrame);
	}
}
