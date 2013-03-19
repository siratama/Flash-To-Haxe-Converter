package com.dango_itimi.utils {

	/**
	 * 
	 */
	public class StringUtil {
		
		public static const CR:String = String.fromCharCode(13);	
		public static const LF:String = String.fromCharCode(10);	
		
		/**
		 * 指定文字列の頭に指定桁数分 0 を付与する
		 */
		public static function getAddedZeroPlace(numStr:String, addedZeroPlace:Number):String{
			
			var len:int = addedZeroPlace - numStr.length;
			for (var i:uint = 0; i < len; i++) numStr = "0" + numStr;
			return numStr;
		}
		
		/**
		 * 改行で区切られた文字列を一行ごとに配列に設定
		 */
		//System.useCodePage = true;
		public static function getSplitedStringsByEnter(str:String):Array{
			
			str = replaceEnterCode(str, CR + LF, CR);
			str = replaceEnterCode(str, LF, CR);
			
			return str.split(CR);
		}
		private static function replaceEnterCode(org:String, from:String, to:String):String{
			var arr:Array = org.split(from);
			return arr.join(to);
		}
	}
}
