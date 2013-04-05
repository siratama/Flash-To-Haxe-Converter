package shooting.player;

#if flash
import flash.display.DisplayObjectContainer;
import flash.geom.Rectangle;

#elseif js
import createjs.easeljs.Container;
import com.dango_itimi.toolkit_for_createjs.Instance;
import com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil;
import com.dango_itimi.utils.RectangleUtil;
#end

class Player {

	private var view:View;

	#if flash
	private var hitareaBounds:Rectangle;

	#elseif js
	private var hitareaBounds:RectangleUtil;
	#end

	public function new(
		#if flash
		layer:DisplayObjectContainer

		#elseif js
		layer:Container
		#end
	){
		view = new View();
		view.x = 100;
		view.y = 150;
		layer.addChild(view);

		#if flash
		hitareaBounds = view.hitarea.getBounds(view.parent);

		#elseif js
		hitareaBounds = ContainerUtil.getNominalBounds(view.hitarea);
		#end

		trace(hitareaBounds);
	}
	public function run(){

		view.x += 1;
	}
}
