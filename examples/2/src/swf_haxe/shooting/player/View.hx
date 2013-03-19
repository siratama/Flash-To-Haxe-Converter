package shooting.player;
@:native("lib.shootingplayerView")
extern class View extends createjs.easeljs.MovieClip, implements Dynamic{
	var hitarea : createjs.easeljs.MovieClip;
	public static inline var hitareaOriginalPropertyName = "hitarea";
}