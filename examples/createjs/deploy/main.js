(function () { "use strict";
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
var com = {};
com.dango_itimi = {};
com.dango_itimi.createjs = {};
com.dango_itimi.createjs.net = {};
com.dango_itimi.createjs.net.LoaderWithLoadQueue = function(useXHR,plugin) {
	if(useXHR == null) useXHR = false;
	this.loadedEventSet = [];
	this.initialize(useXHR,plugin);
};
com.dango_itimi.createjs.net.LoaderWithLoadQueue.__name__ = true;
com.dango_itimi.createjs.net.LoaderWithLoadQueue.prototype = {
	initialize: function(useXHR,plugin) {
		if(useXHR == null) useXHR = false;
		this.loadQueue = new createjs.LoadQueue(useXHR);
		this.loadQueue.addEventListener("fileload",$bind(this,this.onFileLoad));
		this.loadQueue.addEventListener("error",$bind(this,this.onFileError));
		this.loadQueue.addEventListener("complete",$bind(this,this.onComplete));
		if(plugin != null) this.loadQueue.installPlugin(plugin);
	}
	,removeEventListener: function() {
		this.loadQueue.removeEventListener("fileload",$bind(this,this.onFileLoad));
		this.loadQueue.removeEventListener("error",$bind(this,this.onFileError));
		this.loadQueue.removeEventListener("complete",$bind(this,this.onComplete));
	}
	,loadFile: function(url) {
		this.loadQueue.loadFile(url);
	}
	,loadManifest: function(manifest) {
		this.loadQueue.loadManifest(manifest);
	}
	,onFileLoad: function(event) {
		this.loadedEventSet.push(event);
	}
	,onFileError: function(event) {
		this.error = true;
	}
	,onComplete: function(event) {
	}
	,isFinished: function() {
		return this.loadQueue.loaded;
	}
	,isError: function() {
		return this.error;
	}
	,getLoadQueue: function() {
		return this.loadQueue;
	}
};
com.dango_itimi.toolkit_for_createjs = {};
com.dango_itimi.toolkit_for_createjs.MaterialURI = function(baseDirectoryName,baseSoundsDirectoryName) {
	if(baseSoundsDirectoryName == null) baseSoundsDirectoryName = "";
	this.baseDirectory = baseDirectoryName + "/";
	if(baseSoundsDirectoryName != "") this.baseSoundsDirectory = baseSoundsDirectoryName + "/"; else this.baseSoundsDirectory = "";
};
com.dango_itimi.toolkit_for_createjs.MaterialURI.__name__ = true;
com.dango_itimi.toolkit_for_createjs.MaterialURI.prototype = {
	getTemplateHtmlUri: function(materialDirectoryName) {
		return this.baseDirectory + materialDirectoryName + "/" + materialDirectoryName + ".html";
	}
	,getMaterialDirectory: function(materialDirectoryName) {
		return this.baseDirectory + materialDirectoryName + "/";
	}
	,getSoundsDirectory: function(materialDirectoryName) {
		var soundsDirectory;
		if(this.baseSoundsDirectory == "") soundsDirectory = this.baseDirectory; else soundsDirectory = this.baseSoundsDirectory;
		return soundsDirectory + materialDirectoryName + "/";
	}
	,addUri: function(manifest,materialDirectoryName) {
		var materialDirectory = this.getMaterialDirectory(materialDirectoryName);
		var soundsDirectory = this.getSoundsDirectory(materialDirectoryName);
		var _g1 = 0;
		var _g = manifest.length;
		while(_g1 < _g) {
			var i = _g1++;
			manifest[i].src = this.convertSrc(materialDirectory,soundsDirectory,manifest[i].src);
		}
	}
	,addUriToImgSrcMap: function(imgSrcMap,materialDirectoryName) {
		var materialDirectory = this.getMaterialDirectory(materialDirectoryName);
		var soundsDirectory = this.getSoundsDirectory(materialDirectoryName);
		var fields = Reflect.fields(imgSrcMap);
		var _g = 0;
		while(_g < fields.length) {
			var propertyName = fields[_g];
			++_g;
			var src = this.convertSrc(materialDirectory,soundsDirectory,Reflect.field(imgSrcMap,propertyName));
			imgSrcMap[propertyName] = src;
		}
	}
	,convertSrc: function(materialDirectory,soundsDirectory,src) {
		if(src.indexOf(".mp3") == -1) return materialDirectory + src; else return soundsDirectory + src;
	}
};
com.dango_itimi.toolkit_for_createjs.TFCLoader = function(baseDirectoryName,baseSoundsDirectoryName) {
	if(baseSoundsDirectoryName == null) baseSoundsDirectoryName = "";
	this.materialURI = new com.dango_itimi.toolkit_for_createjs.MaterialURI(baseDirectoryName,baseSoundsDirectoryName);
	this.materialDirectorySet = [];
	this.propertiesSet = [];
	this.mainFunction = $bind(this,this.parseManifest);
};
com.dango_itimi.toolkit_for_createjs.TFCLoader.__name__ = true;
com.dango_itimi.toolkit_for_createjs.TFCLoader.prototype = {
	addMaterialDirectory: function(symbolNameSpace,materialDirectoryName) {
		var properties = eval("window." + symbolNameSpace + ".properties");
		this.propertiesSet.push(properties);
		this.materialDirectorySet.push(materialDirectoryName);
	}
	,getFps: function(elementIndex) {
		if(elementIndex == null) elementIndex = 0;
		return this.propertiesSet[elementIndex].fps;
	}
	,run: function() {
		this.mainFunction();
	}
	,parseManifest: function() {
		var manifest = [];
		var _g1 = 0;
		var _g = this.materialDirectorySet.length;
		while(_g1 < _g) {
			var i = _g1++;
			var materialDirectoryName = this.materialDirectorySet[i];
			var properties = this.propertiesSet[i];
			this.materialURI.addUri(properties.manifest,materialDirectoryName);
			manifest = manifest.concat(properties.manifest);
		}
		if(manifest.length == 0) this.mainFunction = $bind(this,this.finish); else this.initializeToLoadMaterial(manifest);
	}
	,initializeToLoadMaterial: function(manifest) {
		this.materialLoader = new com.dango_itimi.toolkit_for_createjs.loader.MaterialLoader(manifest);
		this.materialLoader.load();
		this.mainFunction = $bind(this,this.loadMaterial);
	}
	,loadMaterial: function() {
		this.materialLoader.run();
		if(this.materialLoader.isFinished()) this.mainFunction = $bind(this,this.finish);
	}
	,finish: function() {
	}
	,isFinished: function() {
		return Reflect.compareMethods(this.mainFunction,$bind(this,this.finish));
	}
	,error: function() {
	}
	,isError: function() {
		return Reflect.compareMethods(this.mainFunction,$bind(this,this.error));
	}
};
com.dango_itimi.toolkit_for_createjs.loader = {};
com.dango_itimi.toolkit_for_createjs.loader.MaterialLoader = function(manifest) {
	this.manifest = manifest;
	this.images = eval("window.images||{}");
	this.loader = new com.dango_itimi.createjs.net.LoaderWithLoadQueue(false,createjs.Sound);
};
com.dango_itimi.toolkit_for_createjs.loader.MaterialLoader.__name__ = true;
com.dango_itimi.toolkit_for_createjs.loader.MaterialLoader.prototype = {
	run: function() {
		this.mainFunction();
	}
	,load: function() {
		this.loader.loadManifest(this.manifest);
		this.mainFunction = $bind(this,this.waitToFinishLoaded);
	}
	,waitToFinishLoaded: function() {
		if(this.loader.isFinished()) this.setImages();
	}
	,setImages: function() {
		var _g1 = 0;
		var _g = this.manifest.length;
		while(_g1 < _g) {
			var i = _g1++;
			var id = this.manifest[i].src;
			var result = this.loader.getLoadQueue().getResult(id);
			var item = this.loader.getLoadQueue().getItem(id);
			if(result != null && item.type == "image") this.images[item.id] = result;
		}
		this.mainFunction = $bind(this,this.finish);
	}
	,finish: function() {
	}
	,isFinished: function() {
		return Reflect.compareMethods(this.mainFunction,$bind(this,this.finish));
	}
};
var shooting = {};
shooting.Main = function() {
	this.root = new createjs.Stage(window.document.getElementById("canvas"));
	if(createjs.Touch.isSupported()) createjs.Touch.enable(this.root);
	this.loader = new com.dango_itimi.toolkit_for_createjs.TFCLoader("tfc");
	this.loader.addMaterialDirectory("lib","view");
	createjs.Ticker.setFPS(24);
	this.mainFunction = $bind(this,this.preload);
	createjs.Ticker.addEventListener("tick",$bind(this,this.run));
};
shooting.Main.__name__ = true;
shooting.Main.main = function() {
	window.addEventListener("load",function(event) {
		new shooting.Main();
	});
};
shooting.Main.prototype = {
	run: function(event) {
		this.mainFunction();
	}
	,preload: function() {
		this.loader.run();
		if(this.loader.isFinished()) this.mainFunction = $bind(this,this.initialize);
	}
	,initialize: function() {
		this.player = new shooting.player.Player(this.root);
		this.mainFunction = $bind(this,this.playGame);
	}
	,playGame: function() {
		this.player.run();
		this.root.update();
	}
};
shooting.player = {};
shooting.player.Player = function(layer) {
	this.playerMovieClip = new lib.shootingplayerPlayerMovieClip();
	layer.addChild(this.playerMovieClip);
	this.playerMovieClip.y = 50;
};
shooting.player.Player.__name__ = true;
shooting.player.Player.prototype = {
	run: function() {
		this.playerMovieClip.x += 1;
	}
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.__name__ = true;
Array.__name__ = true;
com.dango_itimi.toolkit_for_createjs.MaterialURI.EXT_HTML = ".html";
com.dango_itimi.toolkit_for_createjs.MaterialURI.EXT_MP3 = ".mp3";
com.dango_itimi.toolkit_for_createjs.MaterialURI.EXT_OGG = ".ogg";
shooting.Main.main();
})();

//# sourceMappingURL=main.js.map