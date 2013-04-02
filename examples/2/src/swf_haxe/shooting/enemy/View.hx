package shooting.enemy;
@:native("lib.shootingenemyView")
extern class View extends createjs.easeljs.MovieClip, implements Dynamic{
	var point : createjs.easeljs.MovieClip;
	public static inline var pointOriginalPropertyName = "point";
	var hitarea : createjs.easeljs.MovieClip;
	public static inline var hitareaOriginalPropertyName = "hitarea";
}