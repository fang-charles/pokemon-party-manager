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

export type PostPacket = {
    fName: String;
    data: Boat;
};
