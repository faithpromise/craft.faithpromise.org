/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = axios;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(17),
  /* template */
  __webpack_require__(18),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/broberts/websites/faithpromise.org/assets/js/common/video-embed.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] video-embed.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e8be2b02", Component.options)
  } else {
    hotAPI.reload("data-v-e8be2b02", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);


/* harmony default export */ __webpack_exports__["a"] = ({
    positions: function positions(params) {
        return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get('/api/volunteer-positions', { params: params });
    },
    areas: function areas() {
        return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get('/api/volunteer-areas');
    },
    skills: function skills() {
        return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get('/api/volunteer-skills');
    }
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(6);
module.exports = __webpack_require__(45);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_portal_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_portal_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_portal_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__series_series_list_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__series_series_list_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__series_series_list_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__series_playlist_item_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__series_playlist_item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__series_playlist_item_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__series_sermon_hero_vue__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__series_sermon_hero_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__series_sermon_hero_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__series_sermon_tools_vue__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__series_sermon_tools_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__series_sermon_tools_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_video_embed_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_video_embed_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__common_video_embed_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_home_page_video_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_home_page_video_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__common_home_page_video_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__serving_volunteer_positions_vue__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__serving_volunteer_positions_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__serving_volunteer_positions_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__common_reading_plan_nav_vue__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__common_reading_plan_nav_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__common_reading_plan_nav_vue__);













__webpack_require__(44);

__WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$http = __WEBPACK_IMPORTED_MODULE_1_axios___default.a;

__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_2_portal_vue___default.a);

var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({

    el: '#app',

    components: {
        seriesList: __WEBPACK_IMPORTED_MODULE_3__series_series_list_vue___default.a,
        playlistItem: __WEBPACK_IMPORTED_MODULE_4__series_playlist_item_vue___default.a,
        sermonHero: __WEBPACK_IMPORTED_MODULE_5__series_sermon_hero_vue___default.a,
        sermonTools: __WEBPACK_IMPORTED_MODULE_6__series_sermon_tools_vue___default.a,
        videoEmbed: __WEBPACK_IMPORTED_MODULE_7__common_video_embed_vue___default.a,
        homePageVideo: __WEBPACK_IMPORTED_MODULE_8__common_home_page_video_vue___default.a,
        volunteerPositions: __WEBPACK_IMPORTED_MODULE_9__serving_volunteer_positions_vue___default.a,
        readingPlanNav: __WEBPACK_IMPORTED_MODULE_10__common_reading_plan_nav_vue___default.a
    },

    data: function data() {
        return {
            is_nav_open: false
        };
    },

    computed: {
        toggle_icon: function toggle_icon() {
            return this.is_nav_open ? 'close' : 'menu';
        }
    },

    watch: {
        is_nav_open: function is_nav_open(value) {
            document.documentElement.classList[value ? 'add' : 'remove']('nav-open');
        }
    },

    methods: {

        nav_open: function nav_open() {
            window.scrollTo(0, 0);
            this.is_nav_open = true;
        },

        nav_close: function nav_close() {
            window.scrollTo(0, 0);
            this.is_nav_open = false;
        },

        nav_toggle: function nav_toggle() {
            this.is_nav_open ? this.nav_close() : this.nav_open();
        }

    }

});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
    portal-vue
    Version: 1.1.0
    Licence: MIT
    (c) Thorsten Lünborg
  */
  
(function (global, factory) {
	 true ? module.exports = factory(__webpack_require__(2)) :
	typeof define === 'function' && define.amd ? define(['vue'], factory) :
	(global.PortalVue = factory(global.Vue));
}(this, (function (Vue) { 'use strict';

Vue = Vue && 'default' in Vue ? Vue['default'] : Vue;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



































var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function extractAttributes(el) {
  var map = el.hasAttributes() ? el.attributes : [];
  var attrs = {};
  for (var i = 0; i < map.length; i++) {
    var attr = map[i];
    if (attr.value) {
      attrs[attr.name] = attr.value === '' ? true : attr.value;
    }
  }
  return attrs;
}

function freeze(item) {
  if (Array.isArray(item) || (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
    return Object.freeze(item);
  }
  return item;
}

var transports = {};

var Wormhole = function () {
  function Wormhole(transports) {
    classCallCheck(this, Wormhole);

    this.transports = transports;
  }

  createClass(Wormhole, [{
    key: 'open',
    value: function open(transport) {
      var to = transport.to,
          from = transport.from,
          passengers = transport.passengers;

      if (!to || !from || !passengers) return;

      transport.passengers = freeze(passengers);
      var keys = Object.keys(this.transports);
      if (keys.indexOf(to) !== -1) {
        this.transports[to] = transport;
      } else {
        Vue.set(this.transports, to, transport);
      }
    }
  }, {
    key: 'close',
    value: function close(transport) {
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var to = transport.to,
          from = transport.from;

      if (!to || !from) return;
      if (this.transports[to] && (force || this.transports[to].from === from)) {
        this.transports[to] = undefined;
      }
    }
  }, {
    key: 'hasTarget',
    value: function hasTarget(to) {
      return this.transports.hasOwnProperty(to);
    }
  }, {
    key: 'hasContentFor',
    value: function hasContentFor(to) {
      return this.transports[to] && this.transports[to].passengers != null ? true : false;
    }
  }, {
    key: 'getSourceFor',
    value: function getSourceFor(to) {
      return this.transports[to] && this.transports[to].from;
    }
  }, {
    key: 'getContentFor',
    value: function getContentFor(to) {
      var transport = this.transports[to];
      return transport ? transport.passengers : undefined;
    }
  }]);
  return Wormhole;
}();
var wormhole = new Wormhole(transports);

var Target = {
  abstract: true,
  name: 'portalTarget',
  props: {
    attributes: { type: Object },
    name: { type: String, required: true },
    slim: { type: Boolean, default: false },
    tag: { type: String, default: 'div' }
  },
  data: function data() {
    return {
      transports: transports
    };
  },
  mounted: function mounted() {
    if (!this.transports[this.name]) {
      this.$set(this.transports, this.name, undefined);
    }

    this.unwatch = this.$watch(function () {
      return this.transports[this.name];
    }, this.emitChange);

    this.updateAttributes();
  },
  updated: function updated() {
    this.updateAttributes();
  },
  beforeDestroy: function beforeDestroy() {
    this.unwatch();
    this.$el.innerHTML = '';
  },


  methods: {
    updateAttributes: function updateAttributes() {
      if (this.attributes) {
        var attrs = this.attributes;
        var el = this.$el;

        if (attrs.class) {
          attrs.class.trim().split(' ').forEach(function (klass) {
            el.classList.add(klass);
          });
          delete attrs.class;
        }

        var keys = Object.keys(attrs);

        for (var i = 0; i < keys.length; i++) {
          el.setAttribute(keys[i], attrs[keys[i]]);
        }
      }
    },
    emitChange: function emitChange(newTransport, oldTransport) {
      this.$emit('change', _extends({}, newTransport), _extends({}, oldTransport));
    }
  },
  computed: {
    passengers: function passengers() {
      return this.transports[this.name] && this.transports[this.name].passengers || [];
    },
    children: function children() {
      return this.passengers.length !== 0 ? this.passengers : this.$slots.default || [];
    },
    renderSlim: function renderSlim() {
      var children = this.children;
      return children.length === 1 && !this.attributes && this.slim;
    }
  },

  render: function render(h) {
    var children = this.children;
    var Tag = this.tag;
    if (this.renderSlim) {
      return children[0];
    } else {
      return h(
        Tag,
        { 'class': 'vue-portal-target' },
        [children]
      );
    }
  }
};

var inBrowser = typeof window !== 'undefined';

var pid = 1;

var Portal = {
  abstract: true,
  name: 'portal',
  props: {
    disabled: { type: Boolean, default: false },
    name: { type: String, default: function _default() {
        return String(pid++);
      } },
    slim: { type: Boolean, default: false },
    tag: { type: [String], default: 'DIV' },
    targetEl: { type: inBrowser ? [String, HTMLElement] : String },
    to: { type: String, default: function _default() {
        return String(Math.round(Math.random() * 10000000));
      } }
  },

  mounted: function mounted() {
    if (this.targetEl) {
      this.mountToTarget();
    }
    if (!this.disabled) {
      this.sendUpdate();
    }
  },
  updated: function updated() {
    if (this.disabled) {
      this.clear();
    } else {
      this.sendUpdate();
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.clear();
    if (this.mountedComp) {
      this.mountedComp.$destroy();
    }
  },


  watch: {
    to: function to(newValue, oldValue) {
      oldValue && this.clear(oldValue);
      this.sendUpdate();
    },
    targetEl: function targetEl(newValue, oldValue) {
      this.mountToTarget();
    }
  },

  methods: {
    sendUpdate: function sendUpdate() {
      if (this.to) {
        if (this.$slots.default) {
          wormhole.open({
            from: this.name,
            to: this.to,
            passengers: [].concat(toConsumableArray(this.$slots.default))
          });
        }
      } else if (!this.to && !this.targetEl) {
        console.warn('[vue-portal]: You have to define a target via the `to` prop.');
      }
    },
    clear: function clear(target) {
      wormhole.close({
        from: this.name,
        to: target || this.to
      });
    },
    mountToTarget: function mountToTarget() {
      var el = void 0;
      var target = this.targetEl;

      if (typeof target === 'string') {
        el = document.querySelector(this.targetEl);
      } else if (target instanceof HTMLElement) {
        el = target;
      } else {
        console.warn('[vue-portal]: value of targetEl must be of type String or HTMLElement');
        return;
      }

      var attributes = extractAttributes(el);

      if (el) {
        var _target = new Vue(_extends({}, Target, {
          parent: this,
          propsData: {
            name: this.to,
            tag: el.tagName,
            attributes: attributes
          }
        }));
        _target.$mount(el);
        this.mountedComp = _target;
      } else {
        console.warn('[vue-portal]: The specified targetEl ' + this.targetEl + ' was not found');
      }
    }
  },

  render: function render(h) {
    var children = this.$slots.default || [];
    var Tag = this.tag;
    if (children.length && this.disabled) {
      return children.length <= 1 && this.slim ? children[0] : h(
        Tag,
        null,
        [children]
      );
    } else {
      return h(
        Tag,
        { 'class': 'v-portal', style: 'display: none', key: 'v-portal-placeholder' },
        []
      );
    }
  }
};

function install(Vue$$1) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  Vue$$1.component(opts.portalName || 'portal', Portal);
  Vue$$1.component(opts.portalTargetName || 'portal-target', Target);
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use({ install: install });
}

var index = {
  install: install,
  Portal: Portal,
  PortalTarget: Target,
  Wormhole: wormhole
};

return index;

})));
//# sourceMappingURL=portal-vue.js.map


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(9),
  /* template */
  __webpack_require__(11),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/broberts/websites/faithpromise.org/assets/js/series/series-list.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] series-list.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2133c090", Component.options)
  } else {
    hotAPI.reload("data-v-2133c090", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__series__ = __webpack_require__(10);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




var page = 2;

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            more: [],
            is_loading: false
        };
    },


    methods: {
        load_more: function load_more() {
            var _this = this;

            this.is_loading = true;

            __WEBPACK_IMPORTED_MODULE_0__series__["a" /* default */].paginate({ page: page }).then(function (result) {
                _this.more.push(result.data);
                page++;
                _this.is_loading = false;
            }).catch(function (error) {
                // TODO: Handle error
                console.log(error);
                _this.is_loading = false;
            });
        }
    }

});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);


/* harmony default export */ __webpack_exports__["a"] = ({
    paginate: function paginate(params) {
        return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get('/sermons', { params: params });
    }
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._t("default"), _vm._v(" "), _vm._l((_vm.more), function(content) {
    return _c('div', {
      domProps: {
        "innerHTML": _vm._s(content)
      }
    })
  }), _vm._v(" "), _c('div', {
    staticClass: "LoadMore"
  }, [_c('button', {
    staticClass: "Button",
    attrs: {
      "disabled": _vm.is_loading
    },
    on: {
      "click": _vm.load_more
    }
  }, [_vm._v(_vm._s(_vm.is_loading ? 'Loading...' : 'Load More'))])])], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2133c090", module.exports)
  }
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(13),
  /* template */
  __webpack_require__(14),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/broberts/websites/faithpromise.org/assets/js/series/playlist-item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] playlist-item.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2d862fb2", Component.options)
  } else {
    hotAPI.reload("data-v-2d862fb2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({

    props: {
        id: { required: true },
        title: { required: true },
        date: { required: true },
        url: { required: true },
        videoUrl: { default: null }
    },

    data: function data() {
        return {
            active_sermon: null
        };
    },


    methods: {
        open_sermon: function open_sermon(id) {
            window.location.href = this.url;
        },
        open_video: function open_video(url) {
            alert('video: ' + url);
        }
    }

});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "Playlist-item",
    on: {
      "click": function($event) {
        _vm.open_sermon(_vm.id)
      }
    }
  }, [_c('div', {
    staticClass: "Playlist-play"
  }, [_c('svg', {
    attrs: {
      "role": "img"
    }
  }, [_c('use', {
    attrs: {
      "xlink:href": "/assets/icons.svg#play-o"
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "Playlist-title",
    attrs: {
      "title": _vm.title
    }
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('div', {
    staticClass: "Playlist-date"
  }, [_vm._v(_vm._s(_vm.date))]), _vm._v(" "), _c('a', {
    staticClass: "Playlist-more",
    attrs: {
      "href": _vm.url
    }
  }, [_vm._v("View")]), _vm._v(" "), _c('div', {
    staticClass: "Playlist-arrow"
  }, [_c('svg', {
    attrs: {
      "role": "img"
    }
  }, [_c('use', {
    attrs: {
      "xlink:href": "/assets/icons.svg#chevron-right"
    }
  })])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2d862fb2", module.exports)
  }
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(16),
  /* template */
  __webpack_require__(19),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/broberts/websites/faithpromise.org/assets/js/series/sermon-hero.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] sermon-hero.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b6d8e702", Component.options)
  } else {
    hotAPI.reload("data-v-b6d8e702", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_video_embed_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_video_embed_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__common_video_embed_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({

    components: {
        videoEmbed: __WEBPACK_IMPORTED_MODULE_0__common_video_embed_vue___default.a
    },

    props: {
        videoUrl: { default: null }
    },

    data: function data() {
        return {
            is_playing: false
        };
    },


    computed: {
        is_button_visible: function is_button_visible() {
            return this.videoUrl && !this.is_playing;
        }
    },

    watch: {
        play: function play(value) {
            if (value) document.documentElement.classList.add('nav_black');
        }
    },

    methods: {
        play: function play() {
            this.is_playing = true;
        }
    }

});

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//


// https://gist.github.com/yangshun/9892961

var autoplay = {
    youtube: 'autoplay=1',
    vimeo: 'autoplay=1'
};

var vimeo_params = '?title=0&byline=0&portrait=0&badge=0',
    youtube_params = '?rel=0&amp;showinfo=0';

/* harmony default export */ __webpack_exports__["default"] = ({

    props: {
        url: { required: true },
        autoPlay: { default: false }
    },

    computed: {
        embed_url: function embed_url() {

            var video = parseVideo(this.url),
                base_url = video.type === 'youtube' ? '//www.youtube.com/embed/' : '//player.vimeo.com/video/',
                params = video.type === 'youtube' ? youtube_params : vimeo_params;

            if (this.autoPlay) params += autoplay[video.type];

            return base_url + video.id + params;
        }
    }

});

function parseVideo(url) {
    // - Supported YouTube URL formats:
    //   - http://www.youtube.com/watch?v=My2FRPA3Gf8
    //   - http://youtu.be/My2FRPA3Gf8
    //   - https://youtube.googleapis.com/v/My2FRPA3Gf8
    // - Supported Vimeo URL formats:
    //   - http://vimeo.com/25451551
    //   - http://player.vimeo.com/video/25451551
    // - Also supports relative URLs:
    //   - //player.vimeo.com/video/25451551

    url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

    var type = RegExp.$3.indexOf('youtu') > -1 ? 'youtube' : RegExp.$3.indexOf('vimeo') > -1 ? 'vimeo' : null;

    return {
        type: type,
        id: RegExp.$6
    };
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('iframe', {
    attrs: {
      "src": _vm.embed_url,
      "frameborder": "0",
      "webkitallowfullscreen": "",
      "mozallowfullscreen": "",
      "allowfullscreen": ""
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e8be2b02", module.exports)
  }
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "SermonHero"
  }, [(_vm.is_playing) ? _c('div', {
    staticClass: "SermonHero-player"
  }, [_c('div', {
    staticClass: "SermonHero-video"
  }, [_c('video-embed', {
    attrs: {
      "url": _vm.videoUrl,
      "auto-play": true
    }
  })], 1)]) : _vm._e(), _vm._v(" "), (!_vm.is_playing) ? _c('div', [_vm._t("default")], 2) : _vm._e(), _vm._v(" "), (_vm.is_button_visible) ? _c('div', {
    staticClass: "SermonHero-button image-fg-vibrant-dark",
    on: {
      "click": _vm.play
    }
  }, [_c('svg', {
    attrs: {
      "role": "img"
    }
  }, [_c('use', {
    attrs: {
      "xlink:href": "/assets/icons.svg#play"
    }
  })])]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b6d8e702", module.exports)
  }
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(21),
  /* template */
  __webpack_require__(22),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/broberts/websites/faithpromise.org/assets/js/series/sermon-tools.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] sermon-tools.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4fb95da6", Component.options)
  } else {
    hotAPI.reload("data-v-4fb95da6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({

    props: {
        titleEncoded: { required: true },
        url: { default: null },
        audioUrl: { default: null },
        soundcloudId: { default: null },
        guideUrl: { default: null }
    },

    data: function data() {
        return {
            show_soundcloud: false
        };
    },


    computed: {
        facebook_url: function facebook_url() {
            return 'https://www.facebook.com/sharer/sharer.php?u=' + this.url;
        },
        twitter_url: function twitter_url() {
            // TODO: Shorten URL
            return 'https://twitter.com/intent/tweet?text=Check%20out%20this%20%40faithpromise+sermon,%20%27' + this.titleEncoded + '%27&url=' + this.url;
        },

        // TODO: We need to change the color of the play button to match the series
        soundcloud_url: function soundcloud_url() {
            return 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + this.soundcloudId + '&amp;color=c5c5c5&amp;inverse=true&amp;auto_play=true&amp;show_user=true';
        }
    },

    methods: {
        play_audio: function play_audio() {
            this.show_soundcloud = true;
        }
    }

});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "Sermon-tools image-fg-muted image-fg-1 image-fg-vibrant-dark"
  }, [_c('ul', {
    staticClass: "SermonTools"
  }, [_c('li', [(_vm.soundcloudId) ? _c('a', {
    attrs: {
      "href": _vm.audioUrl
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.play_audio($event)
      }
    }
  }, [_c('svg', {
    attrs: {
      "role": "img"
    }
  }, [_c('use', {
    attrs: {
      "xlink:href": "/assets/icons.svg#audio"
    }
  })]), _vm._v(" "), _c('span', {
    staticClass: "SermonTools-label"
  }, [_vm._v("Audio")])]) : _vm._e()]), _vm._v(" "), (_vm.guideUrl) ? _c('li', [_c('a', {
    attrs: {
      "href": _vm.guideUrl
    }
  }, [_c('svg', {
    attrs: {
      "role": "img"
    }
  }, [_c('use', {
    attrs: {
      "xlink:href": "/assets/icons.svg#group-study"
    }
  })]), _vm._v(" "), _vm._m(0)])]) : _vm._e(), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": _vm.facebook_url,
      "target": "_blank"
    }
  }, [_c('svg', {
    attrs: {
      "role": "img"
    }
  }, [_c('use', {
    attrs: {
      "xlink:href": "/assets/icons.svg#facebook"
    }
  })]), _vm._v(" "), _c('span', {
    staticClass: "SermonTools-label"
  }, [_vm._v("Share")])])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": _vm.twitter_url,
      "target": "_blank"
    }
  }, [_c('svg', {
    attrs: {
      "role": "img"
    }
  }, [_c('use', {
    attrs: {
      "xlink:href": "/assets/icons.svg#twitter"
    }
  })]), _vm._v(" "), _c('span', {
    staticClass: "SermonTools-label"
  }, [_vm._v("Tweet")])])])]), _vm._v(" "), (_vm.show_soundcloud) ? _c('div', {
    staticClass: "Sermon-audio"
  }, [_c('iframe', {
    attrs: {
      "width": "100%",
      "height": "20",
      "scrolling": "no",
      "frameborder": "no",
      "src": _vm.soundcloud_url
    }
  })]) : _vm._e()])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "SermonTools-label"
  }, [_vm._v("Discussion"), _c('span', {
    staticClass: "sm-hidden"
  }, [_vm._v(" Guide")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4fb95da6", module.exports)
  }
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(24),
  /* template */
  __webpack_require__(27),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/broberts/websites/faithpromise.org/assets/js/common/home-page-video.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] home-page-video.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8c2dba3a", Component.options)
  } else {
    hotAPI.reload("data-v-8c2dba3a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_debounce__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modernizr__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modernizr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__modernizr__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





var video = void 0,
    restarts = 0,
    restarted_at = 0,
    previous_marker = 0,
    goal_interval = 25,
    percentage_completed = 0;

function time_update_handler() {

    percentage_completed = Math.ceil((video.currentTime + restarts * video.duration) / video.duration * 100);

    var marker = Math.floor(percentage_completed / goal_interval) * goal_interval;

    // Only fire once for each marker
    if (marker === previous_marker) return;

    previous_marker = marker;

    // If reached the end of video
    track_restart();

    if (window.ga) window.ga('send', 'event', 'Home Page Video', marker + '% played');

    if (marker >= 300) untrack();
}

function track_restart() {

    var track_it = new Date() - restarted_at > 3000;

    if (track_it && Math.ceil(video.currentTime) >= Math.floor(video.duration)) {
        restarts++;
        restarted_at = new Date();
    }
}

function is_video_in_view() {
    return window.scrollY < 140;
}

var window_scroll_handler = Object(__WEBPACK_IMPORTED_MODULE_0__utils_debounce__["a" /* default */])(function () {
    if (!is_video_in_view()) {
        untrack();
        window.removeEventListener('scroll', window_scroll_handler);
    }
}, 100);

function track() {
    video.ontimeupdate = time_update_handler;
}

function untrack() {
    video.ontimeupdate = null;
}

/* harmony default export */ __webpack_exports__["default"] = ({

    props: {
        videoUrl: { required: true },
        imageSrcset: { required: true },
        isNavOpen: { default: false }
    },

    watch: {
        isNavOpen: function isNavOpen(value) {
            if (value) untrack();
        }
    },

    data: function data() {
        return {
            can_play_video: __WEBPACK_IMPORTED_MODULE_1__modernizr___default.a.videoautoplay
        };
    },
    mounted: function mounted() {

        if (video = document.getElementById('home_page_video')) {
            track();
            window.addEventListener('scroll', window_scroll_handler);
        }
    }
});

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @license
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 Rhys Brett-Bowen
 * http://modernjavascript.blogspot.com/2013/08/building-better-debounce.html
 * https://github.com/rhysbrettbowen/debounce
 *
 */

/* harmony default export */ __webpack_exports__["a"] = (function (func, wait) {

    // we need to save these in the closure
    var timeout = void 0,
        args = void 0,
        context = void 0,
        timestamp = void 0;

    return function () {

        // save details of latest call
        context = this;
        args = [].slice.call(arguments, 0);
        timestamp = new Date();

        // this is where the magic happens
        var later = function later() {

            // how long ago was the last call
            var last = new Date() - timestamp;

            // if the latest call was less that the wait period ago
            // then we reset the timeout to wait for the difference
            if (last < wait) {
                timeout = setTimeout(later, wait - last);

                // or if not we can null out the timer and run the latest
            } else {
                timeout = null;
                func.apply(context, args);
            }
        };

        // we only need to set the timer now if one isn't already running
        if (!timeout) {
            timeout = setTimeout(later, wait);
        }
    };
});

/***/ }),
/* 26 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-videoautoplay-setclasses !*/
!function (A, e, o) {
  function t(A, e) {
    return (typeof A === "undefined" ? "undefined" : _typeof(A)) === e;
  }function n() {
    var A, e, o, n, a, l, i;for (var s in c) {
      if (c.hasOwnProperty(s)) {
        if (A = [], e = c[s], e.name && (A.push(e.name.toLowerCase()), e.options && e.options.aliases && e.options.aliases.length)) for (o = 0; o < e.options.aliases.length; o++) {
          A.push(e.options.aliases[o].toLowerCase());
        }for (n = t(e.fn, "function") ? e.fn() : e.fn, a = 0; a < A.length; a++) {
          l = A[a], i = l.split("."), 1 === i.length ? Modernizr[i[0]] = n : (!Modernizr[i[0]] || Modernizr[i[0]] instanceof Boolean || (Modernizr[i[0]] = new Boolean(Modernizr[i[0]])), Modernizr[i[0]][i[1]] = n), h.push((n ? "" : "no-") + i.join("-"));
        }
      }
    }
  }function a(A) {
    var e = R.className,
        o = Modernizr._config.classPrefix || "";if (d && (e = e.baseVal), Modernizr._config.enableJSClass) {
      var t = new RegExp("(^|\\s)" + o + "no-js(\\s|$)");e = e.replace(t, "$1" + o + "js$2");
    }Modernizr._config.enableClasses && (e += " " + o + A.join(" " + o), d ? R.className.baseVal = e : R.className = e);
  }function l(A, e) {
    if ("object" == (typeof A === "undefined" ? "undefined" : _typeof(A))) for (var o in A) {
      r(A, o) && l(o, A[o]);
    } else {
      A = A.toLowerCase();var t = A.split("."),
          n = Modernizr[t[0]];if (2 == t.length && (n = n[t[1]]), "undefined" != typeof n) return Modernizr;e = "function" == typeof e ? e() : e, 1 == t.length ? Modernizr[t[0]] = e : (!Modernizr[t[0]] || Modernizr[t[0]] instanceof Boolean || (Modernizr[t[0]] = new Boolean(Modernizr[t[0]])), Modernizr[t[0]][t[1]] = e), a([(e && 0 != e ? "" : "no-") + t.join("-")]), Modernizr._trigger(A, e);
    }return Modernizr;
  }function i() {
    return "function" != typeof e.createElement ? e.createElement(arguments[0]) : d ? e.createElementNS.call(e, "http://www.w3.org/2000/svg", arguments[0]) : e.createElement.apply(e, arguments);
  }var c = [],
      s = { _version: "3.5.0", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function on(A, e) {
      var o = this;setTimeout(function () {
        e(o[A]);
      }, 0);
    }, addTest: function addTest(A, e, o) {
      c.push({ name: A, fn: e, options: o });
    }, addAsyncTest: function addAsyncTest(A) {
      c.push({ name: null, fn: A });
    } },
      Modernizr = function Modernizr() {};Modernizr.prototype = s, Modernizr = new Modernizr();var r,
      h = [],
      R = e.documentElement,
      d = "svg" === R.nodeName.toLowerCase();!function () {
    var A = {}.hasOwnProperty;r = t(A, "undefined") || t(A.call, "undefined") ? function (A, e) {
      return e in A && t(A.constructor.prototype[e], "undefined");
    } : function (e, o) {
      return A.call(e, o);
    };
  }(), s._l = {}, s.on = function (A, e) {
    this._l[A] || (this._l[A] = []), this._l[A].push(e), Modernizr.hasOwnProperty(A) && setTimeout(function () {
      Modernizr._trigger(A, Modernizr[A]);
    }, 0);
  }, s._trigger = function (A, e) {
    if (this._l[A]) {
      var o = this._l[A];setTimeout(function () {
        var A, t;for (A = 0; A < o.length; A++) {
          (t = o[A])(e);
        }
      }, 0), delete this._l[A];
    }
  }, Modernizr._q.push(function () {
    s.addTest = l;
  }), Modernizr.addTest("video", function () {
    var A = i("video"),
        e = !1;try {
      e = !!A.canPlayType, e && (e = new Boolean(e), e.ogg = A.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), e.h264 = A.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), e.webm = A.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""), e.vp9 = A.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ""), e.hls = A.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, ""));
    } catch (o) {}return e;
  }), Modernizr.addAsyncTest(function () {
    function A(i) {
      n++, clearTimeout(e);var c = i && "playing" === i.type || 0 !== a.currentTime;return !c && t > n ? void (e = setTimeout(A, o)) : (a.removeEventListener("playing", A, !1), l("videoautoplay", c), void (a.parentNode && a.parentNode.removeChild(a)));
    }var e,
        o = 200,
        t = 5,
        n = 0,
        a = i("video"),
        c = a.style;if (!(Modernizr.video && "autoplay" in a)) return void l("videoautoplay", !1);c.position = "absolute", c.height = 0, c.width = 0;try {
      if (Modernizr.video.ogg) a.src = "data:video/ogg;base64,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";else {
        if (!Modernizr.video.h264) return void l("videoautoplay", !1);a.src = "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs1tZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMjYwMSBhMGNkN2QzIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNSAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTEgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEwIHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAD2WIhAA3//728P4FNjuZQQAAAu5tb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAAZAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACGHRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAZAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAgAAAAIAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAGQAAAAAAAEAAAAAAZBtZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAACgAAAAEAFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAE7bWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAA+3N0YmwAAACXc3RzZAAAAAAAAAABAAAAh2F2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAgACAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwFkAAr/4QAYZ2QACqzZX4iIhAAAAwAEAAADAFA8SJZYAQAGaOvjyyLAAAAAGHN0dHMAAAAAAAAAAQAAAAEAAAQAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAABRzdHN6AAAAAAAAAsUAAAABAAAAFHN0Y28AAAAAAAAAAQAAADAAAABidWR0YQAAAFptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAAC1pbHN0AAAAJal0b28AAAAdZGF0YQAAAAEAAAAATGF2ZjU2LjQwLjEwMQ==";
      }
    } catch (s) {
      return void l("videoautoplay", !1);
    }a.setAttribute("autoplay", ""), a.style.cssText = "display:none", R.appendChild(a), setTimeout(function () {
      a.addEventListener("playing", A, !1), e = setTimeout(A, o);
    }, 0);
  }), n(), a(h), delete s.addTest, delete s.addAsyncTest;for (var E = 0; E < Modernizr._q.length; E++) {
    Modernizr._q[E]();
  }A.Modernizr = Modernizr;
}(window, document);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "HeaderVideo"
  }, [(!_vm.can_play_video) ? _c('img', {
    staticClass: "Hero-image",
    attrs: {
      "src": "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
      "sizes": "100vw",
      "srcset": _vm.imageSrcset
    }
  }) : _vm._e(), _vm._v(" "), (_vm.can_play_video) ? _c('video', {
    attrs: {
      "data-object-fit": "cover",
      "id": "home_page_video",
      "autoplay": "",
      "loop": "",
      "muted": "",
      "preload": ""
    }
  }, [_c('source', {
    attrs: {
      "src": _vm.videoUrl,
      "type": "video/mp4"
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "HeaderVideo-overlay"
  }), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "HeaderVideo-cut"
  })])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "HeaderVideo-container"
  }, [_c('h1', {
    staticClass: "HeaderVideo-title"
  }, [_vm._v("Welcome to"), _c('br'), _vm._v("Faith Promise")]), _vm._v(" "), _c('div', {
    staticClass: "HeaderVideo-actions"
  }, [_c('a', {
    staticClass: "Button",
    attrs: {
      "href": "/locations"
    }
  }, [_vm._v("Find a Location")]), _vm._v(" "), _c('a', {
    staticClass: "Button",
    attrs: {
      "href": "http://online.faithpromise.org"
    }
  }, [_vm._v("Watch Online")])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8c2dba3a", module.exports)
  }
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(29),
  /* template */
  __webpack_require__(40),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/broberts/websites/faithpromise.org/assets/js/serving/volunteer-positions.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] volunteer-positions.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8c992810", Component.options)
  } else {
    hotAPI.reload("data-v-8c992810", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__volunteer_positions_filter_vue__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__volunteer_positions_filter_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__volunteer_positions_filter_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__volunteer_signup_form_vue__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__volunteer_signup_form_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__volunteer_signup_form_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__volunteer_position_vue__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__volunteer_position_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__volunteer_position_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__volunteer_service__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({

    props: {},

    components: {
        positionsFilter: __WEBPACK_IMPORTED_MODULE_0__volunteer_positions_filter_vue___default.a,
        volunteerForm: __WEBPACK_IMPORTED_MODULE_1__volunteer_signup_form_vue___default.a,
        volunteerPosition: __WEBPACK_IMPORTED_MODULE_2__volunteer_position_vue___default.a
    },

    data: function data() {

        var params = new URLSearchParams(window.location.search);

        return {
            selected_area: params.get('area'),
            selected_skill: params.get('skill'),
            positions: []
        };
    },


    computed: {
        filtered_positions: function filtered_positions() {
            var _this = this;

            return this.positions.filter(function (position) {

                var satisfies_area = !_this.selected_area || _this.selected_area === position.area.slug;
                var satisfies_skill = !_this.selected_skill || position.skills.filter(function (s) {
                    return s.slug === _this.selected_skill;
                }).length > 0;

                return satisfies_area && satisfies_skill;
            });
        }
    },

    created: function created() {
        this.load_positions();
    },


    methods: {
        load_positions: function load_positions() {
            var _this2 = this;

            __WEBPACK_IMPORTED_MODULE_3__volunteer_service__["a" /* default */].positions().then(function (result) {
                _this2.positions = result.data.data;
            });
        },
        handle_area_update: function handle_area_update(area) {
            console.log('handle_area_update', area);
            this.selected_area = area;
        },
        handle_skill_update: function handle_skill_update(skill) {
            this.selected_skill = skill;
        }
    }

});

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(31),
  /* template */
  __webpack_require__(32),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/broberts/websites/faithpromise.org/assets/js/serving/volunteer-positions-filter.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] volunteer-positions-filter.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-075b2ec6", Component.options)
  } else {
    hotAPI.reload("data-v-075b2ec6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__volunteer_service__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({

    props: {
        areaSlug: { default: null },
        skillSlug: { default: null }
    },

    components: {},

    data: function data() {
        return {
            areas: [],
            skills: [],
            selected_area: this.areaSlug,
            selected_skill: this.skillSlug,
            is_loaded: false
        };
    },


    computed: {},

    created: function created() {
        var _this = this;

        axios.all([this.load_areas(), this.load_skills()]).then(function () {
            _this.is_loaded = true;
        });
    },


    watch: {
        selected_area: function selected_area(value) {
            this.$emit('update:area', value);
        },
        selected_skill: function selected_skill(value) {
            this.$emit('update:skill', value);
        }
    },

    methods: {
        load_areas: function load_areas() {
            var _this2 = this;

            return __WEBPACK_IMPORTED_MODULE_0__volunteer_service__["a" /* default */].areas().then(function (result) {
                _this2.areas = result.data.data;
            });
        },
        load_skills: function load_skills() {
            var _this3 = this;

            return __WEBPACK_IMPORTED_MODULE_0__volunteer_service__["a" /* default */].skills().then(function (result) {
                _this3.skills = result.data.data;
            });
        }
    }

});

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.is_loaded) ? _c('form', {
    staticClass: "VolunteerFilter",
    attrs: {
      "method": "get"
    }
  }, [_vm._m(0), _vm._v(" "), _c('div', [(_vm.areas.length) ? _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.selected_area),
      expression: "selected_area"
    }],
    staticClass: "Select",
    attrs: {
      "name": "area"
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.selected_area = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    domProps: {
      "value": null,
      "selected": _vm.selected_area === null
    }
  }, [_vm._v("All areas")]), _vm._v(" "), _vm._l((_vm.areas), function(area) {
    return _c('option', {
      domProps: {
        "value": area.slug,
        "selected": _vm.areaSlug === area.slug
      }
    }, [_vm._v(_vm._s(area.title))])
  })], 2) : _vm._e()]), _vm._v(" "), _c('div', [(_vm.skills.length) ? _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.selected_skill),
      expression: "selected_skill"
    }],
    staticClass: "Select",
    attrs: {
      "name": "skill"
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.selected_skill = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    domProps: {
      "value": null,
      "selected": !_vm.selected_skill
    }
  }, [_vm._v("Any skill")]), _vm._v(" "), _vm._l((_vm.skills), function(skill) {
    return _c('option', {
      domProps: {
        "value": skill.slug,
        "selected": _vm.skillSlug === skill.slug
      }
    }, [_vm._v(_vm._s(skill.title))])
  })], 2) : _vm._e()])]) : _vm._e()
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('span', {
    staticClass: "InlineLabel"
  }, [_vm._v("Filter by")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-075b2ec6", module.exports)
  }
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(34),
  /* template */
  __webpack_require__(36),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/broberts/websites/faithpromise.org/assets/js/serving/volunteer-signup-form.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] volunteer-signup-form.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3f4656e7", Component.options)
  } else {
    hotAPI.reload("data-v-3f4656e7", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_mailer_service__ = __webpack_require__(35);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            is_sending: false,
            is_sent: false,
            fields: {
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                message: ''
            }
        };
    },


    methods: {
        send: function send() {
            var _this = this;

            this.is_sending = true;

            __WEBPACK_IMPORTED_MODULE_0__common_mailer_service__["a" /* default */].send(this.fields).then(function (result) {
                _this.is_sending = false;
                _this.fields.message = '';
                // TODO: Come on! Seriously! This is jank!
                alert('Thank you! We\'ll reach out soon.');
            }).catch(function (error) {
                // TODO: Come on! Seriously! This is jank!
                alert('Oh no! An error occurred. Please call/email and let us know.');
                _this.is_sending = false;
            });
        }
    }

});

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);


/* harmony default export */ __webpack_exports__["a"] = ({
    send: function send(params) {

        params.action = 'contactForm/sendMessage';
        // params[window.csrfTokenName] = window.csrfTokenValue;

        return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post('/', params);
    }
});

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    staticClass: "Form Form--center",
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.send($event)
      }
    }
  }, [_c('div', {
    staticClass: "Form-double"
  }, [_c('div', {
    staticClass: "Form-group"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fields.first_name),
      expression: "fields.first_name"
    }],
    staticClass: "Input",
    attrs: {
      "id": "first_name",
      "name": "first_name",
      "placeholder": "First Name",
      "required": ""
    },
    domProps: {
      "value": (_vm.fields.first_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.fields.first_name = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "Form-group"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fields.last_name),
      expression: "fields.last_name"
    }],
    staticClass: "Input",
    attrs: {
      "id": "last_name",
      "name": "last_name",
      "placeholder": "Last Name",
      "required": ""
    },
    domProps: {
      "value": (_vm.fields.last_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.fields.last_name = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fields.email),
      expression: "fields.email"
    }],
    staticClass: "Input",
    attrs: {
      "name": "email",
      "placeholder": "Email",
      "required": ""
    },
    domProps: {
      "value": (_vm.fields.email)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.fields.email = $event.target.value
      }
    }
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fields.phone),
      expression: "fields.phone"
    }],
    staticClass: "Input",
    attrs: {
      "name": "phone",
      "placeholder": "Phone Number"
    },
    domProps: {
      "value": (_vm.fields.phone)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.fields.phone = $event.target.value
      }
    }
  }), _vm._v(" "), _c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fields.message),
      expression: "fields.message"
    }],
    staticClass: "Textarea",
    attrs: {
      "placeholder": "How would you like to volunteer?",
      "required": ""
    },
    domProps: {
      "value": (_vm.fields.message)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.fields.message = $event.target.value
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "Form-actions"
  }, [_c('button', {
    staticClass: "Submit",
    attrs: {
      "type": "submit",
      "disabled": _vm.is_sending
    }
  }, [_vm._v(_vm._s(_vm.is_sending ? 'Sending...' : 'Send'))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3f4656e7", module.exports)
  }
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(38),
  /* template */
  __webpack_require__(39),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/broberts/websites/faithpromise.org/assets/js/serving/volunteer-position.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] volunteer-position.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-25cdf2ea", Component.options)
  } else {
    hotAPI.reload("data-v-25cdf2ea", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({

    props: {
        position: { required: true }
    }

});

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "VolunteerPosition"
  }, [_c('h2', {
    staticClass: "VolunteerPosition-title"
  }, [_vm._v(_vm._s(_vm.position.area.title) + " // " + _vm._s(_vm.position.title))]), _vm._v(" "), _c('p', {
    staticClass: "VolunteerPosition-description",
    domProps: {
      "innerHTML": _vm._s(_vm.position.description)
    }
  }), _vm._v(" "), _c('ul', {
    staticClass: "VolunteerPosition-meta"
  }, [(_vm.position.commitment) ? _c('li', {
    staticClass: "VolunteerPosition-metaItem"
  }, [_c('span', {
    staticClass: "VolunteerPosition-metaLabel"
  }, [_vm._v("Ministry Area")]), _vm._v("\n      " + _vm._s(_vm.position.area.title) + "\n    ")]) : _vm._e(), _vm._v(" "), (_vm.position.availability) ? _c('li', {
    staticClass: "VolunteerPosition-metaItem"
  }, [_c('span', {
    staticClass: "VolunteerPosition-metaLabel"
  }, [_vm._v("Availability")]), _vm._v("\n      " + _vm._s(_vm.position.availability) + "\n    ")]) : _vm._e(), _vm._v(" "), (_vm.position.commitment) ? _c('li', {
    staticClass: "VolunteerPosition-metaItem"
  }, [_c('span', {
    staticClass: "VolunteerPosition-metaLabel"
  }, [_vm._v("Commitment")]), _vm._v("\n      " + _vm._s(_vm.position.commitment) + "\n    ")]) : _vm._e(), _vm._v(" "), (_vm.position.skills.length) ? _c('li', {
    staticClass: "VolunteerPosition-metaItem"
  }, [_c('span', {
    staticClass: "VolunteerPosition-metaLabel"
  }, [_vm._v("Skills")]), _vm._v(" "), _vm._l((_vm.position.skills), function(skill, index) {
    return _c('span', {
      key: skill.slug
    }, [_vm._v(_vm._s(index > 0 ? ', ' : '') + _vm._s(skill.title))])
  })], 2) : _vm._e()])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-25cdf2ea", module.exports)
  }
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('positions-filter', {
    attrs: {
      "area-slug": _vm.selected_area,
      "skill-slug": _vm.selected_skill
    },
    on: {
      "update:area": _vm.handle_area_update,
      "update:skill": _vm.handle_skill_update
    }
  }), _vm._v(" "), _vm._l((_vm.filtered_positions), function(position) {
    return _c('volunteer-position', {
      key: position.id,
      attrs: {
        "position": position
      }
    })
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8c992810", module.exports)
  }
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(42),
  /* template */
  __webpack_require__(43),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/broberts/websites/faithpromise.org/assets/js/common/reading-plan-nav.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] reading-plan-nav.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-93758e50", Component.options)
  } else {
    hotAPI.reload("data-v-93758e50", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({

    props: {
        month: { required: true }, // 1-12
        day: { required: true } // 1-31
    },

    components: {},

    data: function data() {
        return {
            selected_month: this.month - 1, // months are zero indexed in JS
            selected_day: this.day,
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        };
    },


    computed: {
        days: function days() {
            var now = new Date();
            return new Date(now.getFullYear(), this.selected_month + 1, 0).getDate();
        },
        form_action: function form_action() {
            var now = new Date(),
                reading_date = new Date(now.getFullYear(), this.selected_month, this.selected_day);
            return '/bible-plan/' + this.months[reading_date.getMonth()].toLowerCase() + '-' + this.selected_day;
        }
    },

    created: function created() {},


    methods: {}

});

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    staticClass: "ReadingPlanNav",
    attrs: {
      "method": "get",
      "action": _vm.form_action
    }
  }, [_c('div', {
    staticClass: "ReadingPlanNav-container"
  }, [_c('div', [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.selected_month),
      expression: "selected_month"
    }],
    staticClass: "Select",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.selected_month = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((_vm.months), function(name, index) {
    return _c('option', {
      domProps: {
        "value": index,
        "selected": index == _vm.selected_month
      }
    }, [_vm._v(_vm._s(name))])
  }))]), _vm._v(" "), _c('div', [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.selected_day),
      expression: "selected_day"
    }],
    staticClass: "Select",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.selected_day = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((_vm.days), function(value) {
    return _c('option', {
      domProps: {
        "value": value,
        "selected": value === _vm.selected_day
      }
    }, [_vm._v(_vm._s(value))])
  }))]), _vm._v(" "), _vm._m(0)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('button', {
    staticClass: "Submit",
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("Go")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-93758e50", module.exports)
  }
}

/***/ }),
/* 44 */
/***/ (function(module, exports) {

/*!
Copyright (C) 2015-2017 Andrea Giammarchi - @WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
var URLSearchParams = URLSearchParams || (function () {
'use strict';

function URLSearchParams(query) {
  var
    index, key, value,
    pairs, i, length,
    dict = Object.create(null)
  ;
  this[secret] = dict;
  if (!query) return;
  if (typeof query === 'string') {
    if (query.charAt(0) === '?') {
      query = query.slice(1);
    }
    for (
      pairs = query.split('&'),
      i = 0,
      length = pairs.length; i < length; i++
    ) {
      value = pairs[i];
      index = value.indexOf('=');
      if (-1 < index) {
        appendTo(
          dict,
          decode(value.slice(0, index)),
          decode(value.slice(index + 1))
        );
      } else if (value.length){
        appendTo(
          dict,
          decode(value),
          ''
        );
      }
    }
  } else {
    if (isArray(query)) {
      for (
        i = 0,
        length = query.length; i < length; i++
      ) {
        value = query[i];
        appendTo(dict, value[0], value[1]);
      }
    } else {
      for (key in query) {
         appendTo(dict, key, query[key]);
      }
    }
  }
}

var
  isArray = Array.isArray,
  URLSearchParamsProto = URLSearchParams.prototype,
  find = /[!'\(\)~]|%20|%00/g,
  plus = /\+/g,
  replace = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  },
  replacer = function (match) {
    return replace[match];
  },
  secret = '__URLSearchParams__:' + Math.random()
;

function appendTo(dict, name, value) {
  if (name in dict) {
    dict[name].push('' + value);
  } else {
    dict[name] = isArray(value) ? value : ['' + value];
  }
}

function decode(str) {
  return decodeURIComponent(str.replace(plus, ' '));
}

function encode(str) {
  return encodeURIComponent(str).replace(find, replacer);
}

URLSearchParamsProto.append = function append(name, value) {
  appendTo(this[secret], name, value);
};

URLSearchParamsProto.delete = function del(name) {
  delete this[secret][name];
};

URLSearchParamsProto.get = function get(name) {
  var dict = this[secret];
  return name in dict ? dict[name][0] : null;
};

URLSearchParamsProto.getAll = function getAll(name) {
  var dict = this[secret];
  return name in dict ? dict[name].slice(0) : [];
};

URLSearchParamsProto.has = function has(name) {
  return name in this[secret];
};

URLSearchParamsProto.set = function set(name, value) {
  this[secret][name] = ['' + value];
};

URLSearchParamsProto.forEach = function forEach(callback, thisArg) {
  var dict = this[secret];
  Object.getOwnPropertyNames(dict).forEach(function(name) {
    dict[name].forEach(function(value) {
      callback.call(thisArg, value, name, this);
    }, this);
  }, this);
};

/*
URLSearchParamsProto.toBody = function() {
  return new Blob(
    [this.toString()],
    {type: 'application/x-www-form-urlencoded'}
  );
};
*/

URLSearchParamsProto.toJSON = function toJSON() {
  return {};
};

URLSearchParamsProto.toString = function toString() {
  var dict = this[secret], query = [], i, key, name, value;
  for (key in dict) {
    name = encode(key);
    for (
      i = 0,
      value = dict[key];
      i < value.length; i++
    ) {
      query.push(name + '=' + encode(value[i]));
    }
  }
  return query.join('&');
};
var
  dP = Object.defineProperty,
  gOPD = Object.getOwnPropertyDescriptor,
  createSearchParamsPollute = function (search) {
    /*jshint validthis:true */
    function append(name, value) {
      URLSearchParamsProto.append.call(this, name, value);
      name = this.toString();
      search.set.call(this._usp, name ? ('?' + name) : '');
    }
    function del(name) {
      URLSearchParamsProto.delete.call(this, name);
      name = this.toString();
      search.set.call(this._usp, name ? ('?' + name) : '');
    }
    function set(name, value) {
      URLSearchParamsProto.set.call(this, name, value);
      name = this.toString();
      search.set.call(this._usp, name ? ('?' + name) : '');
    }
    return function (sp, value) {
      sp.append = append;
      sp.delete = del;
      sp.set = set;
      return dP(sp, '_usp', {
        configurable: true,
        writable: true,
        value: value
      });
    };
  },
  createSearchParamsCreate = function (polluteSearchParams) {
    return function (obj, sp) {
      dP(
        obj, '_searchParams', {
          configurable: true,
          writable: true,
          value: polluteSearchParams(sp, obj)
        }
      );
      return sp;
    };
  },
  updateSearchParams = function (sp) {
    var append = sp.append;
    sp.append = URLSearchParamsProto.append;
    URLSearchParams.call(sp, sp._usp.search.slice(1));
    sp.append = append;
  },
  verifySearchParams = function (obj, Class) {
    if (!(obj instanceof Class)) throw new TypeError(
      "'searchParams' accessed on an object that " +
      "does not implement interface " + Class.name
    );
  },
  upgradeClass = function(Class){
    var
      ClassProto = Class.prototype,
      searchParams = gOPD(ClassProto, 'searchParams'),
      href = gOPD(ClassProto, 'href'),
      search = gOPD(ClassProto, 'search'),
      createSearchParams
    ;
    if (!searchParams && search && search.set) {
      createSearchParams = createSearchParamsCreate(
        createSearchParamsPollute(search)
      );
      Object.defineProperties(
        ClassProto,
        {
          href: {
            get: function () {
              return href.get.call(this);
            },
            set: function (value) {
              var sp = this._searchParams;
              href.set.call(this, value);
              if (sp) updateSearchParams(sp);
            }
          },
          search: {
            get: function () {
              return search.get.call(this);
            },
            set: function (value) {
              var sp = this._searchParams;
              search.set.call(this, value);
              if (sp) updateSearchParams(sp);
            }
          },
          searchParams: {
            get: function () {
              verifySearchParams(this, Class);
              return this._searchParams || createSearchParams(
                this,
                new URLSearchParams(this.search.slice(1))
              );
            },
            set: function (sp) {
              verifySearchParams(this, Class);
              createSearchParams(this, sp);
            }
          }
        }
      );
    }

  }
;
upgradeClass(HTMLAnchorElement);
if (/^function|object$/.test(typeof URL) && URL.prototype) upgradeClass(URL);

/*

function spUpdate(a) {
  var
    search = this.toString(),
    password = a.password,
    username = a.username
  ;
  a.href = ''.concat(
    a.protocol, '//',
    username,
    password ? (':' + password) : '',
    username ? '@' : '',
    a.host,
    a.pathname,
    search ? ('?' + search) : '',
    a.hash
  );
}

*/

return URLSearchParams;
}());
(function (URLSearchParamsProto) {

  var iterable = (function () {
    try {
      return !!Symbol.iterator;
    } catch(error) {
      return false;
    }
  }());

  // mostly related to issue #24
  if (!('forEach' in URLSearchParamsProto)) {
    URLSearchParamsProto.forEach = function forEach(callback, thisArg) {
      var names = Object.create(null);
      this.toString()
          .replace(/=[\s\S]*?(?:&|$)/g, '=')
          .split('=')
          .forEach(function (name) {
            if (!name.length || name in names) return;
            (names[name] = this.getAll(name)).forEach(function(value) {
              callback.call(thisArg, value, name, this);
            }, this);
          }, this);
    };
  }

  if (!('keys' in URLSearchParamsProto)) {
    URLSearchParamsProto.keys = function keys() {
      var items = [];
      this.forEach(function(value, name) { items.push(name); });
      var iterator = {
        next: function() {
          var value = items.shift();
          return {done: value === undefined, value: value};
        }
      };

      if (iterable) {
        iterator[Symbol.iterator] = function() {
          return iterator;
        };
      }

      return iterator;
    };
  }

  if (!('values' in URLSearchParamsProto)) {
    URLSearchParamsProto.values = function values() {
      var items = [];
      this.forEach(function(value) { items.push(value); });
      var iterator = {
        next: function() {
          var value = items.shift();
          return {done: value === undefined, value: value};
        }
      };

      if (iterable) {
        iterator[Symbol.iterator] = function() {
          return iterator;
        };
      }

      return iterator;
    };
  }

  if (!('entries' in URLSearchParamsProto)) {
    URLSearchParamsProto.entries = function entries() {
      var items = [];
      this.forEach(function(value, name) { items.push([name, value]); });
      var iterator = {
        next: function() {
          var value = items.shift();
          return {done: value === undefined, value: value};
        }
      };

      if (iterable) {
        iterator[Symbol.iterator] = function() {
          return iterator;
        };
      }

      return iterator;
    };
  }

  if (iterable && !(Symbol.iterator in URLSearchParamsProto)) {
    URLSearchParamsProto[Symbol.iterator] = URLSearchParamsProto.entries;
  }

  if (!('sort' in URLSearchParamsProto)) {
    URLSearchParamsProto.sort = function sort() {
      var
        entries = this.entries(),
        entry = entries.next(),
        done = entry.done,
        keys = [],
        values = Object.create(null),
        i, key, value
      ;
      while (!done) {
        value = entry.value;
        key = value[0];
        keys.push(key);
        if (!(key in values)) {
          values[key] = [];
        }
        values[key].push(value[1]);
        entry = entries.next();
        done = entry.done;
      }
      // not the champion in efficiency
      // but these two bits just do the job
      keys.sort();
      for (i = 0; i < keys.length; i++) {
        this.delete(keys[i]);
      }
      for (i = 0; i < keys.length; i++) {
        key = keys[i];
        this.append(key, values[key].shift());
      }
    };
  }

}(URLSearchParams.prototype));


/***/ }),
/* 45 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);