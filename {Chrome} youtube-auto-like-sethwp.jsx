// For Chrome Version 119.0.6045.200 (Official Build) (64-bit) by [Seth@WiiPlaza]
function clickLikeButton() {
  const likeButtonSelector =
    '#top-level-buttons-computed > segmented-like-dislike-button-view-model > yt-smartimation > div > div > like-button-view-model > toggle-button-view-model > button > yt-touch-feedback-shape > div';

  const likeButton = document.querySelector(likeButtonSelector);

  if (likeButton) {
    likeButton.click();
    console.log('Like button clicked');
  } else {
    console.log('Like button not found');
  }
}

// Call the function to click the like button
clickLikeButton();
