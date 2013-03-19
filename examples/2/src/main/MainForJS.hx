package ;

import shooting.player.PlayerForJS;
import shooting.enemy.EnemyForJS;
import createjs.easeljs.Stage;
import createjs.easeljs.Ticker;
import createjs.easeljs.Touch;
import js.Lib;

class MainForJS extends Main{

	private var stage:Stage;

	public function new(){

		stage = new Stage(Lib.document.getElementById("canvas"));
		stage.snapToPixelEnabled = true;
		if(Touch.isSupported()) Touch.enable(stage);

		Ticker.useRAF = true;
		Ticker.setFPS(24);
		Ticker.addEventListener("tick", run);

		super();
	}
	override private function initializeToGameScene(){

		playerClass = PlayerForJS;
		playerClassArguments.push(stage);

		enemyClass = EnemyForJS;
		enemyClassArguments.push(stage);

		super.initializeToGameScene();
	}
	override private function runForGameScene(){

		super.runForGameScene();
		stage.update();
	}
}
