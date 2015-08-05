package shooting;

import flash.display.MovieClip;
import flash.events.Event;
import shooting.player.Player;

class Main
{
	private var mainFunction:Void->Void;
	private var preloader:Preloader;
	private var root:MovieClip;
	private var player:Player;

	public static function main()
	{
		new Main();
	}
	public function new()
	{
		root = flash.Lib.current;
		preloader = new Preloader();

		mainFunction = preload;
		root.addEventListener(Event.ENTER_FRAME, run);
	}
	private function run(event:Event)
	{
		mainFunction();
	}
	private function preload()
	{
		if(preloader.loaded)
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
	}
}
