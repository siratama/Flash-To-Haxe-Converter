package shooting.enemy;
@:native("lib.shootingenemyTestBitmap")
extern class TestBitmap extends createjs.easeljs.Bitmap{
	public static inline var manifestId:String = "shootingenemyTestBitmap";
	public function new():Void;
	public var nominalBounds:createjs.easeljs.Rectangle;
}