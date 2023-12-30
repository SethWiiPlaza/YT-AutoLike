//	
//	
//	Build v.7.3f  
//									 Code by Seth@WiiPlaza 
//
// script fixes forced pauses on YouTube caused by Ad-Blockers, it also auto-likes every video you watch
//
// Works only on latest versiom Firefox - tested on Version 11 5.6.0esr (64-bit) 
//
// inject using the jQuery Firefox injector addon 'run-a-script by mivanchev '     
//      https://github.com/MIvanchev/run-a-script

function clickLikeButton() {
  const likeButtonSelector = '#top-level-buttons-computed > segmented-like-dislike-button-view-model > yt-smartimation > div > div > like-button-view-model > toggle-button-view-model > button';

  function performClick() {
    const likeButton = $(likeButtonSelector);

    if (likeButton.length) {
      likeButton.click();
      console.log('Like button clicked');
    } else {
      console.log('Like button not found');
    }
  }

  function getTitle() {
    const titleElement = $("#title > h1 > yt-formatted-string");
    return titleElement.length ? titleElement.text() : null;
  }

  let currentTitle = getTitle();

  function checkTitleChange() {
    const newTitle = getTitle();

    if (newTitle !== currentTitle) {
      console.log('Video title has changed, re-running the script...');
      performClick();
      currentTitle = newTitle;
    }

    setTimeout(checkTitleChange, 1000);
  }

  setTimeout(performClick, 5000);
  checkTitleChange();
}

function checkAndPlayVideo() {
  var videoElement = $('video');

  if (videoElement.length && videoElement[0].paused) {
    var playButton = $("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > button");

    if (playButton.length) {
      playButton.click();
    }
  }
}

$(document).ready(function () {
  clickLikeButton();
  setInterval(checkAndPlayVideo, 1000);
});
