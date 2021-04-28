import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const limit = 10;

export const fetchTopArtists = createAsyncThunk("login/fetchTopArtist", async (spotify_api) => {
  let artists = await spotify_api.getMyTopArtists({limit: limit})
    .then(function(data) {
        return data.items.sort((a,b) => a.popularity > b.popularity ? -1 : 1);
    }, function(err) {
      console.log('Something went wrong!', err);
    });
    return artists;
});

export const fetchTopTracks = createAsyncThunk("login/fetchTopTracks", async (spotify_api) => {
  let tracks = await spotify_api.getMyTopTracks({limit: limit})
    .then(function(data) {
      return data.items.sort((a,b) => a.popularity > b.popularity ? -1 : 1);;
    }, function(err) {
      console.log('Something went wrong!', err);
    });
    return tracks;
});

export const fetchRecommendations = createAsyncThunk("login/fetchRecommendations", async (spotify_api, seed_artists) => {
  let recommendations = await spotify_api.getRecommendations({
    min_energy: 0.4,
    seed_artists: seed_artists,
    min_popularity: 50
  })
    .then(function(data) {
      return data.items;
    }, function(err) {
      console.log('Something went wrong!', err);
    });
    return recommendations;
});

export const fetchAudioFeature = createAsyncThunk("login/fetchAudioFeature", async ({spotify_api, tracks_ids}) => {
  
  let tracks_feature = await spotify_api.getAudioFeaturesForTracks(tracks_ids)
    .then(function(data) {
      return data.audio_features.length > 1 ? data.audio_features : [];
    }, function(err) {
      console.log('Something went wrong!', err);
    });
    return tracks_feature;
});


const spotifySlice = createSlice({
  name: "login",
  initialState: {
    token: null,
    loading: false,
    topArtists: [],
    topTracks: [],
    recommendations: [],
    audioFeatures: [],
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token;
    },
    unsetToken(state, action) {
      state.token = null;
    }
  },
  extraReducers: {
    [fetchTopArtists.fulfilled]: (state, action) => {
      state.loading = false;
      state.topArtists = [...state.topArtists, ...action.payload];
    },
    [fetchTopTracks.fulfilled]: (state, action) => {
      state.loading = false;
      state.topTracks = [...state.topTracks, ...action.payload];
    },
    [fetchRecommendations.fulfilled]: (state, action) => {
      state.loading = false;
      state.recommendations = [...state.recommendations, ...action.payload];
    },
    [fetchAudioFeature.fulfilled]: (state, action) => {
      state.loading = false;
      state.audioFeatures = [...state.audioFeatures, ...action.payload];
    }
  }
});

export const { setToken, unsetToken } = spotifySlice.actions;

export default spotifySlice.reducer;
