(function ($hx_exports) { "use strict";
var $estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var DocumentState = { __ename__ : ["DocumentState"], __constructs__ : ["CLOSED_DOCUMENT","IS_NOT_SAVED_NEW_DOCUMENT","SAVED_DOCUMENT"] };
DocumentState.CLOSED_DOCUMENT = ["CLOSED_DOCUMENT",0];
DocumentState.CLOSED_DOCUMENT.toString = $estr;
DocumentState.CLOSED_DOCUMENT.__enum__ = DocumentState;
DocumentState.IS_NOT_SAVED_NEW_DOCUMENT = ["IS_NOT_SAVED_NEW_DOCUMENT",1];
DocumentState.IS_NOT_SAVED_NEW_DOCUMENT.toString = $estr;
DocumentState.IS_NOT_SAVED_NEW_DOCUMENT.__enum__ = DocumentState;
DocumentState.SAVED_DOCUMENT = ["SAVED_DOCUMENT",2];
DocumentState.SAVED_DOCUMENT.toString = $estr;
DocumentState.SAVED_DOCUMENT.__enum__ = DocumentState;
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw "EReg::matched";
	}
	,matchedRight: function() {
		if(this.r.m == null) throw "No string matched";
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,__class__: EReg
};
var FlashToHaxeConverter = $hx_exports.FlashToHaxeConverter = function(baseDirectory,flashExternDirectory,flashDirectory,createJsDirectory,openflDirectory,symbolNameSpace) {
	if(symbolNameSpace == null) symbolNameSpace = "lib";
	jsfl.Lib.fl.outputPanel.clear();
	if(FlashToHaxeConverter.isHtml5CanvasDocument()) {
		if(openflDirectory != "") jsfl.Lib.fl.trace("HTML5 canvas document is not supported OpenFL output.");
		openflDirectory = "";
	}
	this.outputtedFlashExtern = flashExternDirectory != "";
	this.outputtedFlash = flashDirectory != "";
	this.outputtedCreateJs = createJsDirectory != "";
	this.outputtedOpenfl = openflDirectory != "";
	if(!this.outputtedFlashExtern && !this.outputtedFlash && !this.outputtedCreateJs && !this.outputtedOpenfl) {
		jsfl.Lib.fl.trace("Set output directory");
		return;
	}
	this.baseDirectory = baseDirectory;
	this.symbolNameSpace = symbolNameSpace;
	this.flashExternDirectory = this.getOutputDirectory(flashExternDirectory);
	this.flashDirectory = this.getOutputDirectory(flashDirectory);
	this.createJsDirectory = this.getOutputDirectory(createJsDirectory);
	this.openflDirectory = this.getOutputDirectory(openflDirectory);
	this.parseLibrary();
};
FlashToHaxeConverter.__name__ = ["FlashToHaxeConverter"];
FlashToHaxeConverter.main = function() {
};
FlashToHaxeConverter.setEventListener = function() {
	jsfl.Lib.fl.addEventListener(jsfl.EventType.DOCUMENT_CHANGED,FlashToHaxeConverter.onDocumentChanged);
};
FlashToHaxeConverter.onDocumentChanged = function() {
	FlashToHaxeConverter.documentChanged = true;
};
FlashToHaxeConverter.removeDocumentChangedEvent = function() {
	var n = FlashToHaxeConverter.documentChanged;
	FlashToHaxeConverter.documentChanged = false;
	return haxe.Serializer.run(n);
};
FlashToHaxeConverter.isOpenedFlashDocument = function() {
	return haxe.Serializer.run(jsfl.Lib.fl.getDocumentDOM() != null);
};
FlashToHaxeConverter.getDocumentState = function() {
	if(jsfl.Lib.fl.getDocumentDOM() == null) return haxe.Serializer.run(DocumentState.CLOSED_DOCUMENT);
	return haxe.Serializer.run(jsfl.Lib.fl.getDocumentDOM().pathURI == null?DocumentState.IS_NOT_SAVED_NEW_DOCUMENT:DocumentState.SAVED_DOCUMENT);
};
FlashToHaxeConverter.getFlashFileDirectory = function() {
	var path = jsfl.Lib.fl.getDocumentDOM().pathURI;
	var arr = path.split("/");
	arr.pop();
	return arr.join("/") + "/";
};
FlashToHaxeConverter.isHtml5CanvasDocument = function() {
	return jsfl.Lib.fl.getDocumentDOM().exportPublishProfileString().indexOf("JavaScript/HTML") != -1;
};
FlashToHaxeConverter.prototype = {
	getOutputDirectory: function(outputDirectory) {
		if(outputDirectory.charAt(outputDirectory.length - 1) != "/") outputDirectory += "/";
		return this.baseDirectory + outputDirectory;
	}
	,run: function() {
		this.mainFunction();
	}
	,parseLibrary: function() {
		this.libraryParser = new parser.LibraryParser();
		this.libraryParser.execute();
		this.mainFunction = $bind(this,this.createOutputDirectory);
	}
	,createOutputDirectory: function() {
		this.createOutputDirectoryCommon(this.outputtedFlashExtern,this.flashExternDirectory);
		this.createOutputDirectoryCommon(this.outputtedFlash,this.flashDirectory);
		this.createOutputDirectoryCommon(this.outputtedCreateJs,this.createJsDirectory);
		this.createOutputDirectoryCommon(this.outputtedOpenfl,this.openflDirectory);
		if(this.outputtedOpenfl) this.mainFunction = $bind(this,this.setSwfName); else this.mainFunction = $bind(this,this.createFolder);
	}
	,createOutputDirectoryCommon: function(outputted,outputDirectory) {
		if(outputted && !FLfile.exists(outputDirectory)) FLfile.createFolder(outputDirectory);
	}
	,setSwfName: function() {
		var profileXML = Xml.parse(jsfl.Lib.fl.getDocumentDOM().exportPublishProfileString());
		var fastXML = new haxe.xml.Fast(profileXML.firstElement());
		this.swfName = fastXML.node.resolve("PublishFormatProperties").node.resolve("flashFileName").get_innerData().split(".")[0];
		this.mainFunction = $bind(this,this.createFolder);
	}
	,createFolder: function() {
		var $it0 = this.libraryParser.packageDirectoryMap.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			this.createFolderCommon(this.outputtedFlashExtern,this.flashExternDirectory + key);
			this.createFolderCommon(this.outputtedFlash,this.flashDirectory + key);
			this.createFolderCommon(this.outputtedCreateJs,this.createJsDirectory + key);
			this.createFolderCommon(this.outputtedOpenfl,this.openflDirectory + key);
			this.libraryParser.packageDirectoryMap.remove(key);
			return;
		}
		this.mainFunction = $bind(this,this.outputData);
	}
	,createFolderCommon: function(outputted,directoryUri) {
		if(outputted && !FLfile.exists(directoryUri)) {
			if(!FLfile.createFolder(directoryUri)) jsfl.Lib.fl.trace("create error: " + directoryUri); else jsfl.Lib.fl.trace(directoryUri);
		}
	}
	,outputData: function() {
		var outputCount = 0;
		while(this.libraryParser.outputDataSet.length > 0) {
			var outputData = this.libraryParser.outputDataSet.shift();
			if(this.outputtedFlashExtern) {
				var outputLines = this.getOutputLinesForFlash(outputData,true);
				this.output(this.flashExternDirectory,outputData.outputPath,outputLines);
			}
			if(this.outputtedFlash) {
				var outputLines1 = this.getOutputLinesForFlash(outputData,false);
				this.output(this.flashDirectory,outputData.outputPath,outputLines1);
			}
			if(this.outputtedCreateJs) {
				var outputLines2 = this.getOutputLinesForCreateJs(outputData);
				this.output(this.createJsDirectory,outputData.outputPath,outputLines2);
			}
			if(this.outputtedOpenfl) {
				var outputLines3 = this.getOutputLinesForOpenfl(outputData);
				this.output(this.openflDirectory,outputData.outputPath,outputLines3);
			}
			if(++outputCount >= FlashToHaxeConverter.OUTPUT_LOOP_ONCE) return;
		}
		this.mainFunction = $bind(this,this.initializeToFinish);
	}
	,getOutputLinesForFlash: function(outputData,external) {
		var outputLines = "";
		switch(outputData.itemType) {
		case jsfl.ItemType.MOVIE_CLIP:
			var templateMovieClip;
			if(external) templateMovieClip = new tmpl.flash.MovieClipForExtern(); else templateMovieClip = new tmpl.flash.MovieClip();
			outputLines = templateMovieClip.create(outputData.baseInnerMovieClip,external,outputData.packageStr);
			break;
		case jsfl.ItemType.SOUND:
			outputLines = tmpl.flash.Sound.create(outputData.packageStr,outputData.className,external);
			break;
		case jsfl.ItemType.BITMAP:
			if(external) outputLines = tmpl.flash.BitmapForExtern.create(outputData.packageStr,outputData.className); else outputLines = tmpl.flash.Bitmap.create(outputData.packageStr,outputData.className);
			break;
		}
		return outputLines;
	}
	,getOutputLinesForCreateJs: function(outputData) {
		var outputLines = "";
		switch(outputData.itemType) {
		case jsfl.ItemType.MOVIE_CLIP:
			var templateMovieClip = new tmpl.createjs.MovieClip();
			outputLines = templateMovieClip.create(outputData.baseInnerMovieClip,outputData.packageStr,this.symbolNameSpace,outputData.nativeClassName);
			break;
		case jsfl.ItemType.SOUND:
			outputLines = tmpl.createjs.Sound.create(outputData.packageStr,outputData.className,outputData.nativeClassName);
			break;
		case jsfl.ItemType.BITMAP:
			outputLines = tmpl.createjs.Bitmap.create(outputData.packageStr,outputData.className,this.symbolNameSpace,outputData.nativeClassName);
			break;
		}
		return outputLines;
	}
	,getOutputLinesForOpenfl: function(outputData) {
		var outputLines = "";
		switch(outputData.itemType) {
		case jsfl.ItemType.MOVIE_CLIP:
			var templateMovieClip = new tmpl.openfl.MovieClip();
			outputLines = templateMovieClip.create(outputData.baseInnerMovieClip,outputData.packageStr,this.swfName);
			break;
		case jsfl.ItemType.SOUND:
			outputLines = tmpl.openfl.Sound.create(outputData.packageStr,outputData.className);
			break;
		case jsfl.ItemType.BITMAP:
			outputLines = tmpl.openfl.Bitmap.create(outputData.packageStr,outputData.className,this.swfName);
			break;
		}
		return outputLines;
	}
	,output: function(baseUri,itemName,outputLines) {
		var filePath = baseUri + itemName + ".hx";
		FLfile.write(filePath,outputLines);
		jsfl.Lib.fl.trace(filePath);
	}
	,initializeToFinish: function() {
		delete String.prototype.__class__;
		delete Array.prototype.__class__;
		jsfl.Lib.fl.trace("finish");
		this.mainFunction = $bind(this,this.finish);
	}
	,finish: function() {
	}
	,isFinished: function() {
		return haxe.Serializer.run(Reflect.compareMethods(this.mainFunction,$bind(this,this.finish)));
	}
	,__class__: FlashToHaxeConverter
};
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var List = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,first: function() {
		if(this.h == null) return null; else return this.h[0];
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,__class__: List
};
var IMap = function() { };
IMap.__name__ = ["IMap"];
Math.__name__ = ["Math"];
var Reflect = function() { };
Reflect.__name__ = ["Reflect"];
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
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,addSub: function(s,pos,len) {
		if(len == null) this.b += HxOverrides.substr(s,pos,null); else this.b += HxOverrides.substr(s,pos,len);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = ["StringTools"];
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var ValueType = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
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
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
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
		var c;
		if((v instanceof Array) && v.__enum__ == null) c = Array; else c = v.__class__;
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
};
var XmlType = { __ename__ : ["XmlType"], __constructs__ : [] };
var Xml = function() {
};
Xml.__name__ = ["Xml"];
Xml.parse = function(str) {
	return haxe.xml.Parser.parse(str);
};
Xml.createElement = function(name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new haxe.ds.StringMap();
	r.set_nodeName(name);
	return r;
};
Xml.createPCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.set_nodeValue(data);
	return r;
};
Xml.createCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.set_nodeValue(data);
	return r;
};
Xml.createComment = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.set_nodeValue(data);
	return r;
};
Xml.createDocType = function(data) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.set_nodeValue(data);
	return r;
};
Xml.createProcessingInstruction = function(data) {
	var r = new Xml();
	r.nodeType = Xml.ProcessingInstruction;
	r.set_nodeValue(data);
	return r;
};
Xml.createDocument = function() {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
};
Xml.prototype = {
	get_nodeName: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName;
	}
	,set_nodeName: function(n) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName = n;
	}
	,get_nodeValue: function() {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue;
	}
	,set_nodeValue: function(v) {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue = v;
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.set(att,value);
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.exists(att);
	}
	,iterator: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			return this.cur < this.x.length;
		}, next : function() {
			return this.x[this.cur++];
		}};
	}
	,elementsNamed: function(name) {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				if(n.nodeType == Xml.Element && n._nodeName == name) break;
				k++;
			}
			this.cur = k;
			return k < l;
		}, next : function() {
			var k1 = this.cur;
			var l1 = this.x.length;
			while(k1 < l1) {
				var n1 = this.x[k1];
				k1++;
				if(n1.nodeType == Xml.Element && n1._nodeName == name) {
					this.cur = k1;
					return n1;
				}
			}
			return null;
		}};
	}
	,firstElement: function() {
		if(this._children == null) throw "bad nodetype";
		var cur = 0;
		var l = this._children.length;
		while(cur < l) {
			var n = this._children[cur];
			if(n.nodeType == Xml.Element) return n;
			cur++;
		}
		return null;
	}
	,addChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) HxOverrides.remove(x._parent._children,x);
		x._parent = this;
		this._children.push(x);
	}
	,__class__: Xml
};
var haxe = {};
haxe.Serializer = function() {
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new haxe.ds.StringMap();
	this.scount = 0;
};
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.run = function(v) {
	var s = new haxe.Serializer();
	s.serialize(v);
	return s.toString();
};
haxe.Serializer.prototype = {
	toString: function() {
		return this.buf.b;
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += "R";
			this.buf.b += "" + x;
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += "y";
		s = encodeURIComponent(s);
		this.buf.b += "" + s.length;
		this.buf.b += ":";
		this.buf.b += s;
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0;
		var _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += "r";
				this.buf.b += "" + i;
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeFields: function(v) {
		var _g = 0;
		var _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += "g";
	}
	,serialize: function(v) {
		{
			var _g = Type["typeof"](v);
			switch(_g[1]) {
			case 0:
				this.buf.b += "n";
				break;
			case 1:
				var v1 = v;
				if(v1 == 0) {
					this.buf.b += "z";
					return;
				}
				this.buf.b += "i";
				this.buf.b += "" + v1;
				break;
			case 2:
				var v2 = v;
				if(Math.isNaN(v2)) this.buf.b += "k"; else if(!Math.isFinite(v2)) if(v2 < 0) this.buf.b += "m"; else this.buf.b += "p"; else {
					this.buf.b += "d";
					this.buf.b += "" + v2;
				}
				break;
			case 3:
				if(v) this.buf.b += "t"; else this.buf.b += "f";
				break;
			case 6:
				var c = _g[2];
				if(c == String) {
					this.serializeString(v);
					return;
				}
				if(this.useCache && this.serializeRef(v)) return;
				switch(c) {
				case Array:
					var ucount = 0;
					this.buf.b += "a";
					var l = v.length;
					var _g1 = 0;
					while(_g1 < l) {
						var i = _g1++;
						if(v[i] == null) ucount++; else {
							if(ucount > 0) {
								if(ucount == 1) this.buf.b += "n"; else {
									this.buf.b += "u";
									this.buf.b += "" + ucount;
								}
								ucount = 0;
							}
							this.serialize(v[i]);
						}
					}
					if(ucount > 0) {
						if(ucount == 1) this.buf.b += "n"; else {
							this.buf.b += "u";
							this.buf.b += "" + ucount;
						}
					}
					this.buf.b += "h";
					break;
				case List:
					this.buf.b += "l";
					var v3 = v;
					var $it0 = v3.iterator();
					while( $it0.hasNext() ) {
						var i1 = $it0.next();
						this.serialize(i1);
					}
					this.buf.b += "h";
					break;
				case Date:
					var d = v;
					this.buf.b += "v";
					this.buf.add(HxOverrides.dateStr(d));
					break;
				case haxe.ds.StringMap:
					this.buf.b += "b";
					var v4 = v;
					var $it1 = v4.keys();
					while( $it1.hasNext() ) {
						var k = $it1.next();
						this.serializeString(k);
						this.serialize(v4.get(k));
					}
					this.buf.b += "h";
					break;
				case haxe.ds.IntMap:
					this.buf.b += "q";
					var v5 = v;
					var $it2 = v5.keys();
					while( $it2.hasNext() ) {
						var k1 = $it2.next();
						this.buf.b += ":";
						this.buf.b += "" + k1;
						this.serialize(v5.get(k1));
					}
					this.buf.b += "h";
					break;
				case haxe.ds.ObjectMap:
					this.buf.b += "M";
					var v6 = v;
					var $it3 = v6.keys();
					while( $it3.hasNext() ) {
						var k2 = $it3.next();
						var id = Reflect.field(k2,"__id__");
						Reflect.deleteField(k2,"__id__");
						this.serialize(k2);
						k2.__id__ = id;
						this.serialize(v6.h[k2.__id__]);
					}
					this.buf.b += "h";
					break;
				case haxe.io.Bytes:
					var v7 = v;
					var i2 = 0;
					var max = v7.length - 2;
					var charsBuf = new StringBuf();
					var b64 = haxe.Serializer.BASE64;
					while(i2 < max) {
						var b1 = v7.get(i2++);
						var b2 = v7.get(i2++);
						var b3 = v7.get(i2++);
						charsBuf.add(b64.charAt(b1 >> 2));
						charsBuf.add(b64.charAt((b1 << 4 | b2 >> 4) & 63));
						charsBuf.add(b64.charAt((b2 << 2 | b3 >> 6) & 63));
						charsBuf.add(b64.charAt(b3 & 63));
					}
					if(i2 == max) {
						var b11 = v7.get(i2++);
						var b21 = v7.get(i2++);
						charsBuf.add(b64.charAt(b11 >> 2));
						charsBuf.add(b64.charAt((b11 << 4 | b21 >> 4) & 63));
						charsBuf.add(b64.charAt(b21 << 2 & 63));
					} else if(i2 == max + 1) {
						var b12 = v7.get(i2++);
						charsBuf.add(b64.charAt(b12 >> 2));
						charsBuf.add(b64.charAt(b12 << 4 & 63));
					}
					var chars = charsBuf.b;
					this.buf.b += "s";
					this.buf.b += "" + chars.length;
					this.buf.b += ":";
					this.buf.b += chars;
					break;
				default:
					if(this.useCache) this.cache.pop();
					if(v.hxSerialize != null) {
						this.buf.b += "C";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						v.hxSerialize(this);
						this.buf.b += "g";
					} else {
						this.buf.b += "c";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						this.serializeFields(v);
					}
				}
				break;
			case 4:
				if(this.useCache && this.serializeRef(v)) return;
				this.buf.b += "o";
				this.serializeFields(v);
				break;
			case 7:
				var e = _g[2];
				if(this.useCache) {
					if(this.serializeRef(v)) return;
					this.cache.pop();
				}
				if(this.useEnumIndex) this.buf.b += "j"; else this.buf.b += "w";
				this.serializeString(Type.getEnumName(e));
				if(this.useEnumIndex) {
					this.buf.b += ":";
					this.buf.b += Std.string(v[1]);
				} else this.serializeString(v[0]);
				this.buf.b += ":";
				var l1 = v.length;
				this.buf.b += "" + (l1 - 2);
				var _g11 = 2;
				while(_g11 < l1) {
					var i3 = _g11++;
					this.serialize(v[i3]);
				}
				if(this.useCache) this.cache.push(v);
				break;
			case 5:
				throw "Cannot serialize function";
				break;
			default:
				throw "Cannot serialize " + Std.string(v);
			}
		}
	}
	,__class__: haxe.Serializer
};
haxe._Template = {};
haxe._Template.TemplateExpr = { __ename__ : ["haxe","_Template","TemplateExpr"], __constructs__ : ["OpVar","OpExpr","OpIf","OpStr","OpBlock","OpForeach","OpMacro"] };
haxe._Template.TemplateExpr.OpVar = function(v) { var $x = ["OpVar",0,v]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; };
haxe._Template.TemplateExpr.OpExpr = function(expr) { var $x = ["OpExpr",1,expr]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; };
haxe._Template.TemplateExpr.OpIf = function(expr,eif,eelse) { var $x = ["OpIf",2,expr,eif,eelse]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; };
haxe._Template.TemplateExpr.OpStr = function(str) { var $x = ["OpStr",3,str]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; };
haxe._Template.TemplateExpr.OpBlock = function(l) { var $x = ["OpBlock",4,l]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; };
haxe._Template.TemplateExpr.OpForeach = function(expr,loop) { var $x = ["OpForeach",5,expr,loop]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; };
haxe._Template.TemplateExpr.OpMacro = function(name,params) { var $x = ["OpMacro",6,name,params]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; };
haxe.Template = function(str) {
	var tokens = this.parseTokens(str);
	this.expr = this.parseBlock(tokens);
	if(!tokens.isEmpty()) throw "Unexpected '" + ("" + tokens.first().s) + "'";
};
haxe.Template.__name__ = ["haxe","Template"];
haxe.Template.prototype = {
	execute: function(context,macros) {
		if(macros == null) this.macros = { }; else this.macros = macros;
		this.context = context;
		this.stack = new List();
		this.buf = new StringBuf();
		this.run(this.expr);
		return this.buf.b;
	}
	,resolve: function(v) {
		if(Object.prototype.hasOwnProperty.call(this.context,v)) return Reflect.field(this.context,v);
		var $it0 = this.stack.iterator();
		while( $it0.hasNext() ) {
			var ctx = $it0.next();
			if(Object.prototype.hasOwnProperty.call(ctx,v)) return Reflect.field(ctx,v);
		}
		if(v == "__current__") return this.context;
		return Reflect.field(haxe.Template.globals,v);
	}
	,parseTokens: function(data) {
		var tokens = new List();
		while(haxe.Template.splitter.match(data)) {
			var p = haxe.Template.splitter.matchedPos();
			if(p.pos > 0) tokens.add({ p : HxOverrides.substr(data,0,p.pos), s : true, l : null});
			if(HxOverrides.cca(data,p.pos) == 58) {
				tokens.add({ p : HxOverrides.substr(data,p.pos + 2,p.len - 4), s : false, l : null});
				data = haxe.Template.splitter.matchedRight();
				continue;
			}
			var parp = p.pos + p.len;
			var npar = 1;
			while(npar > 0) {
				var c = HxOverrides.cca(data,parp);
				if(c == 40) npar++; else if(c == 41) npar--; else if(c == null) throw "Unclosed macro parenthesis";
				parp++;
			}
			var params = HxOverrides.substr(data,p.pos + p.len,parp - (p.pos + p.len) - 1).split(",");
			tokens.add({ p : haxe.Template.splitter.matched(2), s : false, l : params});
			data = HxOverrides.substr(data,parp,data.length - parp);
		}
		if(data.length > 0) tokens.add({ p : data, s : true, l : null});
		return tokens;
	}
	,parseBlock: function(tokens) {
		var l = new List();
		while(true) {
			var t = tokens.first();
			if(t == null) break;
			if(!t.s && (t.p == "end" || t.p == "else" || HxOverrides.substr(t.p,0,7) == "elseif ")) break;
			l.add(this.parse(tokens));
		}
		if(l.length == 1) return l.first();
		return haxe._Template.TemplateExpr.OpBlock(l);
	}
	,parse: function(tokens) {
		var t = tokens.pop();
		var p = t.p;
		if(t.s) return haxe._Template.TemplateExpr.OpStr(p);
		if(t.l != null) {
			var pe = new List();
			var _g = 0;
			var _g1 = t.l;
			while(_g < _g1.length) {
				var p1 = _g1[_g];
				++_g;
				pe.add(this.parseBlock(this.parseTokens(p1)));
			}
			return haxe._Template.TemplateExpr.OpMacro(p,pe);
		}
		if(HxOverrides.substr(p,0,3) == "if ") {
			p = HxOverrides.substr(p,3,p.length - 3);
			var e = this.parseExpr(p);
			var eif = this.parseBlock(tokens);
			var t1 = tokens.first();
			var eelse;
			if(t1 == null) throw "Unclosed 'if'";
			if(t1.p == "end") {
				tokens.pop();
				eelse = null;
			} else if(t1.p == "else") {
				tokens.pop();
				eelse = this.parseBlock(tokens);
				t1 = tokens.pop();
				if(t1 == null || t1.p != "end") throw "Unclosed 'else'";
			} else {
				t1.p = HxOverrides.substr(t1.p,4,t1.p.length - 4);
				eelse = this.parse(tokens);
			}
			return haxe._Template.TemplateExpr.OpIf(e,eif,eelse);
		}
		if(HxOverrides.substr(p,0,8) == "foreach ") {
			p = HxOverrides.substr(p,8,p.length - 8);
			var e1 = this.parseExpr(p);
			var efor = this.parseBlock(tokens);
			var t2 = tokens.pop();
			if(t2 == null || t2.p != "end") throw "Unclosed 'foreach'";
			return haxe._Template.TemplateExpr.OpForeach(e1,efor);
		}
		if(haxe.Template.expr_splitter.match(p)) return haxe._Template.TemplateExpr.OpExpr(this.parseExpr(p));
		return haxe._Template.TemplateExpr.OpVar(p);
	}
	,parseExpr: function(data) {
		var l = new List();
		var expr = data;
		while(haxe.Template.expr_splitter.match(data)) {
			var p = haxe.Template.expr_splitter.matchedPos();
			var k = p.pos + p.len;
			if(p.pos != 0) l.add({ p : HxOverrides.substr(data,0,p.pos), s : true});
			var p1 = haxe.Template.expr_splitter.matched(0);
			l.add({ p : p1, s : p1.indexOf("\"") >= 0});
			data = haxe.Template.expr_splitter.matchedRight();
		}
		if(data.length != 0) l.add({ p : data, s : true});
		var e;
		try {
			e = this.makeExpr(l);
			if(!l.isEmpty()) throw l.first().p;
		} catch( s ) {
			if( js.Boot.__instanceof(s,String) ) {
				throw "Unexpected '" + s + "' in " + expr;
			} else throw(s);
		}
		return function() {
			try {
				return e();
			} catch( exc ) {
				throw "Error : " + Std.string(exc) + " in " + expr;
			}
		};
	}
	,makeConst: function(v) {
		haxe.Template.expr_trim.match(v);
		v = haxe.Template.expr_trim.matched(1);
		if(HxOverrides.cca(v,0) == 34) {
			var str = HxOverrides.substr(v,1,v.length - 2);
			return function() {
				return str;
			};
		}
		if(haxe.Template.expr_int.match(v)) {
			var i = Std.parseInt(v);
			return function() {
				return i;
			};
		}
		if(haxe.Template.expr_float.match(v)) {
			var f = Std.parseFloat(v);
			return function() {
				return f;
			};
		}
		var me = this;
		return function() {
			return me.resolve(v);
		};
	}
	,makePath: function(e,l) {
		var p = l.first();
		if(p == null || p.p != ".") return e;
		l.pop();
		var field = l.pop();
		if(field == null || !field.s) throw field.p;
		var f = field.p;
		haxe.Template.expr_trim.match(f);
		f = haxe.Template.expr_trim.matched(1);
		return this.makePath(function() {
			return Reflect.field(e(),f);
		},l);
	}
	,makeExpr: function(l) {
		return this.makePath(this.makeExpr2(l),l);
	}
	,makeExpr2: function(l) {
		var p = l.pop();
		if(p == null) throw "<eof>";
		if(p.s) return this.makeConst(p.p);
		var _g = p.p;
		switch(_g) {
		case "(":
			var e1 = this.makeExpr(l);
			var p1 = l.pop();
			if(p1 == null || p1.s) throw p1.p;
			if(p1.p == ")") return e1;
			var e2 = this.makeExpr(l);
			var p2 = l.pop();
			if(p2 == null || p2.p != ")") throw p2.p;
			var _g1 = p1.p;
			switch(_g1) {
			case "+":
				return function() {
					return e1() + e2();
				};
			case "-":
				return function() {
					return e1() - e2();
				};
			case "*":
				return function() {
					return e1() * e2();
				};
			case "/":
				return function() {
					return e1() / e2();
				};
			case ">":
				return function() {
					return e1() > e2();
				};
			case "<":
				return function() {
					return e1() < e2();
				};
			case ">=":
				return function() {
					return e1() >= e2();
				};
			case "<=":
				return function() {
					return e1() <= e2();
				};
			case "==":
				return function() {
					return e1() == e2();
				};
			case "!=":
				return function() {
					return e1() != e2();
				};
			case "&&":
				return function() {
					return e1() && e2();
				};
			case "||":
				return function() {
					return e1() || e2();
				};
			default:
				throw "Unknown operation " + p1.p;
			}
			break;
		case "!":
			var e = this.makeExpr(l);
			return function() {
				var v = e();
				return v == null || v == false;
			};
		case "-":
			var e3 = this.makeExpr(l);
			return function() {
				return -e3();
			};
		}
		throw p.p;
	}
	,run: function(e) {
		switch(e[1]) {
		case 0:
			var v = e[2];
			this.buf.add(Std.string(this.resolve(v)));
			break;
		case 1:
			var e1 = e[2];
			this.buf.add(Std.string(e1()));
			break;
		case 2:
			var eelse = e[4];
			var eif = e[3];
			var e2 = e[2];
			var v1 = e2();
			if(v1 == null || v1 == false) {
				if(eelse != null) this.run(eelse);
			} else this.run(eif);
			break;
		case 3:
			var str = e[2];
			this.buf.b += str;
			break;
		case 4:
			var l = e[2];
			var $it0 = l.iterator();
			while( $it0.hasNext() ) {
				var e3 = $it0.next();
				this.run(e3);
			}
			break;
		case 5:
			var loop = e[3];
			var e4 = e[2];
			var v2 = e4();
			try {
				var x = $iterator(v2)();
				if(x.hasNext == null) throw null;
				v2 = x;
			} catch( e5 ) {
				try {
					if(v2.hasNext == null) throw null;
				} catch( e6 ) {
					throw "Cannot iter on " + Std.string(v2);
				}
			}
			this.stack.push(this.context);
			var v3 = v2;
			while( v3.hasNext() ) {
				var ctx = v3.next();
				this.context = ctx;
				this.run(loop);
			}
			this.context = this.stack.pop();
			break;
		case 6:
			var params = e[3];
			var m = e[2];
			var v4 = Reflect.field(this.macros,m);
			var pl = new Array();
			var old = this.buf;
			pl.push($bind(this,this.resolve));
			var $it1 = params.iterator();
			while( $it1.hasNext() ) {
				var p = $it1.next();
				switch(p[1]) {
				case 0:
					var v5 = p[2];
					pl.push(this.resolve(v5));
					break;
				default:
					this.buf = new StringBuf();
					this.run(p);
					pl.push(this.buf.b);
				}
			}
			this.buf = old;
			try {
				this.buf.add(Std.string(v4.apply(this.macros,pl)));
			} catch( e7 ) {
				var plstr;
				try {
					plstr = pl.join(",");
				} catch( e8 ) {
					plstr = "???";
				}
				var msg = "Macro call " + m + "(" + plstr + ") failed (" + Std.string(e7) + ")";
				throw msg;
			}
			break;
		}
	}
	,__class__: haxe.Template
};
haxe.ds = {};
haxe.ds.IntMap = function() { };
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	get: function(key) {
		return this.h[key];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.IntMap
};
haxe.ds.ObjectMap = function() { };
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.ObjectMap
};
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.StringMap
};
haxe.io = {};
haxe.io.Bytes = function() { };
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,__class__: haxe.io.Bytes
};
haxe.xml = {};
haxe.xml._Fast = {};
haxe.xml._Fast.NodeAccess = function(x) {
	this.__x = x;
};
haxe.xml._Fast.NodeAccess.__name__ = ["haxe","xml","_Fast","NodeAccess"];
haxe.xml._Fast.NodeAccess.prototype = {
	resolve: function(name) {
		var x = this.__x.elementsNamed(name).next();
		if(x == null) {
			var xname;
			if(this.__x.nodeType == Xml.Document) xname = "Document"; else xname = this.__x.get_nodeName();
			throw xname + " is missing element " + name;
		}
		return new haxe.xml.Fast(x);
	}
	,__class__: haxe.xml._Fast.NodeAccess
};
haxe.xml._Fast.AttribAccess = function(x) {
	this.__x = x;
};
haxe.xml._Fast.AttribAccess.__name__ = ["haxe","xml","_Fast","AttribAccess"];
haxe.xml._Fast.AttribAccess.prototype = {
	__class__: haxe.xml._Fast.AttribAccess
};
haxe.xml._Fast.HasAttribAccess = function(x) {
	this.__x = x;
};
haxe.xml._Fast.HasAttribAccess.__name__ = ["haxe","xml","_Fast","HasAttribAccess"];
haxe.xml._Fast.HasAttribAccess.prototype = {
	__class__: haxe.xml._Fast.HasAttribAccess
};
haxe.xml._Fast.HasNodeAccess = function(x) {
	this.__x = x;
};
haxe.xml._Fast.HasNodeAccess.__name__ = ["haxe","xml","_Fast","HasNodeAccess"];
haxe.xml._Fast.HasNodeAccess.prototype = {
	__class__: haxe.xml._Fast.HasNodeAccess
};
haxe.xml._Fast.NodeListAccess = function(x) {
	this.__x = x;
};
haxe.xml._Fast.NodeListAccess.__name__ = ["haxe","xml","_Fast","NodeListAccess"];
haxe.xml._Fast.NodeListAccess.prototype = {
	__class__: haxe.xml._Fast.NodeListAccess
};
haxe.xml.Fast = function(x) {
	if(x.nodeType != Xml.Document && x.nodeType != Xml.Element) throw "Invalid nodeType " + Std.string(x.nodeType);
	this.x = x;
	this.node = new haxe.xml._Fast.NodeAccess(x);
	this.nodes = new haxe.xml._Fast.NodeListAccess(x);
	this.att = new haxe.xml._Fast.AttribAccess(x);
	this.has = new haxe.xml._Fast.HasAttribAccess(x);
	this.hasNode = new haxe.xml._Fast.HasNodeAccess(x);
};
haxe.xml.Fast.__name__ = ["haxe","xml","Fast"];
haxe.xml.Fast.prototype = {
	get_name: function() {
		if(this.x.nodeType == Xml.Document) return "Document"; else return this.x.get_nodeName();
	}
	,get_innerData: function() {
		var it = this.x.iterator();
		if(!it.hasNext()) throw this.get_name() + " does not have data";
		var v = it.next();
		var n = it.next();
		if(n != null) {
			if(v.nodeType == Xml.PCData && n.nodeType == Xml.CData && StringTools.trim(v.get_nodeValue()) == "") {
				var n2 = it.next();
				if(n2 == null || n2.nodeType == Xml.PCData && StringTools.trim(n2.get_nodeValue()) == "" && it.next() == null) return n.get_nodeValue();
			}
			throw this.get_name() + " does not only have data";
		}
		if(v.nodeType != Xml.PCData && v.nodeType != Xml.CData) throw this.get_name() + " does not have data";
		return v.get_nodeValue();
	}
	,__class__: haxe.xml.Fast
};
haxe.xml.Parser = function() { };
haxe.xml.Parser.__name__ = ["haxe","xml","Parser"];
haxe.xml.Parser.parse = function(str) {
	var doc = Xml.createDocument();
	haxe.xml.Parser.doParse(str,0,doc);
	return doc;
};
haxe.xml.Parser.doParse = function(str,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = str.charCodeAt(p);
	var buf = new StringBuf();
	while(!(c != c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				var child = Xml.createPCData(buf.b + HxOverrides.substr(str,start,p - start));
				buf = new StringBuf();
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			} else if(c == 38) {
				buf.addSub(str,start,p - start);
				state = 18;
				next = 13;
				start = p + 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child1 = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw "Expected <![CDATA[";
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw "Expected <!DOCTYPE";
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) throw "Expected <!--"; else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw "Expected node name";
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) throw "Expected node name";
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				nsubs++;
				break;
			case 62:
				state = 9;
				nsubs++;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				var tmp;
				if(start == p) throw "Expected attribute name";
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw "Duplicate attribute";
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw "Expected =";
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				state = 8;
				start = p;
				break;
			default:
				throw "Expected \"";
			}
			break;
		case 8:
			if(c == str.charCodeAt(start)) {
				var val = HxOverrides.substr(str,start + 1,p - start - 1);
				xml.set(aname,val);
				state = 0;
				next = 4;
			}
			break;
		case 9:
			p = haxe.xml.Parser.doParse(str,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw "Expected >";
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw "Expected >";
			}
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) throw "Expected node name";
				var v = HxOverrides.substr(str,start,p - start);
				if(v != parent.get_nodeName()) throw "Expected </" + parent.get_nodeName() + ">";
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				parent.addChild(Xml.createComment(HxOverrides.substr(str,start,p - start)));
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				parent.addChild(Xml.createDocType(HxOverrides.substr(str,start,p - start)));
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				parent.addChild(Xml.createProcessingInstruction(str1));
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(s.charCodeAt(0) == 35) {
					var i;
					if(s.charCodeAt(1) == 120) i = Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)); else i = Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.add(String.fromCharCode(i));
				} else if(!haxe.xml.Parser.escapes.exists(s)) buf.b += "&" + s + ";"; else buf.add(haxe.xml.Parser.escapes.get(s));
				start = p + 1;
				state = next;
			}
			break;
		}
		c = StringTools.fastCodeAt(str,++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) parent.addChild(Xml.createPCData(buf.b + HxOverrides.substr(str,start,p - start)));
		return p;
	}
	throw "Unexpected end";
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = ["js","Boot"];
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
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
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
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
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
var jsfl = {};
jsfl.AlignMode = function() { };
jsfl.AlignMode.__name__ = ["jsfl","AlignMode"];
jsfl.ArrangeMode = function() { };
jsfl.ArrangeMode.__name__ = ["jsfl","ArrangeMode"];
jsfl.CompressionType = function() { };
jsfl.CompressionType.__name__ = ["jsfl","CompressionType"];
jsfl.DocumentEnterEditMode = function() { };
jsfl.DocumentEnterEditMode.__name__ = ["jsfl","DocumentEnterEditMode"];
jsfl.ElementType = function() { };
jsfl.ElementType.__name__ = ["jsfl","ElementType"];
jsfl.EventType = function() { };
jsfl.EventType.__name__ = ["jsfl","EventType"];
jsfl.FilterType = function() { };
jsfl.FilterType.__name__ = ["jsfl","FilterType"];
jsfl.ItemType = function() { };
jsfl.ItemType.__name__ = ["jsfl","ItemType"];
jsfl.LayerType = function() { };
jsfl.LayerType.__name__ = ["jsfl","LayerType"];
jsfl.Lib = function() { };
jsfl.Lib.__name__ = ["jsfl","Lib"];
jsfl.Lib.alert = function(alertText) {
	alert(alertText);
};
jsfl.Lib.confirm = function(strAlert) {
	return confirm(strAlert);
};
jsfl.Lib.prompt = function(promptMsg,text) {
	if(text == null) text = "";
	return prompt(promptMsg,text);
};
jsfl.Lib.trace = function(v,posInfos) {
	jsfl.Lib.fl.trace("" + posInfos.fileName + ":" + posInfos.lineNumber + ": " + Std.string(v));
};
jsfl.Lib.throwError = function(object,posInfos) {
	jsfl.Lib.fl.trace("Error : " + Std.string(object) + " at " + posInfos.methodName + "[" + posInfos.fileName + ":" + posInfos.lineNumber + "]");
	throw object;
};
jsfl.PersistentDataType = function() { };
jsfl.PersistentDataType.__name__ = ["jsfl","PersistentDataType"];
jsfl.SymbolType = function() { };
jsfl.SymbolType.__name__ = ["jsfl","SymbolType"];
var parser = {};
parser.InnerMovieClip = function(propertyName,className,linkageClassName) {
	this.propertyName = propertyName;
	this.className = className;
	this.linkageClassName = linkageClassName;
	this.textFieldNameSet = [];
	this.innerMovieClipSet = [];
	this.framesLength = 0;
};
parser.InnerMovieClip.__name__ = ["parser","InnerMovieClip"];
parser.InnerMovieClip.prototype = {
	isFrameLengthZero: function() {
		return this.framesLength == 0;
	}
	,setFramesLength: function(framesLength) {
		this.framesLength = framesLength;
	}
	,isMovieClip: function() {
		return this.framesLength > 1;
	}
	,addTextFieldName: function(name) {
		this.textFieldNameSet.push(name);
	}
	,create: function(childName,linkageClassName) {
		var inner = new parser.InnerMovieClip(childName,this.className + "_" + childName,linkageClassName);
		this.innerMovieClipSet.push(inner);
		return inner;
	}
	,hasInner: function() {
		return this.textFieldNameSet.length != 0 || this.innerMovieClipSet.length != 0;
	}
	,__class__: parser.InnerMovieClip
};
parser.LibraryParser = function() {
	this.library = jsfl.Lib.fl.getDocumentDOM().library;
	this.packageDirectoryMap = new haxe.ds.StringMap();
	this.outputDataSet = [];
};
parser.LibraryParser.__name__ = ["parser","LibraryParser"];
parser.LibraryParser.prototype = {
	execute: function() {
		var items = this.library.items;
		var itemsLength = items.length;
		var _g = 0;
		while(_g < itemsLength) {
			var i = _g++;
			var item = items[i];
			var itemName = item.name;
			var itemType = item.itemType;
			if(itemType == jsfl.ItemType.FOLDER) continue;
			if(item.linkageClassName == null) continue;
			var pathNames = item.linkageClassName.split(".");
			var outputPath = pathNames.join("/");
			var nativeClassName = pathNames.join("");
			var className = pathNames.pop();
			var packageStr = pathNames.join(".");
			var directory = pathNames.join("/") + "/";
			this.packageDirectoryMap.set(directory,true);
			true;
			var baseInnerMovieClip = null;
			if(itemType == jsfl.ItemType.MOVIE_CLIP) {
				this.library.editItem(itemName);
				baseInnerMovieClip = new parser.InnerMovieClip(className,className,item.linkageClassName);
				this.search(baseInnerMovieClip);
			}
			this.outputDataSet.push(new parser.OutputData(outputPath,itemType,packageStr,className,nativeClassName,baseInnerMovieClip));
		}
	}
	,search: function(parentInnerMovieClip) {
		var documentDom = jsfl.Lib.fl.getDocumentDOM();
		var layers = documentDom.getTimeline().layers;
		var _g = 0;
		while(_g < layers.length) {
			var layer = layers[_g];
			++_g;
			var layerType = layer.layerType;
			if(layerType == jsfl.LayerType.FOLDER) continue;
			if(layerType == jsfl.LayerType.GUIDE) continue;
			var layerLocked = layer.locked;
			if(layerLocked) layer.locked = false;
			var layerVisible = layer.visible;
			if(!layerVisible) layer.visible = true;
			if(parentInnerMovieClip.isFrameLengthZero()) parentInnerMovieClip.setFramesLength(layer.frames.length);
			var _g1 = 0;
			var _g2 = layer.frames[0].elements;
			while(_g1 < _g2.length) {
				var element = _g2[_g1];
				++_g1;
				if(element.name == "") continue;
				if(element.elementType != jsfl.ElementType.INSTANCE) {
					parentInnerMovieClip.addTextFieldName(element.name);
					continue;
				}
				var linkageClassName = (js.Boot.__cast(element , Instance)).libraryItem.linkageClassName;
				var innerMovieClip = parentInnerMovieClip.create(element.name,linkageClassName);
				documentDom.selectNone();
				documentDom.selection = [element];
				documentDom.enterEditMode(jsfl.DocumentEnterEditMode.IN_PLACE);
				this.search(innerMovieClip);
			}
			if(layerLocked) layer.locked = true;
			if(!layerVisible) layer.visible = false;
		}
		documentDom.exitEditMode();
	}
	,__class__: parser.LibraryParser
};
parser.OutputData = function(outputPath,itemType,packageStr,className,nativeClassName,baseInnerMovieClip) {
	this.outputPath = outputPath;
	this.itemType = itemType;
	this.packageStr = packageStr;
	this.className = className;
	this.nativeClassName = nativeClassName;
	this.baseInnerMovieClip = baseInnerMovieClip;
};
parser.OutputData.__name__ = ["parser","OutputData"];
parser.OutputData.prototype = {
	__class__: parser.OutputData
};
var tmpl = {};
tmpl.MovieClip = function() {
};
tmpl.MovieClip.__name__ = ["tmpl","MovieClip"];
tmpl.MovieClip.prototype = {
	getBaseClassTemplateStr: function() {
		return "";
	}
	,getClassTemplateStr: function() {
		return "";
	}
	,getTextFieldTemplateStr: function() {
		return "";
	}
	,getLinkageClassTemplateStr: function() {
		return "";
	}
	,getMovieClipTemplateStr: function() {
		return "";
	}
	,getMovieClipTemplateStrForInner: function() {
		return "";
	}
	,getMovieClipPath: function() {
		return "";
	}
	,createInner: function(baseInnerMovieClip) {
		var movieClipPropertyLines = this.getMovieClipPropertyLines(baseInnerMovieClip,true);
		var textFieldPropertyLines = this.getTextFieldPropertyLines(baseInnerMovieClip);
		var linkageClassPropertyLines = this.getLinkageClassPropertyLines(baseInnerMovieClip);
		var classTemplate = new haxe.Template(this.getClassTemplateStr());
		var lines = classTemplate.execute({ className : baseInnerMovieClip.className, field : [textFieldPropertyLines,linkageClassPropertyLines,movieClipPropertyLines].join("\n")});
		return lines + "\n" + this.getInnerMovieClipLines(baseInnerMovieClip);
	}
	,getMovieClipPropertyLines: function(baseInnerMovieClip,inner) {
		var func;
		if(!inner) func = $bind(this,this.getMovieClipTemplateStr); else func = $bind(this,this.getMovieClipTemplateStrForInner);
		var lineSet = new Array();
		var _g = 0;
		var _g1 = baseInnerMovieClip.innerMovieClipSet;
		while(_g < _g1.length) {
			var innerMovieClip = _g1[_g];
			++_g;
			if(innerMovieClip.linkageClassName != null) continue;
			var className;
			if(innerMovieClip.hasInner()) className = innerMovieClip.className; else className = this.getMovieClipPath();
			var movieClipTemplate = new haxe.Template(func());
			var line = movieClipTemplate.execute({ propertyName : innerMovieClip.propertyName, className : className});
			lineSet.push(line);
		}
		return lineSet.join("\n");
	}
	,getTextFieldPropertyLines: function(baseInnerMovieClip) {
		var lineSet = new Array();
		var _g = 0;
		var _g1 = baseInnerMovieClip.textFieldNameSet;
		while(_g < _g1.length) {
			var textFieldName = _g1[_g];
			++_g;
			var textFieldTemplate = new haxe.Template(this.getTextFieldTemplateStr());
			var line = textFieldTemplate.execute({ propertyName : textFieldName});
			lineSet.push(line);
		}
		return lineSet.join("\n");
	}
	,getLinkageClassPropertyLines: function(baseInnerMovieClip) {
		var lineSet = new Array();
		var _g = 0;
		var _g1 = baseInnerMovieClip.innerMovieClipSet;
		while(_g < _g1.length) {
			var innerMovieClip = _g1[_g];
			++_g;
			if(innerMovieClip.linkageClassName == null) continue;
			var template = new haxe.Template(this.getLinkageClassTemplateStr());
			var line = template.execute({ propertyName : innerMovieClip.propertyName, linkageClassName : innerMovieClip.linkageClassName});
			lineSet.push(line);
		}
		return lineSet.join("\n");
	}
	,getInnerMovieClipLines: function(baseInnerMovieClip,isOpenFL) {
		if(isOpenFL == null) isOpenFL = false;
		var lineSet = new Array();
		var _g = 0;
		var _g1 = baseInnerMovieClip.innerMovieClipSet;
		while(_g < _g1.length) {
			var innerMovieClip = _g1[_g];
			++_g;
			if(!innerMovieClip.hasInner()) continue;
			if(!isOpenFL && innerMovieClip.linkageClassName != null) continue;
			var lines = this.createInner(innerMovieClip);
			lineSet.push(lines);
		}
		return lineSet.join("\n");
	}
	,__class__: tmpl.MovieClip
};
tmpl.createjs = {};
tmpl.createjs.Bitmap = function() { };
tmpl.createjs.Bitmap.__name__ = ["tmpl","createjs","Bitmap"];
tmpl.createjs.Bitmap.create = function(packageStr,className,namespace,nativeClassName) {
	var fileLines = tmpl.createjs.Bitmap.template.execute({ namespace : namespace, nativeClassName : nativeClassName, packageStr : packageStr, className : className});
	return fileLines;
};
tmpl.createjs.MovieClip = function() {
	tmpl.MovieClip.call(this);
};
tmpl.createjs.MovieClip.__name__ = ["tmpl","createjs","MovieClip"];
tmpl.createjs.MovieClip.__super__ = tmpl.MovieClip;
tmpl.createjs.MovieClip.prototype = $extend(tmpl.MovieClip.prototype,{
	getBaseClassTemplateStr: function() {
		return "package ::packageStr::;\n@:native(\"::namespace::.::nativeClassName::\")\nextern class ::className:: extends createjs.easeljs.::superClassName::{\n\tpublic var nominalBounds:createjs.easeljs.Rectangle;\n::field::\n}";
	}
	,getClassTemplateStr: function() {
		return "extern class ::className:: extends createjs.easeljs.MovieClip{\n::field::\n}";
	}
	,getTextFieldTemplateStr: function() {
		return "\tpublic var ::propertyName:::createjs.easeljs.Text;";
	}
	,getLinkageClassTemplateStr: function() {
		return "\tpublic var ::propertyName:::::linkageClassName::;";
	}
	,getMovieClipTemplateStr: function() {
		return "\tpublic var ::propertyName:::::className::;";
	}
	,getMovieClipTemplateStrForInner: function() {
		return this.getMovieClipTemplateStr();
	}
	,getMovieClipPath: function() {
		return "createjs.easeljs.MovieClip";
	}
	,create: function(baseInnerMovieClip,packageStr,namespace,nativeClassName) {
		var movieClipPropertyLines = this.getMovieClipPropertyLines(baseInnerMovieClip,false);
		var textFieldPropertyLines = this.getTextFieldPropertyLines(baseInnerMovieClip);
		var linkageClassPropertyLines = this.getLinkageClassPropertyLines(baseInnerMovieClip);
		var baseClassTemplate = new haxe.Template(this.getBaseClassTemplateStr());
		var lines = baseClassTemplate.execute({ namespace : namespace, nativeClassName : nativeClassName, packageStr : packageStr, className : baseInnerMovieClip.className, superClassName : baseInnerMovieClip.isMovieClip()?"MovieClip":"Container", field : [textFieldPropertyLines,linkageClassPropertyLines,movieClipPropertyLines].join("\n")});
		return lines + "\n" + this.getInnerMovieClipLines(baseInnerMovieClip);
	}
	,__class__: tmpl.createjs.MovieClip
});
tmpl.createjs.Sound = function() { };
tmpl.createjs.Sound.__name__ = ["tmpl","createjs","Sound"];
tmpl.createjs.Sound.create = function(packageStr,className,nativeClassName) {
	var fileLines = tmpl.createjs.Sound.template.execute({ packageStr : packageStr, className : className, nativeClassName : nativeClassName});
	return fileLines;
};
tmpl.flash = {};
tmpl.flash.Bitmap = function() { };
tmpl.flash.Bitmap.__name__ = ["tmpl","flash","Bitmap"];
tmpl.flash.Bitmap.create = function(packageStr,className) {
	var fileLines = tmpl.flash.Bitmap.template.execute({ packageStr : packageStr, className : className});
	return fileLines;
};
tmpl.flash.BitmapForExtern = function() { };
tmpl.flash.BitmapForExtern.__name__ = ["tmpl","flash","BitmapForExtern"];
tmpl.flash.BitmapForExtern.create = function(packageStr,className) {
	var fileLines = tmpl.flash.BitmapForExtern.template.execute({ packageStr : packageStr, className : className});
	return fileLines;
};
tmpl.flash.MovieClip = function() {
	tmpl.MovieClip.call(this);
};
tmpl.flash.MovieClip.__name__ = ["tmpl","flash","MovieClip"];
tmpl.flash.MovieClip.__super__ = tmpl.MovieClip;
tmpl.flash.MovieClip.prototype = $extend(tmpl.MovieClip.prototype,{
	getBaseClassTemplateStr: function() {
		return "package ::packageStr::;\n::external::class ::className:: extends flash.display.::superClassName::{\n::field::\n}";
	}
	,getClassTemplateStr: function() {
		return "typedef ::className:: =\n{ > flash.display.MovieClip,\n::field::\n}";
	}
	,getTextFieldTemplateStr: function() {
		return "\tpublic var ::propertyName:::flash.text.TextField;";
	}
	,getLinkageClassTemplateStr: function() {
		return "\tpublic var ::propertyName:::::linkageClassName::;";
	}
	,getMovieClipTemplateStr: function() {
		return "\tpublic var ::propertyName:::::className::;";
	}
	,getMovieClipTemplateStrForInner: function() {
		return this.getMovieClipTemplateStr();
	}
	,getMovieClipPath: function() {
		return "flash.display.MovieClip";
	}
	,create: function(baseInnerMovieClip,external,packageStr) {
		var movieClipPropertyLines = this.getMovieClipPropertyLines(baseInnerMovieClip,false);
		var textFieldPropertyLines = this.getTextFieldPropertyLines(baseInnerMovieClip);
		var linkageClassPropertyLines = this.getLinkageClassPropertyLines(baseInnerMovieClip);
		var baseClassTemplate = new haxe.Template(this.getBaseClassTemplateStr());
		var lines = baseClassTemplate.execute({ packageStr : packageStr, external : external?"extern ":"", className : baseInnerMovieClip.className, superClassName : baseInnerMovieClip.isMovieClip()?"MovieClip":"Sprite", field : [textFieldPropertyLines,linkageClassPropertyLines,movieClipPropertyLines].join("\n")});
		return lines + "\n" + this.getInnerMovieClipLines(baseInnerMovieClip);
	}
	,__class__: tmpl.flash.MovieClip
});
tmpl.flash.MovieClipForExtern = function() {
	tmpl.flash.MovieClip.call(this);
};
tmpl.flash.MovieClipForExtern.__name__ = ["tmpl","flash","MovieClipForExtern"];
tmpl.flash.MovieClipForExtern.__super__ = tmpl.flash.MovieClip;
tmpl.flash.MovieClipForExtern.prototype = $extend(tmpl.flash.MovieClip.prototype,{
	getClassTemplateStr: function() {
		return "extern class ::className:: extends flash.display.MovieClip{\r\n::field::\r\n}";
	}
	,__class__: tmpl.flash.MovieClipForExtern
});
tmpl.flash.Sound = function() { };
tmpl.flash.Sound.__name__ = ["tmpl","flash","Sound"];
tmpl.flash.Sound.create = function(packageStr,className,external) {
	var fileLines = tmpl.flash.Sound.template.execute({ packageStr : packageStr, className : className, external : external?"extern ":""});
	return fileLines;
};
tmpl.openfl = {};
tmpl.openfl.Bitmap = function() { };
tmpl.openfl.Bitmap.__name__ = ["tmpl","openfl","Bitmap"];
tmpl.openfl.Bitmap.create = function(packageStr,className,swfName) {
	var fileLines = tmpl.openfl.Bitmap.template.execute({ packageStr : packageStr, className : className, swfName : swfName});
	return fileLines;
};
tmpl.openfl.MovieClip = function() {
	tmpl.MovieClip.call(this);
};
tmpl.openfl.MovieClip.__name__ = ["tmpl","openfl","MovieClip"];
tmpl.openfl.MovieClip.__super__ = tmpl.MovieClip;
tmpl.openfl.MovieClip.prototype = $extend(tmpl.MovieClip.prototype,{
	getBaseClassTemplateStr: function() {
		return "package ::packageStr::;\nimport flash.display.MovieClip;\nimport flash.text.TextField;\nimport openfl.Assets;\nabstract ::className::(MovieClip){\n    public function new()\n        this = Assets.getMovieClip('::swfName:::::packageStr::.::className::');\n    @:to public function getInstance():MovieClip\n        return this;\n::field::\n}";
	}
	,getClassTemplateStr: function() {
		return "abstract ::className::(MovieClip){\n    public function new(mc:MovieClip)\n        this = mc;\n    @:to public function getInstance():MovieClip\n        return this;\n::field::\n}";
	}
	,getTextFieldTemplateStr: function() {
		return "\tpublic var ::propertyName::(get, never):TextField;\n\tfunction get_::propertyName::(){\n\t\treturn cast(this.getChildByName('::propertyName::'), TextField);\n\t}\n";
	}
	,getMovieClipTemplateStrNotHasInner: function() {
		return "\tpublic var ::propertyName::(get, never):::className::;\n\tfunction get_::propertyName::(){\n\t\treturn cast(this.getChildByName('::propertyName::'), ::className::);\n\t}\n";
	}
	,getMovieClipTemplateStrHasInner: function() {
		return "\tpublic var ::propertyName::(get, never):::className::;\n\tfunction get_::propertyName::(){\n\t\treturn new ::className::(cast this.getChildByName('::propertyName::'));\n\t}\n";
	}
	,getMovieClipPath: function() {
		return "flash.display.MovieClip";
	}
	,create: function(baseInnerMovieClip,packageStr,swfName) {
		var movieClipPropertyLines = this.getMovieClipPropertyLines(baseInnerMovieClip,false);
		var textFieldPropertyLines = this.getTextFieldPropertyLines(baseInnerMovieClip);
		var linkageClassPropertyLines = this.getLinkageClassPropertyLines(baseInnerMovieClip);
		var baseClassTemplate = new haxe.Template(this.getBaseClassTemplateStr());
		var lines = baseClassTemplate.execute({ packageStr : packageStr, className : baseInnerMovieClip.className, swfName : swfName, field : [textFieldPropertyLines,linkageClassPropertyLines,movieClipPropertyLines].join("\n")});
		return lines + "\n" + this.getInnerMovieClipLines(baseInnerMovieClip,true);
	}
	,getMovieClipPropertyLines: function(baseInnerMovieClip,inner) {
		var lineSet = new Array();
		var _g = 0;
		var _g1 = baseInnerMovieClip.innerMovieClipSet;
		while(_g < _g1.length) {
			var innerMovieClip = _g1[_g];
			++_g;
			var className;
			if(innerMovieClip.hasInner()) className = innerMovieClip.className; else className = this.getMovieClipPath();
			var func;
			if(innerMovieClip.hasInner()) func = $bind(this,this.getMovieClipTemplateStrHasInner); else func = $bind(this,this.getMovieClipTemplateStrNotHasInner);
			var movieClipTemplate = new haxe.Template(func());
			var line = movieClipTemplate.execute({ propertyName : innerMovieClip.propertyName, className : className});
			lineSet.push(line);
		}
		return lineSet.join("\n");
	}
	,getLinkageClassPropertyLines: function(baseInnerMovieClip) {
		return "";
	}
	,__class__: tmpl.openfl.MovieClip
});
tmpl.openfl.Sound = function() { };
tmpl.openfl.Sound.__name__ = ["tmpl","openfl","Sound"];
tmpl.openfl.Sound.create = function(packageStr,className) {
	var fileLines = tmpl.openfl.Sound.template.execute({ packageStr : packageStr, className : className});
	return fileLines;
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
Xml.Element = "element";
Xml.PCData = "pcdata";
Xml.CData = "cdata";
Xml.Comment = "comment";
Xml.DocType = "doctype";
Xml.ProcessingInstruction = "processingInstruction";
Xml.Document = "document";
FlashToHaxeConverter.OUTPUT_LOOP_ONCE = 2;
FlashToHaxeConverter.documentChanged = false;
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Template.splitter = new EReg("(::[A-Za-z0-9_ ()&|!+=/><*.\"-]+::|\\$\\$([A-Za-z0-9_-]+)\\()","");
haxe.Template.expr_splitter = new EReg("(\\(|\\)|[ \r\n\t]*\"[^\"]*\"[ \r\n\t]*|[!+=/><*.&|-]+)","");
haxe.Template.expr_trim = new EReg("^[ ]*([^ ]+)[ ]*$","");
haxe.Template.expr_int = new EReg("^[0-9]+$","");
haxe.Template.expr_float = new EReg("^([+-]?)(?=\\d|,\\d)\\d*(,\\d*)?([Ee]([+-]?\\d+))?$","");
haxe.Template.globals = { };
haxe.xml.Parser.escapes = (function($this) {
	var $r;
	var h = new haxe.ds.StringMap();
	h.set("lt","<");
	h.set("gt",">");
	h.set("amp","&");
	h.set("quot","\"");
	h.set("apos","'");
	h.set("nbsp",String.fromCharCode(160));
	$r = h;
	return $r;
}(this));
jsfl.AlignMode.LEFT = "left";
jsfl.AlignMode.RIGHT = "right";
jsfl.AlignMode.TOP = "top";
jsfl.AlignMode.BOTTOM = "bottom";
jsfl.AlignMode.VERTICAL_CENTER = "vertical center";
jsfl.AlignMode.HORIZONTAL_CENTER = "horizontal center";
jsfl.ArrangeMode.BACK = "back";
jsfl.ArrangeMode.BACKWARD = "backward";
jsfl.ArrangeMode.FORWARD = "forward";
jsfl.ArrangeMode.FRONT = "front";
jsfl.CompressionType.PHOTO = "photo";
jsfl.CompressionType.LOSSLESS = "lossless";
jsfl.DocumentEnterEditMode.IN_PLACE = "inPlace";
jsfl.DocumentEnterEditMode.NEW_WINDOW = "newWindow";
jsfl.ElementType.SHAPE = "shape";
jsfl.ElementType.TEXT = "text";
jsfl.ElementType.TLF_TEXT = "tlfText";
jsfl.ElementType.INSTANCE = "instance";
jsfl.ElementType.SHAPE_OBJ = "shapeObj";
jsfl.EventType.DOCUMENT_NEW = "documentNew";
jsfl.EventType.DOCUMENT_OPENED = "documentOpened";
jsfl.EventType.DOCUMENT_CLOSED = "documentClosed";
jsfl.EventType.MOUSE_MOVE = "mouseMove";
jsfl.EventType.DOCUMENT_CHANGED = "documentChanged";
jsfl.EventType.LAYER_CHANGED = "layerChanged";
jsfl.EventType.TIMELINE_CHANGED = "timelineChanged";
jsfl.EventType.FRAME_CHANGED = "frameChanged";
jsfl.EventType.PRE_PUBLISH = "prePublish";
jsfl.EventType.POST_PUBLISH = "postPublish";
jsfl.EventType.SELECTION_CHANGED = "selectionChanged";
jsfl.EventType.DPI_CHANGED = "dpiChanged";
jsfl.FilterType.ADJUSTCOLOR = "adjustColorFilter";
jsfl.FilterType.BEVEL = "bevelFilter";
jsfl.FilterType.BLUR = "blurFilter";
jsfl.FilterType.DROPSHADOW = "dropShadowFilter";
jsfl.FilterType.GLOW = "glowFilter";
jsfl.FilterType.GRADIENT_BEVEL = "gradientBevelFilter";
jsfl.FilterType.GRADIENT_GLOW = "gradientGlowFilter";
jsfl.ItemType.UNDEFINED = "undefined";
jsfl.ItemType.COMPONENT = "component";
jsfl.ItemType.MOVIE_CLIP = "movie clip";
jsfl.ItemType.GRAPHIC = "graphic";
jsfl.ItemType.BUTTON = "button";
jsfl.ItemType.FOLDER = "folder";
jsfl.ItemType.FONT = "font";
jsfl.ItemType.SOUND = "sound";
jsfl.ItemType.BITMAP = "bitmap";
jsfl.ItemType.COMPILED_CLIP = "compiled clip";
jsfl.ItemType.SCREEN = "screen";
jsfl.ItemType.VIDEO = "video";
jsfl.LayerType.NORMAL = "normal";
jsfl.LayerType.GUIDE = "guide";
jsfl.LayerType.GUIDED = "guided";
jsfl.LayerType.MASK = "mask";
jsfl.LayerType.MASKED = "masked";
jsfl.LayerType.FOLDER = "folder";
jsfl.Lib.fl = fl;
jsfl.PersistentDataType.INTEGER = "integer";
jsfl.PersistentDataType.INTEGER_ARRAY = "integerArray";
jsfl.PersistentDataType.DOUBLE = "double";
jsfl.PersistentDataType.DOUBLE_ARRAY = "doubleArray";
jsfl.PersistentDataType.STRING = "string";
jsfl.PersistentDataType.BYTE_ARRAY = "byteArray";
jsfl.SymbolType.MOVIE_CLIP = "movie clip";
jsfl.SymbolType.GRAPHIC = "graphic";
jsfl.SymbolType.BUTTON = "button";
tmpl.createjs.Bitmap.template = new haxe.Template("package ::packageStr::;\n@:native(\"::namespace::.::nativeClassName::\")\nextern class ::className:: extends createjs.easeljs.Bitmap{\n\tpublic static inline var manifestId:String = \"::nativeClassName::\";\n\tpublic function new():Void;\n\tpublic var nominalBounds:createjs.easeljs.Rectangle;\n}");
tmpl.createjs.Sound.template = new haxe.Template("package ::packageStr::;\nclass ::className::{\n\tpublic static inline var manifestId:String = \"::nativeClassName::\";\n}");
tmpl.flash.Bitmap.template = new haxe.Template("package ::packageStr::;\nclass ::className:: extends flash.display.BitmapData{\n\tfunction new(width:Int = 0, height:Int = 0, transparent:Bool = true, fillColor:UInt = 0xFFFFFFFF):Void{\n\t\tsuper(width, height, transparent, fillColor);\n\t}\n}");
tmpl.flash.BitmapForExtern.template = new haxe.Template("package ::packageStr::;\nextern class ::className:: extends flash.display.BitmapData{\n\tfunction new(width:Int = 0, height:Int = 0, transparent:Bool = true, fillColor:UInt = 0xFFFFFFFF):Void;\n}");
tmpl.flash.Sound.template = new haxe.Template("package ::packageStr::;\n::external::class ::className:: extends flash.media.Sound{\n}");
tmpl.openfl.Bitmap.template = new haxe.Template("package ::packageStr::;\nimport flash.display.BitmapData;\nimport openfl.Assets;\nabstract ::className:: (BitmapData){\n\tfunction new()\n        this = Assets.getBitmap('::swfName:::::packageStr::.::className::');\n    @:to public function getInstance():BitmapData\n        return this;\n}");
tmpl.openfl.Sound.template = new haxe.Template("package ::packageStr::;\nimport flash.media.Sound;\nimport openfl.Assets;\nabstract ::className::(Sound){\n    public function new()\n        this = Assets.getSound('::packageStr::.::className::');\n    @:to public function getInstance():Sound\n        return this;\n}");
FlashToHaxeConverter.main();
})(typeof window != "undefined" ? window : exports);
