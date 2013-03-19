package com.dango_itimi.net.core {

	import flash.media.Sound;
	import flash.net.URLRequest;
	
	/**
	 * 
	 */
	public class SoundLoader extends FileLoader {

		private var loader:Sound;

		public function SoundLoader(request:URLRequest) {
			
			super(request);
			
			loader = new Sound();
			ev = loader;	
		}
		override protected function initializeLoadedChild():void{
			
			loader.load(request);
		}
		override public function getLoadData():*{
			
			return loader;
		}
		override protected function closeLoader():void{
			
			loader.close();
		}
		override protected function unloadLoader():void{
			
			state = STATE_UNLOAD;
		}
	}
}
