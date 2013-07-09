package parser;
import jsfl.Flash;
class InnerMovieClip{

    public var propertyName(default, null):String;
    public var className(default, null):String;
    public var textFieldNameSet(default, null):Array<String>;
    public var innerMovieClipSet(default, null):Array<InnerMovieClip>;
    private var framesLength:Int;

    public function new(propertyName:String, className:String){
        this.propertyName = propertyName;
        this.className = className;
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
    public function create(childName:String):InnerMovieClip{
        var inner = new InnerMovieClip(childName, className + "_" + childName);
        innerMovieClipSet.push(inner);
        return inner;
    }
    public function hasInner():Bool{
        return (textFieldNameSet.length != 0) || (innerMovieClipSet.length != 0);
    }
}
