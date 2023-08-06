class Draw {

	static size = 50;
	static startPosX = 2 * this.size;
	static startPosY = 1 * this.size;
	
	static drawMe = true;

	static exec(ctx){
		this.field(ctx);
		this.puyo(ctx);
		this.me(ctx);
	}

	static field(ctx){
		ctx.fillStyle = "gray";
		ctx.strokeStyle = "black";
		ctx.rect(
			this.startPosX
			, this.startPosY
			, Map.map[0].length * this.size
			, Map.map.length * this.size
		);
		ctx.fill();
		ctx.stroke();
	}

	static puyo(ctx){
		ctx.strokeStyle = "black";
		for (let y = 0; y < Map.map.length; y ++){
			for (let x = 0; x < Map.map[y].length; x ++){
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
		ctx.strokeStyle = "black";
		ctx.beginPath();
		const subPuyo = Me.getSubPuyo();
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
		ctx.strokeStyle = "white";
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
}
