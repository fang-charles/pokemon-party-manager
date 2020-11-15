export class Boat {
    bid: string;
    bname: string;
    color: string;

    constructor(bid: string, bname: string, color: string) {
        this.bid = bid;
        this.bname = bname;
        this.color = color;
    }

    public tostring = (): string => {
        return `Boat (bid: ${this.bid}, bname: ${this.bname}, color: ${this.color})`;
    };
}

export type Person = {
    name: string;
    age: number;
    parent?: Person;
};

//Specific

export type Party = {
    party_id: number;
    member: Pokemon[];
};

export type BasePokemon = {
    pokedex_number: number;
    name: string;
    type1: string;
    type2?: string;
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
    sprite_data: string;
};

export type Pokemon = {
    pkID: number;
    nickname: string;
    level: number;
    holding?: Item;
    moves: Move[];
    baseInfo: BasePokemon;
};

export type Item = {
    item_name: string;
    item_description: string;
};

export type User = {
    user_id: number;
    username: string;
    party: Party[];
    //party: number[]; array of partyID
};

export type Move = {
    move_name: string;
    power: number;
    accuracy: number;
    type: string;
    pp: number;
    effect: string;
};

export type Loginer = {
    user: String;
    password: string;
};

export type PokemonPacket = {
    pkID: number;
    nickname: string;
    level: number;
    pokedex_number: number;
    name: string;
    type1: string;
    type2?: string;
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
    sprite_data: string;
};

export type imageURL = {
    sprite_data: string;
}