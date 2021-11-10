app.component('details', {
    props: {
        movie: {},
    },
    template: 
        /*html*/
        `<div>
        <h2>{{ movie.title }}</h2>
        <p> {{ movie.overview }} </p>
        
        </div>
        `
        
    
})