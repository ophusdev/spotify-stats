# ReactJS Spotify Stats

ReactJS web application 

## Live version
[Live Version](https://stats-spotify-summary.herokuapp.com/)

## Getting Started

    $ git clone https://github.com/ophusdev/spotify-stats
    $ cd spotify-stats
    $ npm install
    $ npm start


## Prerequisites

For this project need ReactJS installed or otherwise build and run container with Docker

## Installing

See Getting Started for run project on machine with ReactJs installed.

To use Docker run this commands inside cloned folder:

    docker build -f Dockerfile.prod -t spotify-stats .
    docker run -it --rm -p 3000:80 spotify-stats

