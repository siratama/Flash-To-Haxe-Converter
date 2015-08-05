package com.dango_itimi.createjs.sound;

import com.dango_itimi.as3_and_createjs.sound.SoundEffect;
import com.dango_itimi.as3_and_createjs.sound.SoundEffectMap;
import createjs.soundjs.Sound;
import createjs.soundjs.SoundInstance;

class SoundEffectMapForJS extends SoundEffectMap{

	public function new(){
		super();
	}
	public function register(
		id:String, ?intervalFrame:Int = 5, ?interrupt:String = Sound.INTERRUPT_EARLY, ?delay:Int = 0, ?offset:Int = 0, ?loop:Int = 0, ?volume:Float = 1.0, ?pan:Float = 0):String{

		var soundEffect = new SoundEffectForJS(id, intervalFrame, interrupt, delay, offset, loop, volume, pan);
		soundEffectMap.set(id, soundEffect);
		return id;
	}
	public function playForFrameSound(id:String, loop:Int = 0){

		if(!soundEffectMap.exists(id))
			register(id, 0, Sound.INTERRUPT_EARLY, 0, 0, loop);

		var soundEffect = soundEffectMap.get(id);
		soundEffect.play();
	}
}
