package shooting.player;

import createjs.easeljs.Container;

class Player
{
	private var playerMovieClip:PlayerMovieClip;
	public function new(layer:Container)
	{
		playerMovieClip = new PlayerMovieClip();
		layer.addChild(playerMovieClip);
		playerMovieClip.y = 50;
	}
	public function run()
	{
		playerMovieClip.x += 1;
	}
}
