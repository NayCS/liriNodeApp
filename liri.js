require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment")
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

function spotifyThisSong(songName) {
    if (songName === undefined) {
        songName = "Find You Again";
    }
    spotify.search({
        type: "track",
        query: songName
    }, function (err, data) {
        if (err) {
            console.log("error:" + err)
            return
        }
        for (i = 0; i < 5; i++) {
            /*console.log(data.tracks.items[i])*/
            console.log("Name of song: " + data.tracks.items[i].name)
            console.log("URL of song: " + data.tracks.items[i].external_urls.spotify)
            console.log("Album song belongs to: " + data.tracks.items[i].album.name)
            console.log("\n=================")
        }
    })
};
var pick = function (caseData, functionData) {
    switch (caseData) {
        case "spotify-this-song":
            spotifyThisSong(functionData)
            break;
        default:
            console.log("Wrong command");
    }
}
var runThis = function (argOne, argTwo) {
    pick(argOne, argTwo);
}
runThis(process.argv[2], process.argv.slice(3).join(" "));
/*Make it so liri.js can take in one of the following commands in the arguments:
>>spotify-this-song
>>movie-this
>>do-what-it-says

This will show the following information about the song in your terminal/bash window


Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from
If no song is provided then choose a default song to submit to the API.


search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);
*/