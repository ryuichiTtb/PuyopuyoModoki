class Draw {

	static size = 50;
	static startPosX = 10;
	static startPosY = 30;
	
	static drawMe = true;

	/** ぷよ消し時の連鎖数 */
	static chain = 0;
	static isErase = false;

	/**アニメーション用 */
	static mainPuyoBorderFlg = true;

	static exec(ctx){
		
		this.field(ctx);
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
		ctx.strokeStyle = "black";
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

		for (let x = 1; x < Map.sizeW; x ++){
			ctx.beginPath();
			ctx.moveTo(this.startPosX + x * this.size, this.startPosY + 1);
			ctx.lineTo(this.startPosX + x * this.size, this.startPosY + Map.sizeH * this.size - 1);
			ctx.closePath();
			ctx.strokeStyle = "gray";
			ctx.stroke();
		}
		for (let y = 1; y < Map.sizeH; y ++){
			ctx.beginPath();
			ctx.moveTo(this.startPosX + 1, this.startPosY + y * this.size);
			ctx.lineTo(this.startPosX + Map.sizeW * this.size - 1, this.startPosY + y * this.size);
			ctx.closePath();
			ctx.strokeStyle = "gray";
			ctx.stroke();
		}
	}

	static detail(ctx) {
		ctx.font = this.size +"px 'メイリオ'";
		ctx.fillStyle = "red";
		ctx.fillText(Me.upCnt, this.size * 2, this.size * 2);
	}

	static puyo(ctx){
		ctx.strokeStyle = "gray";
		for (let y = 0; y < Map.sizeH; y ++){
			for (let x = 0; x < Map.sizeW; x ++){
				const TYPE = Map.map[y][x];
				if (TYPE == Map.empty){
					continue;
				}
				const POS_X = this.startPosX + x * this.size;
				const POS_Y = this.startPosY + y * this.size;

				if (TYPE == Map.ng){
					ctx.font = this.size +"px 'メイリオ'";
					ctx.fillStyle = "red";
					ctx.fillText("X", POS_X, POS_Y + this.size);
					continue;
				}

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
			ctx.font = this.size +"px 'メイリオ'";
			ctx.fillStyle = "red";
			ctx.fillText(this.chain +"れんさ！", this.startPosX + this.size, (Map.sizeH / 2 + 1) * this.size);
		}
	}

}
