package com.dango_itimi.net.action {

	/**
	 * 
	 */
	public interface ILoadAction {

		function destroy():void;
		
		function loadStart():void;
		function loadError():void;
		function loadSuccess():void;
		
		function watchProgress(progressPersentage:uint):void;
		function viewRest():Boolean;
	}
}
