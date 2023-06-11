(()=>{var e={1991:(e,t)=>{var l;!function(){"use strict";var r=function(){function e(){}function t(e,t){for(var l=t.length,r=0;r<l;++r)a(e,t[r])}e.prototype=Object.create(null);var l={}.hasOwnProperty,r=/\s+/;function a(e,a){if(a){var n=typeof a;"string"===n?function(e,t){for(var l=t.split(r),a=l.length,n=0;n<a;++n)e[l[n]]=!0}(e,a):Array.isArray(a)?t(e,a):"object"===n?function(e,t){if(t.toString===Object.prototype.toString||t.toString.toString().includes("[native code]"))for(var r in t)l.call(t,r)&&(e[r]=!!t[r]);else e[t.toString()]=!0}(e,a):"number"===n&&function(e,t){e[t]=!0}(e,a)}}return function(){for(var l=arguments.length,r=Array(l),a=0;a<l;a++)r[a]=arguments[a];var n=new e;t(n,r);var o=[];for(var i in n)n[i]&&o.push(i);return o.join(" ")}}();e.exports?(r.default=r,e.exports=r):void 0===(l=function(){return r}.apply(t,[]))||(e.exports=l)}()}},t={};function l(r){var a=t[r];if(void 0!==a)return a.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,l),n.exports}l.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return l.d(t,{a:t}),t},l.d=(e,t)=>{for(var r in t)l.o(t,r)&&!l.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const e=window.wp.element,t=window.wp.i18n,r=window.wp.hooks,a=window.wp.data,n=window.wp.components;function o(){return o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r])}return e},o.apply(this,arguments)}var i=l(1991),s=l.n(i);function c(t){const{label:l,help:r,className:a,children:n,...i}=t;return(0,e.createElement)("div",o({},i,{className:s()("lazyblocks-component-base-control",a)}),l?(0,e.createElement)("div",{className:"lazyblocks-component-base-control__label"},l):null,n,r?(0,e.createElement)("div",{className:"lazyblocks-component-base-control__help"},r):null)}const{controls:d={}}=window.lazyblocksConstructorData||window.lazyblocksGutenberg;const u=window.wp.blockEditor,m=["image"],g=(0,n.withNotices)((function(l){const{label:r,value:o,previewSize:i,allowInsertFromURL:s,help:c,noticeOperations:d,noticeUI:g,onChange:p=(()=>{})}=l,{mediaUpload:b,imagePreviewData:f}=(0,a.useSelect)((e=>{const{getMedia:t}=e("core");let l=!1;if(o&&Object.keys(o).length)if(o.id){const e=t(o.id)||!1;e&&(l={alt:e.alt_text,url:e.source_url},e.media_details&&e.media_details.sizes&&e.media_details.sizes[i]&&(l.url=e.media_details.sizes[i].source_url))}else o.url&&(l={url:o.url});return{mediaUpload:e("core/block-editor").getSettings().mediaUpload,imagePreviewData:l}}));return(0,e.createElement)(n.BaseControl,{id:r,label:r,help:c},(0,e.createElement)("div",{className:"lzb-gutenberg-image-wrap"},o&&Object.keys(o).length?"":(0,e.createElement)(u.MediaPlaceholder,{icon:(0,e.createElement)("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24","aria-hidden":"true",focusable:"false"},(0,e.createElement)("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 4.5h14c.3 0 .5.2.5.5v8.4l-3-2.9c-.3-.3-.8-.3-1 0L11.9 14 9 12c-.3-.2-.6-.2-.8 0l-3.6 2.6V5c-.1-.3.1-.5.4-.5zm14 15H5c-.3 0-.5-.2-.5-.5v-2.4l4.1-3 3 1.9c.3.2.7.2.9-.1L16 12l3.5 3.4V19c0 .3-.2.5-.5.5z"})),labels:{title:r,name:(0,t.__)("image","lazy-blocks")},onSelect:e=>{p(e)},onSelectURL:s?e=>{p({url:e})}:null,notices:g,accept:"image/*",allowedTypes:m,disableMaxUploadErrorMessages:!0,onError:e=>function(e){d.removeAllNotices(),d.createErrorNotice(e)}(e)}),o&&Object.keys(o).length?(0,e.createElement)("div",{className:"lzb-gutenberg-image"},(0,e.createElement)(n.DropZone,{onFilesDrop:e=>{b({allowedTypes:m,filesList:e,onFileChange:e=>{p(e[0])},onError:e=>{d.createErrorNotice(e)}})}}),(0,e.createElement)("div",{className:"lzb-gutenberg-image-button"},(0,e.createElement)(n.Button,{isSecondary:!0,isSmall:!0,onClick:()=>{p("")}},(0,t.__)("Remove Image","lazy-blocks"))),(0,e.createElement)("div",{className:"lzb-gutenberg-image-item",key:o.id||o.url},f.url?(0,e.createElement)("img",{src:f.url,alt:f.alt}):"")):""))}));function p(l){const{updateData:r,data:o}=l,{imageSizes:i,imageDimensions:s}=(0,a.useSelect)((e=>{const{getSettings:l}=e("core/block-editor"),r=l();return{imageSizes:r.imageSizes||[{name:(0,t.__)("Medium","lazy-blocks"),slug:"medium"}],imageDimensions:r.imageDimensions||{medium:{width:300,height:300}}}}));return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(n.PanelBody,null,(0,e.createElement)(c,{id:"lazyblocks-control-image-insert-from-url",label:(0,t.__)("Allow insert from URL","lazy-blocks"),help:(0,t.__)("Will be added option that allow you to use custom URL to insert image","lazy-blocks")},(0,e.createElement)(n.ToggleControl,{id:"lazyblocks-control-image-insert-from-url",label:(0,t.__)("Yes","lazy-blocks"),checked:"true"===o.insert_from_url,onChange:e=>r({insert_from_url:e?"true":"false"})}))),(0,e.createElement)(n.PanelBody,null,(0,e.createElement)(n.SelectControl,{label:(0,t.__)("Preview Size","lazy-blocks"),options:i.map((e=>{let t=e.name;return s[e.slug]&&(t+=` (${s[e.slug].width} × ${s[e.slug].height})`),{label:t,value:e.slug}})),value:o.preview_size||"medium",onChange:e=>r({preview_size:e})})))}(0,r.addFilter)("lzb.editor.control.image.render","lzb.editor",((t,l)=>(0,e.createElement)(c,function(e,{className:t,...l}={}){const r=(a=e.data.type)&&d[a]?d[a]:!!d.undefined&&d.undefined;var a;return{label:!!r.restrictions.label_settings&&e.data.label,help:!!r.restrictions.help_settings&&e.data.help,className:s()(`lazyblocks-control lazyblocks-control-${e.data.type}`,t),"data-lazyblocks-control-name":e.data.name,...l}}(l),(0,e.createElement)(g,{previewSize:l.data.preview_size,allowInsertFromURL:"true"===l.data.insert_from_url,value:l.getValue(),onChange:e=>{const t=e?{alt:e.alt||"",title:e.title||"",caption:e.caption||"",description:e.description||"",id:e.id||"",link:e.link||"",url:e.url||"",sizes:e.sizes||""}:"";l.onChange(t)}})))),(0,r.addFilter)("lzb.editor.control.image.getValue","lzb.editor",(e=>{if("string"==typeof e)try{e=JSON.parse(decodeURI(e))}catch(t){e=[]}return e})),(0,r.addFilter)("lzb.editor.control.image.updateValue","lzb.editor",(e=>(("object"==typeof e||Array.isArray(e))&&(e=encodeURI(JSON.stringify(e))),e))),(0,r.addFilter)("lzb.constructor.control.image.settings","lzb.constructor",((t,l)=>(0,e.createElement)(p,l)))})()})();