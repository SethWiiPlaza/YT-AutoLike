$(document).ready(function () {
  if (window.location.href.match(/:\/\/.*\.youtube\.com\/.*$/)) {
    const form = $('<form>', { class: 'child' });
    form.append('<input name="ownerDocument"/><script></script>');
    $('body').append(form);

    let currentTitle = '';

    function checkTitleChange() {
      const titleElement = $('h1.style-scope:nth-child(2) > yt-formatted-string:nth-child(1)');
      const newTitle = titleElement.length ? titleElement.text().trim() : null;

      if (newTitle && newTitle !== currentTitle) {
        console.log(`Video title has changed from "${currentTitle}" to "${newTitle}", re-running the script...`);
        runScript();
        currentTitle = newTitle;
      }

      setTimeout(checkTitleChange, 10000);
    }

    function runScript() {
      function clickLikeButton() {
        const likeButtonSelector = 'ytd-menu-renderer.ytd-watch-metadata > div:nth-child(1) > segmented-like-dislike-button-view-model:nth-child(1) > yt-smartimation:nth-child(1) > div:nth-child(1) > div:nth-child(1) > like-button-view-model:nth-child(1) > toggle-button-view-model:nth-child(1) > button:nth-child(1) > div:nth-child(1) > yt-icon:nth-child(1) > yt-animated-icon:nth-child(1) > ytd-lottie-player:nth-child(1) > lottie-component:nth-child(1) > svg:nth-child(1) > g:nth-child(2)';

        function performClick() {
          const likeButton = $(likeButtonSelector);

          if (likeButton.length) {
            likeButton.click();
            console.log('Like button clicked');
          } else {
            console.log('Like button not found');
          }
        }

        performClick();
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

      clickLikeButton();
      setInterval(checkAndPlayVideo, 1000);
    }

    runScript();
    checkTitleChange();
  }
});
