package;

import shooting.enemy.Enemy;
import shooting.player.Player;

class Main {
	
	private var mainFunction:Void->Void;

	private var playerClass:Class<Player>;
	private var playerClassArguments:Array<Dynamic>;
	private var player:Player;

	private var enemyClass:Class<Enemy>;
	private var enemyClassArguments:Array<Dynamic>;
	private var enemy:Enemy;

	public function new(){

		playerClassArguments = [];
		enemyClassArguments = [];

		initializeToGameScene();
	}
	private function run(event){
		mainFunction();
	}
	private function initializeToGameScene(){

		player = Type.createInstance(playerClass, playerClassArguments);
		enemy = Type.createInstance(enemyClass, enemyClassArguments);

		mainFunction = runForGameScene;
	}
	private function runForGameScene(){

		player.run();
		enemy.run();
	}
}

