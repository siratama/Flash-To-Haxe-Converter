package parser;
import jsfl.Flash;
class InnerMovieClip {

	public var propertyName(default, null):String;
	public var className(default, null):String;
	public var textFieldNameSet(default, null):Array<String>;
	public var linkageClassName(default, null):String;
	public var innerMovieClipSet(default, null):Array<InnerMovieClip>;
	public var framesLength(default, null):Int;

	public function new(propertyName:String, className:String, linkageClassName:String){

		this.propertyName = propertyName;
		this.className = className;
		this.linkageClassName = linkageClassName;
		textFieldNameSet = [];
		innerMovieClipSet = [];
		framesLength = 0;
	}

	public function isFrameLengthZero():Bool{
		return framesLength == 0;
	}

	public function setFramesLength(framesLength:Int){
		this.framesLength = framesLength;
	}

	public function isMovieClip():Bool{
		return framesLength > 1;
	}

	public function addTextFieldName(name:String){
		textFieldNameSet.push(name);
	}

	public function create(childName:String, linkageClassName:String):InnerMovieClip{
		var inner = new InnerMovieClip(childName, className + "_" + childName, linkageClassName);
		innerMovieClipSet.push(inner);
		return inner;
	}

	public function hasInner():Bool{
		return (textFieldNameSet.length != 0) || (innerMovieClipSet.length != 0);
	}
}

