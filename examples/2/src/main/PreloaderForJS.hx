package ;
import com.dango_itimi.toolkit_for_createjs.TFCLoader;
import haxe.Timer;
class PreloaderForJS extends Preloader{

	private var loader:TFCLoader;

	public static function main() {

		new PreloaderForJS();
	}
	public function new(){

		js.Browser.window.onload = initialize;
		super();
	}
	override private function setLoader(){

		loader = new TFCLoader("tfc");
		loader.addMaterialDirectory("view");
	}
	override private function load(){

		loader.run();
		if(loader.isFinished())
			mainFunction = initializeMain;
	}
	override private function initializeMain(){

		super.initializeMain();
		new MainForJS();
	}
}
