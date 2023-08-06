class Draw {

	static size = 50;
	static startPosX = 10;
	static startPosY = 30;
	
	/** 自ぷよ表示制御 */
	static drawMe = true;

	/** ぷよ消し時の連鎖数 */
	static chain = 0;
	
	/** ぷよ消し時にtrue */
	static isErase = false;
	/** ぷよ全消し時にtrue */
	static isAllErase = false;

	/**アニメーション用 */
	static mainPuyoBorderFlg = true;

	static exec(ctx){
		
		this.field(ctx);
		this.detail(ctx);
		this.puyo(ctx);
		this.me(ctx);
		this.other(ctx);
	}

	static field(ctx){
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.rect(
			0
			, 0
			, Map.sizeW * this.size
			, Map.sizeH * this.size
		);
		ctx.closePath();
		ctx.fill();

		ctx.fillStyle = "black";
		ctx.strokeStyle = "purple";
		ctx.lineWidth = 4;
		ctx.beginPath();
		ctx.rect(
			this.startPosX
			, this.startPosY
			, Map.sizeW * this.size
			, Map.sizeH * this.size
		);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		ctx.lineWidth = 1;

		// 縦線描画
		for (let x = 1; x < Map.sizeW; x ++){
			ctx.beginPath();
			ctx.moveTo(this.startPosX + x * this.size, this.startPosY + 1);
			ctx.lineTo(this.startPosX + x * this.size, this.startPosY + Map.sizeH * this.size - 1);
			ctx.closePath();
			ctx.strokeStyle = "gray";
			ctx.stroke();
		}
		// 横線描画
		for (let y = 1; y < Map.sizeH; y ++){
			ctx.beginPath();
			ctx.moveTo(this.startPosX + 1, this.startPosY + y * this.size);
			ctx.lineTo(this.startPosX + Map.sizeW * this.size - 1, this.startPosY + y * this.size);
			ctx.closePath();
			ctx.strokeStyle = "gray";
			ctx.stroke();
		}

		// NG エリア描画
		ctx.font = this.size +"px 'ＭＳ ゴシック'";
		ctx.fillStyle = "red";
		const ngArea = Map.getNgArea();
		ctx.fillText("X", this.startPosX + ngArea.posX * this.size, this.startPosY + ngArea.posY * this.size + this.size);
	}

	static detail(ctx) {

		const detailStartPosX = this.startPosX + Map.sizeW * this.size + 4;
		const detailStartPosY = this.startPosY;

		ctx.fillStyle = "#ddd";
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.rect(
			detailStartPosX
			, detailStartPosY
			, 180
			, Map.sizeH * this.size
		);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		ctx.lineWidth = 1;

		ctx.font = this.size +"px 'ＭＳ ゴシック'";
		ctx.fillStyle = "red";
		ctx.fillText("Hello", detailStartPosX, detailStartPosY + 50);
	}

	static puyo(ctx){
		ctx.strokeStyle = "gray";
		for (let y = 0; y < Map.sizeH; y ++){
			for (let x = 0; x < Map.sizeW; x ++){
				const TYPE = Map.map[y][x];
				if ( ! (TYPE in Puyo.types) ){
					continue;
				}
				const POS_X = this.startPosX + x * this.size;
				const POS_Y = this.startPosY + y * this.size;

				const COLOR = Puyo.types[TYPE];
				ctx.fillStyle = COLOR;

				ctx.beginPath();
				ctx.rect(POS_X, POS_Y, this.size, this.size);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();
			}
		}
	}

	static me(ctx){
		if( ! this.drawMe ){
			return;
		}

		// サブぷよ
		ctx.fillStyle = Puyo.types[Me.type[1]];
		ctx.strokeStyle = "gray";
		const subPuyo = Me.getSubPuyo();
		ctx.beginPath();
		ctx.rect(
			this.startPosX + subPuyo.posX * this.size
			, this.startPosY + subPuyo.posY * this.size
			, this.size
			, this.size
		);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		// メインぷよ
		ctx.fillStyle = Puyo.types[Me.type[0]];
		ctx.strokeStyle = this.mainPuyoBorderFlg ? "white" : "gray";
		ctx.beginPath();
		ctx.rect(
			this.startPosX + Me.posX * this.size
			, this.startPosY + Me.posY * this.size
			, this.size
			, this.size
		);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}

	static other(ctx) {

		if (this.isErase){
			ctx.font = "80px 'ＭＳ ゴシック'";
			ctx.fillStyle = "red";
			ctx.fillText(this.chain +"れんさ！", this.startPosX + this.size, (Map.sizeH / 2 + 1) * this.size);
			ctx.strokeText(this.chain +"れんさ！", this.startPosX + this.size, (Map.sizeH / 2 + 1) * this.size);
		}
		if (this.isAllErase){
			ctx.font = "150px 'ＭＳ ゴシック'";
			ctx.fillStyle = "red";
			ctx.fillText("全消し", this.startPosX + this.size, (Map.sizeH / 2 + 1) * this.size);
			ctx.strokeText("全消し", this.startPosX + this.size, (Map.sizeH / 2 + 1) * this.size);
		}
	}

}
