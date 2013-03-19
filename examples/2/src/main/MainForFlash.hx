package;

import shooting.enemy.EnemyForFlash;
import shooting.player.PlayerForFlash;
import flash.display.Sprite;
import flash.events.Event;

class MainForFlash extends Main{
	
	private var stage:Sprite;

	public static function main() {

		new MainForFlash();
	}
	public function new(){

		stage = flash.Lib.current;
		stage.addEventListener(Event.ENTER_FRAME, run);

		super();
	}
	override private function initializeToGameScene(){

		playerClass = PlayerForFlash;
		playerClassArguments.push(stage);

		enemyClass = EnemyForFlash;
		enemyClassArguments.push(stage);

		super.initializeToGameScene();
	}
}

