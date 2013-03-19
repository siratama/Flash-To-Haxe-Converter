package com.dango_itimi.net.core {
	
	import flash.system.ApplicationDomain;
	import flash.utils.ByteArray;

	/**
	 * 
	 */
	public class BytesBinalyLoader extends BinaryLoader {

		private var bytes:ByteArray;
		
		public function BytesBinalyLoader(applicationDomain:ApplicationDomain = null) {
			
			super(null, applicationDomain);
		}

		override protected function initializeLoadedChild():void{

			loader.loadBytes(bytes);
		}
		
		public function set _bytes(bytes:ByteArray):void {
			this.bytes = bytes;
		}
	}
}
