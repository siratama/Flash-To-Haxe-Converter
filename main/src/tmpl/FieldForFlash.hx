package tmpl;
import jsfl.Element;
class FieldForFlash extends FieldForFlashOrCreateJS{

    override private function getType(element:Element):String{

       return  (element.elementType == "instance") ?
            "flash.display.MovieClip" : "flash.text.TextField";
    }
}
