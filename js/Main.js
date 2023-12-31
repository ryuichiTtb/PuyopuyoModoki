let canvas = document.getElementById("canvas");
canvas.width = 600;
canvas.height = 600;

let context = canvas.getContext("2d");

/**
 * 描画処理
 */
setInterval(() => {
	Draw.exec(context);
}, 5);
setInterval(() => {
	Draw.mainPuyoBorderFlg = ! Draw.mainPuyoBorderFlg;
}, 100);

/**
 * スコア加算
 */
let scoreInterval = setInterval(() => {
	Score.sum += Score.base / 10;
}, 100);

/**
 * 落下処理
 */
let fallInterval;
const fallIntervalDelay = 1000;
const fall =()=> {
	if (Me.isLanding){
		clearInterval(fallInterval);

		// マップ更新
		Map.map[Me.posY][Me.posX] = Me.type[0];
		const SUB = Me.getSubPuyo();
		if (SUB.posY >= 0){
			Map.map[SUB.posY][SUB.posX] = Me.type[1];
		}
		Me.posY = Me.posY = Map.empty;

		Draw.drawMe = false;
		fallAllInterval = setInterval(fallAll, fallAllIntervalDelay);
	}
	else {
		Me.fall();
	}
};
fallInterval = setInterval(fall, fallIntervalDelay);

/**
 * 各ぷよ落下処理
 */
let fallAllInterval;
const fallAllIntervalDelay = 100;
const fallAll =()=> {
	let complete = true;
	for (let y = Map.sizeH - 1; y > 0; y --){
		for (let x = 0; x < Map.sizeW; x ++){
			if (Map.map[y][x] != Map.empty){
				continue;
			}
			if (Map.map[y - 1][x] in Puyo.types){
				Map.map[y][x] = Map.map[y - 1][x];
				Map.map[y - 1][x] = Map.empty;
				complete = false;
			}
		}
	}
	if (complete){
		clearInterval(fallAllInterval);
		erase();
	}
};

/**
 * ぷよ連結判定 > 削除処理
 */
function erase(){
	for (let y = 0; y < Map.sizeH; y ++){
		for (let x = 0; x < Map.sizeW; x ++){
			if ( ! (Map.map[y][x] in Puyo.types) ){
				continue;
			}
			let res = Map.getConnection(x, y);
			if (res && res.length >= 4){
				Draw.isErase = true;
				Draw.addScore += Score.calc(res.length, Draw.chain + 1);

				Score.sum += Draw.addScore;
				Score.beforeAddScore = Draw.addScore;

				for (let i = 0; i < res.length; i ++){
					Map.map[ res[i].posY ][ res[i].posX ] = Map.empty;
				}
			}
		}
	}

	// ぷよ消し時
	if (Draw.isErase){
		Draw.chain ++;
		Draw.exec(context);

		setTimeout(() => {
			Draw.isErase = false;
			Draw.addScore = 0;
			fallAllInterval = setInterval(fallAll, fallAllIntervalDelay);
		}, 800);
	}
	else {
		Draw.chain = 0;

		// 全消しの場合
		if ( ! Map.existsPuyo() ){
			Draw.isAllErase = true;
			Draw.addScore += Score.calcBonus();
			Draw.exec(context);
			setTimeout(() => {
				Draw.isAllErase = false;
				Draw.addScore = 0;
				next();
			}, 1000);
		}
		else {
			next();
		}
	}
}

/**
 * 次ぷよ生成処理
 */
function next(){

	// NGエリアにぷよが重なっている場合
	const ng = Map.getNgArea();
	if (Map.map[ng.posY][ng.posX] != Map.ng){
		
		clearInterval(scoreInterval);

		alert("\r\n********************\r\nGAME OVER\r\n\r\nスコア："+ Score.getSum() +"\r\n********************");
		
		if (window.confirm("もう一度プレイしますか？")){
			window.location.reload();
		}
		else {
			window.location.href = "../main.html";
		}

		return;
	}

	// 新規ぷよ生成
	Me.initialize();
	Draw.drawMe = true;
	Draw.exec(context);

	// 着地フラグ初期化
	Me.isLanding = false;

	fallInterval = setInterval(fall, fallIntervalDelay);
}

/**
 * キー押下時
 */
addEventListener("keydown", (event) => {
	
	// 自ぷよが未描画時はキー入力無効
	if ( ! Draw.drawMe ){
		return;
	}

	switch (event.keyCode){
		case 32: Me.rotate(); break;	// スペース
		case 37: Me.move(-1); break;	// 左
		case 39: Me.move( 1); break;	// 右
		case 40: Me.fall(); fall(); break;	// 下
	}
}, false);
