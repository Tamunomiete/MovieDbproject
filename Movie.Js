// getting api details qnd criteria we want to use to select  the movies
const API_url = "http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=14fea864d10c193be998a071bfb161da&page=1"
const img_path = "https://image.tmdb.org/t/p/w1280"

const search_api = "http://api.themoviedb.org/3/search/movie?api_key=14fea864d10c193be998a071bfb161da &query='"
const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")
    // first , i want to get movies intially using my api url  

// I'll also define an ansync function to get the movie and also show movies asynchronously
// usually Js runs the functions underneath first 
get_movies(API_url)


async function get_movies(url) {
    const res = await fetch(url) //  fetching the url
    const data = await res.json() // converting  the first data to JSON  so it can be easier processed by network
    show_movies(data.results) // resulting data

}

function show_movies(movies) {
    main.innerHTML = ""
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie


        const movieEL = document.createElement('div')
        movieEL.classList.add('movie') // adding class list to the movie
        movieEL.innerHTML = `
    <img src="${img_path + poster_path}" alt="${title}">
    <div class="movie-info">
        <h3>${title}</h3> 
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
        <h3>${overview}</h3>
       ${overview}
    </div>
`
        main.appendChild(movieEL)
    })
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}


form.addEventListener("submit", (e) => {
    e.preventDefault()
    const searchTerm = search.value
    if (searchTerm && searchTerm !== "") {
        get_movies(search_api + searchTerm)
        search.value = ""
    } else {
        window.location.reload()
    }
})