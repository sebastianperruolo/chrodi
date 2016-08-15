# chrodi
A Chrome App wrapper for Kodi web UI

## Installation
If you want to install this Chrome App please go to the [Chrome web store](https://chrome.google.com/webstore/detail/kodi-chrome-app/dachpjcniijcophipfcedfiafioajkne)

## Changelog

v0.0.4 Added help text to Configuration page
v0.0.3 Added Material Design
v0.0.2 Updated README
v0.0.1 First version

## Why?

I own a Chromebook which I use to remote control my Kodi. The web UI is the first thing I started to use, I really love [Chorus](http://kodi.wiki/view/Add-on:Chorus). Then I installed [Kassi - Kodi/XBMC Remote Control](https://chrome.google.com/webstore/detail/kassi-kodixbmc-remote-con/jgannjdjlpnoibphpbmmfjkejcfhcmjp) and [Play to Kodi](https://chrome.google.com/webstore/detail/play-to-kodi/fncjhcjfnnooidlkijollckpakkebden). Those utility tools are very good but I wanted something that behaves like an app, like my iPhone remote control.

Chrome Apps are like native apps on ChromeOS, Ubuntu... Windows... Mac, I guess. So (I thought) this is what I want, a native remote control that will run on my Chromebook and on my Ubuntu laptop. But then I estimated the work needed so I gave up, it was going to be a really long project.

[Insert idea sound here]

What if I wrap Chorus, the web UI, in a Chrome App? [Chrodi](https://chrome.google.com/webstore/detail/kodi-chrome-app/dachpjcniijcophipfcedfiafioajkne) happens, a native client that will show you the web ui you enabled.

It is the first version and it need some work, but if someone like to give it a try, I'm eager to have some feedback.

## How it works?

The first step is to be familiar with [Kodi Web interface](http://kodi.wiki/view/web_interface). Once the Web interface is enabled, it will let you control your Kodi from any browser, in order to do this you will need to navigate to the right URL. 

The Chrome App is like a frame for the Web interface, this explains why the Chrome App configuration page need to ask for the Web interface URL.