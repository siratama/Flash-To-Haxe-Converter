package shooting.player;

import flash.display.DisplayObjectContainer;
import flash.geom.Rectangle;

class PlayerForFlash extends Player{

	private var hitareaBounds:Rectangle;

	public function new(layer:DisplayObjectContainer){

		super();
		layer.addChild(view);

		hitareaBounds = view.hitarea.getBounds(view.parent);
		trace(hitareaBounds);
	}
}
