class Me {
	static posX;
	static posY;
	static type;
	static isLanding = false;
	static isDetermine = false;

	static direction;
	static directionMap = {
		'down': 0,
		'left': 1,
		'up': 2,
		'right': 3
	};

	/**
	 * 初期化
	 */
	static initialize(){
		this.posX = Map.map[0].length / 2;
		this.posY = 1;
		this.type = [Puyo.createType(), Puyo.createType()];
		this.direction = this.directionMap.down;
	}

	/**
	 * サブぷよの位置情報取得
	 * @returns 
	 */
	static getSubPuyo(){

		let res = {
			'posX': null,
			'posY': null
		};

		// ◎・・・メインぷよ
		// ○・・・サブぷよ
		switch (this.direction) {
			// ○
			// ◎
			case this.directionMap.down:
				res.posX = this.posX;
				res.posY = this.posY - 1;
			break;

			// ◎○
			case this.directionMap.left:
				res.posX = this.posX + 1;
				res.posY = this.posY;
			break;

			// ◎
			// ○
			case this.directionMap.up:
				res.posX = this.posX;
				res.posY = this.posY + 1;
			break;

			// ○◎
			case this.directionMap.right:
				res.posX = this.posX - 1;
				res.posY = this.posY;
			break;
		}

		return res;
	}

	/**
	 * 回転
	 * @returns 
	 */
	static rotate(){
		// ◎・・・メインぷよ
		// ○・・・サブぷよ
		switch (this.direction) {
			// ○
			// ◎　→　◎○
			case this.directionMap.down:
				if (
					this.posX + 1 >= Map.map[0].length
					|| Map.map[this.posY][this.posX + 1] != -1
				) {
					return;
				}
				this.direction = this.directionMap.left;
			break;

			// ◎○　→　◎
			// 　　　　　○
			case this.directionMap.left:
				if (
					this.posY + 1 >= Map.map.length
					|| Map.map[this.posY + 1][this.posX] != -1
				) {
					return;
				}
				this.direction = this.directionMap.up;
			break;

			// ◎　→　○◎
			// ○
			case this.directionMap.up:
				if (
					this.posX - 1 <= -1
					|| Map.map[this.posY][this.posX - 1] != -1
				) {
					return;
				}
				this.direction = this.directionMap.right;
			break;

			// 　　　　　○
			// ○◎　→　◎
			case this.directionMap.right:
				if (Map.map[this.posY - 1][this.posX] != -1) {
					return;
				}
				this.direction = this.directionMap.down;
			break;
		}
	}

	/**
	 * 横移動
	 * @param {*} diffX 
	 * @returns 
	 */
	static move(diffX){

		if (this.posX + diffX <= -1
			|| this.posX + diffX >= Map.map[0].length){
			return;
		}

		// ◎・・・メインぷよ
		// ○・・・サブぷよ
		switch (this.direction) {
			// ○
			// ◎
			case this.directionMap.down:
				if (
					Map.map[this.posY][this.posX + diffX] != -1
					|| Map.map[this.posY - 1][this.posX + diffX] != -1
				) {
					return;
				}
			break;

			// ◎○
			case this.directionMap.left:
				if (
					Map.map[this.posY][this.posX + diffX] != -1
					|| Map.map[this.posY][this.posX + 1 + diffX] != -1
				) {
					return;
				}
			break;

			// ◎
			// ○
			case this.directionMap.up:
				if (
					this.posY + 1 >= Map.map.length
					|| Map.map[this.posY][this.posX + diffX] != -1
					|| Map.map[this.posY + 1][this.posX + diffX] != -1
				) {
					this.isLanding = true;
					return;
				}
			break;

			// ○◎
			case this.directionMap.right:
				if (
					Map.map[this.posY][this.posX + diffX] != -1
					|| Map.map[this.posY][this.posX - 1 + diffX] != -1
				) {
					return;
				}
			break;
		}

		this.posX += diffX;
		this.isLanding = false;
	}

	/**
	 * 落下
	 * @returns 
	 */
	static fall(){

		this.isLanding = true;

		if (this.posY + 1 >= Map.map.length){
			return;
		}

		// ◎・・・メインぷよ
		// ○・・・サブぷよ
		switch (this.direction) {
			// ○
			// ◎
			case this.directionMap.down:
				if (Map.map[this.posY + 1][this.posX] != -1) {
					return;
				}
			break;

			// ◎○
			case this.directionMap.left:
				if (Map.map[this.posY + 1][this.posX] != -1
					|| Map.map[this.posY + 1][this.posX + 1] != -1
				) {
					return;
				}
			break;

			// ◎
			// ○
			case this.directionMap.up:
				if (
					this.posY + 2 >= Map.map.length
					|| Map.map[this.posY + 2][this.posX] != -1
				) {
					return;
				}
			break;

			// ○◎
			case this.directionMap.right:
				if (
					Map.map[this.posY + 1][this.posX] != -1
					|| Map.map[this.posY + 1][this.posX - 1] != -1
				) {
					return;
				}
			break;
		}

		this.posY += 1;
		this.isLanding = false;
	}
}