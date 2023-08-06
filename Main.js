let canvas = document.getElementById("canvas");
canvas.width = 600;
canvas.height = 600;

let context = canvas.getContext("2d");

Map.initialize();
Me.initialize();

/**
 * 描画処理
 */
setInterval(() => {
	Draw.exec(context);
}, 5);

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
		Map.map[SUB.posY][SUB.posX] = Me.type[1];
		Me.posY = Me.posY = -1;

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
	for (let y = Map.map.length - 1; y > 0; y --){
		for (let x = 0; x < Map.map[y].length; x ++){
			if (Map.map[y][x] != -1){
				continue;
			}
			// if (Map.map[y - 1][x] != -1){
			if (Map.map[y - 1][x] in Puyo.color){
				Map.map[y][x] = Map.map[y - 1][x];
				Map.map[y - 1][x] = -1;
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
	let doErase = false;
	for (let y = 0; y < Map.map.length; y ++){
		for (let x = 0; x < Map.map[y].length; x ++){
			if (Map.map[y][x] == -1){
				continue;
			}
			let res = Map.getConnection(x, y);
			if (res && res.length >= 4){
				doErase = true;
				for (let i = 0; i < res.length; i ++){
					Map.map[ res[i].posY ][ res[i].posX ] = -1;
				}
			}
		}
	}
	if (doErase){
		fallAllInterval = setInterval(fallAll, fallAllIntervalDelay);
	}
	else {
		next();
	}
}

/**
 * 次ぷよ生成処理
 */
function next(){

	// NGエリアにぷよが重なっている場合
	const ng = Map.getNgArea();
	if (Map.map[ng.posY][ng.posX] != Map.ng){
		alert("GAME OVER");
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
