import Logo from "./Logos";
import Genre from "./Genres";
import { listServices } from "../services/listServices";
import { getCurrentLocale } from "../i18n";
export default class Content {
  itemsToBind = [
    "title",
    "name",
    "overview",
    "id",
    "budget",
    "vote_average",
    "number_of_seasons",
    "number_of_episodes",
    "revenue",
    "first_air_date",
    "release_date",
    "media_type",
    "runtime",  
    
    {
      from: "poster_path",
      to: "posterPath",
    },
    {
      from: "backdrop_path",
      to: "backdropPath",
    },
  ];

  constructor(obj, type, s) {
    this.type = type;
    for (const item of this.itemsToBind) {
      if (typeof item === "string") {
        this[item] = obj[item];
      } else {
        this[item.to] = obj[item.from];
      }
    }

    if (s === "details") {
      for (const company of obj.production_companies) {
        this.productionCompanies.push(new Logo(company));
      }

      for (const genre of obj.genres) {
        this.genres.push(new Genre(genre));
      }

      if (type === "tv") {
        for (const n of obj.episode_run_time) {
          this.episode_run_time.push(n);
        }
      }
    }
  }
  /**
   * questa è il titolo
   * @type {string}
   */
  title;
  media_type;
  productionCompanies = [];
  genres = [];
  type = "";
  episode_run_time = [];

  universalTitle() {
    return this.title || this.name;
  }

  universalDate() {
    const date = this.release_date || this.first_air_date;
    return new Intl.DateTimeFormat(getCurrentLocale()).format(new Date(date));
  }

  universalPosterPath() {
    return listServices.bindImage(this.posterPath);
  }

  universalNumber(number) {
    return new Intl.NumberFormat(getCurrentLocale, {
      style: "currency",
      currency: "USD",
    }).format(number);
  }
}
