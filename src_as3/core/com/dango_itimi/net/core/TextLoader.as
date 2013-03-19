package com.dango_itimi.net.core {
	
	import flash.net.URLRequest;
	import flash.net.URLLoader;	
	
	/**
	 * テキストデータ読み込み
	 */
	public class TextLoader extends FileLoader{
		
		protected var loader:URLLoader;

		public function TextLoader(request:URLRequest){
			
			super(request);
			
			loader = new URLLoader();
			ev = loader as URLLoader;
		}
		override protected function initializeLoadedChild():void{
			
			loader.load(request);
		}
		override public function getLoadData():*{
			
			return loader.data;
		}
		override protected function closeLoader():void{
			
			loader.close();
		}
		override protected function unloadLoader():void{
			
			state = STATE_UNLOAD;
		}
	}
}
