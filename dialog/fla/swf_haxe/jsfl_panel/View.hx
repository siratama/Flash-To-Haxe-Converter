package jsfl_panel;
@:native("lib.jsfl_panelView")
extern class View extends createjs.easeljs.Container{
	var asOutputPathText : createjs.easeljs.Text;
	var closeButton : createjs.easeljs.MovieClip;
	var hxOutputPathText : createjs.easeljs.Text;
	var jsSymbolNamespaceText : createjs.easeljs.Text;
	var runButton : createjs.easeljs.MovieClip;
	public static var nominalBounds:createjs.easeljs.Rectangle;
	public static var frameBounds:Array<createjs.easeljs.Rectangle>;
}