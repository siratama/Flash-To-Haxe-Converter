package com.dango_itimi.net.core {
	
	import flash.net.URLRequest;	
	import flash.events.IOErrorEvent;	
	import flash.events.ProgressEvent;	
	import flash.events.Event;	
	import flash.events.EventDispatcher;	
	
	public class FileLoader {
	
		public static const STATE_NON:uint = 0;
		public static const STATE_LOADING:uint = 1;
		public static const STATE_SUC:uint = 2;
		public static const STATE_ERR:uint = 3;
		public static const STATE_UNLOAD:uint = 4;
		protected var state:uint;
		
		protected var ev:EventDispatcher;
		protected var request:URLRequest;
		private var bytesLoaded:uint = 0;
		private var bytesTotal:uint = 0;
		
		public static const LOADER_KIND_FILE:uint = 1;
		public static const LOADER_KIND_TEXT:uint = 2;
		protected var loaderKind:uint;

		public function FileLoader(request:URLRequest) {
			
			this.request = request;
			state = STATE_NON;
		}
		public function initializeToLoad():void {
			//trace("FileLoader.initializeLoaded", request.url);	
			state = STATE_LOADING;
			setEventListener();
			initializeLoadedChild();
		}
		private function setEventListener():void {
			
			ev.addEventListener(Event.COMPLETE, loadComplete);
			ev.addEventListener(ProgressEvent.PROGRESS, progressed);
			ev.addEventListener(IOErrorEvent.IO_ERROR, loadError);
		}
		public function finishLoaded():void{
			
			releaseEventListener();
		}
		private function releaseEventListener():void{
			
			if(ev.hasEventListener(Event.COMPLETE))
				ev.removeEventListener(Event.COMPLETE, loadComplete);
				
			if(ev.hasEventListener(ProgressEvent.PROGRESS))
				ev.removeEventListener(ProgressEvent.PROGRESS, progressed);
			
			if(ev.hasEventListener(IOErrorEvent.IO_ERROR))
				ev.removeEventListener(IOErrorEvent.IO_ERROR, loadError);
		}
		//override
		protected function initializeLoadedChild():void {}
		
		private function progressed(ev:ProgressEvent):void{
			
			//trace(ev.bytesLoaded, ev.bytesTotal);
			bytesLoaded = ev.bytesLoaded;
			bytesTotal = ev.bytesTotal;
		}
		private function loadComplete(ev:Event):void{
			
			state = STATE_SUC;
		}
		private function loadError(ev:IOErrorEvent):void{
			
			state = STATE_ERR;
			trace(this, ev);
		}

		public function checkLoading():Boolean {
			
			return state == STATE_LOADING;
		}
		public function checkLoadedError():Boolean {
			
			return state == STATE_ERR;
		}
		
		//complete イベント発生前に
		//対象ファイルの読み込みが完了しているかどうか調査
		public function checkLoadComplete():Boolean{
			
			return state == STATE_SUC || checkLoadBytesComplete();
		}
		private function checkLoadBytesComplete():Boolean{
			
			if(bytesLoaded == 0) return false;
			return bytesLoaded == bytesTotal;
		}
		public function getProgressPersentage():uint{
			
			if(bytesLoaded == 0) return NaN;
			return Math.floor(bytesLoaded / bytesTotal * 100);
		}
		//override
		public function getLoadData():* { 
			return null;
		}
		
		/**
		 * close
		 */
		public function close():void{
			
			//読み込み途中での 読み込み中断処理の場合 ストリームクローズ
			if(state == STATE_LOADING && !checkLoadBytesComplete()){
				
				trace(this, "close");
				
				try{
					closeLoader();
					
				//読み込みが開始していない場合の close 呼び出し
				}catch(e:Error){
					
					//trace(ClassCreator.getClassName(this), e);
				}
			}
		}
		//override
		protected function closeLoader():void{}
		
		/**
		 * unload
		 */
		public function initializeUnloaded():void{
			
			close();
			ev.addEventListener(Event.UNLOAD, unloadListener);
			unloadLoader();
			
			if(state != STATE_SUC || !checkLoadBytesComplete()) state = STATE_UNLOAD;
		}
		//override
		protected function unloadLoader():void{}
		
		private function unloadListener(ev:Event):void{
			
			state = STATE_UNLOAD;
		}
		public function finishUnloaded():void{
			
			releaseEventListener();
			
			if(ev.hasEventListener(Event.UNLOAD))
				ev.removeEventListener(Event.UNLOAD, unloadListener);
		}
		
		/*
		private var logTxt:TextField;
		public function set _logTxt(logTxt:TextField):void{
			
			this.logTxt = logTxt;
		}
		 * 
		 */
		
		/*
		public function get _loaderKind():uint {
			return loaderKind;
		}
		 * 
		 */
		
		public function get _state():uint {
			return state;
		}
	}
}
