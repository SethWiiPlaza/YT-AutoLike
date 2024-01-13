const likeButtonSelector = '#top-level-buttons-computed > segmented-like-dislike-button-view-model > yt-smartimation > div > div > like-button-view-model > toggle-button-view-model > button';

function clickLikeButton() {
  const performClick = () => {
    const likeButton = $(likeButtonSelector);
    if (likeButton.length) {
      likeButton.click();
    }
  };

  const getTitle = () => $("#title > h1 > yt-formatted-string").text().trim();

  let currentTitle = getTitle();

  const checkTitleChange = () => {
    const newTitle = getTitle();
    if (newTitle && newTitle !== currentTitle) {
      performClick();
      currentTitle = newTitle;
    }
    setTimeout(checkTitleChange, 1000);
  };

  const checkColor = () => {
    const colorElement = $('ytd-menu-renderer.ytd-watch-metadata > div:nth-child(1) > segmented-like-dislike-button-view-model:nth-child(1) > yt-smartimation:nth-child(1) > div:nth-child(1) > div:nth-child(1) > like-button-view-model:nth-child(1) > toggle-button-view-model:nth-child(1) > button:nth-child(1) > yt-touch-feedback-shape:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div.yt-spec-touch-feedback-shape__fill');
    const colorStyle = colorElement.css('background-color');

    if (colorStyle && (colorStyle.startsWith('#FF') || colorStyle.startsWith('#F1'))) {
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

  (function($) {
    let currentPageUrl = window.location.href;
    const delay = 200;
    const maxTries = 100;
    let tries = 0;

    window.addEventListener('beforeunload', function() {
      try {
        currentPageUrl = window.location.href;
      } catch(e) {
      }
    });

    document.addEventListener('yt-page-type-changed', function() {
      const newUrl = window.location.href;
      if (!newUrl.includes("watch")) {
        removeIframe();
      }
    });

    document.addEventListener('yt-navigate-finish', function() {
      try {
        const newUrl = window.location.href;
        if (newUrl !== currentPageUrl) {
          createIframe(newUrl);
        }
      } catch(e) {
      }
    });

    function splitUrl(str) {
      try{
        return str.split('=')[1].split('&')[0];
      } catch(e) {
      }
    }

    function run() {
      try {
        const block = document.querySelector('.yt-playability-error-supported-renderers');
        if (!block) {
          if (tries === maxTries) return;
          tries++;
          setTimeout(run, delay);
        } else {
          magic();
        }
      } catch(e) {
      }
    }

    function extractParams(url) {
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      const videoId = params.get('v');
      const playlistId = params.get('list');
      const index = params.get('index');
      return { videoId, playlistId, index };
    }

    function magic() {
      try{
        const block = document.querySelector('.yt-playability-error-supported-renderers');
        if (!block) return;
        block.parentNode.removeChild(block);
        const url = window.location.href;
        createIframe(url);
      } catch(e) {
      }
    }

    function getTimestampFromUrl(str) {
      const timestamp = str.split("t=")[1];
      if (timestamp) {
        const timeArray = timestamp.split('&')[0].split(/h|m|s/);
        if (timeArray.length < 3) {
          return "&start=" + timeArray[0];
        } else if (timeArray.length == 3) {
          const timeInSeconds = (parseInt(timeArray[0]) * 60) + parseInt(timeArray[1]);
          return "&start=" + timeInSeconds;
        } else {
          const timeInSeconds = (parseInt(timeArray[0]) * 3600) + (parseInt(timeArray[1]) * 60) + parseInt(timeArray[2]);
          return "&start=" + timeInSeconds;
        }
      }
      return "";
    }

    function bringToFront(target_id) {
      const all_z = [];
      document.querySelectorAll("*").forEach(function(elem) {
        all_z.push(elem.style.zIndex)
      })
      const max_index = Math.max.apply(null, all_z.map((x) => Number(x)));
      const new_max_index = max_index + 1;
      document.getElementById(target_id).style.zIndex = new_max_index;
    }

    function createIframe(newUrl) {
      let url = "";
      const commonArgs = "autoplay=1&modestbranding=1";
      if(newUrl.includes('&list')){
        url = "https://www.youtube-nocookie.com/embed/" + extractParams(newUrl).videoId + "?" + commonArgs + "&list=" + extractParams(newUrl).playlistId + "&index=" + extractParams(newUrl).index;
      }else{
        url = "https://www.youtube-nocookie.com/embed/" + splitUrl(newUrl) + "?" + commonArgs + getTimestampFromUrl(newUrl);
      }

      let player = document.getElementById("youtube-iframe");
      if(!player) {
        const oldplayer = document.getElementById("error-screen");
        player = document.createElement('iframe');
        setYtPlayerAttributes(player, url);
        player.style = "height:100%;width:100%;border-radius:12px;";
        player.id = "youtube-iframe";
        oldplayer.appendChild(player);
      } else {
        setYtPlayerAttributes(player, url);
      }
      bringToFront("youtube-iframe");
    }

    function removeIframe() {
      const player = document.getElementById("youtube-iframe");
      player.parentNode.removeChild(player);
    }

    function setYtPlayerAttributes(player, url){
      player.setAttribute('src', url);
      player.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      player.setAttribute('frameborder', '0');
      player.setAttribute('allowfullscreen', "allowfullscreen");
      player.setAttribute('mozallowfullscreen', "mozallowfullscreen");
      player.setAttribute('msallowfullscreen', "msallowfullscreen");
      player.setAttribute('oallowfullscreen', "oallowfullscreen");
      player.setAttribute('webkitallowfullscreen', "webkitallowfullscreen");
    }

    (function() {
      'use strict';
      run();
    })();
  })(jQuery);
});
