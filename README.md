FlashToHaxeConverter
=======================
licence: MIT

![アプリケーション概要](img/0.png)

FlashToHaxeConverter is JSFL outputting structure in Flash CC to the Haxe extern class.  FlashToHaxeConverter outputs for Flash contents and Toolkit for CreateJS contents.

FlashToHaxeConverter は、Flash CC 内構造を Haxe extern クラスに出力する JSFL です。swf(Flash コンテンツ)用と Toolkit for CreateJS (html5 canvas コンテンツ)用の二種類の出力が可能です。

## Download

* [FlashToHaxeConverter.zip](https://raw.github.com/siratama/Flash-To-Haxe-Converter/master/download/FlashToHaxeConverter.zip)
* [JSFLSetsDirectoryChecker.jsfl (option)](https://raw.github.com/siratama/Flash-To-Haxe-Converter/master/download/JSFLSetsDirectoryChecker.jsfl)

Windows の場合、右クリックから「リンク先のコンテンツを保存」を選択で保存できます。

When you do not know the placement directory of JSFL, please download JSFLSetDirectoryChecker.jsfl.

JSFL ファイルの配置場所がわからない方は JSFLSetDirectoryChecker.jsfl のファイルもダウンロードしてください。

## Installation

The placement directory of JSFL is displayed by an output window when you drag and drop JSFLSetDirectoryChecker.jsfl in Flash CC.

JSFL ファイル配置場所(Configuration ディレクトリ)は、Flash CC 上に JSFLSetDirectoryChecker.jsfl をドラッグ＆ドロップして実行する事で、出力ウインドウに表示されます。

![Configuration Directory](img/config_directory.png)

Please place Commands/FlashToHaxeConverter.jsfl and FlashToHaxeConverter directory in FlashToHaxeConverter.zip to the Comfiguration directory.

FlashToHaxeConverter.zip 解凍後できあがる Commands/FlashToHaxeConverter.jsfl ファイルと FlashToHaxeConverter ディレクトリを、Comfiguration ディレクトリへ以下のように配置してください。

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


##制作の流れと FlashToHaxeConverter の役割箇所

Flash CC と Haxe を利用することで、Flash コンテンツ, html5 canvas コンテンツ, Desktop アプリケーション, Android アプリ, iOS アプリ といった様々なプラットフォーム向けのコンテンツ並行制作が可能となります。制作の流れは以下の図のようになります。

![全体像](img/1.png)

まず、Photoshop や Illustrator を用いて画像素材を作成し、また、サウンド編集ソフトで音声ファイルを作成後、Flash CC に取り込みます。

Flash CC では、各素材を利用してアニメーションを作成したり、各素材データをスクリプトから操作できるよう 素材に命名(リンケージ設定)を行います。編集作業完了後、Flash コンテンツを制作する場合は swf をパブリッシュ、html5 コンテンツを制作する場合は Toolkit for CreateJS でのパブリッシュを行います。

同時に当 JSFL(図内 FlashToHaxeConverter) を利用して、Flash CC 内ライブラリ構造を Haxe extern クラス群に変換を行います。

出力された Flash & html5 用のデータは共通の構造を持つため、クロスプラットフォーム用言語 Haxe にて処理することにより、より少ない手間で Flash コンテンツや html5 canvas コンテンツの同時制作が可能となります。

更に、Flash コンテンツはそのまま Adobe AIR に変換する事もできます。

TFCLib は Toolkit for CreateJS のパブリッシュデータをスクリプト(javascript or Haxe)から利用しやすくするためのもので、別途制作しているライブラリです。当アプリケーションで出力される 図内 CreateJS-Haxe クラス群は無くても利用できますが、利用すると更に効率よく開発を進めることが可能となります。

[https://github.com/siratama/haxelib](https://github.com/siratama/haxelib)

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



