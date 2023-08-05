class Map {
	static map = [
		[-1, -1, -1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1, -1, -1],
		[-1, -1,  2, -1,  3, -1, -1, -1],
		[-1, -1,  0, -1,  1, -1, -1, -1],
		[-1,  0,  0,  2,  1, -1, -1, -1]
	]
	/** トレース済判定用 */
	static work = 99;
	
	/**
	 * 指定位置のタイプと同一の、繋がっている各ぷよの位置を返却
	 * @param {*} posX 
	 * @param {*} posY 
	 */
	static getConnection (posX, posY) {
		if (posX < 0 || this.map[0].length - 1 < posX
			|| posY < 0 || this.map.length - 1 < posY
		){
			return null;
		}

		const type = this.map[posY][posX];
		if (type == -1){
			return null;
		}

		let res = [{'posX': posX, 'posY': posY}];
		this.traceUp(type, posX, posY, res);
		this.traceRight(type, posX, posY, res);
		this.traceDown(type, posX, posY, res);
		this.traceLeft(type, posX, posY, res);

		for (let y = Map.map.length - 1; y > 0; y --){
			for (let x = 0; x < Map.map[y].length; x ++){
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
		if (this.map[0].length - 1 < x){
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
		if (this.map.length - 1 < y){
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