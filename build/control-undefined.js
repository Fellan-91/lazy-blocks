(()=>{var t={1991:(t,e)=>{var n;!function(){"use strict";var o=function(){function t(){}function e(t,e){for(var n=e.length,o=0;o<n;++o)r(t,e[o])}t.prototype=Object.create(null);var n={}.hasOwnProperty,o=/\s+/;function r(t,r){if(r){var l=typeof r;"string"===l?function(t,e){for(var n=e.split(o),r=n.length,l=0;l<r;++l)t[n[l]]=!0}(t,r):Array.isArray(r)?e(t,r):"object"===l?function(t,e){if(e.toString===Object.prototype.toString||e.toString.toString().includes("[native code]"))for(var o in e)n.call(e,o)&&(t[o]=!!e[o]);else t[e.toString()]=!0}(t,r):"number"===l&&function(t,e){t[e]=!0}(t,r)}}return function(){for(var n=arguments.length,o=Array(n),r=0;r<n;r++)o[r]=arguments[r];var l=new t;e(l,o);var a=[];for(var s in l)l[s]&&a.push(s);return a.join(" ")}}();t.exports?(o.default=o,t.exports=o):void 0===(n=function(){return o}.apply(e,[]))||(t.exports=n)}()}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var l=e[o]={exports:{}};return t[o](l,l.exports,n),l.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";const t=window.wp.element,e=window.wp.i18n,o=window.wp.hooks,r=window.wp.components;function l(){return l=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},l.apply(this,arguments)}var a=n(1991),s=n.n(a);function c(e){const{label:n,help:o,className:r,children:a,...c}=e;return(0,t.createElement)("div",l({},c,{className:s()("lazyblocks-component-base-control",r)}),n?(0,t.createElement)("div",{className:"lazyblocks-component-base-control__label"},n):null,a,o?(0,t.createElement)("div",{className:"lazyblocks-component-base-control__help"},o):null)}const{controls:i={}}=window.lazyblocksConstructorData||window.lazyblocksGutenberg;(0,o.addFilter)("lzb.editor.control.undefined.render","lzb.editor",((n,o)=>(0,t.createElement)(c,function(t,{className:e,...n}={}){const o=(r=t.data.type)&&i[r]?i[r]:!!i.undefined&&i.undefined;var r;return{label:!!o.restrictions.label_settings&&t.data.label,help:!!o.restrictions.help_settings&&t.data.help,className:s()(`lazyblocks-control lazyblocks-control-${t.data.type}`,e),"data-lazyblocks-control-name":t.data.name,...n}}(o,{label:!1,help:!1}),(0,e.__)("Looks like this control does not exists.","lazy-blocks")))),(0,o.addFilter)("lzb.constructor.control.undefined.settings","lzb.constructor",(()=>(0,t.createElement)(r.PanelBody,null,(0,e.__)("Looks like this control does not exists.","lazy-blocks"))))})()})();