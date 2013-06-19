package shooting.scene;
@:native("lib.shootingsceneGameOverView")
extern class GameOverView extends createjs.easeljs.MovieClip{
	var retryBtn : createjs.easeljs.MovieClip;
	public var nominalBounds:createjs.easeljs.Rectangle;
	public var frameBounds:Array<createjs.easeljs.Rectangle>;
}