import { listServices } from "../services/listServices";

export default class Logo {
  id;
  logoPath;
  name;
  originCountry;

  constructor(obj) {
    this.id = obj.id;
    this.logoPath = obj.logo_path;
    this.name = obj.name;
    this.originCountry = obj.origin_country;
  }

  get bindedImage() {
    return listServices.bindImage(this.logoPath);
  }
}
