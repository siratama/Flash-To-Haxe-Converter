(function (lib, img, cjs) {

var p; // shortcut to reference prototypes
var rect; // used to reference frame bounds

// stage content:
(lib.view = function() {
	this.initialize();

	// scene
	this.instance = new lib.shootingsceneGameOverView();

	// guide
	this.instance_1 = new lib.shootingeffectExplosionView();
	this.instance_1.setTransform(67,106);

	this.playerPosition = new lib.shootingplayerView();
	this.playerPosition.setTransform(52,195);

	// game area
	this.gameAreaView = new lib.shootingareaGameAreaView();
	this.gameAreaView.setTransform(0,20);

	// click area
	this.instance_2 = new lib.shootingareaClickAreaView();
	this.instance_2.setTransform(275,200,1,1,0,0,0,275,200);

	this.addChild(this.instance_2,this.gameAreaView,this.playerPosition,this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,550,400);
p.frameBounds = [rect];


// symbols:
(lib._0 = function() {
	this.initialize(img._0);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);


(lib._1 = function() {
	this.initialize(img._1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);


(lib._1_1 = function() {
	this.initialize(img._1_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,60,45);


(lib._2 = function() {
	this.initialize(img._2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);


(lib._2_1 = function() {
	this.initialize(img._2_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,57,45);


(lib._3 = function() {
	this.initialize(img._3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);


(lib._3_1 = function() {
	this.initialize(img._3_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,57,51);


(lib.button = function() {
	this.initialize(img.button);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,154,33);


(lib.button_click_start = function() {
	this.initialize(img.button_click_start);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,108,14);


(lib.button_retry = function() {
	this.initialize(img.button_retry);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,56,14);


(lib.logo_demo = function() {
	this.initialize(img.logo_demo);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,54,22);


(lib.logo_html5 = function() {
	this.initialize(img.logo_html5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,58,20);


(lib.logo_shooting = function() {
	this.initialize(img.logo_shooting);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,88,22);


(lib.logo_Toolkit_for_createJS_Haxe = function() {
	this.initialize(img.logo_Toolkit_for_createJS_Haxe);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,128,6);


(lib.shootingenemyTestBitmap = function() {
	this.initialize(img.shootingenemyTestBitmap);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,60,45);


(lib.text_game_over = function() {
	this.initialize(img.text_game_over);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,106,18);


(lib.shootingTest = function() {
	this.initialize();

	// レイヤー 1
	this.testTxt = new cjs.Text("あいうえお", "12px BM aztec", "#FF9900");
	this.testTxt.lineHeight = 14;
	this.testTxt.lineWidth = 125;
	this.testTxt.setTransform(9,10);

	this.addChild(this.testTxt);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(9,10,129,20);
p.frameBounds = [rect];


(lib.shootingshotView = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgSA8IAAgpIAlAAIAAApgAgSgSIAAgpIAlAAIAAApg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(-1.9,-5.9,4,12);
p.frameBounds = [rect];


(lib.shootingareaGameAreaView = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("Egq9AcIMAAAg4PMBV6AAAMAAAA4Pg");
	this.shape.setTransform(275,180);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,550,360);
p.frameBounds = [rect];


(lib.shootingareaClickAreaView = function() {
	this.initialize();

	// レイヤー 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#111111").s().p("Egq9AcHMAAAg4OMBV6AAAMAAAA4Og");
	this.shape.setTransform(275,200);

	// レイヤー 1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Egq9AfPMAAAg+eMBV6AAAMAAAA+eg");
	this.shape_1.setTransform(275,200);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,550,400);
p.frameBounds = [rect];


(lib.playerWhiteView = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ah2CqIAAgUIgVAAIAAgVIgUAAIAAgUIgUAAIAAhQIAUAAIAAg5IgUAAIAAhQIAUAAIAAgVIAUAAIAAgUIAVAAIAAgUIA7AAIAAAUIApAAIAAAUIAlAAIAAAVIApAAIAAAUIAnAAIAAATIApAAIAAAUIAUAAIAAAVIAUAAIAAA5IgUAAIAAAUIgUAAIAAAVIgpAAIAAAUIgnAAIAAATIgpAAIAAAUIglAAIAAAVIgpAAIAAAUg");
	this.shape.setTransform(18,17);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,36,34);
p.frameBounds = [rect];


(lib.circle_line = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(1,1,1).p("ABqhqQAuAtAAA9QAABAguAsQgsAsg+AAQg/AAgsgsQgsgsAAhAQAAg9AsgtQAsgtA/AAQA+AAAsAtg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(-15.2,-15.2,30.5,30.5);
p.frameBounds = [rect];


(lib.circle = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhrBsQgsgsAAhAQAAg9AsgtQAtgtA+AAQA+AAAsAtQAuAtAAA9QAABAguAsQgsAsg+AAQg+AAgtgsg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(-15.2,-15.2,30.5,30.5);
p.frameBounds = [rect];


(lib._3_2 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib._3();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,36,34);
p.frameBounds = [rect];


(lib._2_2 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib._2();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,36,34);
p.frameBounds = [rect];


(lib._1_2 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib._1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,36,34);
p.frameBounds = [rect];


(lib._0_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib._0();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,36,34);
p.frameBounds = [rect];


(lib.hitarea = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AhFBNIAAicICLADIAACcg");
	this.shape.setTransform(7,8);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,14,16);
p.frameBounds = [rect];


(lib.text_game_over_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.text_game_over();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,106,18);
p.frameBounds = [rect];


(lib.logo_Toolkit_for_createJS_Haxe_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.logo_Toolkit_for_createJS_Haxe();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,128,6);
p.frameBounds = [rect];


(lib.logo_shooting_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.logo_shooting();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,88,22);
p.frameBounds = [rect];


(lib.logo_html5_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.logo_html5();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,58,20);
p.frameBounds = [rect];


(lib.logo_demo_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.logo_demo();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,54,22);
p.frameBounds = [rect];


(lib.button_retry_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.button_retry();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,56,14);
p.frameBounds = [rect];


(lib.button_click_start_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.button_click_start();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,108,14);
p.frameBounds = [rect];


(lib.button_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.button();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,154,33);
p.frameBounds = [rect];


(lib.test_point = function() {
	this.initialize();

}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,0,0);
p.frameBounds = [rect];


(lib._3_3 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_1 = new lib._3_1();

	this.addChild(this.instance_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,57,51);
p.frameBounds = [rect];


(lib._2_3 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_1 = new lib._2_1();

	this.addChild(this.instance_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,57,45);
p.frameBounds = [rect];


(lib._1_3 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_1 = new lib._1_1();

	this.addChild(this.instance_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,60,45);
p.frameBounds = [rect];


(lib.explosion_square = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AhjBjIAAjGIDGAAIAADGg");
	this.shape.setTransform(10,10);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,20,20);
p.frameBounds = [rect];


(lib.damage_effect_square = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgTATIAAgmIAmAAIAAAmg");
	this.shape.setTransform(2,2);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = rect = new cjs.Rectangle(0,0,4,4);
p.frameBounds = [rect];


(lib.shootingTest2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 2
	this.testA = new lib.explosion_square();
	this.testA.setTransform(10,10,1,1,0,0,0,10,10);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.testA}]}).wait(10));

	// レイヤー 1
	this.testB = new lib.explosion_square();
	this.testB.setTransform(40,40,1,1,0,0,0,10,10);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.testB}]}).wait(10));

	// レイヤー 3
	this.testC = new lib.explosion_square();
	this.testC.setTransform(70.1,80.2,1,1,0,0,0,10,10);

	this.timeline.addTween(cjs.Tween.get(this.testC).to({guide:{path:[70.2,80.2,155,63.6,239.8,47.1]}},9).wait(1));

	// レイヤー 5 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AihCpQhDhGgBhjQABhiBDhHQBDhGBeAAQBfAABDBGQBDBHAABiQAABjhDBGQhDBHhfAAQheAAhDhHg");
	mask.setTransform(16,108);

	// レイヤー 6
	this.testD = new lib.explosion_square();
	this.testD.setTransform(20,90,1,1,0,0,0,10,10);

	this.testD.mask = mask;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.testD}]}).wait(10));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,80.1,100);
p.frameBounds = [rect, new cjs.Rectangle(0,0,98.9,100), new cjs.Rectangle(0,0,117.8,100), new cjs.Rectangle(0,0,136.7,100), new cjs.Rectangle(0,0,155.5,100), new cjs.Rectangle(0,0,174.4,100), new cjs.Rectangle(0,0,193.3,100), new cjs.Rectangle(0,0,212.1,100), new cjs.Rectangle(0,0,231,100), new cjs.Rectangle(0,0,250,100)];


(lib.shootingplayerView = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_1 = function() {
		//this.gotoAndStop(3);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(1).call(this.frame_1).wait(6));

	// hitarea
	this.hitarea = new lib.hitarea();
	this.hitarea.setTransform(6,9);
	this.hitarea.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.hitarea}]}).wait(8));

	// player.psd
	this.instance = new lib._0_1();
	this.instance.setTransform(18,17,1,1,0,0,0,18,17);

	this.instance_1 = new lib._1_2();
	this.instance_1.setTransform(18,17,1,1,0,0,0,18,17);

	this.instance_2 = new lib._2_2();
	this.instance_2.setTransform(18,17,1,1,0,0,0,18,17);

	this.instance_3 = new lib._3_2();
	this.instance_3.setTransform(18,17,1,1,0,0,0,18,17);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},2).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_3}]},2).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,36,34);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect];


(lib.shootingplayerSavingPowerFrontView = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{max:20});

	// timeline functions:
	this.frame_5 = function() {
		playSound("shootingseSavingPower");
	}
	this.frame_20 = function() {
		playSound("shootingsePowerMax");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(5).call(this.frame_5).wait(15).call(this.frame_20).wait(5));

	// player white
	this.instance = new lib.playerWhiteView("synched",0);
	this.instance.setTransform(18,17,1,1,0,0,0,18,17);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(20).to({startPosition:0,_off:false},0).to({alpha:0},4).to({_off:true},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,0,0);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(0,0,36,34), rect, rect, rect, rect, new cjs.Rectangle(0,0,0,0)];


(lib.shootingenemyView = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// hitarea
	this.hitarea_1 = new lib.hitarea();
	this.hitarea_1.setTransform(6,9);
	this.hitarea_1.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.hitarea_1}]}).wait(12));

	// kaba.psd
	this.instance_4 = new lib._1_3();
	this.instance_4.setTransform(30,25.5,1,1,0,0,0,30,22.5);

	this.instance_5 = new lib._2_3();
	this.instance_5.setTransform(28.5,25.5,1,1,0,0,0,28.5,22.5);

	this.instance_6 = new lib._3_3();
	this.instance_6.setTransform(28.5,25.5,1,1,0,0,0,28.5,25.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4}]}).to({state:[{t:this.instance_5}]},6).to({state:[{t:this.instance_6}]},2).to({state:[{t:this.instance_5}]},2).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,3,60,45);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(0,3,57,45), rect, rect=new cjs.Rectangle(0,0,57,51), rect, rect=new cjs.Rectangle(0,3,57,45), rect];


(lib.shootingeffectExplosionView = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.explosion_square("synched",0);
	this.instance.setTransform(0,0,0.2,0.2,0,0,0,10,10);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:21},7).to({_off:true},1).wait(1));

	// レイヤー 2
	this.instance_1 = new lib.explosion_square("synched",0);
	this.instance_1.setTransform(0,0,0.2,0.2,0,0,0,10,10);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({y:-20.8},7).to({_off:true},1).wait(1));

	// レイヤー 3
	this.instance_2 = new lib.explosion_square("synched",0);
	this.instance_2.setTransform(0,0,0.2,0.2,0,0,0,10,10);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({x:16,y:13},7).to({_off:true},1).wait(1));

	// レイヤー 4
	this.instance_3 = new lib.explosion_square("synched",0);
	this.instance_3.setTransform(0,0,0.2,0.2,0,0,0,10,10);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({x:-13.8,y:-14.8},7).to({_off:true},1).wait(1));

	// レイヤー 5
	this.instance_4 = new lib.explosion_square("synched",0);
	this.instance_4.setTransform(0,0,0.2,0.2,0,0,0,10,10);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({x:21,y:-0.8},7).to({_off:true},1).wait(1));

	// レイヤー 6
	this.instance_5 = new lib.explosion_square("synched",0);
	this.instance_5.setTransform(0,0,0.2,0.2,0,0,0,10,10);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({x:-20.8,y:-0.8},7).to({_off:true},1).wait(1));

	// レイヤー 7
	this.instance_6 = new lib.explosion_square("synched",0);
	this.instance_6.setTransform(0,0,0.2,0.2,0,0,0,10,10);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({x:-14.8,y:14},7).to({_off:true},1).wait(1));

	// レイヤー 8
	this.instance_7 = new lib.explosion_square("synched",0);
	this.instance_7.setTransform(0,0,0.2,0.2,0,0,0,10,10);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({x:14,y:-14.8},7).to({_off:true},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-1.9,-1.9,4,4);
p.frameBounds = [rect, new cjs.Rectangle(-4.9,-4.9,10,10), new cjs.Rectangle(-7.9,-7.9,16,16), new cjs.Rectangle(-10.9,-10.9,22,22), new cjs.Rectangle(-13.9,-13.9,28,28), new cjs.Rectangle(-16.9,-16.9,34,34), new cjs.Rectangle(-19.9,-19.9,40,40), new cjs.Rectangle(-22.9,-22.9,46,46), new cjs.Rectangle(0,0,0,0)];


(lib.shootingeffectDamageEffectView = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 6 コピー 4
	this.instance = new lib.damage_effect_square("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:-19.8,y:21,alpha:0.289},9,cjs.Ease.get(1)).to({_off:true},1).wait(1));

	// レイヤー 6 コピー 3
	this.instance_1 = new lib.damage_effect_square("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({x:-26.8,y:-0.8,alpha:0.289},9,cjs.Ease.get(1)).to({_off:true},1).wait(1));

	// レイヤー 6 コピー 2
	this.instance_2 = new lib.damage_effect_square("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({x:-19.8,y:-9.8,alpha:0.289},9,cjs.Ease.get(1)).to({_off:true},1).wait(1));

	// レイヤー 6 コピー
	this.instance_3 = new lib.damage_effect_square("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({x:-29.8,y:7,alpha:0.289},9,cjs.Ease.get(1)).to({_off:true},1).wait(1));

	// レイヤー 6
	this.instance_4 = new lib.damage_effect_square("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({x:-35.8,y:-20.8,alpha:0.289},9,cjs.Ease.get(1)).to({_off:true},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,4,4);
p.frameBounds = [rect, new cjs.Rectangle(-7.5,-4.3,7.4,12.8), new cjs.Rectangle(-14.1,-8.2,10.3,20.6), new cjs.Rectangle(-19.9,-11.6,12.9,27.3), new cjs.Rectangle(-24.8,-14.4,15.1,33), new cjs.Rectangle(-28.8,-16.8,16.9,37.7), new cjs.Rectangle(-31.9,-18.6,18.2,41.3), new cjs.Rectangle(-34.1,-19.9,19.2,43.9), new cjs.Rectangle(-35.5,-20.7,19.8,45.5), new cjs.Rectangle(-35.9,-20.9,20,46), new cjs.Rectangle(0,0,0,0)];


(lib.circle_effect = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// circle
	this.instance = new lib.circle("synched",0);
	this.instance.setTransform(17,17);
	this.instance.alpha = 0.59;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1.72,scaleY:1.72,alpha:0.191},14).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(1.8,1.8,30.5,30.5);
p.frameBounds = [rect, new cjs.Rectangle(1,1,32.1,32.1), new cjs.Rectangle(0.2,0.2,33.6,33.6), new cjs.Rectangle(-0.6,-0.6,35.3,35.3), new cjs.Rectangle(-1.3,-1.3,36.8,36.8), new cjs.Rectangle(-2.1,-2.1,38.4,38.4), new cjs.Rectangle(-2.9,-2.9,39.9,39.9), new cjs.Rectangle(-3.7,-3.7,41.5,41.5), new cjs.Rectangle(-4.5,-4.5,43.1,43.1), new cjs.Rectangle(-5.3,-5.3,44.7,44.7), new cjs.Rectangle(-6,-6,46.2,46.2), new cjs.Rectangle(-6.8,-6.8,47.8,47.8), new cjs.Rectangle(-7.6,-7.6,49.4,49.4), new cjs.Rectangle(-8.4,-8.4,51,51), new cjs.Rectangle(-9.2,-9.2,52.5,52.5)];


(lib.shootingsceneOpeningView = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// enemy
	this.instance = new lib.shootingenemyView();
	this.instance.setTransform(585,198.5,1,1,0,0,0,30,25.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:304},45).wait(1));

	// player
	this.instance_1 = new lib.shootingplayerView();
	this.instance_1.setTransform(-25.9,202,1,1,0,0,0,18,17);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({x:214},45).wait(1));

	// 2
	this.instance_2 = new lib.logo_html5_1();
	this.instance_2.setTransform(186,126,1,1,0,0,0,29,10);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({_off:false},0).to({y:136,alpha:1},6,cjs.Ease.get(-0.99)).wait(39));

	// 3
	this.instance_3 = new lib.logo_shooting_1();
	this.instance_3.setTransform(265,149,1,1,0,0,0,44,11);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(4).to({_off:false},0).to({y:139,alpha:1},6,cjs.Ease.get(-0.99)).wait(36));

	// 4
	this.instance_4 = new lib.logo_demo_1();
	this.instance_4.setTransform(342,129,1,1,0,0,0,27,11);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(7).to({_off:false},0).to({y:139,alpha:1},6,cjs.Ease.get(-0.99)).wait(33));

	// 1
	this.instance_5 = new lib.logo_Toolkit_for_createJS_Haxe_1();
	this.instance_5.setTransform(262,107,1,1,0,0,0,64,3);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(10).to({_off:false},0).to({y:117,alpha:1},6,cjs.Ease.get(-0.99)).wait(30));

	// レイヤー 8
	this.instance_6 = new lib.button_click_start_1();
	this.instance_6.setTransform(265,273,1,1,0,0,0,54,7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6}]}).wait(46));

	// レイヤー 6
	this.clickStartBtn = new lib.button_1();
	this.clickStartBtn.setTransform(264,272.5,1,1,0,0,0,77,16.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.clickStartBtn}]}).wait(46));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-43.9,176,659,113);
p.frameBounds = [rect, new cjs.Rectangle(-38.6,116,647.4,173), new cjs.Rectangle(-33.3,116.3,635.9,172.7), new cjs.Rectangle(-27.9,117.1,624.3,171.9), new cjs.Rectangle(-22.6,118.5,612.7,170.5), new cjs.Rectangle(-17.3,120.5,601.2,168.6), new cjs.Rectangle(-11.9,123,589.6,166.1), new cjs.Rectangle(-6.6,118,578,171), new cjs.Rectangle(-1.3,118.3,566.4,170.7), new cjs.Rectangle(4,119.1,554.8,169.9), new cjs.Rectangle(9.4,104,543.2,185), new cjs.Rectangle(14.7,104.3,531.7,184.7), new cjs.Rectangle(20,105.1,520.1,183.9), new cjs.Rectangle(25.4,106.5,508.5,182.5), new cjs.Rectangle(30.7,108.5,497,180.6), new cjs.Rectangle(36,111,485.4,178.1), new cjs.Rectangle(41.4,114,473.8,175), new cjs.Rectangle(46.7,114,462.2,175), new cjs.Rectangle(52,114,450.6,175), new cjs.Rectangle(57.4,114,439,175), new cjs.Rectangle(62.7,114,427.5,175), new cjs.Rectangle(68,114,415.9,175), new cjs.Rectangle(73.4,114,404.3,175), new cjs.Rectangle(78.7,114,392.8,175), new cjs.Rectangle(84,114,381.2,175), new cjs.Rectangle(89.4,114,369.6,175), new cjs.Rectangle(94.7,114,358,175), new cjs.Rectangle(100,114,346.4,175), new cjs.Rectangle(105.4,114,334.8,175), new cjs.Rectangle(110.7,114,323.3,175), new cjs.Rectangle(116,114,311.7,175), new cjs.Rectangle(121.4,114,300.1,175), new cjs.Rectangle(126.7,114,288.6,175), new cjs.Rectangle(132,114,277,175), new cjs.Rectangle(137.4,114,265.4,175), new cjs.Rectangle(142.7,114,253.8,175), new cjs.Rectangle(148,114,242.2,175), new cjs.Rectangle(153.4,114,230.6,175), new cjs.Rectangle(157,114,220.7,175), new cjs.Rectangle(157,114,214.5,175), rect=new cjs.Rectangle(157,114,212,175), rect, rect, rect, rect, rect];


(lib.shootingsceneGameOverView = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// player
	this.instance = new lib.shootingplayerView();
	this.instance.setTransform(261,215,1,1,0,0,0,18,17);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).wait(21));

	// 2
	this.instance_1 = new lib.logo_html5_1();
	this.instance_1.setTransform(186,126,1,1,0,0,0,29,10);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({_off:false},0).to({y:136,alpha:1},4,cjs.Ease.get(-0.99)).wait(16));

	// 3
	this.instance_2 = new lib.logo_shooting_1();
	this.instance_2.setTransform(265,149,1,1,0,0,0,44,11);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2).to({_off:false},0).to({y:139,alpha:1},4,cjs.Ease.get(-0.99)).wait(15));

	// 4
	this.instance_3 = new lib.logo_demo_1();
	this.instance_3.setTransform(342,129,1,1,0,0,0,27,11);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(3).to({_off:false},0).to({y:139,alpha:1},4,cjs.Ease.get(-0.99)).wait(14));

	// 1
	this.instance_4 = new lib.logo_Toolkit_for_createJS_Haxe_1();
	this.instance_4.setTransform(262,107,1,1,0,0,0,64,3);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(4).to({_off:false},0).to({y:117,alpha:1},4,cjs.Ease.get(-0.99)).wait(13));

	// レイヤー 4
	this.instance_5 = new lib.text_game_over_1();
	this.instance_5.setTransform(263,156,1,1,0,0,0,53,9);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(7).to({_off:false},0).to({y:166,alpha:1},13,cjs.Ease.get(-0.99)).wait(1));

	// レイヤー 7
	this.instance_6 = new lib.button_retry_1();
	this.instance_6.setTransform(265,273,1,1,0,0,0,28,7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6}]}).wait(21));

	// レイヤー 6
	this.retryBtn = new lib.button_1();
	this.retryBtn.setTransform(264,272.5,1,1,0,0,0,77,16.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.retryBtn}]}).wait(21));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(187,198,154,91);
p.frameBounds = [rect, new cjs.Rectangle(157,116,184,173), new cjs.Rectangle(157,116.7,184,172.4), new cjs.Rectangle(157,118,212,171), new cjs.Rectangle(157,104,212,185), new cjs.Rectangle(157,104.7,212,184.4), new cjs.Rectangle(157,106.5,212,182.5), new cjs.Rectangle(157,109.7,212,179.4), rect=new cjs.Rectangle(157,114,212,175), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


(lib.shootingplayerSavingPowerBackView = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// line
	this.instance = new lib.circle_line("synched",0);
	this.instance.setTransform(18.9,16.9);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(19).to({startPosition:0,_off:false},0).to({scaleX:2.54,scaleY:2.54,alpha:0},5,cjs.Ease.get(1)).to({_off:true},1).wait(1));

	// circle
	this.instance_1 = new lib.circle_effect("synched",0,false);
	this.instance_1.setTransform(17,17,1.457,1.457,0,0,0,17,17);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(5).to({startPosition:0,_off:false},0).to({_off:true},15).wait(6));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,0,0);
p.frameBounds = [rect, rect, rect, rect, rect, new cjs.Rectangle(-5.1,-5.1,44.5,44.5), new cjs.Rectangle(-6.3,-6.3,46.7,46.7), new cjs.Rectangle(-7.4,-7.4,49,49), new cjs.Rectangle(-8.6,-8.6,51.4,51.4), new cjs.Rectangle(-9.7,-9.7,53.7,53.7), new cjs.Rectangle(-10.9,-10.9,55.9,55.9), new cjs.Rectangle(-12,-12,58.2,58.2), new cjs.Rectangle(-13.1,-13.1,60.5,60.5), new cjs.Rectangle(-14.3,-14.3,62.8,62.8), new cjs.Rectangle(-15.5,-15.5,65.1,65.1), new cjs.Rectangle(-16.6,-16.6,67.4,67.4), new cjs.Rectangle(-17.7,-17.7,69.7,69.7), new cjs.Rectangle(-18.8,-18.8,71.9,71.9), new cjs.Rectangle(-20.1,-20.1,74.3,74.3), new cjs.Rectangle(-21.2,-21.2,76.5,76.5), new cjs.Rectangle(-4.8,-6.8,47.5,47.5), new cjs.Rectangle(-11.4,-13.4,60.7,60.6), new cjs.Rectangle(-16.1,-18.1,70.1,70.1), new cjs.Rectangle(-18.9,-20.9,75.7,75.7), new cjs.Rectangle(-19.9,-21.9,77.6,77.6), new cjs.Rectangle(0,0,0,0)];

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;