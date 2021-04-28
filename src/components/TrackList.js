import {React} from 'react';
import { useSelector } from 'react-redux';
import { trackDemo } from '../utils';


export function Track(props) {

    const {name, image } = props;

    return (
        <div className="items-center mx-5 mt-5 w-auto md:w-32">
        <h1>{name}</h1>
        <img src={image} alt={name} className="rounded-full"/>
        </div>
    )
}

export default function TrackList() {

    const { topTracks } = useSelector((state) => state.spotify);

    return (
        <div className="pt-1">
            <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row">
                
                <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                    <h1 className="my-4 text-5xl font-bold leading-tight">
                        Top 10 Track
                    </h1>
                    <p className="leading-normal text-2xl mb-8">
                        Your top ten Track listen
                    </p>
                </div>
                
                <div className="w-full md:w-3/5 py-6 text-center">
                    <div className="grid grid-rows-5 grid-cols-2 md:grid-rows-3 md:grid-cols-4">
                        {
                            topTracks.length > 0 ? (
                                topTracks.map((track, index) => {
                                    return <Track name={track.name} image={track.album.images[0]['url']} key={index} /> 
                                })
                    
                    ) : (
                        trackDemo.map((track, index) => {
                            return <Track name={track.name} image={track.album.images[0]['url']} key={index} /> 
                        })
                    )
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}