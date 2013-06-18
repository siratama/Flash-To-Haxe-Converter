(function () { "use strict";
var Main = function() {
	this.stage = new createjs.Stage(js.Browser.document.getElementById("canvas"));
	this.stage.snapToPixelEnabled = true;
	if(createjs.Touch.isSupported()) createjs.Touch.enable(this.stage);
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(24);
	createjs.Ticker.addEventListener("tick",$bind(this,this.run));
	this.initializeToGameScene();
};
Main.__name__ = ["Main"];
Main.main = function() {
	new Main();
}
Main.prototype = {
	runForGameScene: function() {
		this.player.run();
		this.enemy.run();
		this.stage.update();
	}
	,initializeToGameScene: function() {
		this.player = new shooting.player.Player(this.stage);
		this.enemy = new shooting.enemy.Enemy(this.stage);
		this.mainFunction = $bind(this,this.runForGameScene);
	}
	,run: function(event) {
		this.mainFunction();
	}
	,__class__: Main
}
var Preloader = function() {
	js.Browser.window.onload = $bind(this,this.initialize);
};
Preloader.__name__ = ["Preloader"];
Preloader.main = function() {
	new Preloader();
}
Preloader.prototype = {
	initializeMain: function() {
		this.timer.stop();
		new Main();
	}
	,load: function() {
		this.loader.run();
		if(this.loader.isFinished()) this.mainFunction = $bind(this,this.initializeMain);
	}
	,run: function() {
		this.mainFunction();
	}
	,initialize: function(event) {
		this.loader = new com.dango_itimi.toolkit_for_createjs.TFCLoader("tfc");
		this.loader.addMaterialDirectory("view");
		this.timer = new haxe.Timer(100);
		this.timer.run = $bind(this,this.run);
		this.mainFunction = $bind(this,this.load);
	}
	,__class__: Preloader
}
var Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
var Type = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return o.__class__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
var com = {}
com.dango_itimi = {}
com.dango_itimi.createjs = {}
com.dango_itimi.createjs.net = {}
com.dango_itimi.createjs.net.LoaderWithLoadQueue = function(useXHR,plugin) {
	if(useXHR == null) useXHR = false;
	this.loadedEventSet = [];
	this.initialize(useXHR,plugin);
};
com.dango_itimi.createjs.net.LoaderWithLoadQueue.__name__ = ["com","dango_itimi","createjs","net","LoaderWithLoadQueue"];
com.dango_itimi.createjs.net.LoaderWithLoadQueue.prototype = {
	getLoadQueue: function() {
		return this.loadQueue;
	}
	,isError: function() {
		return this.error;
	}
	,isFinished: function() {
		return this.loadQueue.loaded;
	}
	,onComplete: function(event) {
	}
	,onFileError: function(event) {
		this.error = true;
	}
	,onFileLoad: function(event) {
		this.loadedEventSet.push(event);
	}
	,loadManifest: function(manifest) {
		this.loadQueue.loadManifest(manifest);
	}
	,loadFile: function(url) {
		this.loadQueue.loadFile(url);
	}
	,removeEventListener: function() {
		this.loadQueue.removeEventListener("fileload",$bind(this,this.onFileLoad));
		this.loadQueue.removeEventListener("error",$bind(this,this.onFileError));
		this.loadQueue.removeEventListener("complete",$bind(this,this.onComplete));
	}
	,initialize: function(useXHR,plugin) {
		if(useXHR == null) useXHR = false;
		this.loadQueue = new createjs.LoadQueue(useXHR);
		this.loadQueue.addEventListener("fileload",$bind(this,this.onFileLoad));
		this.loadQueue.addEventListener("error",$bind(this,this.onFileError));
		this.loadQueue.addEventListener("complete",$bind(this,this.onComplete));
		if(plugin != null) this.loadQueue.installPlugin(plugin);
	}
	,__class__: com.dango_itimi.createjs.net.LoaderWithLoadQueue
}
com.dango_itimi.createjs.net.manifest = {}
com.dango_itimi.createjs.net.manifest.ManifestItem = function(src,id) {
	this.src = src;
	this.id = id;
};
com.dango_itimi.createjs.net.manifest.ManifestItem.__name__ = ["com","dango_itimi","createjs","net","manifest","ManifestItem"];
com.dango_itimi.createjs.net.manifest.ManifestItem.prototype = {
	getManifestItem: function() {
		if(this.id != null) return { src : this.src, id : this.id}; else return { src : this.src};
	}
	,getId: function() {
		return this.id;
	}
	,getSrc: function() {
		return this.src;
	}
	,__class__: com.dango_itimi.createjs.net.manifest.ManifestItem
}
com.dango_itimi.createjs.net.manifest.ManifestItemSet = function() {
	this.itemSet = [];
};
com.dango_itimi.createjs.net.manifest.ManifestItemSet.__name__ = ["com","dango_itimi","createjs","net","manifest","ManifestItemSet"];
com.dango_itimi.createjs.net.manifest.ManifestItemSet.prototype = {
	createManifest: function() {
		var manifest = [];
		var _g1 = 0, _g = this.itemSet.length;
		while(_g1 < _g) {
			var i = _g1++;
			manifest.push(this.itemSet[i].getManifestItem());
		}
		return manifest;
	}
	,add: function(src,id) {
		this.itemSet.push(new com.dango_itimi.createjs.net.manifest.ManifestItem(src,id));
	}
	,__class__: com.dango_itimi.createjs.net.manifest.ManifestItemSet
}
com.dango_itimi.toolkit_for_createjs = {}
com.dango_itimi.toolkit_for_createjs.Instance = function() { }
com.dango_itimi.toolkit_for_createjs.Instance.__name__ = ["com","dango_itimi","toolkit_for_createjs","Instance"];
com.dango_itimi.toolkit_for_createjs.Instance.createWithSamePackageInstance = function(createdClassName,samePackageInstance,symbolNameSpace) {
	var packageNames = com.dango_itimi.utils.ClassUtil.getPackageNamesWithInstance(samePackageInstance);
	return com.dango_itimi.toolkit_for_createjs.Instance.create(createdClassName,packageNames,symbolNameSpace);
}
com.dango_itimi.toolkit_for_createjs.Instance.createWithSamePackageClass = function(createdClassName,samePackageClass,symbolNameSpace) {
	var packageNames = com.dango_itimi.utils.ClassUtil.getPackageNamesWithClass(samePackageClass);
	return com.dango_itimi.toolkit_for_createjs.Instance.create(createdClassName,packageNames,symbolNameSpace);
}
com.dango_itimi.toolkit_for_createjs.Instance.create = function(createdClassName,packageNames,symbolNameSpace) {
	if(symbolNameSpace == null) symbolNameSpace = "lib";
	return eval(["new ",symbolNameSpace,".",packageNames.join(""),createdClassName,"()"].join(""));
}
com.dango_itimi.toolkit_for_createjs.MaterialURI = function(baseDirectoryName,baseSoundsDirectoryName,usedSoundOgg) {
	if(usedSoundOgg == null) usedSoundOgg = false;
	if(baseSoundsDirectoryName == null) baseSoundsDirectoryName = "";
	this.baseDirectory = baseDirectoryName + "/";
	this.baseSoundsDirectory = baseSoundsDirectoryName != ""?baseSoundsDirectoryName + "/":"";
	this.usedSoundOgg = usedSoundOgg;
};
com.dango_itimi.toolkit_for_createjs.MaterialURI.__name__ = ["com","dango_itimi","toolkit_for_createjs","MaterialURI"];
com.dango_itimi.toolkit_for_createjs.MaterialURI.prototype = {
	convertSrc: function(materialDirectory,soundsDirectory,src) {
		if(src.indexOf(".mp3") == -1) return materialDirectory + src; else {
			var oggSrc = this.usedSoundOgg?"|" + soundsDirectory + src.split(".")[0] + ".ogg":"";
			return soundsDirectory + src + oggSrc;
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
	,addUri: function(manifest,materialDirectoryName) {
		var materialDirectory = this.getMaterialDirectory(materialDirectoryName);
		var soundsDirectory = this.getSoundsDirectory(materialDirectoryName);
		var _g1 = 0, _g = manifest.length;
		while(_g1 < _g) {
			var i = _g1++;
			manifest[i].src = this.convertSrc(materialDirectory,soundsDirectory,manifest[i].src);
		}
	}
	,getSoundsDirectory: function(materialDirectoryName) {
		var soundsDirectory = this.baseSoundsDirectory == ""?this.baseDirectory:this.baseSoundsDirectory;
		return soundsDirectory + materialDirectoryName + "/";
	}
	,getMaterialDirectory: function(materialDirectoryName) {
		return this.baseDirectory + materialDirectoryName + "/";
	}
	,getTemplateHtmlUri: function(materialDirectoryName) {
		return this.baseDirectory + materialDirectoryName + "/" + materialDirectoryName + ".html";
	}
	,__class__: com.dango_itimi.toolkit_for_createjs.MaterialURI
}
com.dango_itimi.toolkit_for_createjs.TFCLoader = function(baseDirectoryName,baseSoundsDirectoryName,usedSoundOgg) {
	if(usedSoundOgg == null) usedSoundOgg = false;
	if(baseSoundsDirectoryName == null) baseSoundsDirectoryName = "";
	this.materialURI = new com.dango_itimi.toolkit_for_createjs.MaterialURI(baseDirectoryName,baseSoundsDirectoryName,usedSoundOgg);
	this.materialDirectorySet = [];
	this.mainFunction = $bind(this,this.initializeToLoadTemplateHtml);
};
com.dango_itimi.toolkit_for_createjs.TFCLoader.__name__ = ["com","dango_itimi","toolkit_for_createjs","TFCLoader"];
com.dango_itimi.toolkit_for_createjs.TFCLoader.prototype = {
	isError: function() {
		return Reflect.compareMethods(this.mainFunction,$bind(this,this.error));
	}
	,error: function() {
	}
	,isFinished: function() {
		return Reflect.compareMethods(this.mainFunction,$bind(this,this.finish));
	}
	,finish: function() {
	}
	,loadMaterial: function() {
		this.materialLoader.run();
		if(this.materialLoader.isFinished()) this.mainFunction = $bind(this,this.finish);
	}
	,initializeToLoadMaterial: function(manifest) {
		this.materialLoader = new com.dango_itimi.toolkit_for_createjs.loader.MaterialLoader(manifest);
		this.materialLoader.load();
		this.mainFunction = $bind(this,this.loadMaterial);
	}
	,parseTemplateHtml: function() {
		var loader = this.templateHtmlLoader.getLoader();
		var manifest = [];
		var _g1 = 0, _g = this.materialDirectorySet.length;
		while(_g1 < _g) {
			var i = _g1++;
			var materialDirectoryName = this.materialDirectorySet[i];
			var templateHtmlUri = this.materialURI.getTemplateHtmlUri(materialDirectoryName);
			var loadedHtml = loader.getLoadQueue().getResult(templateHtmlUri);
			var m = com.dango_itimi.toolkit_for_createjs.parser.TemplateHtmlParser.execute(loadedHtml);
			this.materialURI.addUri(m,materialDirectoryName);
			manifest = manifest.concat(m);
		}
		this.initializeToLoadMaterial(manifest);
	}
	,loadTemplateHtml: function() {
		this.templateHtmlLoader.run();
		if(this.templateHtmlLoader.isFinished()) this.parseTemplateHtml(); else if(this.templateHtmlLoader.getLoader().isError()) this.mainFunction = $bind(this,this.error);
	}
	,initializeToLoadTemplateHtml: function() {
		this.templateHtmlLoader = new com.dango_itimi.toolkit_for_createjs.loader.TemplateHtmlLoader(this.materialDirectorySet,this.materialURI);
		this.templateHtmlLoader.load();
		this.mainFunction = $bind(this,this.loadTemplateHtml);
	}
	,run: function() {
		this.mainFunction();
	}
	,addMaterialDirectory: function(materialDirectoryName) {
		this.materialDirectorySet.push(materialDirectoryName);
	}
	,__class__: com.dango_itimi.toolkit_for_createjs.TFCLoader
}
com.dango_itimi.toolkit_for_createjs.loader = {}
com.dango_itimi.toolkit_for_createjs.loader.MaterialLoader = function(manifest) {
	this.manifest = manifest;
	this.images = eval("window.images||{}");
	this.loader = new com.dango_itimi.createjs.net.LoaderWithLoadQueue(false,createjs.Sound);
};
com.dango_itimi.toolkit_for_createjs.loader.MaterialLoader.__name__ = ["com","dango_itimi","toolkit_for_createjs","loader","MaterialLoader"];
com.dango_itimi.toolkit_for_createjs.loader.MaterialLoader.prototype = {
	isFinished: function() {
		return Reflect.compareMethods(this.mainFunction,$bind(this,this.finish));
	}
	,finish: function() {
	}
	,setImages: function() {
		var _g1 = 0, _g = this.manifest.length;
		while(_g1 < _g) {
			var i = _g1++;
			var id = this.manifest[i].src;
			var result = this.loader.getLoadQueue().getResult(id);
			var item = this.loader.getLoadQueue().getItem(id);
			if(result != null && item.type == "image") this.images[item.id] = result;
		}
		this.mainFunction = $bind(this,this.finish);
	}
	,waitToFinishLoaded: function() {
		if(this.loader.isFinished()) this.setImages();
	}
	,load: function() {
		this.loader.loadManifest(this.manifest);
		this.mainFunction = $bind(this,this.waitToFinishLoaded);
	}
	,run: function() {
		this.mainFunction();
	}
	,__class__: com.dango_itimi.toolkit_for_createjs.loader.MaterialLoader
}
com.dango_itimi.toolkit_for_createjs.loader.TemplateHtmlLoader = function(materialDirectorySet,materialURI) {
	this.manifestItemSet = new com.dango_itimi.createjs.net.manifest.ManifestItemSet();
	var _g1 = 0, _g = materialDirectorySet.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.manifestItemSet.add(materialURI.getTemplateHtmlUri(materialDirectorySet[i]));
	}
	this.loader = new com.dango_itimi.createjs.net.LoaderWithLoadQueue();
};
com.dango_itimi.toolkit_for_createjs.loader.TemplateHtmlLoader.__name__ = ["com","dango_itimi","toolkit_for_createjs","loader","TemplateHtmlLoader"];
com.dango_itimi.toolkit_for_createjs.loader.TemplateHtmlLoader.prototype = {
	getLoader: function() {
		return this.loader;
	}
	,isFinished: function() {
		return Reflect.compareMethods(this.mainFunction,$bind(this,this.finish));
	}
	,finish: function() {
	}
	,waitToFinishLoaded: function() {
		if(this.loader.isFinished()) this.mainFunction = $bind(this,this.finish);
	}
	,load: function() {
		this.loader.loadManifest(this.manifestItemSet.createManifest());
		this.mainFunction = $bind(this,this.waitToFinishLoaded);
	}
	,run: function() {
		this.mainFunction();
	}
	,__class__: com.dango_itimi.toolkit_for_createjs.loader.TemplateHtmlLoader
}
com.dango_itimi.toolkit_for_createjs.parser = {}
com.dango_itimi.toolkit_for_createjs.parser.TemplateHtmlParser = function() { }
com.dango_itimi.toolkit_for_createjs.parser.TemplateHtmlParser.__name__ = ["com","dango_itimi","toolkit_for_createjs","parser","TemplateHtmlParser"];
com.dango_itimi.toolkit_for_createjs.parser.TemplateHtmlParser.execute = function(loadedHtml) {
	var lineSet = loadedHtml.split("\n");
	var checkedFirstLineNum = com.dango_itimi.toolkit_for_createjs.parser.TemplateHtmlParser.getManifestVariablesLineNumber(lineSet) + 1;
	var checkedEndLineNum = com.dango_itimi.toolkit_for_createjs.parser.TemplateHtmlParser.getManifestVariablesEndLineNumber(lineSet,checkedFirstLineNum);
	var manifest = com.dango_itimi.toolkit_for_createjs.parser.TemplateHtmlParser.getManifest(lineSet,checkedFirstLineNum,checkedEndLineNum);
	return manifest;
}
com.dango_itimi.toolkit_for_createjs.parser.TemplateHtmlParser.getManifestVariablesLineNumber = function(lineSet) {
	var _g1 = 0, _g = lineSet.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(lineSet[i].indexOf("manifest") != -1) return i;
	}
	return 0;
}
com.dango_itimi.toolkit_for_createjs.parser.TemplateHtmlParser.getManifestVariablesEndLineNumber = function(lineSet,checkedFirstLineNum) {
	var _g1 = checkedFirstLineNum, _g = lineSet.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(lineSet[i].indexOf("];") != -1) return i;
	}
	return 0;
}
com.dango_itimi.toolkit_for_createjs.parser.TemplateHtmlParser.getManifest = function(lineSet,checkedFirstLineNum,checkedEndLineNum) {
	var list = [];
	var _g1 = checkedFirstLineNum, _g = lineSet.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(i == checkedEndLineNum) break;
		var line = lineSet[i];
		var arr = line.split("\"");
		var src = arr[1];
		var id = arr[3];
		var data = { };
		data.src = src;
		data.id = id;
		list.push(data);
	}
	return list;
}
com.dango_itimi.toolkit_for_createjs.utils = {}
com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil = function() { }
com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil.__name__ = ["com","dango_itimi","toolkit_for_createjs","utils","ContainerUtil"];
com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil.getNominalBounds = function(container) {
	var rect = container.nominalBounds;
	return com.dango_itimi.utils.RectangleUtil.convert(rect);
}
com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil.getProperty = function(container,propertyStr) {
	var property = Reflect.field(container,propertyStr);
	if(property != null) return property;
	var fields = Reflect.fields(container);
	var _g = 0;
	while(_g < fields.length) {
		var prop = fields[_g];
		++_g;
		if(prop.indexOf(propertyStr) == -1) continue;
		var arr = prop.split("_");
		var checkedStr = arr[arr.length - 1];
		if(!Math.isNaN(checkedStr)) return Reflect.field(container,prop);
	}
	return null;
}
com.dango_itimi.utils = {}
com.dango_itimi.utils.ClassUtil = function() { }
com.dango_itimi.utils.ClassUtil.__name__ = ["com","dango_itimi","utils","ClassUtil"];
com.dango_itimi.utils.ClassUtil.getPackageNamesWithInstance = function(instance) {
	var cls = Type.getClass(instance);
	return com.dango_itimi.utils.ClassUtil.getPackageNamesWithClass(cls);
}
com.dango_itimi.utils.ClassUtil.getPackageNamesWithClass = function(cls) {
	var className = Type.getClassName(cls);
	var packageNames = className.split(".");
	packageNames.pop();
	return packageNames;
}
com.dango_itimi.utils.RectangleUtil = function(x,y,width,height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.right = x + width;
	this.bottom = y + height;
};
com.dango_itimi.utils.RectangleUtil.__name__ = ["com","dango_itimi","utils","RectangleUtil"];
com.dango_itimi.utils.RectangleUtil.convert = function(rect) {
	return new com.dango_itimi.utils.RectangleUtil(rect.x,rect.y,rect.width,rect.height);
}
com.dango_itimi.utils.RectangleUtil.prototype = {
	hitTestObject: function(checkedRectangle) {
		if(this.x > checkedRectangle.right) return false;
		if(this.right < checkedRectangle.x) return false;
		if(this.y > checkedRectangle.bottom) return false;
		if(this.bottom < checkedRectangle.y) return false;
		return true;
	}
	,hitTestPoint: function(nx,ny) {
		return this.x <= nx && this.y <= ny && this.right >= nx && this.bottom >= ny;
	}
	,addY: function(addedY) {
		this.y += addedY;
		this.bottom += addedY;
	}
	,addX: function(addedX) {
		this.x += addedX;
		this.right += addedX;
	}
	,toString: function() {
		return "w:" + this.width + ", h:" + this.height + ", x:" + this.x + ", y:" + this.y;
	}
	,clone: function() {
		return new com.dango_itimi.utils.RectangleUtil(this.x,this.y,this.width,this.height);
	}
	,__class__: com.dango_itimi.utils.RectangleUtil
}
var haxe = {}
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.prototype = {
	run: function() {
		console.log("run");
	}
	,stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,__class__: haxe.Timer
}
var js = {}
js.Browser = function() { }
js.Browser.__name__ = ["js","Browser"];
var shooting = {}
shooting.enemy = {}
shooting.enemy.Enemy = function(layer) {
	this.view = new lib.shootingenemyView();
	this.view.x = 400;
	this.view.y = 200;
	layer.addChild(this.view);
};
shooting.enemy.Enemy.__name__ = ["shooting","enemy","Enemy"];
shooting.enemy.Enemy.prototype = {
	run: function() {
		this.view.x -= 1;
	}
	,__class__: shooting.enemy.Enemy
}
shooting.player = {}
shooting.player.Player = function(layer) {
	this.view = new lib.shootingplayerView();
	this.view.x = 100;
	this.view.y = 150;
	layer.addChild(this.view);
	this.hitareaBounds = com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil.getNominalBounds(this.view.hitarea);
	console.log(this.hitareaBounds);
};
shooting.player.Player.__name__ = ["shooting","player","Player"];
shooting.player.Player.prototype = {
	run: function() {
		this.view.x += 1;
	}
	,__class__: shooting.player.Player
}
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.prototype.__class__ = Array;
Array.__name__ = ["Array"];
com.dango_itimi.toolkit_for_createjs.Instance.NAMESPACE_SYMBOL = "lib";
com.dango_itimi.toolkit_for_createjs.MaterialURI.EXT_HTML = ".html";
com.dango_itimi.toolkit_for_createjs.MaterialURI.EXT_MP3 = ".mp3";
com.dango_itimi.toolkit_for_createjs.MaterialURI.EXT_OGG = ".ogg";
com.dango_itimi.toolkit_for_createjs.parser.TemplateHtmlParser.QUOTATION = "\"";
js.Browser.window = typeof window != "undefined" ? window : null;
js.Browser.document = typeof window != "undefined" ? window.document : null;
Preloader.main();
})();
