// ==UserScript==
// @name         YT AutoLike Pro
// @namespace    Seth@WiiPlaza
// @version      0.1
// @description  Clicks the specified like button on YouTube
// @author       You
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to search for and click the specified element
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
})();
