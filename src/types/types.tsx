export class Boat {
	bid: string;
	bname: string;
	color: string;

	constructor(	bid: string,
		bname: string,
		color: string) {
		this.bid=bid;
		this.bname=bname;
		this.color=color;
	  }

	  public toString = () : string => {
        return `Boat (bid: ${this.bid}, bname: ${this.bname}, color: ${this.color})`;
    }
  }