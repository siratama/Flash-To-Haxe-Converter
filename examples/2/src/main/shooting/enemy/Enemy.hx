package shooting.enemy;

class Enemy {

	private var view:View;

	public function new(){

		view = new View();
		view.x = 400;
		view.y = 200;
	}
	public function run(){

		view.x -= 1;
	}
}
