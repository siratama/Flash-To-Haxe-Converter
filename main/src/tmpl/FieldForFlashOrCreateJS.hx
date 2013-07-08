package tmpl;
import haxe.Template;
import jsfl.Element;
class FieldForFlashOrCreateJS extends Field{

    private static var fieldTemplate:Template = new Template(
        "\tvar ::name:: : ::type::;"
    );

    override private function getLine(element:Element):String{

        return fieldTemplate.execute({
            name: element.name,
            type: getType(element)
        });
    }
    private function getType(element:Element):String{
        return "";
    }
}
