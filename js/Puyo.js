class Puyo {
	
	/** ぷよの色 */
	static colors = [
		"#ed0000",	// 赤
		"#0058ff",	// 蒼
		"#ffe100",	// 黄
		"#6cff00",	// 緑
		"#c000ff",	// 紫
	];

	/** ぷよのタイプ */
	static types = {};
	type;

	static initialize(){
		const puyoType = Number(getParam("puyType"));
		for (let i = 0; i < puyoType; i ++){
			this.types[i] = this.getDefineColor();
		}
	}
	static getDefineColor(){
		const id = Math.floor(Math.random() * this.colors.length);
		const res = this.colors[id];
		this.colors.splice(id, 1);
		return res;
	}

	static createType(){
		return Math.floor(Math.random() * Object.keys( this.types ).length);
	}

	constructor(){
		this.type = Puyo.createType();
	}

	getColor(){
		return Puyo.types[ this.type ];
	}
}

Puyo.initialize();