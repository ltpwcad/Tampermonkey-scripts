// ==UserScript==
// @name        index
// @namespace   https://dl.hm-drive.live/
// @version     0.1
// @description index view remover
// @author      Ltpwcad
// @match       *hm-drive.*
// @match       *kiss-ass.workers.*
// @match       *gautamsmirror.*
// @match       *cybersammy.*
// @match       https://test.kit-kat.workers.dev/*
// @match       https://index.artutos-mirror.workers.dev/*
// @match       https://smthng.dhruvmirror.workers.dev/*
// @match       https://mhjoybotstrail.mhjoybots.workers.dev/*
// @match       https://superior-mirror.index-cloud.workers.dev/*
// @match       https://one.shinobi.workers.dev/*
// @match       https://two.shinobispecial.workers.dev/*
// @match       https://mltb.xtronnoob.workers.dev/*
// @match       https://three.shinobispecial.workers.dev/*
// @match       https://247.twenty-four-seven-mirror.workers.dev/*
// @match       https://xavier.xenontech.xyz/*
// @match       https://dipeshmirror.dipeshtech.workers.dev/*
// @match       https://beware-the.devilreturns.workers.dev/**
// @match       https://index.edithx.ga/*
// @match       https://yesyou.dhruvmir.workers.dev/*
// @match       https://m.papaonwork.workers.dev/*
// @match       https://foryoubish.foryoubish.workers.dev/*
// @icon        https://www.google.com/s2/favicons?domain=https://drive.google.com/
// @grant       none
// ==/UserScript==

(function() {
    'use strict';
    setTimeout(() => {
        const linkEls = document.querySelectorAll("a.list-group-item-action")
        const lastEl = document.querySelector('#count')
        const newDiv = document.createElement('div')
        linkEls.forEach((x) => {
            try{
                let link = x.nextElementSibling.href.replace("?a=view", "")
                x.setAttribute('href', link)
                console.log(link)
                let d = document.createElement('a')
                d.innerHTML = link
                d.setAttribute('href', link)
                newDiv.appendChild(d)
                newDiv.append(document.createElement('br'))
            }
            catch(e){
                return
            }

        })

        lastEl.parentNode.insertBefore(newDiv, lastEl.nextSibling)
    }, 1500)
})();