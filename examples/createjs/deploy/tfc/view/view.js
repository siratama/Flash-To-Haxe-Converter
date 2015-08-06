(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 550,
	height: 400,
	fps: 24,
	color: "#000000",
	manifest: [
		{src:"images/_0.png", id:"_0"},
		{src:"images/_1.png", id:"_1"},
		{src:"images/_2.png", id:"_2"},
		{src:"images/_3.png", id:"_3"}
	]
};



// symbols:



(lib._0 = function() {
	this.initialize(img._0);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);


(lib._1 = function() {
	this.initialize(img._1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);


(lib._2 = function() {
	this.initialize(img._2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);


(lib._3 = function() {
	this.initialize(img._3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);


(lib._3_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib._3();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);


(lib._2_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib._2();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);


(lib._1_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib._1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);


(lib._0_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib._0();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);


(lib.shootingplayerPlayerMovieClip = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// player.psd
	this.instance = new lib._0_1();
	this.instance.setTransform(18,17,1,1,0,0,0,18,17);

	this.instance_1 = new lib._1_1();
	this.instance_1.setTransform(18,17,1,1,0,0,0,18,17);

	this.instance_2 = new lib._2_1();
	this.instance_2.setTransform(18,17,1,1,0,0,0,18,17);

	this.instance_3 = new lib._3_1();
	this.instance_3.setTransform(18,17,1,1,0,0,0,18,17);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},2).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_3}]},2).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);


// stage content:
(lib.view = function() {
	this.initialize();

	// guide
	this.instance = new lib.shootingplayerPlayerMovieClip();
	this.instance.setTransform(66,123,1,1,0,0,0,18,17);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(323,306,36,34);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;