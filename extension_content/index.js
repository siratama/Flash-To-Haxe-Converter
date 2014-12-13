(function () { "use strict";
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
var ClassName = function() { };
$hxClasses["ClassName"] = ClassName;
ClassName.__name__ = true;
var DocumentState = $hxClasses["DocumentState"] = { __ename__ : true, __constructs__ : ["CLOSED_DOCUMENT","IS_NOT_SAVED_NEW_DOCUMENT","SAVED_DOCUMENT"] };
DocumentState.CLOSED_DOCUMENT = ["CLOSED_DOCUMENT",0];
DocumentState.CLOSED_DOCUMENT.toString = $estr;
DocumentState.CLOSED_DOCUMENT.__enum__ = DocumentState;
DocumentState.IS_NOT_SAVED_NEW_DOCUMENT = ["IS_NOT_SAVED_NEW_DOCUMENT",1];
DocumentState.IS_NOT_SAVED_NEW_DOCUMENT.toString = $estr;
DocumentState.IS_NOT_SAVED_NEW_DOCUMENT.__enum__ = DocumentState;
DocumentState.SAVED_DOCUMENT = ["SAVED_DOCUMENT",2];
DocumentState.SAVED_DOCUMENT.toString = $estr;
DocumentState.SAVED_DOCUMENT.__enum__ = DocumentState;
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = true;
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
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
var InputTextSet = function(csInterfaceUtil) {
	this.csInterfaceUtil = csInterfaceUtil;
	this.inputAllElement = new $("input");
};
$hxClasses["InputTextSet"] = InputTextSet;
InputTextSet.__name__ = true;
InputTextSet.prototype = {
	initialize: function(savedFlashExternDocumentData,savedFlashDocumentData,savedCreateJSDocumentData,savedOpenFLJSDocumentData,savedJSNamespaceDocumentData) {
		this.set = [];
		this.add(PersistentDataKey.FLASH_EXTERN,savedFlashExternDocumentData);
		this.add(PersistentDataKey.FLASH,savedFlashDocumentData);
		this.add(PersistentDataKey.CREATEJS,savedCreateJSDocumentData);
		this.add(PersistentDataKey.OPENFL,savedOpenFLJSDocumentData);
		this.add(PersistentDataKey.JS_NAMESPACE,savedJSNamespaceDocumentData);
	}
	,add: function(key,savedValue) {
		var inputId = this.getInputId(key);
		var inputElement = this.inputAllElement.eq(inputId);
		this.set[inputId] = new _InputTextSet.InputText(this.csInterfaceUtil,inputElement,key,savedValue);
	}
	,getInputId: function(key) {
		switch(key) {
		case PersistentDataKey.FLASH_EXTERN:
			return 0;
		case PersistentDataKey.FLASH:
			return 1;
		case PersistentDataKey.CREATEJS:
			return 2;
		case PersistentDataKey.OPENFL:
			return 3;
		case PersistentDataKey.JS_NAMESPACE:
			return 4;
		}
	}
	,getValue: function(key) {
		return this.set[this.getInputId(key)].inputElement.val();
	}
	,run: function() {
		var _g = 0;
		var _g1 = this.set;
		while(_g < _g1.length) {
			var inputText = _g1[_g];
			++_g;
			inputText.run();
		}
	}
};
var _InputTextSet = {};
_InputTextSet.InputText = function(csInterfaceUtil,inputElement,key,savedValue) {
	this.csInterfaceUtil = csInterfaceUtil;
	this.key = key;
	this.inputElement = inputElement;
	var defaultValue = this.getDefaultValue();
	if(savedValue == jsfl.PersistentReturnData.NULL) savedValue = defaultValue;
	inputElement.val(savedValue);
	this.beforeValue = savedValue;
};
$hxClasses["_InputTextSet.InputText"] = _InputTextSet.InputText;
_InputTextSet.InputText.__name__ = true;
_InputTextSet.InputText.prototype = {
	getDefaultValue: function() {
		switch(this.key) {
		case PersistentDataKey.FLASH_EXTERN:
			return PersistentDefaultDirectoryData.FLASH_EXTERN;
		case PersistentDataKey.FLASH:
			return PersistentDefaultDirectoryData.FLASH;
		case PersistentDataKey.CREATEJS:
			return PersistentDefaultDirectoryData.CREATEJS;
		case PersistentDataKey.OPENFL:
			return PersistentDefaultDirectoryData.OPENFL;
		case PersistentDataKey.JS_NAMESPACE:
			return PersistentDefaultDirectoryData.JS_NAMESPACE;
		}
	}
	,run: function() {
		if(this.beforeValue == this.inputElement.val()) return;
		var value = this.inputElement.val();
		this.csInterfaceUtil.addDataToDocument(this.key,jsfl.PersistentDataType.STRING,value);
		this.beforeValue = value;
	}
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = true;
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
};
var Main = function() {
	this.runFinished = false;
	this.documentSaved = false;
	this.documentOpened = false;
	this.documentChanged = false;
	window.addEventListener("load",$bind(this,this.initialize));
};
$hxClasses["Main"] = Main;
Main.__name__ = true;
Main.main = function() {
	new Main();
};
Main.prototype = {
	initialize: function(event) {
		Main.csInterfaceUtil = flash_extension.csinterface.CSInterfaceUtil.create();
		this.haxeElement = new $("#haxe");
		this.optionElement = new $("#option");
		this.runButtonElement = new $("#button button");
		this.runButtonMessageElement = new $("#button .message");
		this.inputTextSet = new InputTextSet(Main.csInterfaceUtil);
		this.setTitleBar("title_haxe",this.haxeElement);
		this.setTitleBar("title_option",this.optionElement);
		this.setRunButton();
		this.callFlashToHaxeConverterScript("setEventListener()");
		this.checkDocumentOpened();
	}
	,callFlashToHaxeConverterScript: function(script,callback) {
		Main.csInterfaceUtil.evalScript("" + "FlashToHaxeConverter" + "." + script,callback);
	}
	,setTitleBar: function(titleBarId,slideElement) {
		var titleElement = new $("#" + titleBarId);
		titleElement.mousedown(function(event) {
			if(slideElement["is"](":hidden")) slideElement.slideDown("fast"); else slideElement.slideUp("fast");
		});
	}
	,setRunButton: function() {
		var _g = this;
		this.runButtonElement.mousedown(function(event) {
			_g.runButtonClicked = true;
		});
	}
	,startRunning: function(func,speed) {
		this.setTimer(speed);
		this.mainFunction = func;
	}
	,setTimer: function(speed) {
		this.timer = new haxe.Timer(speed);
		this.timer.run = $bind(this,this.run);
	}
	,run: function() {
		this.mainFunction();
	}
	,checkDocumentOpenedAndStopTimer: function() {
		this.timer.stop();
		this.checkDocumentOpened();
	}
	,checkDocumentOpened: function() {
		var _g = this;
		this.documentChanged = false;
		this.callFlashToHaxeConverterScript("isOpenedFlashDocument()",function(result) {
			if(!haxe.Unserializer.run(result)) {
				_g.initializeToWaitDocumentOpened();
				return;
			}
			_g.callFlashToHaxeConverterScript("getDocumentState()",function(result1) {
				var jsflApiCalledResult = haxe.Unserializer.run(result1);
				switch(jsflApiCalledResult[1]) {
				case 0:
					_g.checkDocumentOpened();
					break;
				case 1:
					_g.initializeToWaitDocumentSaved();
					break;
				case 2:
					_g.initializeToGetDocumentData();
					break;
				}
			});
		});
	}
	,initializeToWaitDocumentOpened: function() {
		this.startRunning($bind(this,this.waitDocumentOpened),250);
	}
	,waitDocumentOpened: function() {
		this.checkDocumentChanged();
		if(this.documentChanged) this.checkDocumentOpenedAndStopTimer();
	}
	,checkDocumentChanged: function() {
		var _g = this;
		this.callFlashToHaxeConverterScript("removeDocumentChangedEvent()",function(result) {
			if(haxe.Unserializer.run(result) && !_g.documentChanged) _g.documentChanged = true;
		});
	}
	,initializeToWaitDocumentSaved: function() {
		this.documentSaved = false;
		this.runButtonMessageElement.css("display","block");
		this.startRunning($bind(this,this.waitDocumentSaved),250);
	}
	,waitDocumentSaved: function() {
		var _g = this;
		this.checkDocumentChanged();
		if(this.documentChanged) {
			this.runButtonMessageElement.css("display","none");
			this.checkDocumentOpenedAndStopTimer();
			return;
		}
		this.callFlashToHaxeConverterScript("getDocumentState()",function(result) {
			var jsflApiCalledResult = haxe.Unserializer.run(result);
			switch(jsflApiCalledResult[1]) {
			case 0:case 1:
				return;
			case 2:
				if(!_g.documentSaved) _g.documentSaved = true;
				break;
			}
			if(!haxe.Unserializer.run(result) && !_g.documentSaved) _g.documentSaved = true;
		});
		if(this.documentSaved) {
			this.runButtonMessageElement.css("display","none");
			this.initializeToGetDocumentData();
		}
	}
	,initializeToGetDocumentData: function() {
		var _g = this;
		this.flashFileDirectory = null;
		this.savedFlashExternDocumentData = null;
		this.savedFlashDocumentData = null;
		this.savedCreateJSDocumentData = null;
		this.savedOpenFLJSDocumentData = null;
		this.savedJSNamespaceDocumentData = null;
		this.callFlashToHaxeConverterScript("getFlashFileDirectory()",function(n) {
			_g.flashFileDirectory = n;
		});
		Main.csInterfaceUtil.getDataFromDocument(PersistentDataKey.FLASH_EXTERN,function(n1) {
			_g.savedFlashExternDocumentData = n1;
		});
		Main.csInterfaceUtil.getDataFromDocument(PersistentDataKey.FLASH,function(n2) {
			_g.savedFlashDocumentData = n2;
		});
		Main.csInterfaceUtil.getDataFromDocument(PersistentDataKey.CREATEJS,function(n3) {
			_g.savedCreateJSDocumentData = n3;
		});
		Main.csInterfaceUtil.getDataFromDocument(PersistentDataKey.OPENFL,function(n4) {
			_g.savedOpenFLJSDocumentData = n4;
		});
		Main.csInterfaceUtil.getDataFromDocument(PersistentDataKey.JS_NAMESPACE,function(n5) {
			_g.savedJSNamespaceDocumentData = n5;
		});
		this.startRunning($bind(this,this.waitToGetDocumentData),250);
	}
	,waitToGetDocumentData: function() {
		if(this.flashFileDirectory != null && this.savedFlashExternDocumentData != null && this.savedFlashDocumentData != null && this.savedCreateJSDocumentData != null && this.savedOpenFLJSDocumentData != null && this.savedJSNamespaceDocumentData != null) this.setTextField();
	}
	,setTextField: function() {
		this.inputTextSet.inputAllElement.removeAttr("disabled");
		this.runButtonElement.removeAttr("disabled");
		this.inputTextSet.initialize(this.savedFlashExternDocumentData,this.savedFlashDocumentData,this.savedCreateJSDocumentData,this.savedOpenFLJSDocumentData,this.savedJSNamespaceDocumentData);
		this.initializeToWaitUserControlled();
	}
	,initializeToWaitUserControlled: function() {
		this.runButtonClicked = false;
		this.mainFunction = $bind(this,this.waitUserControlled);
	}
	,waitUserControlled: function() {
		this.checkDocumentChanged();
		if(this.documentChanged) {
			this.destroy();
			return;
		}
		this.inputTextSet.run();
		if(this.runButtonClicked) {
			this.runButtonClicked = false;
			var flashExternDirectory = this.inputTextSet.getValue(PersistentDataKey.FLASH_EXTERN);
			var flashDirectory = this.inputTextSet.getValue(PersistentDataKey.FLASH);
			var createJsDirectory = this.inputTextSet.getValue(PersistentDataKey.CREATEJS);
			var openflDirectory = this.inputTextSet.getValue(PersistentDataKey.OPENFL);
			var jsSymbolNamespace = this.inputTextSet.getValue(PersistentDataKey.JS_NAMESPACE);
			if(flashExternDirectory == "" && flashDirectory == "" && createJsDirectory == "" && openflDirectory == "") Main.csInterfaceUtil.flTrace("Set output directory"); else this.prepareToRunFlashToHaxeConverter();
		}
	}
	,prepareToRunFlashToHaxeConverter: function() {
		Main.csInterfaceUtil.flTrace("FlashToHaxeConverter" + ": Library Analysis Start...");
		this.inputTextSet.inputAllElement.attr("disabled","disabled");
		this.runButtonElement.attr("disabled","disabled");
		this.runButtonElement.text("RUNNING");
		this.waitIntervalCount = 0;
		this.timer.stop();
		this.startRunning($bind(this,this.countIntervalToRunFlashToHaxeConverter),50);
	}
	,countIntervalToRunFlashToHaxeConverter: function() {
		if(++this.waitIntervalCount >= 2) this.initializeToRunFlashToHaxeConverter();
	}
	,initializeToRunFlashToHaxeConverter: function() {
		var flashExternDirectory = this.inputTextSet.getValue(PersistentDataKey.FLASH_EXTERN);
		var flashDirectory = this.inputTextSet.getValue(PersistentDataKey.FLASH);
		var createJsDirectory = this.inputTextSet.getValue(PersistentDataKey.CREATEJS);
		var openflDirectory = this.inputTextSet.getValue(PersistentDataKey.OPENFL);
		var jsSymbolNamespace = this.inputTextSet.getValue(PersistentDataKey.JS_NAMESPACE);
		Main.csInterfaceUtil.evalScript("var " + "main" + " = new " + "FlashToHaxeConverter" + "(\"" + this.flashFileDirectory + "\", \"" + flashExternDirectory + "\", \"" + flashDirectory + "\", \"" + createJsDirectory + "\", \"" + openflDirectory + "\", \"" + jsSymbolNamespace + "\");");
		this.runFinished = false;
		this.mainFunction = $bind(this,this.runFlashToHaxeConverter);
	}
	,runFlashToHaxeConverter: function() {
		var _g = this;
		this.checkDocumentChanged();
		if(this.documentChanged) {
			Main.csInterfaceUtil.flTrace("interrupted convert");
			this.destroy();
			return;
		}
		Main.csInterfaceUtil.evalScript("" + "main" + ".run();");
		Main.csInterfaceUtil.evalScript("" + "main" + ".isFinished();",function(result) {
			if(!_g.runFinished && haxe.Unserializer.run(result)) _g.runFinished = true;
		});
		if(this.runFinished) this.destroyToRunFlashToHaxeConverter();
	}
	,destroyToRunFlashToHaxeConverter: function() {
		this.inputTextSet.inputAllElement.removeAttr("disabled");
		this.runButtonElement.removeAttr("disabled");
		this.runButtonElement.text("RUN");
		this.timer.stop();
		this.setTimer(250);
		this.initializeToWaitUserControlled();
	}
	,destroy: function() {
		this.inputTextSet.inputAllElement.val("");
		this.inputTextSet.inputAllElement.attr("disabled","disabled");
		this.runButtonElement.attr("disabled","disabled");
		this.runButtonElement.text("RUN");
		this.checkDocumentOpenedAndStopTimer();
	}
};
var IMap = function() { };
$hxClasses["IMap"] = IMap;
IMap.__name__ = true;
Math.__name__ = true;
var PersistentDataKey = function() { };
$hxClasses["PersistentDataKey"] = PersistentDataKey;
PersistentDataKey.__name__ = true;
var PersistentDefaultDirectoryData = function() { };
$hxClasses["PersistentDefaultDirectoryData"] = PersistentDefaultDirectoryData;
PersistentDefaultDirectoryData.__name__ = true;
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = true;
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = true;
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
var flash_extension = {};
flash_extension.csinterface = {};
flash_extension.csinterface.CSInterfaceUtil = function(csInterface) {
	this.csInterface = csInterface;
};
$hxClasses["flash_extension.csinterface.CSInterfaceUtil"] = flash_extension.csinterface.CSInterfaceUtil;
flash_extension.csinterface.CSInterfaceUtil.__name__ = true;
flash_extension.csinterface.CSInterfaceUtil.create = function() {
	return new flash_extension.csinterface.CSInterfaceUtil(new CSInterface());
};
flash_extension.csinterface.CSInterfaceUtil.prototype = {
	runJsflScript: function(jsflUri) {
		this.csInterface.evalScript("fl.runScript(\"" + jsflUri + "\")");
	}
	,flTrace: function(text) {
		this.csInterface.evalScript("fl.trace(\"" + text + "\")");
	}
	,getExtensionUri: function() {
		return "file:///" + this.csInterface.getSystemPath(SystemPath.EXTENSION);
	}
	,evalScript: function(script,callback) {
		this.csInterface.evalScript(script,callback);
	}
	,addDataToDocument: function(key,dataType,data) {
		this.csInterface.evalScript("document.addDataToDocument(\"" + key + "\", \"" + Std.string(dataType) + "\", \"" + data + "\");");
	}
	,getDataFromDocument: function(key,callback) {
		this.csInterface.evalScript("document.getDataFromDocument(\"" + key + "\");",callback);
	}
	,addEventListener: function(eventType,callbackCode,callback) {
		this.csInterface.evalScript("fl.addEventListener(\"" + Std.string(eventType) + "\", function(){ " + callbackCode + " });",callback);
	}
};
var haxe = {};
haxe.Log = function() { };
$hxClasses["haxe.Log"] = haxe.Log;
haxe.Log.__name__ = true;
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = true;
haxe.Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
};
haxe.Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe.Unserializer;
haxe.Unserializer.__name__ = true;
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0;
	var _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
};
haxe.Unserializer.prototype = {
	setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_1) {
			return null;
		}}; else this.resolver = r;
	}
	,get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var _g = this.get(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			var p1 = this.pos;
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 107:
			return Math.NaN;
		case 109:
			return Math.NEGATIVE_INFINITY;
		case 112:
			return Math.POSITIVE_INFINITY;
		case 97:
			var buf = this.buf;
			var a = new Array();
			this.cache.push(a);
			while(true) {
				var c1 = this.buf.charCodeAt(this.pos);
				if(c1 == 104) {
					this.pos++;
					break;
				}
				if(c1 == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw "Invalid reference";
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw "Invalid string reference";
			return this.scache[n2];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw "Enum not found " + name1;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw "Enum not found " + name2;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw "Unknown enum index " + name2 + "@" + index;
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe.ds.StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				h.set(s1,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe.ds.IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var c2 = this.get(this.pos++);
			while(c2 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c2 = this.get(this.pos++);
			}
			if(c2 != 104) throw "Invalid IntMap format";
			return h1;
		case 77:
			var h2 = new haxe.ds.ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			var s3 = HxOverrides.substr(this.buf,this.pos,19);
			d = HxOverrides.strDate(s3);
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len1) throw "Invalid bytes length";
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size;
			size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var c11 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c21 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c21 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c22 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c22 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c22 << 4 | c31 >> 2);
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw "Class not found " + name3;
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw "Invalid custom data";
			return o2;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
};
haxe.ds = {};
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = true;
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
};
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = true;
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe.ds.ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
};
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
};
haxe.io = {};
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = true;
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
};
haxe.io.Bytes.prototype = {
	set: function(pos,v) {
		this.b[pos] = v & 255;
	}
};
haxe.io.Eof = function() { };
$hxClasses["haxe.io.Eof"] = haxe.io.Eof;
haxe.io.Eof.__name__ = true;
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
};
var js = {};
js.Boot = function() { };
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = true;
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js.Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
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
var jsfl = {};
jsfl.Boot = function() { };
$hxClasses["jsfl.Boot"] = jsfl.Boot;
jsfl.Boot.__name__ = true;
jsfl.Boot.trace = function(v,infos) {
};
jsfl.EventType = function() { };
$hxClasses["jsfl.EventType"] = jsfl.EventType;
jsfl.EventType.__name__ = true;
jsfl.PersistentDataType = function() { };
$hxClasses["jsfl.PersistentDataType"] = jsfl.PersistentDataType;
jsfl.PersistentDataType.__name__ = true;
jsfl.PersistentReturnData = function() { };
$hxClasses["jsfl.PersistentReturnData"] = jsfl.PersistentReturnData;
jsfl.PersistentReturnData.__name__ = true;
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.__name__ = true;
$hxClasses.Array = Array;
Array.__name__ = true;
Date.__name__ = ["Date"];
haxe.Log.trace = jsfl.Boot.trace;
ClassName.FLASH_TO_HAXE_CONVERTER = "FlashToHaxeConverter";
Main.TIMER_SPEED_DEFAULT = 250;
Main.TIMER_SPEED_RUNNING = 50;
Main.SLIDE_SPEED = "fast";
Main.INSTANCE_NAME = "main";
Main.DISABLED = "disabled";
Main.BUTTON_RUN_TEXT = "RUN";
Main.BUTTON_RUNNING_TEXT = "RUNNING";
Main.WAIT_INTERVAL = 2;
PersistentDataKey.FLASH_EXTERN = "FLASH_EXTERN";
PersistentDataKey.FLASH = "FLASH";
PersistentDataKey.CREATEJS = "CREATEJS";
PersistentDataKey.OPENFL = "OPENFL";
PersistentDataKey.JS_NAMESPACE = "LIB";
PersistentDefaultDirectoryData.FLASH_EXTERN = "flash_extern";
PersistentDefaultDirectoryData.FLASH = "flash";
PersistentDefaultDirectoryData.CREATEJS = "createjs";
PersistentDefaultDirectoryData.OPENFL = "openfl";
PersistentDefaultDirectoryData.JS_NAMESPACE = "lib";
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.ds.ObjectMap.count = 0;
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
jsfl.PersistentDataType.INTEGER = "integer";
jsfl.PersistentDataType.INTEGER_ARRAY = "integerArray";
jsfl.PersistentDataType.DOUBLE = "double";
jsfl.PersistentDataType.DOUBLE_ARRAY = "doubleArray";
jsfl.PersistentDataType.STRING = "string";
jsfl.PersistentDataType.BYTE_ARRAY = "byteArray";
jsfl.PersistentReturnData.NULL = "0";
Main.main();
})();
