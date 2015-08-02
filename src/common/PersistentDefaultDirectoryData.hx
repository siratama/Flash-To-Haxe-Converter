package ;

@:fakeEnum(String)
extern enum PersistentDefaultDirectoryData {
	FLASH_EXTERN;
	FLASH;
	CREATEJS;
	OPENFL;
	GAF;
	JS_NAMESPACE;
}

@:native("PersistentDefaultDirectoryData")
private class Impl {
	public static inline var FLASH_EXTERN = "flash_extern";
	public static inline var FLASH = "flash";
	public static inline var CREATEJS = "createjs";
	public static inline var OPENFL = "openfl";
	public static inline var GAF = "gaf";
	public static inline var JS_NAMESPACE = "lib";
}
