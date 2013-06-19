package shooting.scene;
@:native("lib.shootingsceneOpeningView")
extern class OpeningView extends createjs.easeljs.MovieClip{
	var clickStartBtn : createjs.easeljs.MovieClip;
	public var nominalBounds:createjs.easeljs.Rectangle;
	public var frameBounds:Array<createjs.easeljs.Rectangle>;
}