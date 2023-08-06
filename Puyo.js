class Puyo {
	
	/** ぷよの色 */
	static types = {
		0: "#ed0000",
		1: "#0058ff"
	};
	type;

	constructor(){
		this.type = Puyo.createType();
	}

	getColor(){
		return Puyo.types[ this.type ];
	}

	static createType(){
		return Math.floor(Math.random() * Object.keys( this.types ).length);
	}
}
