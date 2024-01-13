const likeButtonSelector = '#top-level-buttons-computed > segmented-like-dislike-button-view-model > yt-smartimation > div > div > like-button-view-model > toggle-button-view-model > button';

function clickLikeButton() {
  const performClick = () => {
    const likeButton = $(likeButtonSelector);
    if (likeButton.length) {
      likeButton.click();
      console.log('Like button clicked');
    } else {
      console.log('Like button not found');
    }
  };

  const getTitle = () => $("#title > h1 > yt-formatted-string").text().trim();

  let currentTitle = getTitle();

  const checkTitleChange = () => {
    const newTitle = getTitle();
    if (newTitle && newTitle !== currentTitle) {
      console.log('Video title has changed, re-running the script...');
      performClick();
      currentTitle = newTitle;
    }
    setTimeout(checkTitleChange, 1000);
  };

  const checkColor = () => {
    const colorElement = $('ytd-menu-renderer.ytd-watch-metadata > div:nth-child(1) > segmented-like-dislike-button-view-model:nth-child(1) > yt-smartimation:nth-child(1) > div:nth-child(1) > div:nth-child(1) > like-button-view-model:nth-child(1) > toggle-button-view-model:nth-child(1) > button:nth-child(1) > yt-touch-feedback-shape:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div.yt-spec-touch-feedback-shape__fill');
    const colorStyle = colorElement.css('background-color');

    if (colorStyle && (colorStyle.startsWith('#FF') || colorStyle.startsWith('#F1'))) {
      console.log('Like button already activated, script will not run.');
      return false;
    }
    return true;
  };

  setTimeout(() => {
    if (checkColor()) {
      performClick();
      checkTitleChange();
    }
  }, 10000);
}

function checkAndPlayVideo() {
  const videoElement = $('video');
  if (videoElement.length && videoElement[0].paused) {
    const playButton = $("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > button");
    if (playButton.length) playButton.click();
  }
}

$(document).ready(() => {
  clickLikeButton();
  setInterval(checkAndPlayVideo, 1000);

  const form = $('<form>', { class: 'child' }).append('<input name="ownerDocument"/><script>// Your script here</script>');
  $('body').append(form);
});
