class Score {
	static sum = 0;
	static base = Object.keys( Puyo.types ).length;
	static rate = 1 + this.base * 0.1;
	static beforeAddScore = 0;

	static getSum(){
		return this.sum.toFixed(2);
	}

	/**
	 * スコア計算処理
	 * @param {*} num 消したぷよの個数
	 * @param {*} chain 連鎖数
	 */
	static calc(num, chain){
		return num * this.base * chain * this.rate;
	}

	/**
	 * ボーナススコア計算処理
	 */
	static calcBonus(){
		return this.beforeAddScore * this.base * this.rate;
	}
}