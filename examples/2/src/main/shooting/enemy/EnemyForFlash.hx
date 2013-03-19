package shooting.enemy;

import flash.display.DisplayObjectContainer;

class EnemyForFlash extends Enemy{

	public function new(layer:DisplayObjectContainer){

		super();
		layer.addChild(view);
	}
}
