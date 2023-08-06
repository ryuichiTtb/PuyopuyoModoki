class Puyo {
	
	/** ぷよの色 */
	static color = {
		0: "#ed0000",
		1: "#0058ff",
		2: "#ffe100",
		3: "#6cff00"
	};
	type;

	constructor(){
		this.type = Puyo.createType();
	}

	getColor(){
		return Puyo.color[ this.type ];
	}

	static createType(){
		return Math.floor(Math.random() * 4);
	}
}
