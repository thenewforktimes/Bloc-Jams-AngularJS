(function() {
  function SongPlayer(Fixtures) {
    //@desc creates local SongPlayer state to an empty obj, useful for method chaining and prototyping?
    var SongPlayer = {};

    var currentAlbum = Fixtures.getAlbum();

    //@desc unsure why we need to store this var and set it to null? would we ever want to be able to set it to anything else? here?
    var currentBuzzObject = null;

    //@desc sets song data via reference check on the currentBuzzObject
    //@desc type: {obj}
    var setSong = function(song) {
      if (currentBuzzObject) {
        stopSong();
      }
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      SongPlayer.currentSong = song;
    };

    // sets song.playing method to true on function execution
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };

    var pauseSong = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };

    var stopSong = function(song) {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    };

    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };
    //I don't fully understand why this has to be public here, and what benefits setting the data state to null are.
    SongPlayer.currentSong = null;

    //@desc creates .play method for the SongPlayer obj??
    //first checks if song = song || SongPlayer.currentSong
    //if neither conditions check true, trigger callbacks to setSong and playSong
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
          if (currentBuzzObject.isPaused()) {
          playSong(song);
          }
        }
    };
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      pauseSong(song);
    };

    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex > Object.keys(currentAlbum).length) {
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    return SongPlayer;
  };

  angular
  .module('blocJams')
  .factory('SongPlayer', SongPlayer);
})();
