package shooting.enemy;
@:native("lib.shootingenemyView")
extern class View extends createjs.easeljs.MovieClip{
	var point : createjs.easeljs.MovieClip;
	var hitarea : createjs.easeljs.MovieClip;
	public var nominalBounds:createjs.easeljs.Rectangle;
	public var frameBounds:Array<createjs.easeljs.Rectangle>;
}