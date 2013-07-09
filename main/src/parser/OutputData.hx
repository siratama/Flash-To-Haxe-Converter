package parser;
class OutputData {

	public var itemName(default, null):String;
	public var itemType(default, null):String;
	public var packageStr(default, null):String;
	public var className(default, null):String;
	public var nativeClassName(default, null):String;
	public var baseInnerMovieClip(default, null):InnerMovieClip;

	public function new(itemName:String, itemType:String, packageStr:String, className:String, nativeClassName:String, baseInnerMovieClip:InnerMovieClip){

		this.itemName = itemName;
		this.itemType = itemType;
		this.packageStr = packageStr;
		this.className = className;
		this.nativeClassName = nativeClassName;
		this.baseInnerMovieClip = baseInnerMovieClip;
	}
}
