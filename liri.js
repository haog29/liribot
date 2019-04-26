require("dotenv").config();
//link for keys, fs, axios
const keys = require('./keys');
const fs = require('fs');
const axios = require('axios')
//moment
const moment = require('moment');
//spotify
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//The user input's search command
var userInput = process.argv[2]
var usrCmd = process.argv.slice(3).join(" ")

function userOutput(userInput, usrCmd) {
  //switch case for how the command goes
  switch (userInput) {
    case ('concert-this'):
      concertThis(usrCmd)
      break;
    case ('spotify-this-song'):
      spotifyThisSong(usrCmd)
      break;
    case ('movie-this'):
      movieThis(usrCmd)
      break;
    case ('do-what-it-says'):
      doWhatItSays()
      // console.log(`Liri doesn't know that command yet`)
      break;
    default: console.log(`\n\nLiri's Command choices: \nconcert-this\nspotify-this-song\nmovie-this\ndoWhatItSays\n`)
      break;
  }
}
// userOutput(userInput, usrCmd);

function concertThis(bands) {

  var bands = usrCmd
  var bandHref = 'https://rest.bandsintown.com/artists/' + bands + '/events?app_id=codingbootcamp'

  axios.get(bandHref).then(
    function (response) {
       //output purposes
      console.log(`\n **************************`)
      console.log(`\n Liri Says:\nHere's what you requested...\n- - - - - - - -\n`)
      //bands in town datas
      console.log('Band: '+response.data[0].lineup[0] + '\n' + 'Venue:' + response.data[0].venue.name + '\n' 
      + `Venue's Location:` + response.data[0].venue.city, +','+ response.data[0].venue.country )
      //moment JS format
      console.log('Date: ' + moment(response.data[0].datetime).format("MM/DD/YY hh:00 A" + '\n'))
      console.log('\n **************************')

      //Log Concert Input:
      var logConIn = "\n Liri Says:\n--------" + '\n' + 'Band: '+response.data[0].lineup[0] + '\n' + 'Venue:' + response.data[0].venue.name + '\n' 
      + `Venue's Location:` + response.data[0].venue.city + response.data[0].venue.country + '\n' + 
      'Date: ' + moment(response.data[0].datetime).format("MM/DD/YY hh:00 A" + '\n'+`\n **************************`)

      fs.appendFile('log.txt', logConIn, function (error) {
        if (error) throw error;
      })
    })

}



function spotifyThisSong(userSong) {

  //if user search not found:
  if (!userSong) { userSong = "The Sign" }
  //spotify search
  spotify.search({ type: 'track', query: userSong }, function (error, data) {
    if (error) {
      return console.log('There was an error' + error)
    }

     //output purposes
    console.log(`\n **************************`)
    console.log(`\n Liri Says:\nHere's what you requested...\n- - - - - - - -\n`)
    //spotify datas
    console.log(`Artist:` + data.tracks.items[0].album.artists[0].name + '\n' + `Song:` + data.tracks.items[0].name + '\n' + 
    `Link:` + data.tracks.items[0].href + '\n' + `Album:` + data.tracks.items[0].album.name + '\n' )
    console.log('\n **************************')



    var logSpotIn = "\n\n Liri Says:\n--------" + "\nArtist: " + data.tracks.items[0].album.artists[0].name + '\n' + `Song:` + 
    data.tracks.items[0].name + '\n' + `Link:` + data.tracks.items[0].href + '\n' + `Album:` + 
    data.tracks.items[0].album.name + '\n'+ `\n **************************`;

    fs.appendFile('log.txt', logSpotIn, function (error) {
      if (error) throw error;
    })
  })

}

function movieThis(usrMovie) {

  if (!usrMovie) { usrMovie = 'Mr.Nobody' }


  var movieHref = 'http://www.omdbapi.com/?i=tt3896198&apikey=e636b6aa';

  axios.request(movieHref).then(
    function (response) {
       //output purposes
      console.log(`\n **************************`)
      //output purposes
      console.log(`\n Liri Says:\nHere's what you requested...\n- - - - - - - -\n`)
     
     
      // console.log(response.data.Ratings[1].Value)

       //movie datas
      console.log('Title: ' + response.data.Title + '\n' + 'Year: ' + response.data.Year + '\n' 
      + 'IMDB Ratings: ' + response.data.imdbRating +  '\n'+ 'Rotten Tomatoes Rating of the movie: ' + response.data.Ratings[1].Value  
      +'\n' + 'Country:  ' + response.data.Country + '\n' + 'Language: ' + response.data.Language + '\n' + 'Plot: ' + response.data.Plot 
      + '\n' + 'Actors: ' + response.data.Actors + '\n')  
      console.log('\n **************************')


      var logMovIn = "\n Liri Says:\n--------" + "\n Title:" + response.data.Title + '\n' + 'Year:' + response.data.Year + '\n' 
      + 'IMDB Ratings: ' + response.data.imdbRating +  '\n'+ 'Rotten Tomatoes Rating of the movie: ' + response.data.Ratings[1].Value  
      +'\n' + 'Country:  ' + response.data.Country + '\n' + 'Language: ' + response.data.Language + '\n' + 'Plot: ' + response.data.Plot 
      + '\n' + 'Actors: ' + response.data.Actors + '\n' + `\n **************************`;

      fs.appendFile('log.txt', logMovIn, function (error) {
        if (error) throw error;
      })
    })

}



function doWhatItSays() {
  fs.readFile('random.txt', 'utf8', function (error, data) {
    if (error) { return console.log(error) } 
    else { console.log(data)

      var ranData = data.split(',')
      userOutput(ranData[0], ranData[1])
    }
          })
  
      
      }

function logThis(data) {
  fs.appendFile('log.txt',data, function (error) {
  if (error) { throw error } 
  })
}

userOutput(userInput, usrCmd)