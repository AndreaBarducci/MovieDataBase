import Cast from "../Classes/Cast";
import Trailer from "../Classes/Trailer";
import Content from "../Classes/Content";
import Actor from "../Classes/Actor";
import Film from "../Classes/Film";
import { getCurrentLocale } from "../i18n";

export const listServices = {
  apiKey: process.env.VUE_APP_APIKEY,
  posterpath: "https://image.tmdb.org/t/p/original",
  baseUrl: "https://api.themoviedb.org/3/",
  imdbUrl: "https://www.imdb.com/title/",

  /**
   *
   * @param {*} type
   * @param {*} id
   * @returns {Promise<Content>}
   */
  getDetailsById(type, id) {
    if (type !== "person")
      return this.baseFetch(`${type}/${id}`).then(
        (x) => new Content(x, type, "details")
      );
    else return this.baseFetch(`${type}/${id}`).then((x) => new Actor(x, type));
  },

  /**
   *
   * @param {'person'} type
   * @param {*} id
   * @returns {Promise<Film[]>}
   */
  getFilmsById(type, id) {
    return this.baseFetch(`${type}/${id}/combined_credits`).then((x) =>
      x.cast.map((c) => new Film(c))
    );
  },

  getCastById(type, id) {
    return this.baseFetch(`${type}/${id}/credits`).then((x) =>
      x.cast.map((c) => new Cast(c))
    );
  },

  getTrailersById(type, id) {
    
    return this.baseFetch(`${type}/${id}/videos`).then((x) =>
      x.results.map((c) => new Trailer(c))
    );
  },

  /**
   *
   * @param {'movie'| 'tv'} type
   * @param {number} index
   * @returns {Promise<Content[]>}
   */
  getPopularByType(type, page) {
    if (type !== "person")
      return this.baseFetch(`${type}/popular`, {
        page,
      }).then((x) => x.results.map((c) => new Content(c, type, "popular")));
    else
      return this.baseFetch(`${type}/popular`, {
        page,
      }).then((x) => x.results.map((c) => new Actor(c, "person")));
  },

  bindImage(img) {
    return `${this.posterpath}${img}`;
  },

  baseFetch(path, query = {}) {
    const currentLang = getCurrentLocale();

    query.api_key = this.apiKey;
    query.language = `${currentLang}`;

    const queryParams = new URLSearchParams(query).toString();
    return fetch(`${this.baseUrl}${path}?${queryParams}`).then((response) =>
      response.json()
    );
  },

  full(index) {
    return index === 500;
  },

  loadMore(index, type, lang) {
    return this.getPopularByType(type, index, lang);
  },

  search(query) {
    return this.baseFetch("search/multi", { query });
  },

  bindUrl(id){
    return `${this.imdbUrl}${id}`
  }
};
