package shooting.enemy;
@:native("lib.shootingenemyView")
extern class View extends createjs.easeljs.MovieClip, implements Dynamic{
	var point : createjs.easeljs.MovieClip;
	var hitarea : createjs.easeljs.MovieClip;
}