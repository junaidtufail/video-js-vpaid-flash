Preface
============

This repository is based off of [Guardian/VideoJS-VPAID](https://github.com/guardian/video-js-vpaid) and [VideoJS/VideoJS-SWF](https://github.com/videojs/video-js-swf). 
This is my attempt at getting Flash VPAID support for VideoJS and most of it is currently just a mashup and is in no way in it's final form. I will modify this over time
as I slowly piece together everything.

Currently Working: 
* LiveRail VPAID ad example --> located within /sandbox/

Currently Broken?:
* YuMe VPAID ad example
* Example Ad SWF that is compiled with `grunt mxmlc`

The source code for the VideoJS SWF is available and can be editted and looked at, and I am open to anyone reporting issues or contributing to this. I cannot guarentee the tests
work right now as I am solely just working on getting the Flash VPAID stable.

I am available via Twitter for direct questions or feedback, my handle is [@Manbearpixel](https://twitter.com/manbearpixel). Thanks for checking this repo out!

***

The light-weight Flash video player that makes Flash work like HTML5 video. This allows player skins, plugins, and other features to work with both HTML5 and Flash

This project doesn't need to be used if you simply want to use the Flash video player.  Head back to the main Video.js project if that's all you need, as the compiled SWF is checked in there.

Installation
============

1. Install Node Packages.
```bash
    npm install
   ```
2. Compile SWF.
Development (places new SWF in /dist/):
```bash
    grunt mxmlc
   ```
Production/ Distribution (runs mxmlc task and copies SWF to dist/):
```bash
    grunt dist
   ```
3. Run Connect Server.
```bash
    grunt connect:dev
```
4. Open your browser at [http://localhost:8000/index.html](http://localhost:8000/index.html) to see a video play.  You can keep using grunt to rebuild the Flash code.


Running Unit and Integration Tests
===========

** Note - We want to drop all of this for grunt based / Karma testing.

For unit tests, this project uses [FlexUnit](http://flexunit.org/). The unit tests can be found in [project root]/src/com/videojs/test/

For integration tests, this project uses [qunit](http://qunitjs.com/). The integration tests can be found in [project root]/test

In order to run all of the tests, use the links at  [http://localhost:8000/index.html](http://localhost:8000/index.html)

There are very few tests.  Adding to them is a fantastic and much appreciated way to contribute.


VPAID Support
============

Initial VPAID integration has been added. An example can be found in the sandbox/videojs.html

The script in there plus the custom build of the video player should be all that is necessary to get it running with stock Video-JS code.