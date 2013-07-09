package tmpl.flash;
class MovieClipForExtern extends MovieClip{

	override private function getClassTemplateStr():String{
	return (
"extern class ::className:: extends flash.display.MovieClip{
::field::
}");
	}
}
