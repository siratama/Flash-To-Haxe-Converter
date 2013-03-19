package;

import shooting.enemy.Enemy;
import shooting.player.Player;

#if flash
import flash.display.Sprite;
import flash.events.Event;

#elseif js
import createjs.easeljs.Stage;
import createjs.easeljs.Ticker;
import createjs.easeljs.Touch;
import js.Lib;
#end

class Main {
	
	private var mainFunction:Void->Void;
	private var player:Player;
	private var enemy:Enemy;

	#if flash
	private var stage:Sprite;

	#elseif js
	private var stage:Stage;
	#end

	public static function main() {

		new Main();
	}
	public function new(){

		#if flash
		stage = flash.Lib.current;
		stage.addEventListener(Event.ENTER_FRAME, run);

		#elseif js
		stage = new Stage(Lib.document.getElementById("canvas"));
		stage.snapToPixelEnabled = true;
		if(Touch.isSupported()) Touch.enable(stage);

		Ticker.useRAF = true;
		Ticker.setFPS(24);
		Ticker.addEventListener("tick", run);

		#end

		initializeToGameScene();
	}

	private function run(event){
		mainFunction();
	}

	private function initializeToGameScene(){

		player = new Player(stage);
		enemy = new Enemy(stage);

		mainFunction = runForGameScene;
	}
	private function runForGameScene(){

		player.run();
		enemy.run();

		#if js
		stage.update();
		#end
	}
}

