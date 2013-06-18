package ;

import haxe.Timer;

#if flash
import flash.net.URLRequest;
import com.dango_itimi.as3.net.core.BinaryLoader;
import com.dango_itimi.as3.net.ctrl.LoadRunner;

#elseif js
import com.dango_itimi.toolkit_for_createjs.TFCLoader;
#end

class Preloader {

	private var mainFunction:Void->Void;
	private var timer:Timer;

	#if flash
	private var loader:LoadRunner;

	#elseif js
	private var loader:TFCLoader;
	#end

	public static function main() {

		new Preloader();
	}
    public function new() {

		#if flash
		initialize({});

		#elseif js
		js.Browser.window.onload = initialize;
		#end
    }
	private function initialize(event){

		#if flash
		var urlRequest = new URLRequest("main.swf");
		loader = new LoadRunner(new BinaryLoader(urlRequest));
		loader.execute();

		#elseif js
		loader = new TFCLoader("tfc");
		loader.addMaterialDirectory("view");
		#end

		timer = new Timer(100);
		timer.run = run;
		mainFunction = load;
	}
	private function run(){

		mainFunction();
	}
	private function load(){

		loader.run();

		#if flash
		if(loader.isLoadFinished())

		#elseif js
		if(loader.isFinished())
		#end
			mainFunction = initializeMain;
	}
	private function initializeMain(){

		timer.stop();

		#if flash
		flash.Lib.current.addChild(loader.getLoadData());

		#elseif js
		new Main();
		#end
	}
}
