package {
	
	import com.dango_itimi.net.core.BinaryLoader;
	import com.dango_itimi.net.ctrl.LoadRunner;

	import flash.display.Sprite;
	import flash.events.Event;
	import flash.net.URLRequest;
	
	/**
	 * 
	 */
	public class AirSample extends Sprite{
		
		private static const LOAD_SWF:String = "main.swf";
		private var mainFunction:Function;
		private var loadRunner:LoadRunner;

		public function AirSample() {
			
			var request:URLRequest = new URLRequest(LOAD_SWF);
			loadRunner = new LoadRunner(new BinaryLoader(request));
			loadRunner.initializeLoaded();
		
			mainFunction = load;
			addEventListener(Event.ENTER_FRAME, run);
		}
		private function run(event:Event):void {

			mainFunction();
		}
		private function load():void{

			loadRunner.run();
			if(!loadRunner.isLoadFinished()) return;
			
			removeEventListener(Event.ENTER_FRAME, run);
			addChild(loadRunner.getLoadData());	
		}
	}
}
