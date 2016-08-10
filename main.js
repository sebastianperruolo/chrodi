var g = function(e) { return (typeof e === 'string' ? document.getElementById(e) : e ); };

window.onload = function() {
  
  //store.url('http://localhost:8080/');  

  var kodi = (function(webviewId) {
    var webview = g(webviewId);
    var good = true;
    webview.addEventListener("loadstart", function(e) {
      // string	url	Requested URL.
      // boolean	isTopLevel	Whether the load is top-level or in a subframe.
      console.log("WEB loading: " + e.url);
      
    });
    
    webview.addEventListener("loadabort", function(e) {
      // string	url	Requested URL.
      // boolean	isTopLevel	Whether the load was top-level or in a subframe.
      // integer	code	Unique integer ID for the type of abort. Note that this ID is not guaranteed to remain backwards compatible between releases. You must not act based upon this specific integer.
      console.log("WEB aborted (" + e.code + ") " + e.url + (e.isTopLevel?' top ':' !top ') + " " + e.reason);
      good = false;
    });
    
    function updateWebviews() {
      if (webview.style.display === 'none') {
        return;
      }
      webview.style.height = document.documentElement.clientHeight + "px";
      webview.style.width = document.documentElement.clientWidth + "px";
    }
    
    webview.addEventListener("loadstop", function(e) {
      console.log("WEB stopped " + (good?'ok':'bad'));
      if (good) {
        sections.show(webviewId);
        updateWebviews();
      } else {
        sections.show("config");
      }
    });

    window.onresize = updateWebviews;

    return {
      load: function() {
        var loadingURL = g('loading-url');
        sections.show("loading");
        webview.stop();
        good = true;
        store.url(function(url) {
          webview.src = url;
          loadingURL.innerHTML = url;
          loadingURL.setAttribute('href', url);
        });
      },
      stop: function() {
        webview.stop();
      }
    };
  }("kodi"));

  kodi.load();
  
  var form = (function(formId) {

    var f = g('config-form');
    var _url = g('url');
    
    f.addEventListener("submit", function(e) {
      if (e.preventDefault) e.preventDefault();
      store.url(_url.value);
      kodi.load();
      return false;
    });
    
    return {
      url: function(u) {
        _url.value = u;
      }
    };
    
  }("config"));
  
  store.listen('url', function(url) {
    form.url(url);
  });
  g('loading-cancel').addEventListener("click", function() {
    kodi.stop();
  });
  
};

// "http://192.168.1.100:8080/"
var store = (function() {
  var defaultUrl = "http://localhost:8080/";
  var listeners = {};
  return {
    listen: function(key, callback) {
      listeners[key] = callback;
      this.fire(key);
    },
    fire: function(key) {
      chrome.storage.sync.get(key, function(items) {
        if (listeners[key] && items && items[key]) {
          listeners[key](items[key]);
        }
      });
    },
    url : function(v) {
      var that = this;
      if (typeof v === 'string') {
        chrome.storage.sync.set({'url': v}, function() {
          console.log('URL saved: ' + v);
          that.fire('url');
        });
      } else if (typeof v === 'function'){
        chrome.storage.sync.get('url', function(items) {
          //console.log('items', items);
          v(items && items.url ? items.url : defaultUrl);
        });
      } else {
          console.log('check! '+ typeof v);
      }
    }
  };
}());

var sections = function(ids) {

  // hide a section
  var hide = function(id) { g(id).style.display = 'none'; };
  
  // hide a section
  var show = function(id) { g(id).style.display = 'block'; };
  
  // hide all sections
  var hideAll = function() { for (var i in ids) { hide(ids[i]);} };
  
  //hideAll();
  
  return {
    show : function(id) {
      hideAll();
      show(id);
    }
  }
}(["kodi", "loading", "config"]);