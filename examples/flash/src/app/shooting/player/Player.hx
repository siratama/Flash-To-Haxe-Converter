package shooting.player;
import flash.display.DisplayObjectContainer;
class Player
{
	private var playerMovieClip:PlayerMovieClip;
	public function new(layer:DisplayObjectContainer)
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
