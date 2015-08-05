package shooting;

import flash.events.Event;
import flash.display.Loader;
import flash.net.URLRequest;

class Preloader
{
	private var loader:Loader;
	public var loaded(default, null):Bool;
	private static inline var LOAD_FILE = "view.swf";

	public function new()
	{
		loaded = false;
		loader = new Loader();
		loader.contentLoaderInfo.addEventListener(Event.COMPLETE, onLoadComplete);
		loader.load(new URLRequest(LOAD_FILE));
	}
	private function onLoadComplete(event:Event){
		loaded = true;
	}
}
