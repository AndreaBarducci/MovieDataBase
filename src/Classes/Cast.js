import { listServices } from "../services/listServices";

export default class Cast {
    itemsToBind = [
        "name",
        "character",
        "profile_path",
        "id",
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
        return listServices.bindImage(this.profile_path);
    }


}

