package tmpl;
import jsfl.Element;
import haxe.Template;
class FieldForOpenFL extends Field{

    private static var fieldTemplate:Template = new Template("
    public var ::name::(get, never):::type::;
    function get_::name::(){
        return cast(this.getChildByName('::name::'), ::type::);
    }
");

    override private function getLine(element:Element):String{

        return fieldTemplate.execute({
            name: element.name,
            type: getType(element)
        });
    }
    private function getType(element:Element):String{

        return  (element.elementType == "instance") ?
            "flash.display.MovieClip" : "flash.text.TextField";
    }
}
