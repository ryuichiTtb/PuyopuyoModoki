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
				if (TYPE == -1){
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

				const COLOR = Puyo.color[TYPE];
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

		// メインぷよ
		ctx.fillStyle = Puyo.color[Me.type[0]];
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

		// サブぷよ
		let diffPosX = 0, diffPosY = 0;
		switch(Me.direction){
			case Me.directionMap.down:
				diffPosY = -1;
			break;
			case Me.directionMap.left:
				diffPosX = 1;
			break;
			case Me.directionMap.up:
				diffPosY = 1;
			break;
			case Me.directionMap.right:
				diffPosX = -1;
			break;
		}
		ctx.fillStyle = Puyo.color[Me.type[1]];
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.rect(
			this.startPosX + (Me.posX + diffPosX) * this.size
			, this.startPosY + (Me.posY + diffPosY) * this.size
			, this.size
			, this.size
		);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}
}
