package shooting.player;

class Player {

	private var view:View;

	public function new(){

		view = new View();
		view.x = 100;
		view.y = 150;
	}
	public function run(){

		view.x += 1;
	}
}
