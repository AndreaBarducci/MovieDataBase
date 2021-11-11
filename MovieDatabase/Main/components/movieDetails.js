app.component('movieDetails', {
    props: {
        id: Number,
    },

    template:
    /*html*/
    `
    <p>{{movie.title}}</p>
    `,
})