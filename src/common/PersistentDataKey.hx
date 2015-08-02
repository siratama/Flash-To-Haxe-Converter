package ;

@:fakeEnum(String)
extern enum PersistentDataKey {
	FLASH_EXTERN;
	FLASH;
	CREATEJS;
	OPENFL;
	GAF;
	JS_NAMESPACE;
}

@:native("PersistentDataKey")
private class Impl {
	public static inline var FLASH_EXTERN = "FLASH_EXTERN";
	public static inline var FLASH = "FLASH";
	public static inline var CREATEJS = "CREATEJS";
	public static inline var OPENFL = "OPENFL";
	public static inline var GAF = "GAF";
	public static inline var JS_NAMESPACE = "LIB";
}
