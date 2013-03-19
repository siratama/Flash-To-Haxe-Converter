package shooting.enemy;

import createjs.easeljs.Container;

class EnemyForJS extends Enemy{

	public function new(layer:Container){

		super();
		layer.addChild(view);
	}
}
