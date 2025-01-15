




// const MovieInfComponent = (props) =>{
//     const [movieInfo, setMovieInfo] = useState();
//     const { selectMovie } = props;
//     useEffect(()=>{ axios.get(`https://www.omdbapi.com/?i=${selectMovie}&apikey=${API_KEY}`)
//         .then((response)=>setMovieInfo(response.data));
//     },[selectMovie]);
//     return(
//         <Container>
//             <CoverImg src={movieInfo?.Poster} />
//     <InfColumn>
//     <MovieName>TITLE: {movieInfo?.Title}</MovieName>
//     <MovieName>TYPE: <span>{movieInfo?.Type}</span></MovieName>
//     <MovieName>RELEASE: <span>{movieInfo?.Released}</span></MovieName>
//     <MovieName>COUNTRY: <span>{movieInfo?.Country}</span></MovieName>
//     <MovieName>LANGUAGE: <span>{movieInfo?.Language}</span></MovieName>
//     <MovieName>GENRE: <span>{movieInfo?.Genre}</span></MovieName>
//     <MovieName>PLOT: <span>{movieInfo?.Plot}</span></MovieName>
//     <MovieName>RATING: <span>{movieInfo?.imdbRating}</span></MovieName>