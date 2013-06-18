package;
class OutputData {

	public var itemName(default, null):String;
	public var itemType(default, null):String;
	public var packageStr(default, null):String;
	public var className(default, null):String;
	public var nativeClassName(default, null):String;

	public function new(itemName:String, itemType:String, packageStr:String, className:String, nativeClassName:String){

		this.itemName = itemName;
		this.itemType = itemType;
		this.packageStr = packageStr;
		this.className = className;
		this.nativeClassName = nativeClassName;
	}
}
