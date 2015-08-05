package shooting;

import shooting.player.Player;
import com.dango_itimi.toolkit_for_createjs.TFCLoader;
import createjs.easeljs.Stage;
import createjs.easeljs.Ticker;
import createjs.easeljs.Touch;
import js.Browser;

class Main
{
	private var mainFunction:Void->Void;
	private var root:Stage;
	private var loader:TFCLoader;
	private var player:Player;

	public static function main()
	{
		new Main();
	}
	public function new()
	{
		root = new Stage(Browser.document.getElementById("canvas"));
		if(Touch.isSupported()) Touch.enable(root);

		loader = new TFCLoader("tfc");
		loader.addMaterialDirectory("lib", "view");

		Ticker.setFPS(24);
		mainFunction = preload;
		Ticker.addEventListener("tick", run);
	}
	private function run(event){
		mainFunction();
	}
	private function preload()
	{
		loader.run();
		if(loader.isFinished())
			mainFunction = initialize;
	}
	private function initialize()
	{
		player = new Player(root);
		mainFunction = playGame;
	}
	private function playGame()
	{
		player.run();
		root.update();
	}
}
