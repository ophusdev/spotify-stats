import {React, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';


export function Genre(props) {
    const {name, key_index } = props;
    return (
        <div className="items-center mx-5">
            <div key={key_index}>
                <span>{name}</span>
            </div>
        </div>
    )
}


export default function GenreList() {
    const { topArtists } = useSelector((state) => state.spotify);
    const [ genres, setGenres] = useState([]);

    useEffect(() => {
        let genres = [];
        topArtists.forEach(track => {
    
            track['genres'].forEach(t => {    
                var matchingGenre = genres.filter(element => element.name.includes(t));
                if (matchingGenre.length > 0)
                    matchingGenre[0]['value'] += 1;
                else
                genres.push({
                        index: genres.length + 1,
                        name: t,
                        value: 1
                    })  
            })
        });
        genres = genres.sort((a, b) => (a.value > b.value) ? -1 : 1);
        genres = genres.slice(0,10);

        setGenres(genres);

    }, [topArtists]);

    return (
        <div className="pt-24">
            <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                
                <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                    <h1 className="my-4 text-5xl font-bold leading-tight">
                        Top Genre
                    </h1>
                    <p className="leading-normal text-2xl mb-8">
                        Your top genre
                    </p>
                </div>
                
                <div className="w-full md:w-3/5 py-6">
                    <div className="grid grid-rows-4 grid-cols-3 md:grid-rows-3 md:grid-cols-4">
                        {genres.length > 0 && genres.map(
                                (genre) => {
                                    return (<Genre name={genre.name} key_index={genre.index}/>)
                                }
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}