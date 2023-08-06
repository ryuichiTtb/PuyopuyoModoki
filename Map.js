class Map {
	
	static map;

	/** マップ幅 */
	static sizeW = 8;
	/** マップ高さ */
	static sizeH = 10;

	/** 空間 */
	static empty = -1;
	/** NGエリア */
	static ng = 98;
	/** トレース済判定用 */
	static work = 99;

	/**
	 * 初期化
	 */
	static initialize (){
		
		this.map = new Array(this.sizeH);

		for (let y = 0; y < this.sizeH; y ++){

			this.map[y] = new Array(this.sizeW);

			for (let x = 0; x < this.sizeW; x ++){

				this.map[y][x] = this.empty;
			}
		}
		const pos = this.getNgArea();
		this.map[pos.posY][pos.posX] = this.ng;
	}

	/**
	 * NG エリアの位置情報取得処理
	 * @returns
	 */
	static getNgArea(){
		return {"posX": this.sizeW / 2 - 1, "posY": 0};
	}
	
	/**
	 * 指定位置のタイプと同一の、繋がっている各ぷよの位置を返却
	 * @param {*} posX 
	 * @param {*} posY 
	 */
	static getConnection (posX, posY) {
		if (posX < 0 || this.sizeW - 1 < posX
			|| posY < 0 || this.sizeH - 1 < posY
		){
			return null;
		}

		const type = this.map[posY][posX];
		if (type == this.empty){
			return null;
		}

		let res = [{'posX': posX, 'posY': posY}];
		this.traceUp(type, posX, posY, res);
		this.traceRight(type, posX, posY, res);
		this.traceDown(type, posX, posY, res);
		this.traceLeft(type, posX, posY, res);

		for (let y = this.sizeH - 1; y > 0; y --){
			for (let x = 0; x < this.sizeW; x ++){
				if (this.map[y][x] == this.work){
					this.map[y][x] = type;
				}
			}
		}
		
		return res;
	}

	static traceUp(type, x, y, res){
		y --;
		if (y < 0){
			return;
		}
		if (this.map[y][x] == type){
			this.map[y][x] = this.work;
			res.push({'posX': x, 'posY': y});
			this.traceUp(type, x, y, res);
			this.traceRight(type, x, y, res);
			this.traceLeft(type, x, y, res);
		}
	}
	static traceRight(type, x, y, res){
		x ++;
		if (this.sizeW - 1 < x){
			return;
		}
		if (this.map[y][x] == type){
			this.map[y][x] = this.work;
			res.push({'posX': x, 'posY': y});
			this.traceUp(type, x, y, res);
			this.traceRight(type, x, y, res);
			this.traceDown(type, x, y, res);
		}
	}
	static traceDown(type, x, y, res){
		y ++;
		if (this.sizeH - 1 < y){
			return;
		}
		if (this.map[y][x] == type){
			this.map[y][x] = this.work;
			res.push({'posX': x, 'posY': y});
			this.traceRight(type, x, y, res);
			this.traceDown(type, x, y, res);
			this.traceLeft(type, x, y, res);
		}
	}
	static traceLeft(type, x, y, res){
		x --;
		if (x < 0){
			return;
		}
		if (this.map[y][x] == type){
			this.map[y][x] = this.work;
			res.push({'posX': x, 'posY': y});
			this.traceUp(type, x, y, res);
			this.traceDown(type, x, y, res);
			this.traceLeft(type, x, y, res);
		}
	}
}
