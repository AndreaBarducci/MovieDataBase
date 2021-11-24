import { listServices } from "../services/listServices";

export default class Actor {
  itemsToBind = [
    "gender",
    "name",
    "id",
    "profile_path",
    "gender",
    "birthday",
    "deathday",
    "known_for_department",
    "place_of_birth",
    "biography",
  ];

  constructor(obj, type) {
    this.type = type;
    for (const item of this.itemsToBind) {
      if (typeof item === "string") {
        this[item] = obj[item];
      } else {
        this[item.to] = obj[item.from];
      }
    }

  }

  universalPosterPath() {
    return listServices.bindImage(this.profile_path);
  }

}
