import { listServices } from "../services/listServices";


export default class Film {
  itemsToBind = [
    "name",
    "title",
    "poster_path",
    "character",
    "id",
    "media_type",
    "popularity"
  ];

  constructor(obj) {
    for (const item of this.itemsToBind) {
      if (typeof item === "string") {
        this[item] = obj[item];
      } else {
        this[item.to] = obj[item.from];
      }
    }
  }

  universalPosterPath() {
    return listServices.bindImage(this.poster_path);
  }

  universalTitle() {
    return this.title || this.name;
  }


}
