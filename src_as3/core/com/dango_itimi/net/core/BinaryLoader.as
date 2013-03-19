package com.dango_itimi.net.core {
	
	import flash.display.Loader;
	import flash.net.URLRequest;
	import flash.system.ApplicationDomain;	
	import flash.system.LoaderContext;	
	import com.dango_itimi.net.core.FileLoader;

	/**
	 * バイナリデータ読み込み : swf, 画像ファイル
	 */
	public class BinaryLoader extends FileLoader{
		
		protected var loader:Loader;
		private var context:LoaderContext;

		public function BinaryLoader(
			request:URLRequest,
			applicationDomain:ApplicationDomain = null
		) {
			super(request);
			
			loader = new Loader();
			
			context = new LoaderContext();
			context.applicationDomain = (!applicationDomain) ?
				ApplicationDomain.currentDomain : applicationDomain;
			
			ev = loader.contentLoaderInfo;
		}	
		override protected function initializeLoadedChild():void{

			loader.load(request, context);
		}
		
		override public function getLoadData():* { 
			
			return loader.content;
		}
		override protected function closeLoader():void{
			
			loader.close();
		}
		override protected function unloadLoader():void{
			
			loader.unload();
			
			//Error #2044 : IOError
			//Flash CS4 ムービープレビュー用 Flash Player で発生
			//loader.unloadAndStop();
		}
	}
}