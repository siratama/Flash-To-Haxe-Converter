var $hxClasses = $hxClasses || {},$estr = function() { return js.Boot.__string_rec(this,''); };
var HxOverrides = $hxClasses["HxOverrides"] = function() { }
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
}
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var IntIter = $hxClasses["IntIter"] = function(min,max) {
	this.min = min;
	this.max = max;
};
IntIter.__name__ = ["IntIter"];
IntIter.prototype = {
	next: function() {
		return this.min++;
	}
	,hasNext: function() {
		return this.min < this.max;
	}
	,max: null
	,min: null
	,__class__: IntIter
}
var Main = $hxClasses["Main"] = function() {
	this.stage = new createjs.Stage(js.Lib.document.getElementById("canvas"));
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
	,stage: null
	,enemy: null
	,player: null
	,mainFunction: null
	,__class__: Main
}
var Preloader = $hxClasses["Preloader"] = function() {
	js.Lib.window.onload = $bind(this,this.initialize);
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
	,loader: null
	,timer: null
	,mainFunction: null
	,__class__: Preloader
}
var Reflect = $hxClasses["Reflect"] = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.getProperty = function(o,field) {
	var tmp;
	return o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + field])?o[tmp]():o[field];
}
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && (v.__name__ || v.__ename__);
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
}
var Std = $hxClasses["Std"] = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	return x | 0;
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = $hxClasses["Type"] = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return o.__class__;
}
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
}
Type.getSuperClass = function(c) {
	return c.__super__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	switch(args.length) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.createEnumIndex = function(e,index,params) {
	var c = e.__constructs__[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	return Type.createEnum(e,c,params);
}
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"prototype");
	return a;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
}
Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e ) {
		return false;
	}
	return true;
}
Type.enumConstructor = function(e) {
	return e[0];
}
Type.enumParameters = function(e) {
	return e.slice(2);
}
Type.enumIndex = function(e) {
	return e[1];
}
Type.allEnums = function(e) {
	var all = [];
	var cst = e.__constructs__;
	var _g = 0;
	while(_g < cst.length) {
		var c = cst[_g];
		++_g;
		var v = Reflect.field(e,c);
		if(!Reflect.isFunction(v)) all.push(v);
	}
	return all;
}
var com = com || {}
if(!com.dango_itimi) com.dango_itimi = {}
if(!com.dango_itimi.createjs) com.dango_itimi.createjs = {}
if(!com.dango_itimi.createjs.net) com.dango_itimi.createjs.net = {}
com.dango_itimi.createjs.net.LoaderWithLoadQueue = $hxClasses["com.dango_itimi.createjs.net.LoaderWithLoadQueue"] = function(useXHR,plugin) {
	if(useXHR == null) useXHR = false;
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
	,error: null
	,loadQueue: null
	,__class__: com.dango_itimi.createjs.net.LoaderWithLoadQueue
}
if(!com.dango_itimi.createjs.net.manifest) com.dango_itimi.createjs.net.manifest = {}
com.dango_itimi.createjs.net.manifest.ManifestItem = $hxClasses["com.dango_itimi.createjs.net.manifest.ManifestItem"] = function(src,id) {
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
	,id: null
	,src: null
	,__class__: com.dango_itimi.createjs.net.manifest.ManifestItem
}
com.dango_itimi.createjs.net.manifest.ManifestItemSet = $hxClasses["com.dango_itimi.createjs.net.manifest.ManifestItemSet"] = function() {
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
	,itemSet: null
	,__class__: com.dango_itimi.createjs.net.manifest.ManifestItemSet
}
if(!com.dango_itimi.toolkit_for_createjs) com.dango_itimi.toolkit_for_createjs = {}
com.dango_itimi.toolkit_for_createjs.Instance = $hxClasses["com.dango_itimi.toolkit_for_createjs.Instance"] = function() { }
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
com.dango_itimi.toolkit_for_createjs.MaterialURI = $hxClasses["com.dango_itimi.toolkit_for_createjs.MaterialURI"] = function(baseDirectoryName,baseSoundsDirectoryName,usedSoundOgg) {
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
	,usedSoundOgg: null
	,baseSoundsDirectory: null
	,baseDirectory: null
	,__class__: com.dango_itimi.toolkit_for_createjs.MaterialURI
}
com.dango_itimi.toolkit_for_createjs.TFCLoader = $hxClasses["com.dango_itimi.toolkit_for_createjs.TFCLoader"] = function(baseDirectoryName,baseSoundsDirectoryName,usedSoundOgg) {
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
	,materialLoader: null
	,templateHtmlParser: null
	,templateHtmlLoader: null
	,materialDirectorySet: null
	,materialURI: null
	,mainFunction: null
	,__class__: com.dango_itimi.toolkit_for_createjs.TFCLoader
}
if(!com.dango_itimi.toolkit_for_createjs.loader) com.dango_itimi.toolkit_for_createjs.loader = {}
com.dango_itimi.toolkit_for_createjs.loader.MaterialLoader = $hxClasses["com.dango_itimi.toolkit_for_createjs.loader.MaterialLoader"] = function(manifest) {
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
	,manifest: null
	,mainFunction: null
	,loader: null
	,images: null
	,__class__: com.dango_itimi.toolkit_for_createjs.loader.MaterialLoader
}
com.dango_itimi.toolkit_for_createjs.loader.TemplateHtmlLoader = $hxClasses["com.dango_itimi.toolkit_for_createjs.loader.TemplateHtmlLoader"] = function(materialDirectorySet,materialURI) {
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
	,mainFunction: null
	,manifestItemSet: null
	,loader: null
	,__class__: com.dango_itimi.toolkit_for_createjs.loader.TemplateHtmlLoader
}
if(!com.dango_itimi.toolkit_for_createjs.parser) com.dango_itimi.toolkit_for_createjs.parser = {}
com.dango_itimi.toolkit_for_createjs.parser.TemplateHtmlParser = $hxClasses["com.dango_itimi.toolkit_for_createjs.parser.TemplateHtmlParser"] = function() { }
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
if(!com.dango_itimi.toolkit_for_createjs.utils) com.dango_itimi.toolkit_for_createjs.utils = {}
com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil = $hxClasses["com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil"] = function() { }
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
if(!com.dango_itimi.utils) com.dango_itimi.utils = {}
com.dango_itimi.utils.ClassUtil = $hxClasses["com.dango_itimi.utils.ClassUtil"] = function() { }
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
com.dango_itimi.utils.RectangleUtil = $hxClasses["com.dango_itimi.utils.RectangleUtil"] = function(x,y,width,height) {
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
	,right: null
	,bottom: null
	,y: null
	,x: null
	,width: null
	,height: null
	,__class__: com.dango_itimi.utils.RectangleUtil
}
var haxe = haxe || {}
haxe.Log = $hxClasses["haxe.Log"] = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Timer = $hxClasses["haxe.Timer"] = function(time_ms) {
	var me = this;
	this.id = window.setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
haxe.Timer.measure = function(f,pos) {
	var t0 = haxe.Timer.stamp();
	var r = f();
	haxe.Log.trace(haxe.Timer.stamp() - t0 + "s",pos);
	return r;
}
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
}
haxe.Timer.prototype = {
	run: function() {
	}
	,stop: function() {
		if(this.id == null) return;
		window.clearInterval(this.id);
		this.id = null;
	}
	,id: null
	,__class__: haxe.Timer
}
var js = js || {}
js.Boot = $hxClasses["js.Boot"] = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.isClass = function(o) {
	return o.__name__;
}
js.Boot.isEnum = function(e) {
	return e.__ename__;
}
js.Boot.getClass = function(o) {
	return o.__class__;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		if(cl == Class && o.__name__ != null) return true; else null;
		if(cl == Enum && o.__ename__ != null) return true; else null;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
js.Lib = $hxClasses["js.Lib"] = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.document = null;
js.Lib.window = null;
js.Lib.debug = function() {
	debugger;
}
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
var shooting = shooting || {}
if(!shooting.enemy) shooting.enemy = {}
shooting.enemy.Enemy = $hxClasses["shooting.enemy.Enemy"] = function(layer) {
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
	,view: null
	,__class__: shooting.enemy.Enemy
}
if(!shooting.player) shooting.player = {}
shooting.player.Player = $hxClasses["shooting.player.Player"] = function(layer) {
	this.view = new lib.shootingplayerView();
	this.view.x = 100;
	this.view.y = 150;
	layer.addChild(this.view);
	var hitarea = com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil.getProperty(this.view,"hitarea");
	this.hitareaBounds = com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil.getNominalBounds(hitarea);
	haxe.Log.trace(this.hitareaBounds,{ fileName : "Player.hx", lineNumber : 46, className : "shooting.player.Player", methodName : "new"});
};
shooting.player.Player.__name__ = ["shooting","player","Player"];
shooting.player.Player.prototype = {
	run: function() {
		this.view.x += 1;
	}
	,hitareaBounds: null
	,view: null
	,__class__: shooting.player.Player
}
var $_;
function $bind(o,m) { var f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
}; else null;
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var Void = $hxClasses.Void = { __ename__ : ["Void"]};
if(typeof document != "undefined") js.Lib.document = document;
if(typeof window != "undefined") {
	js.Lib.window = window;
	js.Lib.window.onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if(f == null) return false;
		return f(msg,[url + ":" + line]);
	};
}
com.dango_itimi.toolkit_for_createjs.Instance.NAMESPACE_SYMBOL = "lib";
com.dango_itimi.toolkit_for_createjs.MaterialURI.EXT_HTML = ".html";
com.dango_itimi.toolkit_for_createjs.MaterialURI.EXT_MP3 = ".mp3";
com.dango_itimi.toolkit_for_createjs.MaterialURI.EXT_OGG = ".ogg";
com.dango_itimi.toolkit_for_createjs.parser.TemplateHtmlParser.QUOTATION = "\"";
js.Lib.onerror = null;
Preloader.main();
