import React, {useState, useEffect} from 'react';
import axios from "axios";
import './App.css';

export const API_KEY = 'b76b0f17';

export default function App() {

    const [searchQuery, updateSearchQuery] = useState<string>("");
    const [timeoutId, updateTimeoutId] = useState<NodeJS.Timeout>();
    const [MovieList, updateMovieList] = useState<Movie[]>([]);
    const [selectMovie, onMovieSelect] = useState<Movie | null>(null);

    const fetchData = async (SearchStr: string) => {
        const response = await axios.get(`git add`);
        updateMovieList(response.data.Search);
    };

    const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timeoutId);
        updateSearchQuery(event.target.value);
        const timeout = setTimeout(() => fetchData(event.target.value), 500);
        updateTimeoutId(timeout);
    };

    return (
        <Container>
            <Header>
                <AppName>
                    <MovieImg src="/movie_icon.svg"/>
                    Evlix
                </AppName>
                <SrchBox>
                    <SrchIcon src="/search_icon.svg"/>
                    <SrchInput
                        placeholder="Search Movie"
                        value={searchQuery}
                        onChange={onTextChange}
                    />
                </SrchBox>
            </Header>
            {selectMovie && <MovieInfComponent selectMovie={selectMovie}/>}
            <MovieListContainer>
                {MovieList?.length
                    ? MovieList.map((movie, index) => (
                        <MovieComponent
                            key={index}
                            movie={movie}
                            onMovieSelect={onMovieSelect}
                        />
                    ))
                    : "No movie search"}
            </MovieListContainer>
        </Container>
    );
};


// const { observer, useLocalObservable } = mobxReactLite;
// const { useEffect } = React;
//
// const App = observer(function App() {
//     const store = useLocalObservable(() => ({
//         category: null,
//         setCategory(category) {
//             store.category = category;
//         }
//     }));
//
//     useEffect(() => {
//         fetch("https://jservice.io/api/category?id=150")
//             .then((res) => res.json())
//             .then((res) => store.setCategory(res));
//     }, []);
//
//     if (store.category === null) return null;
//
//     return (
//         <div>
//             <div>{store.category.title}</div>
//             {store.category.clues.map((clue) => (
//                 <div key={clue.id}>{clue.question}</div>
//             ))}
//         </div>
//     );
// });
//
// ReactDOM.render(<App />, document.getElementById("root"));

// <script src="https://cdnjs.cloudflare.com/ajax/libs/react/17.0.1/umd/react.production.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.1/umd/react-dom.production.min.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/mobx@6.0.4/dist/mobx.umd.production.min.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/mobx-react-lite@3.1.6/dist/mobxreactlite.umd.production.min.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/mobx-react@7.0.5/dist/mobxreact.umd.production.min.js"></script>
//
// <div id="root"></div>