// ==UserScript==
// @name         YouTube Auto1337 Firefox
// @namespace    http://tampermonkey.net/
// @version      8.1.6f
// @description  YT Autolike ( created with jQuery)
// @author       Seth@WiiPlaza
// @match        *://*/*
// @icon         https://images2.imgbox.com/b2/91/cw76HCp5_o.gif
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function clickSpecificDiv() {
        const targetDivSelector = 'div.yt-spec-touch-feedback-shape__fill';

        const performClick = () => {
            const targetDiv = $(targetDivSelector);

            if (targetDiv.length) {
                targetDiv.click();
                console.log('Target div clicked');
            } else {
                console.log('Target div not found');
            }
        };

        setTimeout(performClick, 10000);
    }

    function clickLikeButton() {
        const likeButtonSelector = '#top-level-buttons-computed > ytd-toggle-button-renderer:nth-child(1) > button';

        const performClick = () => {
            const likeButton = $(likeButtonSelector);

            if (likeButton.length) {
                likeButton.click();
                console.log('Like button clicked');
            } else {
                console.log('Like button not found');
            }
        };

        const checkTitleChange = () => {
            const newTitle = $('h1#video-title').text().trim();
            if (newTitle && newTitle !== currentTitle) {
                console.log('Video title has changed, re-running the script...');
                performClick();
                currentTitle = newTitle;
            }
            setTimeout(checkTitleChange, 1000);
        };

        const checkColor = () => {
            const colorElement = $('button ytd-toggle-button-renderer.style-scope:nth-child(1) > a ytd-svg-button-renderer.style-scope:nth-child(1) > button.style-scope:nth-child(1) > yt-icon.style-scope:nth-child(1) > svg:nth-child(1) > g:nth-child(1)');
            const colorStyle = colorElement.css('fill');

            if (colorStyle && (colorStyle.startsWith('#FF') || colorStyle.startsWith('#F1'))) {
                console.log('Like button already activated, script will not run.');
                return false;
            }
            return true;
        };

        let currentTitle = $('h1#video-title').text().trim();

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
    });
})();