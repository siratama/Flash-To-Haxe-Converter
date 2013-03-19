package ;
import haxe.Timer;
class Preloader {

	private var mainFunction:Void->Void;
	private var timer:Timer;

	public static function main() {

		new Preloader();
	}
    public function new() {
    }
	private function initialize(event){

		setLoader();

		timer = new Timer(100);
		timer.run = run;

		mainFunction = load;
	}
	private function setLoader(){
	}

	private function run(){

		mainFunction();
	}
	private function load(){
	}
	private function initializeMain(){

		timer.stop();
	}
}
