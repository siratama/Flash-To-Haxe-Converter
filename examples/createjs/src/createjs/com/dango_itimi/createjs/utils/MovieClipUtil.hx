package com.dango_itimi.createjs.utils;

import com.dango_itimi.as3_and_createjs.utils.IMovieClipUtil;
import createjs.tweenjs.Timeline;
import createjs.easeljs.MovieClip;
import createjs.easeljs.DisplayObject;

class MovieClipUtil implements IMovieClipUtil{

	public var mc(default, null):MovieClip;
	public var totalFrames(default, null):Int;
	public var timeline(default, null):Timeline;

	public function new(mc:MovieClip){

		this.mc = mc;
		timeline = mc.timeline;
		if(timeline != null)
			totalFrames = timeline.duration - 1;
		else
			totalFrames = 0;
	}
	public function gotoFirstFrame(){
		mc.gotoAndStop(0);
	}
	public function gotoLastFrame(){
		mc.gotoAndStop(totalFrames);
	}
	public function gotoAndStop(frame:Int){
		mc.gotoAndStop(frame-1);
	}
	public function nextFrame(){
		mc.gotoAndStop(timeline.position + 1);
	}
	public function prevFrame(){
		mc.gotoAndStop(timeline.position - 1);
	}
	public function loopFrame(){

		if(mc.currentFrame < totalFrames)
			nextFrame();
		else
			gotoFirstFrame();
	}
	public function getCurrentFrame():Int{
		return mc.currentFrame + 1;
	}
	public function getCurrentFrameBaseCreateJS():Int{
		return mc.currentFrame;
	}
	public function getTotalFrames():Int{
		return totalFrames + 1;
	}
	public function isCurrentLabel(label:String):Bool{
		return timeline.resolve(label) == mc.currentFrame;
	}
	public function isLastFrame():Bool{
		return mc.currentFrame == totalFrames;
	}
	public function setPosition(position:DisplayObject){
		mc.x = position.x;
		mc.y = position.y;
	}

	//can't use text object
	public function contains(objectString:String):Bool{

		return untyped mc[objectString]._off != true;
	}
}
