// ==UserScript==
// @name         Jraws link
// @version      1.0
// @description  Link revealer
// @author       Ltpwcad
// @match        https://jraws.com/download/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const link = /(?<=window.location.href = ")(.*)(?=")/.exec(document.querySelector('.page-content>script').innerText, 'gmi')[0]
    const p = document.createElement('p')
    const a = document.createElement('a')
    a.innerText = link
    a.href = link
    p.appendChild(a)
    document.querySelector('.page-content').insertBefore(p, document.querySelector('.download-section'))

})();