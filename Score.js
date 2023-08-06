class Score {
	static sum = 0;
	static base = 1;
	static rate = 1.2;
	static bonusMin = this.base * 10;

	static getSum(){
		return this.sum.toFixed(2);
	}
}