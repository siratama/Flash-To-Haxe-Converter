package shooting.enemy;
@:native("lib.shootingenemyView")
extern class View extends createjs.easeljs.MovieClip{
	var point : createjs.easeljs.MovieClip;
	var hitarea : createjs.easeljs.MovieClip;
	public static var nominalBounds:createjs.easeljs.Rectangle;
	public static var frameBounds:Array<createjs.easeljs.Rectangle>;
}