export const movieServices = {
    getDeteailsById(type,id) {
        const db = "https://api.themoviedb.org/3/";
        const apiKey = "?api_key=6f9286d54de4891ea7a5c91779e09786&language=en-US";
        let url = db.concat(type,"/",id,apiKey)
        console.log(url)
        return fetch(`db${type}/${id}apiKey`)
            .then((response) => response.json())

    },
}