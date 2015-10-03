package tmpl.flash;
class MovieClipType
{
	public static inline var name = "MovieClipType";

	public static inline var lines =
'package ;

import flash.display.*;
import flash.events.Event;

typedef $name =
{
	//EventDispatcher
	function addEventListener(type : String, listener : Dynamic -> Void, ?useCapture : Bool, ?priority : Int, ?useWeakReference : Bool) : Void;
	function dispatchEvent(event : Event) : Bool;
	function hasEventListener(type : String) : Bool;
	function removeEventListener(type : String, listener : Dynamic -> Void, ?useCapture : Bool) : Void;
	function toString() : String;
	function willTrigger(type : String) : Bool;

	//DisplayObject
	var accessibilityProperties : flash.accessibility.AccessibilityProperties;
	var alpha : Float;
	var blendMode : BlendMode;
	@:require(flash10) var blendShader(null,default) : Shader;
	var cacheAsBitmap : Bool;
	var filters : Array<flash.filters.BitmapFilter>;
	var height : Float;
	var loaderInfo(default,null) : LoaderInfo;
	var mask : DisplayObject;
	var mouseX(default,null) : Float;
	var mouseY(default,null) : Float;
	var name : String;
	var opaqueBackground : Null<UInt>;
	var parent(default,null) : DisplayObjectContainer;
	var root(default,null) : DisplayObject;
	var rotation : Float;
	@:require(flash10) var rotationX : Float;
	@:require(flash10) var rotationY : Float;
	@:require(flash10) var rotationZ : Float;
	var scale9Grid : flash.geom.Rectangle;
	var scaleX : Float;
	var scaleY : Float;
	@:require(flash10) var scaleZ : Float;
	var scrollRect : flash.geom.Rectangle;
	var stage(default,null) : Stage;
	var transform : flash.geom.Transform;
	var visible : Bool;
	var width : Float;
	var x : Float;
	var y : Float;
	@:require(flash10) var z : Float;
	function getBounds(targetCoordinateSpace : DisplayObject) : flash.geom.Rectangle;
	function getRect(targetCoordinateSpace : DisplayObject) : flash.geom.Rectangle;
	function globalToLocal(point : flash.geom.Point) : flash.geom.Point;
	@:require(flash10) function globalToLocal3D(point : flash.geom.Point) : flash.geom.Vector3D;
	function hitTestObject(obj : DisplayObject) : Bool;
	function hitTestPoint(x : Float, y : Float, ?shapeFlag : Bool) : Bool;
	@:require(flash10) function local3DToGlobal(point3d : flash.geom.Vector3D) : flash.geom.Point;
	function localToGlobal(point : flash.geom.Point) : flash.geom.Point;

	//InteractiveObject
	var accessibilityImplementation : flash.accessibility.AccessibilityImplementation;
	var contextMenu : flash.ui.ContextMenu;
	var doubleClickEnabled : Bool;
	var focusRect : Dynamic;
	var mouseEnabled : Bool;
	@:require(flash11) var needsSoftKeyboard : Bool;
	@:require(flash11) var softKeyboardInputAreaOfInterest : flash.geom.Rectangle;
	var tabEnabled : Bool;
	var tabIndex : Int;
	@:require(flash11) function requestSoftKeyboard() : Bool;

	//DisplayObjectContainer
	var mouseChildren : Bool;
	var numChildren(default,null) : Int;
	var tabChildren : Bool;
	var textSnapshot(default,null) : flash.text.TextSnapshot;
	function addChild(child : DisplayObject) : DisplayObject;
	function addChildAt(child : DisplayObject, index : Int) : DisplayObject;
	function areInaccessibleObjectsUnderPoint(point : flash.geom.Point) : Bool;
	function contains(child : DisplayObject) : Bool;
	function getChildAt(index : Int) : DisplayObject;
	function getChildByName(name : String) : DisplayObject;
	function getChildIndex(child : DisplayObject) : Int;
	function getObjectsUnderPoint(point : flash.geom.Point) : Array<DisplayObject>;
	function removeChild(child : DisplayObject) : DisplayObject;
	function removeChildAt(index : Int) : DisplayObject;
	@:require(flash11) function removeChildren(?beginIndex : Int, ?endIndex : Int) : Void;
	function setChildIndex(child : DisplayObject, index : Int) : Void;
	@:require(flash11_8) function stopAllMovieClips() : Void;
	function swapChildren(child1 : DisplayObject, child2 : DisplayObject) : Void;
	function swapChildrenAt(index1 : Int, index2 : Int) : Void;

	//Sprite
	var buttonMode : Bool;
	var dropTarget(default,null) : DisplayObject;
	var graphics(default,null) : Graphics;
	var hitArea : Sprite;
	var soundTransform : flash.media.SoundTransform;
	var useHandCursor : Bool;
	function startDrag(?lockCenter : Bool, ?bounds : flash.geom.Rectangle) : Void;
	@:require(flash10_1) function startTouchDrag(touchPointID : Int, ?lockCenter:Bool, ?bounds : flash.geom.Rectangle) : Void;
	function stopDrag() : Void;
	@:require(flash10_1) function stopTouchDrag(touchPointID : Int) : Void;

	//MovieClip
	var currentFrame(default,null) : Int;
	@:require(flash10) var currentFrameLabel(default,null) : String;
	var currentLabel(default,null) : String;
	var currentLabels(default,null) : Array<FrameLabel>;
	var currentScene(default,null) : Scene;
	var enabled : Bool;
	var framesLoaded(default,null) : Int;
	@:require(flash11) var isPlaying(default,null) : Bool;
	var scenes(default,null) : Array<Scene>;
	var totalFrames(default,null) : Int;
	var trackAsMenu : Bool;
	function addFrameScript(?p1 : Dynamic, ?p2 : Dynamic, ?p3 : Dynamic, ?p4 : Dynamic, ?p5 : Dynamic) : Void;
	function gotoAndPlay(frame : flash.utils.Object, ?scene : String) : Void;
	function gotoAndStop(frame : flash.utils.Object, ?scene : String) : Void;
	function nextFrame() : Void;
	function nextScene() : Void;
	function play() : Void;
	function prevFrame() : Void;
	function prevScene() : Void;
	function stop() : Void;
}';

}
