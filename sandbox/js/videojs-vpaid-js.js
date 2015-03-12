(function(window, document, videojs, undefined) {
  'use strict';

  var
    _options,
    _player,
    _playerEl,
    _vpaid,
    _vpaidIFrame,
    _vpaidPlayer,
    _tracker;

  var _setTrackerDuration = function() {
    if (_vpaid.getAdDuration) {
      var duration = _vpaid.getAdDuration();
      if (duration > 0) {
        _tracker.setDuration(duration);
      }
    }
  };

  var _onAdError = function(e) {
    console.debug('Vpaidjs', 'AdError', e);
    _player.trigger('ended');
  };

  var _onAdLoaded = function(e) {
    console.debug('Vpaidjs', 'AdLoaded', e);

    _tracker = _player.vast.tracker();

    _vpaid.startAd();

    _setTrackerDuration();

    _player.trigger('ads-ready');
  };

  var _onAdStopped = function() {
    console.debug('Vpaidjs', 'AdStopped');

    // _player.trigger('ended');

    _player.removeClass('vjs-vpaidjs-started');

    // TODO: Setup better integration with the VAST plugin
    if (_player.vast) {
      _player.vast.remove();
    }

    _tracker = null;
  };

  var _onAdDurationChange = function() {
    console.debug('Vpaidjs', 'AdDurationChange');
    _setTrackerDuration();
  };

  var _onAdRemainingTimeChange = function() {
    console.debug('Vpaidjs', 'AdRemainingTimeChange');
    _setTrackerDuration();
  };

  var _onAdSkipped = function() {
    console.debug('Vpaidjs', 'AdSkipped');

    _tracker.skip();
    _player.trigger('ended');
  };

  var _onAdStarted = function() {
    console.debug('Vpaidjs', 'AdStarted');

    _tracker.load();

    _player.addClass('vjs-vpaidjs-started');
  };

  var _onAdVolumeChange = function() {
    console.debug('Vpaidjs', 'AdVolumeChange');

    _tracker.setMuted(_vpaid.getAdVolume() === 0);
    _player.setVolume(_vpaid.getAdVolume());
  };

  var _onAdImpression = function() {
    console.debug('Vpaidjs', 'AdImpression');
    // TODO
  };

  var _onAdVideoStart = function() {
    console.debug('Vpaidjs', 'AdVideoStart');

    _tracker.setProgress(0);

    // TODO: Enable this if VPAID no longer creates it's own player
    // if (!_player.paused()) {
    //   _player.pause();
    // }
  };

  var _onAdVideoFirstQuartile = function() {
    console.debug('Vpaidjs', 'AdVideoFirstQuartile');

    var emulatedFirstQuartile = Math.round(25 * _vpaid.getAdDuration()) / 100;
    _tracker.setProgress(emulatedFirstQuartile);
  };

  var _onAdVideoMidpoint = function() {
    console.debug('Vpaidjs', 'AdVideoMidpoint');

    var emulatedMidpoint = Math.round(50 * _vpaid.getAdDuration()) / 100;
    _tracker.setProgress(emulatedMidpoint);
  };

  var _onAdVideoThirdQuartile = function() {
    console.debug('Vpaidjs', 'AdVideoThirdQuartile');

    var emulatedThirdQuartile = Math.round(75 * _vpaid.getAdDuration()) / 100;
    _tracker.setProgress(emulatedThirdQuartile);
  };

  var _onAdVideoComplete = function() {
    console.debug('Vpaidjs', 'AdVideoComplete');

    _tracker.setProgress(_vpaid.getAdDuration());
  };

  var _onAdClickThru = function(url, id, playerHandles) {
    console.debug('Vpaidjs', 'AdClickThru');

    _tracker.click();
  };

  var _onAdUserAcceptInvitation = function() {
    console.debug('Vpaidjs', 'AdUserAcceptInvitation');

    _tracker.acceptInvitation();
  };


  var _onAdUserClose = function() {
    console.debug('Vpaidjs', 'AdUserClose');

    _tracker.close();
  };

  var _onAdPaused = function() {
    console.debug('Vpaidjs', 'AdPaused');

    _tracker.setPaused(true);

    // TODO: Enable this if VPAID no longer creates it's own player
    // if (!_player.paused()) {
    //   _player.pause();
    // }
  };

  var _onAdPlaying = function() {
    console.debug('Vpaidjs', 'AdPlaying');

    _tracker.setPaused(false);

    // TODO: Enable this if VPAID no longer creates it's own player
    // if (_player.paused()) {
    //   _player.play();
    // }
  };

  var _onAdSkippableStateChange = function() {
    console.debug('Vpaidjs', 'AdSkippableStateChange');
    if (_vpaid.getAdSkippableState()) {
      console.debug('Vpaidjs', 'TODO: create skip button');
    } else if (_skipBtn) {
      _skipBtn.parentNode.removeChild(_skipBtn);
    }
  };

  var _addVPAIDEvents = function() {
    _vpaid.subscribe(_onAdError, 'AdError');
    _vpaid.subscribe(_onAdLoaded, 'AdLoaded');
    _vpaid.subscribe(_onAdStopped, 'AdStopped');
    _vpaid.subscribe(_onAdDurationChange, 'AdDurationChange');
    _vpaid.subscribe(_onAdRemainingTimeChange, 'AdRemainingTimeChange');
    _vpaid.subscribe(_onAdSkipped, 'AdSkipped');
    _vpaid.subscribe(_onAdStarted, 'AdStarted');
    _vpaid.subscribe(_onAdVolumeChange, 'AdVolumeChange');
    _vpaid.subscribe(_onAdImpression, 'AdImpression');
    _vpaid.subscribe(_onAdVideoStart, 'AdVideoStart');
    _vpaid.subscribe(_onAdVideoFirstQuartile, 'AdVideoFirstQuartile');
    _vpaid.subscribe(_onAdVideoMidpoint, 'AdVideoMidpoint');
    _vpaid.subscribe(_onAdVideoThirdQuartile, 'AdVideoThirdQuartile');
    _vpaid.subscribe(_onAdVideoComplete, 'AdVideoComplete');
    _vpaid.subscribe(_onAdClickThru, 'AdClickThru');
    _vpaid.subscribe(_onAdUserAcceptInvitation, 'AdUserAcceptInvitation');
    _vpaid.subscribe(_onAdUserClose, 'AdUserClose');
    _vpaid.subscribe(_onAdPaused, 'AdPaused');
    _vpaid.subscribe(_onAdPlaying, 'AdPlaying');
    _vpaid.subscribe(_onAdSkippableStateChange, 'AdSkippableStateChange');
  };

  var _removeVPAIDEvents = function() {
    _vpaid.unsubscribe(_onAdError, 'AdError');
    _vpaid.unsubscribe(_onAdLoaded, 'AdLoaded');
    _vpaid.unsubscribe(_onAdStopped, 'AdStopped');
    _vpaid.unsubscribe(_onAdDurationChange, 'AdDurationChange');
    _vpaid.unsubscribe(_onAdRemainingTimeChange, 'AdRemainingTimeChange');
    _vpaid.unsubscribe(_onAdSkipped, 'AdSkipped');
    _vpaid.unsubscribe(_onAdStarted, 'AdStarted');
    _vpaid.unsubscribe(_onAdVolumeChange, 'AdVolumeChange');
    _vpaid.unsubscribe(_onAdImpression, 'AdImpression');
    _vpaid.unsubscribe(_onAdVideoStart, 'AdVideoStart');
    _vpaid.unsubscribe(_onAdVideoFirstQuartile, 'AdVideoFirstQuartile');
    _vpaid.unsubscribe(_onAdVideoMidpoint, 'AdVideoMidpoint');
    _vpaid.unsubscribe(_onAdVideoThirdQuartile, 'AdVideoThirdQuartile');
    _vpaid.unsubscribe(_onAdVideoComplete, 'AdVideoComplete');
    _vpaid.unsubscribe(_onAdClickThru, 'AdClickThru');
    _vpaid.unsubscribe(_onAdUserAcceptInvitation, 'AdUserAcceptInvitation');
    _vpaid.unsubscribe(_onAdUserClose, 'AdUserClose');
    _vpaid.unsubscribe(_onAdPaused, 'AdPaused');
    _vpaid.unsubscribe(_onAdPlaying, 'AdPlaying');
    _vpaid.unsubscribe(_onAdSkippableStateChange, 'AdSkippableStateChange');
  };

  var _addVPAIDContainer = function() {
    _vpaidIFrame = videojs.Component.prototype.createEl('iframe', {
      scrolling: 'no',
      marginWidth: 0,
      marginHeight: 0,
      frameBorder: 0,
      webkitAllowFullScreen: 'true',
      mozallowfullscreen: 'true',
      allowFullScreen: 'true'
    });

    _vpaidIFrame.onload = function() {
      // TODO: Enable this if VPAID no longer creates it's own player
      var iframeDoc = _vpaidIFrame.contentDocument;

      // Credos http://stackoverflow.com/a/950146/51966
      // Adding the script tag to the head as suggested before
      var head = iframeDoc.getElementsByTagName('head')[0];
      var script = iframeDoc.createElement('script');
      script.type = 'text/javascript';
      script.src = _player.currentSrc();

      // backwards-compatibility: https://msdn.microsoft.com/en-us/lirary/ie/hh180173%28v=vs.85%29.aspx
      if(script.addEventListener) {
        script.addEventListener("load", function() { _initVPAID(); });
      } else if (script.readyState) {
        script.onreadystatechange = function() { _initVPAID(); };
      } else {
        console.warn('no event listener function available');
      }

      head.appendChild(script);
    };

    document.body.appendChild(_vpaidIFrame);
  };

  var _removeVPAIDContainer = function() {
    _disposeVPAID();

    if (!_vpaidIFrame) {
      console.warn('no VPAID container defined');
      return;
    }

    document.body.removeChild(_vpaidIFrame);

    _vpaidIFrame = null;
  };

  var _addVPAIDPlayer = function() {
    if (/iphone|ipad|android/gi.test(navigator.userAgent)) {
      _vpaidPlayer = _playerEl.querySelector('.vjs-tech');
      if (_vpaidPlayer.tagName !== 'video') { // might be using non-default source, fallback to custom video slot
        _vpaidPlayer = undefined;
      }
    }

    if (_vpaidPlayer) {
      console.info('using existing VPAID tech');
      return;
    }

    _vpaidPlayer = videojs.Component.prototype.createEl('video', {
      id: _player.id() + '_vpaidjs_api',
      className: 'vjs-tech',
      scrolling: 'no',
      marginWidth: 0,
      marginHeight: 0,
      frameBorder: 0,
      webkitAllowFullScreen: 'true',
      mozallowfullscreen: 'true',
      allowFullScreen: 'true'
    });

    videojs.insertFirst(_vpaidPlayer, _playerEl);
  };

  var _removeVPAIDPlayer = function() {
    if (!_vpaidPlayer) {
      console.warn('no VPAID tech defined');
      return;
    }

    if (_vpaidPlayer.id !== _player.id() + '_vpaidjs_api') {
      console.info('not removing VPAID tech');
      return;
    }

    _playerEl.removeChild(_vpaidPlayer);

    _vpaidPlayer = null;
  };

  var _initVPAID = function() {
    if (!_vpaidIFrame) {
      console.error('Vpaidjs', '_initVPAID', 'no VPAID iframe available');
      return;
    }

    if (_vpaidIFrame.contentWindow.getVPAIDAd === undefined) {
      console.debug('Vpaidjs', '_initVPAID', 'no VPAID getVPAIDAd available');
      return;
    }

    _vpaid = _vpaidIFrame.contentWindow.getVPAIDAd();

    if (_vpaid.handshakeVersion('2.0') !== '2.0') {
      throw new Error("Versions different to 2.0 are not supported");
    }

    var pref = {
      videoSlotCanAutoPlay: true,
      slot: _playerEl,
      videoSlot: _vpaidPlayer
    };

    // wire up to VPAID events
    _addVPAIDEvents();

    //TODO add creativeData
    _vpaid.initAd(_player.width(), _player.height(), _options.viewMode, _options.bitrate, {}, pref);
  };

  var _disposeVPAID = function() {
    _removeVPAIDEvents();

    _vpaid = null;
  };

  videojs.Vpaidjs = videojs.Html5.extend({
    /** @constructor */
    init: function(player, options, ready) {
      if (options.debug) {
        console.info('Vpaidjs', 'init', 'options', options);
      }

      // default values
      _options = videojs.util.mergeOptions({
        viewMode: 'normal',
        bitrate: 1000
      }, options);

      _player = player;
      _playerEl = player.el();

      _addVPAIDContainer();
      _addVPAIDPlayer();

      console.info('Vpaidjs', 'init', 'src', player.src());

      if (options.source) {
        this.ready(function() {
          this.src(options.source.src);
        });
      }

      videojs.MediaTechController.call(this, player, options, ready);
    }
  });

  videojs.Vpaidjs.prototype.dispose = function() {
    _removeVPAIDPlayer();
    _removeVPAIDContainer();

    _options = null;
    _player = null;
    _playerEl = null;
    _tracker = null;

    videojs.MediaTechController.prototype.dispose.call(this);
  };

  videojs.Vpaidjs.canPlaySource = function(srcObj) {
    return srcObj.type === 'application/javascript' ? 'maybe' : '';
  };

  videojs.Vpaidjs.isSupported = function() {
    return true;
  };

})(window, document, videojs);
