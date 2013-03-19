package shooting.enemy;

#if flash
import flash.display.DisplayObjectContainer;

#elseif js
import createjs.easeljs.Container;
#end

class Enemy {

	private var view:View;

	public function new(
		#if flash
		layer:DisplayObjectContainer

		#elseif js
		layer:Container
		#end
	){
		view = new View();
		view.x = 400;
		view.y = 200;
		layer.addChild(view);
	}
	public function run(){

		view.x -= 1;
	}
}
