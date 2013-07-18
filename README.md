FlashToHaxeConverter
=======================
licence: MIT

![アプリケーション概要](img/0.png)

FlashToHaxeConverter is JSFL outputting structure in Flash CC to the Haxe class.  FlashToHaxeConverter outputs for Flash contents and Toolkit for CreateJS contents and OpenFL.

FlashToHaxeConverter は、Flash CC 内構造を Haxe クラスに出力する JSFL です。Flash コンテンツ用(二種類)、Toolkit for CreateJS (html5 canvas コンテンツ)用、OpenFL 用の合計四種類の出力が可能です。

## Download

* [main.zip](https://raw.github.com/siratama/Flash-To-Haxe-Converter/master/download/main.zip)
* [JSFLSetsDirectoryChecker.jsfl (option)](https://raw.github.com/siratama/Flash-To-Haxe-Converter/master/download/JSFLSetsDirectoryChecker.jsfl)

Windows の場合、右クリックから「リンク先のコンテンツを保存」を選択で保存できます。

When you do not know the placement directory of JSFL, please download JSFLSetsDirectoryChecker.jsfl.

JSFL ファイルの配置場所がわからない方は JSFLSetsDirectoryChecker.jsfl のファイルもダウンロードしてください。

## Installation

The placement directory of JSFL is displayed by an output window when you drag and drop JSFLSetsDirectoryChecker.jsfl in Flash CC.

JSFL ファイル配置場所(Configuration ディレクトリ)は、Flash CC 上に JSFLSetsDirectoryChecker.jsfl をドラッグ＆ドロップして実行する事で、出力ウインドウに表示されます。

![Configuration Directory](img/config_directory.png)

Please place Commands/FlashToHaxeConverter.jsfl and FlashToHaxeConverter directory in main.zip to the Comfiguration directory.

main.zip 解凍後できあがる Commands/FlashToHaxeConverter.jsfl ファイルと FlashToHaxeConverter ディレクトリを、Comfiguration ディレクトリへ以下のように配置してください。

	Configuration/
	　├ Commands/
	　│　└ FlashToHaxeConverter.jsfl
	　│
	　└ FlashToHaxeConverter/
	　　　├ dialog.xml
	　　　├ main.jsfl
	　　　└ main.swf

FlashToHaxeConverter is displayed in a command menu by placing it definitely.

正しく配置が行われると、Flash CC メニュー[コマンド]内に FlashToHaxeConverter の項目が表示されます。

![Setting Success](img/setting_success.png)


## Usage

If you select FlashToHaxeConverter in a command menu, a dialogue is displayed.  The linkaged symbol in the library is output as Haxe file when you push RUN button.

FlashToHaxeConverter の項目を選択すると、以下のダイアログが表示されます。RUN ボタンを押すことで、ライブラリ内 リンケージ設定を行ったシンボル設定そのままに Haxe ファイルの出力が行われます。

![dialog](img/dialog.png)

It is not output when you empty a text field. In the case of the following figures, only file group of CreateJS-Haxe is output. 

テキストフィールドを空にすると、出力は行われなくなります。以下の図の場合、CreateJS-Haxe のファイル群のみ出力されます。

![dialog2](img/dialog2.png)

When you want to output it in any directory, you describe relative path.

fla ファイルと異なるディレクトリに出力したい場合、相対パス指定を行います。

![dialog3](img/dialog3.png)

## Features

### IDE 補完用出力

リンケージ設定の行なっていない MovieClip 内部に存在するプロパティにアクセスするための出力が行われます。詳しくは以下をご参考ください。(Thanks! @tail_y)

[http://qiita.com/tail_y/items/9d7f8cf903613c1037e6](http://qiita.com/tail_y/items/9d7f8cf903613c1037e6)

[http://www.dango-itimi.com/blog/archives/2013/001191.html](http://www.dango-itimi.com/blog/archives/2013/001191.html)

### Toolkit for CreateJS 用 独自出力

CreateJS用に出力された各 Haxe ファイルには、Toolkit for CreateJS から出力された javascript ファイルにアクセスしやすくなるような以下のプロパティを追加しています。

* Sound.manifestId 
* Bitmap.manifestId 
* Bitmap.nominalBounds
* Container.nominalBounds
* MovieClip.nominalBounds
* MovieClip.frameBounds

## 廃止された機能

意図しないファイル削除が行われてしまう事を避けるため、Haxe ファイル出力ディレクトリの自動クリア機能は削除されました。

よって、fla ファイル内ライブラリの構造に変更を行った場合、Haxe 出力ディレクトリ内には以前の無駄なファイルが残ってしまう事があります。

無駄なファイルの削除を行いたい場合、一度手動で Haxe 出力ディレクトリの削除をお願いします。

## OpenFL-Haxe Restrictions

出力された OpenFL 用 hx ファイルの使用には制限事項があります。
View という名前の MovieClip を OpenFL 用として出力した場合、View.hx(抽象型)は親に MovieClip を持っていないため、以下の trace 文はエラーとなります。

	var view = new View();
	addChild(view); //ok
	trace(view.x); //error

エラーを避けるためには一度 cast を行う必要があります。

	var view = new View();
	addChild(view);
	var mc:MovieClip = cast view;
	trace(mc.x); //ok

Type.createInstance メソッド経由での生成は意図通り行えません。

	var view = Type.createInstance(View, []);
	addChild(view); //error

ビットマップ画像にリンケージ設定を行った BitmapDataView クラスは、生成しようとしても null を返します。OpenFL の swf 解析機能はまだ α版のようで、必ず null を返すようになっているためです。ビットマップ画像を使用したい場合、MovieClip に配置し、その MovieClip にリンケージ設定を行なってください。

	var bitmapDataView = new BitmapDataView();
	trace(bitmapDataView); //null

また、swf 内に埋め込んだビットマップ画像はどのような形式でも扱えるわけではないようです。PNG-8 形式の画像は読み込めず、PNG-24 形式の画像は読み込める、といった現象が発生します。MovieClip に配置したビットマップ画像が表示されない場合、画像形式を変えてみるなど色々試してみる必要があります。

その他、swf 内に埋め込んだサウンドを取得するメソッドは、OpenFL には現在用意されていません。コンパイル用 xml ファイルに使用するサウンドファイルを手動で登録する必要があります。

	<assets path="test/JumpSound.wav" id="test.JumpSound" />

FlashToHaxeConverter から出力されるサウンド用 test.JumpSound.hx ファイルのコンストラクタには、以下の様な記述が行われるので、new JumpSound(); という記述で Sound インスタンスの生成が可能となります。

	public function new()
		this = Assets.getSound('test.JumpSound');

##制作の流れと FlashToHaxeConverter の役割箇所

Flash CC と Haxe を利用することで、Flash コンテンツ, html5 canvas コンテンツ, Desktop アプリケーション, Android アプリ, iOS アプリ といった様々なプラットフォーム向けのコンテンツ並行制作が可能となります。制作の流れは以下の図のようになります。

![全体像](img/1.png)

まず、Photoshop や Illustrator を用いて画像素材を作成し、また、サウンド編集ソフトで音声ファイルを作成後、Flash CC に取り込みます。

Flash CC では、各素材を利用してアニメーションを作成したり、各素材データをスクリプトから操作できるよう 素材に命名(リンケージ設定)を行います。編集作業完了後、Flash or OpenFL コンテンツを制作する場合は swf をパブリッシュ、html5 コンテンツを制作する場合は Toolkit for CreateJS でのパブリッシュを行います。

同時に当 JSFL(図内 FlashToHaxeConverter) を利用して、Flash CC 内ライブラリ構造を Haxe extern クラス群に変換を行います。

出力された Flash & OpenFL & html5 用のデータは共通の構造を持つため、クロスプラットフォーム用言語 Haxe にて処理することにより、より少ない手間で Flash, OpenFL, html5 canvas コンテンツの同時制作が可能となります。

##サンプル解説

* examples/1/

	Haxe 条件付きコンパイル指定を行い、一つのソースコード内に Flash 用ソースコードと javascript 用ソースコード両方を記述した例

* examples/2/

	プラットフォームごとに、一つのソースコード内に Flash 用ソースコードと javascript 用ソースコード両方を記述した例

examples/2/air/ ディレクトリ内には Adobe AIR (Android アプリ)を出力するサンプルも作成しています。

##注意点

###haxelib jsfl

jsfl を作成した Haxe ソースコードでは、以下の jsfl 用 extern ライブラリを利用しています。

[http://lib.haxe.org/p/jsfl](http://lib.haxe.org/p/jsfl)

しかし、上記の物は対象となる jsfl のバージョンが古く、少々内容を変更する必要があります。Haxe ソースコードを修正する場合は少々手間となるためご注意ください。

###対応バージョン

当アプリケーションは以下のバージョンをターゲットにしています。

* Toolkit for CreateJS 1.2
* Haxe 3



