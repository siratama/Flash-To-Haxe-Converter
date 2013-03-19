package com.dango_itimi.net.ctrl {

	import flash.utils.Dictionary;
	
	/**
	 * 複数読み込み対象のデータが存在し
	 * 中途で読み込み停止した場合
	 * 再度その中途から読み込みを行うための仕組みあり
	 */
	public class LoadRunnerMap {

		private var mainFunction:Function;
		private var loadRunnerMap:Dictionary;
		private var loadRunnerSet:Vector.<LoadRunner>;
		private var loadingLoadRunner:LoadRunner;
		private var unloadRunner:LoadRunner;
		private var loadCompleteCount:uint;
		private var unfinishedLoadRunnerSet:Vector.<LoadRunner>;
		private var unloadedRunnerSet:Vector.<LoadRunner>;
		private var calledChangePriorityMethod:Boolean;

		public function LoadRunnerMap() {
			
			loadCompleteCount = 0;
			loadRunnerMap = new Dictionary();
			loadRunnerSet = new Vector.<LoadRunner>();
		}
		public function add(loadRunner:LoadRunner, url:String):void{
			
			loadRunnerSet.push(loadRunner);
			loadRunnerMap[url] = loadRunner;
		}
		public function checkAddedLoadRunner():Boolean {
			
			return loadRunnerSet.length > 0;
		}
		
		public function run():void{
			
			mainFunction();	
		}
		
		/**
		 * load
		 */
		public function initializeToLoad():void{
			
			unfinishedLoadRunnerSet = loadRunnerSet.slice(loadCompleteCount);
			setLoadedRunner();
		}
		private function setLoadedRunner():void{
			
			loadingLoadRunner = unfinishedLoadRunnerSet.shift();
			loadingLoadRunner.initializeLoaded();
			mainFunction = watchLoaded;
		}
		private function watchLoaded():void{
			
			loadingLoadRunner.run();
			if(loadingLoadRunner.isLoadFinished()) 
				finishLoaded();
		}
		private function finishLoaded():void{
			
			loadCompleteCount++;
			
			if(unfinishedLoadRunnerSet.length > 0) setLoadedRunner();
			
			else 
				mainFunction = finishLoading;
		}
		private function finishLoading():void {
		}
		public function isLoadFinished():Boolean {
			return mainFunction == finishLoading;
		}


		
		
		/**
		 * change priority
		 */
		public function checkLoadedCompleted(checkedUrl:String):Boolean{
			
			var loadRunner:LoadRunner = loadRunnerMap[checkedUrl];
			var index:uint = loadRunnerSet.indexOf(loadRunner);
			
			return index < loadCompleteCount; 
		}
		public function changePriority(priorityUrl:String):Boolean{
			
			calledChangePriorityMethod = true;
			
			var loadRunner:LoadRunner = loadRunnerMap[priorityUrl];
			var index:uint = loadRunnerSet.indexOf(loadRunner);
			
			//読み込みは完了している or 最優先読み込み対象となっている
			if(index <= loadCompleteCount) return false;
			
			loadRunnerSet.splice(index, 1);
			loadRunnerSet.splice(loadCompleteCount, 0, loadRunner);
			
			loadingLoadRunner.close();
			initializeToLoad();
			return true;
		}
		// priorityUrlSet 内に現在読み込み中の URL が含まれている場合
		// その読み込みは一旦キャンセルされる
		public function changePluralPriority(priorityUrlSet:Vector.<String>):Boolean {
			
			calledChangePriorityMethod = true;
			
			var changed:Boolean = false;	
			var setTotal:uint = priorityUrlSet.length;
			for (var i:Number = setTotal - 1; i >= 0; i--) {
				
				var priorityUrl:String = priorityUrlSet[i];
				var loadRunner:LoadRunner = loadRunnerMap[priorityUrl];
				var index:uint = loadRunnerSet.indexOf(loadRunner);
				
				if(index < loadCompleteCount) break;
				
				changed = true;
				loadRunnerSet.splice(index, 1);
				loadRunnerSet.splice(loadCompleteCount, 0, loadRunner);
			}
			if(!changed) return false;
			
			loadingLoadRunner.close();
			initializeToLoad();
			
			return true;
		}

		
		/**
		 * 
		 */
		public function getLoadData(url:String):* {
			
			return loadRunnerMap[url].getLoadData();
		}
		public function getLoadDataFromId(id:uint):*{
			
			//読み込み順の変更を試みた場合 このメソッドを呼び出すとエラーとする
			if(calledChangePriorityMethod) throw new Error("don't use this method");
			
			return loadRunnerSet[id].getLoadData();
		}
		
		
		/**
		 * close or unload
		 */
		public function close():void{
			
			for each(var loadRunner:LoadRunner in loadRunnerSet) loadRunner.close();
		}
		
		public function initializeUnloaded():void{
			
			for each(var loadRunner:LoadRunner in loadRunnerSet) loadRunner.destroy();
			
			loadCompleteCount = 0;
			unloadedRunnerSet = loadRunnerSet.concat();	
			setUnloadRunner();
		}
		private function setUnloadRunner():void{
			
			unloadRunner = unloadedRunnerSet.shift();
			unloadRunner.initializeUnloaded();
			mainFunction = unload;
		}
		private function unload():void{
			
			unloadRunner.run();
			if(!unloadRunner.isUnloadFinished()) return;
			
			if(unloadedRunnerSet.length > 0) setUnloadRunner();
			else mainFunction = finishUnloading;
		}
		private function finishUnloading():void {
		}
		public function isUnloadFinished():Boolean {
			return mainFunction == finishUnloading;
		}
	}
}
