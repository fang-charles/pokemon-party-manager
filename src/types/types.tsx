export class Boat {
    bid: string;
    bname: string;
    color: string;

    constructor(bid: string, bname: string, color: string) {
        this.bid = bid;
        this.bname = bname;
        this.color = color;
    }

    public toString = (): string => {
        return `Boat (bid: ${this.bid}, bname: ${this.bname}, color: ${this.color})`;
    };
}

export type Person = {
    name: string;
    age: number;
    parent?: Person;
};

//Specific
export type Pokemon = {
    name: string;
};

export type Party = {
    member: Pokemon[];
};

export type BasePokemon = {
	pokedex_number: String,
	name: String,
	type1: String,
	type2?: String,
	hp: number,
	attack: number,
	defense:number,
	special_attack: number,
	special_defense: number,
	speed: number,
	sprite_data: String
}
