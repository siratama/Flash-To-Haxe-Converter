package tmpl;
import jsfl.Element;
class FieldForCreateJS extends FieldForFlashOrCreateJS{

    override private function getType(element:Element):String{

        return  (element.elementType == "instance") ?
            "createjs.easeljs.MovieClip" : "createjs.easeljs.Text";
    }
}
