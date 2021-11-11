app.component('review', {

    props: {
        rate: Number,
    },

    template:
        /*html*/
        `<br>
        <br>
    <i v-for="star in stars" :class="star"></i>
    <br>
    <br>    
    

    `,

    methods: {



    },

    computed: {

        stars() {

            const emptyStars = new Array(5).fill("far fa-star");
            let x = 0;
            let index = 0;
            while (x < this.rate-2) {
                x += 2;
                emptyStars[index] = "fas fa-star"
                index++;

            }
            return emptyStars

        },


    }

})