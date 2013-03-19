package com.dango_itimi.net.ctrl {
	
	import com.dango_itimi.net.action.ILoadAction;
	import com.dango_itimi.net.core.FileLoader;

	/**
	 * 
	 */
	public class LoadRunner {
		
		private var loader:FileLoader;
		private var action:ILoadAction;
		private var mainFunction:Function;

		public function LoadRunner(loader:FileLoader, action:ILoadAction = null) {
			
			this.action = action;
			this.loader = loader;
		}
		public function run():void{
			
			mainFunction();	
		}
		public function destroy():void{
			
			if(action) action.destroy();
		}
		
		/**
		 * load
		 */
		public function initializeLoaded():void{
			
			loader.initializeToLoad();
			if(action) action.loadStart();
			mainFunction = watchLoaded;
		}
		private function watchLoaded():void{

			if(action) action.watchProgress(loader.getProgressPersentage());
			if(loader._state != FileLoader.STATE_LOADING) finishLoaded();
		}
		private function finishLoaded():void{

			loader.finishLoaded();
			
			if(!action){
				mainFunction = finishLoading;
				return;
			}
			
			if(loader._state == FileLoader.STATE_ERR) action.loadError();
			else action.loadSuccess();
		
			mainFunction = (action.viewRest()) ? finishLoading : runRestProgress;
		}
		private function runRestProgress():void{
			
			if(action.viewRest()) mainFunction = finishLoading;
		}
		private function finishLoading():void {
		}
		public function isLoadFinished():Boolean {
			return mainFunction == finishLoading;
		}


		public function getLoadData():*{
			
			return loader.getLoadData();
		}
		
		
		/**
		 * close or unload
		 */
		public function close():void{
			
			loader.close();
			mainFunction = finishUnloading;	
		}
		public function initializeUnloaded():void{
			
			loader.initializeUnloaded();
			mainFunction = watchUnloaded;
		}
		private function watchUnloaded():void{
			
			if(loader._state == FileLoader.STATE_UNLOAD) finishUnloaded();
		}
		private function finishUnloaded():void{
			
			loader.finishUnloaded();	
			mainFunction = finishUnloading;
		}
		private function finishUnloading():void {
		}
		public function isUnloadFinished():Boolean {
			return mainFunction == finishUnloading;
		}
		
	}
}
