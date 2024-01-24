// ==UserScript==
// @name         YouTube Auto1337 Firefox
// @namespace    http://youtube.com/*
// @version      8.1
// @description  YT Autolike (jQuery)
// @author       [Seth@WiiPlaza]
// @match        *://*/*
// @grant        none
// ==/UserScript==

/* global $ */

(function() {
    'use strict';

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

        function getTitle() {
            const titleElement = $("#title > h1 > yt-formatted-string");
            return titleElement.length ? titleElement.text().trim() : null;
        }

        let currentTitle = getTitle();

        function checkTitleChange() {
            const newTitle = getTitle();

            if (newTitle && newTitle !== currentTitle) {
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
})();
