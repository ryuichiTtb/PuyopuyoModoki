class Puyo {
	
	/** ぷよの色 */
	static color = {
		0: "red",
		1: "blue",
		2: "yellow",
		3: "green"
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