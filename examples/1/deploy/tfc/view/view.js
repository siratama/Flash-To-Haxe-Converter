(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

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
p.nominalBounds = new cjs.Rectangle(0,0,550,400);


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


(lib.shootingTestBmp = function() {
	this.initialize(img.shootingTestBmp);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,60,45);


(lib.text_game_over = function() {
	this.initialize(img.text_game_over);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,106,18);


(lib.shootingTest = function() {
	this.initialize();

}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.shootingshotView = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgSA8IAAgpIAlAAIAAApgAgSgSIAAgpIAlAAIAAApg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-1.9,-5.9,4,12);


(lib.shootingareaGameAreaView = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("Egq9AcIMAAAg4PMBV6AAAMAAAA4Pg");
	this.shape.setTransform(275,180);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,550,360);


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
p.nominalBounds = new cjs.Rectangle(0,0,550,400);


(lib.playerWhiteView = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ah2CqIAAgUIgVAAIAAgVIgUAAIAAgUIgUAAIAAhQIAUAAIAAg5IgUAAIAAhQIAUAAIAAgVIAUAAIAAgUIAVAAIAAgUIA7AAIAAAUIApAAIAAAUIAlAAIAAAVIApAAIAAAUIAnAAIAAATIApAAIAAAUIAUAAIAAAVIAUAAIAAA5IgUAAIAAAUIgUAAIAAAVIgpAAIAAAUIgnAAIAAATIgpAAIAAAUIglAAIAAAVIgpAAIAAAUg");
	this.shape.setTransform(18,17);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);


(lib.circle_line = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(1,1,1).p("ABqhqQAuAtAAA9QAABAguAsQgsAsg+AAQg/AAgsgsQgsgsAAhAQAAg9AsgtQAsgtA/AAQA+AAAsAtg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-15.2,-15.2,30.5,30.5);


(lib.circle = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhrBsQgsgsAAhAQAAg9AsgtQAtgtA+AAQA+AAAsAtQAuAtAAA9QAABAguAsQgsAsg+AAQg+AAgtgsg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-15.2,-15.2,30.5,30.5);


(lib._3_2 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib._3();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);


(lib._2_2 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib._2();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,36,34);


(lib._1_2 = function() {
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


(lib.hitarea = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AhFBNIAAicICLADIAACcg");
	this.shape.setTransform(7,8);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,14,16);


(lib.text_game_over_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.text_game_over();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,106,18);


(lib.logo_Toolkit_for_createJS_Haxe_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.logo_Toolkit_for_createJS_Haxe();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,128,6);


(lib.logo_shooting_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.logo_shooting();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,88,22);


(lib.logo_html5_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.logo_html5();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,58,20);


(lib.logo_demo_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.logo_demo();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,54,22);


(lib.button_retry_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.button_retry();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,56,14);


(lib.button_click_start_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.button_click_start();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,108,14);


(lib.button_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.button();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,154,33);


(lib.test_point = function() {
	this.initialize();

}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib._3_3 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_1 = new lib._3_1();

	this.addChild(this.instance_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,57,51);


(lib._2_3 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_1 = new lib._2_1();

	this.addChild(this.instance_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,57,45);


(lib._1_3 = function() {
	this.initialize();

	// レイヤー 1
	this.instance_1 = new lib._1_1();

	this.addChild(this.instance_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,60,45);


(lib.explosion_square = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AhjBjIAAjGIDGAAIAADGg");
	this.shape.setTransform(10,10);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,20,20);


(lib.damage_effect_square = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgTATIAAgmIAmAAIAAAmg");
	this.shape.setTransform(2,2);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,4,4);


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
p.nominalBounds = new cjs.Rectangle(0,0,36,34);


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
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


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
p.nominalBounds = new cjs.Rectangle(0,3,60,45);


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
p.nominalBounds = new cjs.Rectangle(-1.9,-1.9,4,4);


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
p.nominalBounds = new cjs.Rectangle(0,0,4,4);


(lib.circle_effect = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// circle
	this.instance = new lib.circle("synched",0);
	this.instance.setTransform(17,17);
	this.instance.alpha = 0.59;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1.72,scaleY:1.72,alpha:0.191},14).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1.8,1.8,30.5,30.5);


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
p.nominalBounds = new cjs.Rectangle(-43.9,176,659,113);


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
p.nominalBounds = new cjs.Rectangle(187,198,154,91);


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
p.nominalBounds = new cjs.Rectangle(0,0,0,0);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;