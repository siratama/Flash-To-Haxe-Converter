(function () { "use strict";
var $hxClasses = {};
var ClassName = function() { }
$hxClasses["ClassName"] = ClassName;
ClassName.__name__ = true;
var _Either = {}
_Either.Either_Impl_ = function() { }
$hxClasses["_Either.Either_Impl_"] = _Either.Either_Impl_;
_Either.Either_Impl_.__name__ = true;
var HxOverrides = function() { }
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = true;
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
	,__class__: List
}
var Main = function() {
	this.runFinished = false;
	this.documentSaved = false;
	this.documentOpened = false;
	this.documentChanged = false;
	js.Browser.window.addEventListener("load",$bind(this,this.initialize));
};
$hxClasses["Main"] = Main;
Main.__name__ = true;
Main.main = function() {
	new Main();
}
Main.prototype = {
	destroy: function() {
		this.inputAllElement.val("");
		this.inputAllElement.attr("disabled","disabled");
		this.runButtonElement.attr("disabled","disabled");
		this.runButtonElement.text("RUN");
		this.checkDocumentOpenedAndStopTimer();
	}
	,destroyToRunFlashToHaxeConverter: function() {
		this.inputAllElement.removeAttr("disabled");
		this.runButtonElement.removeAttr("disabled");
		this.runButtonElement.text("RUN");
		this.setTimer(250);
		this.initializeToWaitUserControlled();
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
	,initializeToRunFlashToHaxeConverter: function() {
		var flashExternDirectory = this.getInputElement(PersistentDataKey.FLASH_EXTERN).val();
		var flashDirectory = this.getInputElement(PersistentDataKey.FLASH).val();
		var createJsDirectory = this.getInputElement(PersistentDataKey.CREATEJS).val();
		var openflDirectory = this.getInputElement(PersistentDataKey.OPENFL).val();
		var jsSymbolNamespace = this.getInputElement(PersistentDataKey.JS_NAMESPACE).val();
		Main.csInterfaceUtil.evalScript("var " + "main" + " = new " + "FlashToHaxeConverter" + "(\"" + this.flashFileDirectory + "\", \"" + Std.string(flashExternDirectory) + "\", \"" + Std.string(flashDirectory) + "\", \"" + Std.string(createJsDirectory) + "\", \"" + Std.string(openflDirectory) + "\", \"" + Std.string(jsSymbolNamespace) + "\");");
		this.documentChanged = false;
		this.runFinished = false;
		this.mainFunction = $bind(this,this.runFlashToHaxeConverter);
	}
	,countIntervalToRunFlashToHaxeConverter: function() {
		if(++this.waitIntervalCount >= 2) this.initializeToRunFlashToHaxeConverter();
	}
	,prepareToRunFlashToHaxeConverter: function() {
		Main.csInterfaceUtil.flTrace("FlashToHaxeConverter" + ": Library Analysis Start...");
		this.inputAllElement.attr("disabled","disabled");
		this.runButtonElement.attr("disabled","disabled");
		this.runButtonElement.text("RUNNING");
		this.waitIntervalCount = 0;
		this.timer.stop();
		this.startRunning($bind(this,this.countIntervalToRunFlashToHaxeConverter),50);
	}
	,waitUserControlled: function() {
		this.checkDocumentChanged();
		if(this.documentChanged) this.destroy(); else if(this.runButtonClicked) this.prepareToRunFlashToHaxeConverter();
	}
	,initializeToWaitUserControlled: function() {
		this.runButtonClicked = false;
		this.documentChanged = false;
		this.mainFunction = $bind(this,this.waitUserControlled);
	}
	,getInputId: function(key) {
		return (function($this) {
			var $r;
			switch(key) {
			case PersistentDataKey.FLASH_EXTERN:
				$r = 0;
				break;
			case PersistentDataKey.FLASH:
				$r = 1;
				break;
			case PersistentDataKey.CREATEJS:
				$r = 2;
				break;
			case PersistentDataKey.OPENFL:
				$r = 3;
				break;
			case PersistentDataKey.JS_NAMESPACE:
				$r = 4;
				break;
			}
			return $r;
		}(this));
	}
	,getInputElement: function(key) {
		return this.inputAllElement.eq(this.getInputId(key));
	}
	,setTextFieldCommon: function(key,defaultValue,value) {
		if(value == jsfl.PersistentReturnData.NULL) value = defaultValue;
		var inputElement = this.getInputElement(key);
		inputElement.val(value);
		inputElement.change(function(event) {
			Main.csInterfaceUtil.addDataToDocument(key,jsfl.PersistentDataType.STRING,inputElement.val());
		});
	}
	,setTextField: function() {
		this.inputAllElement.unbind("change").removeAttr("disabled");
		this.runButtonElement.removeAttr("disabled");
		this.setTextFieldCommon(PersistentDataKey.FLASH_EXTERN,PersistentDefaultDirectoryData.FLASH_EXTERN,this.savedFlashExternDocumentData);
		this.setTextFieldCommon(PersistentDataKey.FLASH,PersistentDefaultDirectoryData.FLASH,this.savedFlashDocumentData);
		this.setTextFieldCommon(PersistentDataKey.CREATEJS,PersistentDefaultDirectoryData.CREATEJS,this.savedCreateJSDocumentData);
		this.setTextFieldCommon(PersistentDataKey.OPENFL,PersistentDefaultDirectoryData.OPENFL,this.savedOpenFLJSDocumentData);
		this.setTextFieldCommon(PersistentDataKey.JS_NAMESPACE,PersistentDefaultDirectoryData.JS_NAMESPACE,this.savedJSNamespaceDocumentData);
		this.initializeToWaitUserControlled();
	}
	,waitToGetDocumentData: function() {
		if(this.flashFileDirectory != null && this.savedFlashExternDocumentData != null && this.savedFlashDocumentData != null && this.savedCreateJSDocumentData != null && this.savedOpenFLJSDocumentData != null && this.savedJSNamespaceDocumentData != null) this.setTextField();
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
		Main.csInterfaceUtil.getDataFromDocument(PersistentDataKey.FLASH_EXTERN,function(n) {
			_g.savedFlashExternDocumentData = n;
		});
		Main.csInterfaceUtil.getDataFromDocument(PersistentDataKey.FLASH,function(n) {
			_g.savedFlashDocumentData = n;
		});
		Main.csInterfaceUtil.getDataFromDocument(PersistentDataKey.CREATEJS,function(n) {
			_g.savedCreateJSDocumentData = n;
		});
		Main.csInterfaceUtil.getDataFromDocument(PersistentDataKey.OPENFL,function(n) {
			_g.savedOpenFLJSDocumentData = n;
		});
		Main.csInterfaceUtil.getDataFromDocument(PersistentDataKey.JS_NAMESPACE,function(n) {
			_g.savedJSNamespaceDocumentData = n;
		});
		this.startRunning($bind(this,this.waitToGetDocumentData),250);
	}
	,waitDocumentSaved: function() {
		var _g = this;
		this.checkDocumentChanged();
		if(this.documentChanged) {
			this.runButtonMessageElement.css("display","none");
			this.checkDocumentOpenedAndStopTimer();
			return;
		}
		this.callFlashToHaxeConverterScript("isNewDocument()",function(result) {
			if(haxe.Unserializer.run(result) && !_g.documentSaved) _g.documentSaved = true;
		});
		if(this.documentSaved) {
			this.runButtonMessageElement.css("display","none");
			this.initializeToGetDocumentData();
		}
	}
	,initializeToWaitDocumentSaved: function() {
		this.documentSaved = false;
		this.runButtonMessageElement.css("display","block");
		this.startRunning($bind(this,this.waitDocumentSaved),250);
	}
	,checkDocumentChanged: function() {
		var _g = this;
		this.callFlashToHaxeConverterScript("removeDocumentChangedEvent()",function(result) {
			if(haxe.Unserializer.run(result) && !_g.documentChanged) _g.documentChanged = true;
		});
	}
	,waitDocumentOpened: function() {
		this.checkDocumentChanged();
		if(this.documentChanged) this.checkDocumentOpenedAndStopTimer();
	}
	,initializeToWaitDocumentOpened: function() {
		this.documentChanged = false;
		this.startRunning($bind(this,this.waitDocumentOpened),250);
	}
	,checkDocumentOpened: function() {
		var _g = this;
		this.callFlashToHaxeConverterScript("isOpenedFlashDocument()",function(result) {
			if(!haxe.Unserializer.run(result)) {
				_g.initializeToWaitDocumentOpened();
				return;
			}
			_g.callFlashToHaxeConverterScript("isNewDocument()",function(result1) {
				if(haxe.Unserializer.run(result1)) _g.initializeToWaitDocumentSaved(); else _g.initializeToGetDocumentData();
			});
		});
	}
	,checkDocumentOpenedAndStopTimer: function() {
		this.timer.stop();
		this.checkDocumentOpened();
	}
	,run: function() {
		this.mainFunction();
	}
	,setTimer: function(speed) {
		this.timer = new haxe.Timer(speed);
		this.timer.run = $bind(this,this.run);
	}
	,startRunning: function(func,speed) {
		this.setTimer(speed);
		this.mainFunction = func;
	}
	,setRunButton: function() {
		var _g = this;
		this.runButtonElement.mousedown(function(event) {
			_g.runButtonClicked = true;
		});
	}
	,setTitleBar: function(titleBarId,slideElement) {
		var titleElement = new $("#" + titleBarId);
		titleElement.mousedown(function(event) {
			if(slideElement["is"](":hidden")) slideElement.slideDown("fast"); else slideElement.slideUp("fast");
		});
	}
	,callFlashToHaxeConverterScript: function(script,callback) {
		Main.csInterfaceUtil.evalScript("" + "FlashToHaxeConverter" + "." + script,callback);
	}
	,initialize: function(event) {
		Main.csInterfaceUtil = flash_extension.csinterface.CSInterfaceUtil.create();
		this.haxeElement = new $("#haxe");
		this.optionElement = new $("#option");
		this.runButtonElement = new $("#button button");
		this.runButtonMessageElement = new $("#button .message");
		this.inputAllElement = new $("input");
		this.setTitleBar("title_haxe",this.haxeElement);
		this.setTitleBar("title_option",this.optionElement);
		this.setRunButton();
		this.callFlashToHaxeConverterScript("setEventListener()");
		this.checkDocumentOpened();
	}
	,__class__: Main
}
var IMap = function() { }
$hxClasses["IMap"] = IMap;
IMap.__name__ = true;
var PersistentDataKey = function() { }
$hxClasses["PersistentDataKey"] = PersistentDataKey;
PersistentDataKey.__name__ = true;
var PersistentDefaultDirectoryData = function() { }
$hxClasses["PersistentDefaultDirectoryData"] = PersistentDefaultDirectoryData;
PersistentDefaultDirectoryData.__name__ = true;
var Reflect = function() { }
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
var Std = function() { }
$hxClasses["Std"] = Std;
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
var StringTools = function() { }
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = true;
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
var Type = function() { }
$hxClasses["Type"] = Type;
Type.__name__ = true;
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
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
}
var flash_extension = {}
flash_extension.csinterface = {}
flash_extension.csinterface.CSInterfaceUtil = function(csInterface) {
	this.csInterface = csInterface;
};
$hxClasses["flash_extension.csinterface.CSInterfaceUtil"] = flash_extension.csinterface.CSInterfaceUtil;
flash_extension.csinterface.CSInterfaceUtil.__name__ = true;
flash_extension.csinterface.CSInterfaceUtil.create = function() {
	return new flash_extension.csinterface.CSInterfaceUtil(new CSInterface());
}
flash_extension.csinterface.CSInterfaceUtil.prototype = {
	addEventListener: function(eventType,callbackCode,callback) {
		this.csInterface.evalScript("fl.addEventListener(\"" + Std.string(eventType) + "\", function(){ " + callbackCode + " });",callback);
	}
	,getDataFromDocument: function(key,callback) {
		this.csInterface.evalScript("document.getDataFromDocument(\"" + key + "\");",callback);
	}
	,addDataToDocument: function(key,dataType,data) {
		this.csInterface.evalScript("document.addDataToDocument(\"" + key + "\", \"" + Std.string(dataType) + "\", \"" + data + "\");");
	}
	,evalScript: function(script,callback) {
		this.csInterface.evalScript(script,callback);
	}
	,getExtensionUri: function() {
		return "file:///" + this.csInterface.getSystemPath(SystemPath.EXTENSION);
	}
	,flTrace: function(text) {
		this.csInterface.evalScript("fl.trace(\"" + text + "\")");
	}
	,runJsflScript: function(jsflUri) {
		this.csInterface.evalScript("fl.runScript(\"" + jsflUri + "\")");
	}
	,__class__: flash_extension.csinterface.CSInterfaceUtil
}
var haxe = {}
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = true;
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
	var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
}
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype = {
	unserialize: function() {
		var _g = this.buf.charCodeAt(this.pos++);
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
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = StringTools.urlDecode(s);
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
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
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
			var n = this.readDigits();
			if(n < 0 || n >= this.cache.length) throw "Invalid reference";
			return this.cache[n];
		case 82:
			var n = this.readDigits();
			if(n < 0 || n >= this.scache.length) throw "Invalid string reference";
			return this.scache[n];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 119:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl)[index];
			if(tag == null) throw "Unknown enum index " + name + "@" + index;
			var e = this.unserializeEnum(edecl,tag);
			this.cache.push(e);
			return e;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe.ds.StringMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h = new haxe.ds.IntMap();
			this.cache.push(h);
			var buf = this.buf;
			var c = this.buf.charCodeAt(this.pos++);
			while(c == 58) {
				var i = this.readDigits();
				h.set(i,this.unserialize());
				c = this.buf.charCodeAt(this.pos++);
			}
			if(c != 104) throw "Invalid IntMap format";
			return h;
		case 77:
			var h = new haxe.ds.ObjectMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 118:
			var d = HxOverrides.strDate(HxOverrides.substr(this.buf,this.pos,19));
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len = this.readDigits();
			var buf = this.buf;
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid bytes length";
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i = this.pos;
			var rest = len & 3;
			var size = (len >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i + (len - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i < max) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				var c3 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				var c4 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c3 << 6 | c4) & 255;
			}
			if(rest >= 2) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				if(rest == 3) {
					var c3 = codes[buf.charCodeAt(i++)];
					bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				}
			}
			this.pos += len;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			o.hxUnserialize(this);
			if(this.buf.charCodeAt(this.pos++) != 103) throw "Invalid custom data";
			return o;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.buf.charCodeAt(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!js.Boot.__instanceof(k,String)) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
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
	,setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_) {
			return null;
		}}; else this.resolver = r;
	}
	,__class__: haxe.Unserializer
}
haxe.ds = {}
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
	,__class__: haxe.ds.IntMap
}
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = true;
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ != null?key.__id__:key.__id__ = ++haxe.ds.ObjectMap.count;
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,__class__: haxe.ds.ObjectMap
}
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
	,__class__: haxe.ds.StringMap
}
haxe.io = {}
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
}
haxe.io.Bytes.prototype = {
	__class__: haxe.io.Bytes
}
var js = {}
js.Boot = function() { }
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = true;
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
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(o.__class__,cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
js.Browser = function() { }
$hxClasses["js.Browser"] = js.Browser;
js.Browser.__name__ = true;
var jsfl = {}
jsfl.EventType = function() { }
$hxClasses["jsfl.EventType"] = jsfl.EventType;
jsfl.EventType.__name__ = true;
jsfl.PersistentDataType = function() { }
$hxClasses["jsfl.PersistentDataType"] = jsfl.PersistentDataType;
jsfl.PersistentDataType.__name__ = true;
jsfl.PersistentReturnData = function() { }
$hxClasses["jsfl.PersistentReturnData"] = jsfl.PersistentReturnData;
jsfl.PersistentReturnData.__name__ = true;
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
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
String.__name__ = true;
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = true;
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
js.Browser.window = typeof window != "undefined" ? window : null;
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
