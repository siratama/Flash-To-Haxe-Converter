package ;
import flash.net.URLRequest;
import com.dango_itimi.as3.net.core.BinaryLoader;
import com.dango_itimi.as3.net.ctrl.LoadRunner;
class PreloaderForFlash extends Preloader{

	private var loader:LoadRunner;

	public static function main() {

		new PreloaderForFlash();
	}
	public function new(){

		super();
		initialize({});
	}
	override private function setLoader(){

		var urlRequest = new URLRequest("main.swf");
		loader = new LoadRunner(new BinaryLoader(urlRequest));
		loader.execute();
	}
	override private function load(){

		loader.run();
		if(loader.isLoadFinished())
			mainFunction = initializeMain;
	}
	override private function initializeMain(){

		super.initializeMain();
		flash.Lib.current.addChild(loader.getLoadData());
	}
}
