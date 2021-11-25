
export default class Trailer {
  itemsToBind = [
    "key",
    "name", 
    "type"
  ];
type = "";
  constructor(obj) {
    for (const item of this.itemsToBind) {
      if (typeof item === "string") {
        this[item] = obj[item];
      } else {
        this[item.to] = obj[item.from];
      }
    }

  }
}