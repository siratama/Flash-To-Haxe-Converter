package parser;
import jsfl.ItemType;
class OutputData {

	public var outputPath(default, null):String;
	public var itemType(default, null):ItemType;
	public var packageStr(default, null):String;
	public var className(default, null):String;
	public var nativeClassName(default, null):String;
	public var baseInnerMovieClip(default, null):InnerMovieClip;

	public function new(outputPath:String, itemType:ItemType, packageStr:String, className:String, nativeClassName:String, baseInnerMovieClip:InnerMovieClip){

		this.outputPath = outputPath;
		this.itemType = itemType;
		this.packageStr = packageStr;
		this.className = className;
		this.nativeClassName = nativeClassName;
		this.baseInnerMovieClip = baseInnerMovieClip;
	}
}
