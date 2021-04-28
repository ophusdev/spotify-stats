import {React} from 'react';
import { useSelector } from 'react-redux';
import {artistDemo} from '../utils.js'

export function Artist(props) {

    const {name, image } = props;
    return (
        <div className="items-center mx-5 mt-5 w-auto md:w-32">
            <h1>{name}</h1>
            <img src={image} alt={name} className="rounded-full"/>
        </div>
    )
}


export default function ArtistList() {
    const { topArtists } = useSelector((state) => state.spotify);

    return (
        <div className="pt-36">
            <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row">
                
                <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                    <h1 className="my-4 text-5xl font-bold leading-tight">
                        Top 10 Artist
                    </h1>
                    <p className="leading-normal text-2xl mb-8">
                        Your top ten artist listen
                    </p>
                </div>
                
                <div className="w-full md:w-3/5 py-6 text-center">
                    <div className="grid grid-rows-5 grid-cols-2 md:grid-rows-3 md:grid-cols-4">
                        {
                            topArtists.length > 0 ? (
                                topArtists.map((artist, index) => {
                                    return <Artist name={artist.name} image={artist.images[0]['url']} key={index} /> 
                                })
                    
                    ) : (
                        artistDemo.map((artist, index) => {
                            return <Artist name={artist.name} image={artist.images[0]['url']} key={index} /> 
                        })
                    )
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}