package shooting.scene;
@:native("lib.shootingsceneGameOverView")
extern class GameOverView extends createjs.easeljs.MovieClip{
	var retryBtn : createjs.easeljs.MovieClip;
	public static var nominalBounds:createjs.easeljs.Rectangle;
	public static var frameBounds:Array<createjs.easeljs.Rectangle>;
}