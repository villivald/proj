// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Skeleton/snowfall2020.js":[function(require,module,exports) {
var style = document.createElement('style');
style.innerHTML = "\n\n  .sf-snow-flake {\n\nposition: fixed;\n\ntop: -20px;\n\nz-index: 99999;\n\n}\n\n.sf-snow-anim {\n\ntop: 110%;\n\n}\n\n  ";
document.head.appendChild(style);
/*
snowFlurry JS - version 2.0

Copyright Ð’Â© 2015 S.W. Clough (https://www.html5andbeyond.com)

Licensed Under MIT

*/

(function ($) {
  $.fn.snowFlurry = function (options) {
    var s = $.extend({
      maxSize: 5,
      numberOfFlakes: 25,
      minSpeed: 10,
      maxSpeed: 15,
      color: '#fff',
      timeout: 0
    }, options);
    var windowWidth = $(window).innerWidth(),
        WidthArray = [],
        DelayArray = [],
        animateArray = [],
        flakeSize = [],
        snowInterval;

    if (s.maxSize <= 10) {
      for (var i = 1; i < s.maxSize; i++) {
        flakeSize.push(i);
      }
    } else {
      for (var i = 1; i < 10; i++) {
        flakeSize.push(i);
      }
    }

    for (var i = 0; i < windowWidth - 20; i++) {
      WidthArray.push(i);
    }

    for (var i = 0; i < s.numberOfFlakes; i++) {
      $('<div class="sf-snow-flake"></div>').appendTo('body');
    }

    for (var i = 0; i < 10; i++) {
      DelayArray.push(i);
    }

    for (var i = s.minSpeed; i < s.maxSpeed; i++) {
      animateArray.push(i);
    }

    function getRandomFlakeSize() {
      var item = flakeSize[Math.floor(Math.random() * flakeSize.length)];
      return item;
    }

    function getRandomPosition() {
      var item = WidthArray[Math.floor(Math.random() * WidthArray.length)];
      return item;
    }

    function getRandomDelay() {
      var item = DelayArray[Math.floor(Math.random() * DelayArray.length)];
      return item * 1000;
    }

    function getRandomAnimation() {
      var item = animateArray[Math.floor(Math.random() * animateArray.length)];
      return item * 1000;
    }

    $('.sf-snow-flake').each(function () {
      var elem = $(this);
      elem.attr('data-speed', getRandomAnimation());
      elem.attr('data-delay', getRandomDelay());
      var elemSpeed = elem.attr('data-speed'),
          elemDelay = elem.attr('data-delay');
      var flakeSize = getRandomFlakeSize();
      elem.css({
        'width': flakeSize,
        'height': flakeSize,
        'border-radius': flakeSize / 2,
        'background-color': s.color,
        'box-shadow': '0 0 2px 1px' + s.color
      });

      function activateAnim() {
        setTimeout(function () {
          elem.css('left', getRandomPosition());
          elem.addClass('sf-snow-anim');
          elem.css('transition', 'top ' + elemSpeed / 1000 + 's linear');
          setTimeout(function () {
            elem.css('transition', '');
            elem.removeClass('sf-snow-anim');
          }, elemSpeed);
        }, elemDelay);
      }

      if (device.mobile() || device.tablet() || Modernizr.touch || $('html').hasClass('no-csstransitions')) {} else if (device.desktop()) {
        activateAnim();
        snowInterval = setInterval(function () {
          activateAnim();
        }, +elemDelay + +elemSpeed);
      }

      if (s.timeout != 0) {
        setTimeout(function () {
          clearInterval(snowInterval);
          $('.sf-snow-flake').fadeOut(1500, function () {
            $(this).remove();
          });
        }, s.timeout * 1000);
      }
    });
  };
})(jQuery);

jQuery(document).ready(function ($) {
  $(document).snowFlurry({
    maxSize: 10,
    numberOfFlakes: 100,
    minSpeed: 10,
    maxSpeed: 20,
    color: 'white',
    timeout: 0
  });
});
},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64473" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","Skeleton/snowfall2020.js"], null)
//# sourceMappingURL=/snowfall2020.88557d7e.js.map