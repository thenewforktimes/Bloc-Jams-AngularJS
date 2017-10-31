(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};
    /*
    * @ desc gets and stores album
    * @type {Object}
    */
    var currentAlbum = Fixtures.getAlbum();
    /*
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;
    /*
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song){
      if(currentBuzzObject){
        currentBuzzObject.stop();
        stopSong(song);
      }
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
    };
    var playSong = function(song){
      if(currentBuzzObject){
        currentBuzzObject.play(song);
        SongPlayer.currentSong.playing = true;
      }
    };
    var stopSong = function(song){
      if(currentBuzzObject){
        currentBuzzObject.stop(song);
        song.playing = null;
      }
    };

    SongPlayer.currentSong = null;

    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        currentBuzzObject.play();
        SongPlayer.currentSong.playing = true;
      }
    };
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };
    /*
    * @desc public method to check index, if less than zero set to null;
    * @type {obj} && [arr]
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;
      if (currentSongIndex < 0) {
        currentBuzzObject.stop();
        stopSong(song);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };
    /*
    * @desc public method to check index, if greater than zero set to null;
    * @type {obj} && [arr]
    */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;
      if (currentSongIndex > 5) {
        currentBuzzObject.stop();
        stopSong(song);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };
    /*
    * @desc iterates over arr and gets index from song object
    * @type {object}
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };
    return SongPlayer;
  };

  angular
  .module('blocJams')
  .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
