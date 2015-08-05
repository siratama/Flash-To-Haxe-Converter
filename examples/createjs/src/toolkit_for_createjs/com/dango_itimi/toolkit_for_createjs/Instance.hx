package com.dango_itimi.toolkit_for_createjs;

import js.Lib;
import com.dango_itimi.utils.ClassUtil;

class Instance {
	
	private static inline var NAMESPACE_SYMBOL = "lib";

	public static function createWithSamePackageInstance(
		createdClassName:String, samePackageInstance:Dynamic, ?symbolNameSpace:String):Dynamic{

		var packageNames = ClassUtil.getPackageNamesWithInstance(samePackageInstance);
		return create(createdClassName, packageNames, symbolNameSpace);
	}
	public static function createWithSamePackageClass(
		createdClassName:String, samePackageClass:Class<Dynamic>, ?symbolNameSpace:String):Dynamic{
		
		var packageNames = ClassUtil.getPackageNamesWithClass(samePackageClass);
		return create(createdClassName, packageNames, symbolNameSpace);
	}
	public static function create(createdClassName:String, packageNames:Array<String>, ?symbolNameSpace:String = NAMESPACE_SYMBOL):Dynamic{
		
		return Lib.eval([
			"new ", symbolNameSpace, ".",
			packageNames.join(""),
			createdClassName,
			"()"
		].join(""));
	}
}
