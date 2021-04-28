import {React, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import Radar from 'react-d3-radar';
import {featureDemo} from '../utils.js'

export default function AudioFeature(props) {
    
    const { audioFeatures, token } = useSelector((state) => state.spotify);
    const [feature, setFeature] = useState([]);

    useEffect(() => {
        if (!token)
        {
            setFeature(featureDemo);
            return;
        }

        let features = []
        features = audioFeatures.map((feature, index) => {
            return {
                key: index.toString(),
                label: index.toString(),
                values : {
                    danceability: feature.danceability,
                    energy: feature.energy,
                    speechiness: feature.speechiness,
                    acousticness: feature.acousticness,
                    instrumentalness: feature.instrumentalness,
                    liveness: feature.liveness,
                    valence: feature.valence,
                }
            }
        })

        let means_features = {
            danceability: 0,
            energy: 0,
            speechiness: 0,
            acousticness: 0,
            instrumentalness: 0,
            liveness: 0,
            valence: 0,
        };
        
        features.map((feat) => {
            means_features['danceability'] += feat.values['danceability'];
            means_features['energy'] += feat.values['energy'];
            means_features['speechiness'] += feat.values['speechiness'];
            means_features['acousticness'] += feat.values['acousticness'];
            means_features['instrumentalness'] += feat.values['instrumentalness'];
            means_features['liveness'] += feat.values['liveness'];
            means_features['valence'] += feat.values['valence'];
            return []
        })

        Object.keys(means_features).map(function(key, index) {
            return means_features[key] = means_features[key] > 0 ? means_features[key] / features.length : 0;
          });
        
        let final_feat = {
            key: "analysis",
            label: "analysis",
            values: means_features
        }
        setFeature([final_feat]);
        
    }, [token, audioFeatures]);

    return (
        <div className="pt-1">
            <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                
                <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                    <h1 className="my-4 text-5xl font-bold leading-tight">
                       Audio Feature
                    </h1>
                    <div className="leading-normal mb-8">
                    <div className="legend">
                            <li>Acousticness - A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0
                                represents high confidence the track is acoustic.</li>
                            <br />
                            <li>Danceability - Danceability describes how suitable a track is for dancing based on a combination
                                of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A
                                value of 0.0 is least danceable and 1.0 is most danceable.</li>
                                <br />
                            <li>Energy - Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity
                                and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal
                                has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing
                                to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general
                                entropy.</li>
                                <br />
                            <li>Instrumentalness - Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are
                                treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The
                                closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal
                                content. Values above 0.5 are intended to represent instrumental tracks, but confidence is
                                higher as the value approaches 1.0.</li>
                                <br />
                            <li>Liveness - Detects the presence of an audience in the recording. Higher liveness values
                                represent an increased probability that the track was performed live. A value above 0.8 provides
                                strong likelihood that the track is live.</li>
                                <br />
                            <li>Speechiness - Speechiness detects the presence of spoken words in a track. The more exclusively
                                speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute
                                value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values
                                between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections
                                or layered, including such cases as rap music. Values below 0.33 most likely represent music and
                                other non-speech-like tracks.</li>
                                <br />
                            <li>Valence - A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track.
                                Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with
                                low valence sound more negative (e.g. sad, depressed, angry).</li>

                    </div>
                    </div>
                </div>
                
                <div className="w-full md:w-3/5 py-6 text-center">
                    <div className="flex items-stretch">

                        {feature.length > 0 ? (
                        <Radar
                            width={500}
                            height={500}
                            padding={70}
                            domainMax={1}
                            highlighted={null}
                            onHover={(point) => {
                                if (point) {
                                console.log('hovered over a data point');
                                } else {
                                console.log('not over anything');
                                }
                            }}
                            data={{
                                variables: [
                                    {key: 'danceability', label: 'danceability'},
                                    {key: 'energy', label: 'energy'},
                                    {key: 'speechiness', label: 'speechiness'},
                                    {key: 'acousticness', label: 'acousticness'},
                                    {key: 'instrumentalness', label: 'instrumentalness'},
                                    {key: 'liveness', label: 'liveness'},
                                    {key: 'valence', label: 'valence'},
                                ],
                                sets: feature,
                            }}
                        /> ) : (<></>) }
                    </div>
                </div>
            </div>
        </div>
    )
}