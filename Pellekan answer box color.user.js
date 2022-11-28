// ==UserScript==
// @name         Pellekan answer box 
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  answer box toggle
// @author       Ltpwcad
// @match        https://pellekan.peleyad.com/test/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=peleyad.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    [".btn-edite-exam","#btn-start"].forEach((i) => {
        document.querySelector(i).onclick = () => {
            const btn = document.querySelector("#question-html-header span.Detector-box").cloneNode(false)
            const wrap = document.createElement('div')
            wrap.classList = ['col-md-2 col-sm-4 text-right custom-simplicity d-none d-xl-flex']
            btn.classList = ['Detector-box float-right p-1']
            btn.onmouseover = () => {btn.style.cursor = 'pointer'}
            btn.innerText = 'مشاهده جواب'
            btn.classList.remove('custom-hard-2')
            wrap.prepend(btn)
            const header = document.querySelector("#question-html-header")
            header.classList.add('justify-content-center')
            header.prepend(wrap)
            header.children[3].remove()
            const box = document.querySelector("#answerBody")
            box.style.visibility = 'hidden'
            btn.onclick = () => {box.style.visibility = box.style.visibility === 'hidden' ? 'visible' : 'hidden'}
    }

    })
})();