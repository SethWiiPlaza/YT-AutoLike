// ==UserScript==
// @name         YouTube Auto1337 Firefox
// @namespace    http://tampermonkey.net/
// @version      8.1.1f
// @description  YT Autolike (jQuery)
// @author       [Seth@WiiPlaza]
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @updateURL    https://github.com/SethWiiPlaza/YouTube-Auto1337-Firefox/releases/download/Release/YouTube.Auto1337.Firefox-8.1f.tampermonkey.user.js
// @downloadURL  https://github.com/SethWiiPlaza/YouTube-Auto1337-Firefox/releases/download/Release/YouTube.Auto1337.Firefox-8.1f.tampermonkey.user.js
// @grant        none
// ==/UserScript==

/* global $ */

(function() {
    'use strict';

    function clickLikeButton() {
        const likeButtonSelector1 = 'ytd-menu-renderer.ytd-watch-metadata > div:nth-child(1) > segmented-like-dislike-button-view-model:nth-child(1) > yt-smartimation:nth-child(1) > div:nth-child(1) > div:nth-child(1) > like-button-view-model:nth-child(1) > toggle-button-view-model:nth-child(1) > button:nth-child(1) > div:nth-child(1) > yt-icon:nth-child(1) > yt-animated-icon:nth-child(1) > ytd-lottie-player:nth-child(1) > lottie-component:nth-child(1) > svg:nth-child(1) > g:nth-child(2)';
        const likeButtonSelector2 = '#top-level-buttons-computed > segmented-like-dislike-button-view-model > yt-smartimation > div > div > like-button-view-model > toggle-button-view-model > button';

        const performClick = () => {
            const likeButton1 = $(likeButtonSelector1);
            const likeButton2 = $(likeButtonSelector2);

            const likeButton = likeButton1.length ? likeButton1 : likeButton2;

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
})();
