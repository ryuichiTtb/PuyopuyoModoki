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
	
	/** 回転による上昇カウント */
	static upCnt = 0;
	/** 連続的に上昇する最大回数 */
	static maxUpNum = 5;

	/**
	 * 初期化
	 */
	static initialize(){
		this.posX = Map.map[0].length / 2;
		this.posY = 1;
		this.type = [Puyo.createType(), Puyo.createType()];
		this.direction = this.directionMap.down;
		this.upCnt = 0;
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
				
				// 右が壁である
				if (this.posX + 1 >= Map.map[0].length){
					
					// 左にぷよがない
					if ( ! (Map.map[this.posY][this.posX - 1] in Puyo.types) ){

						// 左に移動
						this.posX --;
					}
					else {
						return;
					}
				}
				// 右にぷよがある
				else if (Map.map[this.posY][this.posX + 1] in Puyo.types) {

					// 右上にぷよがある
					if (Map.map[this.posY - 1][this.posX + 1] in Puyo.types){

						// 左にぷよがない
						if ( ! (Map.map[this.posY][this.posX - 1] in Puyo.types) ){

							// 左に移動
							this.posX --;
						}
						else {
							return;
						}
					}
					// 右上にぷよがない
					else {

						// 上昇回数が最大の場合は上昇を許さない
						if (this.upCnt >= this.maxUpNum){
							return;
						}
						// 上に移動
						this.posY --;
						this.upCnt ++;
					}
				}
				this.direction = this.directionMap.left;
			break;

			// ◎○　→　◎
			// 　　　　　○
			case this.directionMap.left:

				// 下が壁である / 下にぷよがある
				if (this.posY + 1 >= Map.map.length || Map.map[this.posY + 1][this.posX] in Puyo.types){
					
					// 上昇回数が最大の場合は上昇を許さない
					if (this.upCnt >= this.maxUpNum){
						return;
					}
					// 上に移動
					this.posY --;
					this.upCnt ++;
				}
				this.direction = this.directionMap.up;
			break;

			// ◎　→　○◎
			// ○
			case this.directionMap.up:
				
				// 左が壁である / 左にぷよがある
				if (this.posX - 1 < 0 || Map.map[this.posY][this.posX - 1] in Puyo.types){
					
					// 右にぷよがない
					if ( ! (Map.map[this.posY][this.posX + 1] in Puyo.types) ){

						// 右に移動
						this.posX ++;
					}
					else {
						return;
					}
				}
				this.direction = this.directionMap.right;
			break;

			// 　　　　　○
			// ○◎　→　◎
			case this.directionMap.right:
				if (Map.map[this.posY - 1][this.posX] != Map.empty) {
					return;
				}
				this.direction = this.directionMap.down;
			break;
		}

		this.isLanding = false;
	}

	/**
	 * 横移動
	 * @param {*} diffX 
	 * @returns 
	 */
	static move(diffX){

		if (this.posX + diffX < 0
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
					Map.map[this.posY][this.posX + diffX] != Map.empty
					|| Map.map[this.posY - 1][this.posX + diffX] != Map.empty
				) {
					return;
				}
			break;

			// ◎○
			case this.directionMap.left:
				if (
					Map.map[this.posY][this.posX + diffX] != Map.empty
					|| Map.map[this.posY][this.posX + 1 + diffX] != Map.empty
				) {
					return;
				}
			break;

			// ◎
			// ○
			case this.directionMap.up:
				if (
					this.posY + 1 >= Map.map.length
					|| Map.map[this.posY][this.posX + diffX] != Map.empty
					|| Map.map[this.posY + 1][this.posX + diffX] != Map.empty
				) {
					this.isLanding = true;
					return;
				}
			break;

			// ○◎
			case this.directionMap.right:
				if (
					Map.map[this.posY][this.posX + diffX] != Map.empty
					|| Map.map[this.posY][this.posX - 1 + diffX] != Map.empty
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
				if (Map.map[this.posY + 1][this.posX] != Map.empty) {
					return;
				}
			break;

			// ◎○
			case this.directionMap.left:
				if (Map.map[this.posY + 1][this.posX] != Map.empty
					|| Map.map[this.posY + 1][this.posX + 1] != Map.empty
				) {
					return;
				}
			break;

			// ◎
			// ○
			case this.directionMap.up:
				if (
					this.posY + 2 >= Map.map.length
					|| Map.map[this.posY + 2][this.posX] != Map.empty
				) {
					return;
				}
			break;

			// ○◎
			case this.directionMap.right:
				if (
					Map.map[this.posY + 1][this.posX] != Map.empty
					|| Map.map[this.posY + 1][this.posX - 1] != Map.empty
				) {
					return;
				}
			break;
		}

		this.posY += 1;
		this.isLanding = false;
	}
}