export const BOOK_TEMPLATE_HTML = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>%TITLE</title>
    <link rel="icon" href="data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M36 120C32.6863 120 30 117.314 30 114L30 6C30 2.68629 32.6863 0 36 0H90V120H36Z' fill='%2365B0ED'/%3E%3Ccircle cx='90' cy='30' r='30' fill='%2365B0ED'/%3E%3Ccircle cx='90' cy='90' r='30' fill='%2365B0ED'/%3E%3Cpath d='M13 120C9.68629 120 7 117.314 7 114L7 6C7 2.68629 9.68629 0 13 0H67V120H13Z' fill='%23DE6D77'/%3E%3Ccircle cx='67' cy='30' r='30' fill='%23DE6D77'/%3E%3Ccircle cx='67' cy='90' r='30' fill='%23DE6D77'/%3E%3Cpath d='M6 120C2.68629 120 0 117.314 0 114L0 6C0 2.68629 2.68629 0 6 0H45L45 120H6Z' fill='%2399C27C'/%3E%3Ccircle cx='45' cy='30' r='30' fill='%2399C27C'/%3E%3Ccircle cx='45' cy='90' r='30' fill='%2399C27C'/%3E%3C/svg%3E%0A" type="image/svg+xml" />
    <!-- main css -->
    
    <style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
    %FONT_STYLE
    
    %INLINE_HEAD
    <script type="module">
//assets/index.c099b032.js
const S=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerpolicy&&(s.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?s.credentials="include":n.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}};S();const I=".book-box_layout-settings-contents",b="book-box_layout-settings-contents-item-current",N=\`.\${b}\`,L=(e,t,o)=>r=>{const n=document.querySelector(I);if(!n)return;const{targetIndex:s}=k({listMap:t,current:o,entries:r});if(s===o.index)return;const a=e[s],l=n.querySelector(N);l&&l.classList.remove(b),a.classList.add(b),a.parentElement.scrollTop=a.offsetTop-50,o.index=s},M=(e,t)=>o=>{const{targetIndex:r}=k({listMap:e,current:t,entries:o});r!==t.index&&(x({hash:\`page-\${r}\`}),t.index=r)};function p(e,t){const o=typeof e=="string"?new URL(e):e;return Object.assign(o,t!=null?t:{}),o}function x(e){window.history.replaceState(null,"",p(window.location.toString(),e))}function E(e){window.history.pushState(null,"",p(window.location.toString(),e))}function k({listMap:e,current:t,entries:o}){var a,l;let r=-1/0,n=1/0;for(const c of o){const{isIntersecting:m,target:h,boundingClientRect:g,intersectionRect:u}=c,f=_({boundingClientRect:g,intersectionRect:u}),y=(a=h.dataset.key)!=null?a:"",d=(l=e.get(y))!=null?l:0;m?t.visible.add(d):(t.visible.delete(d),f==="top"?d>r&&(r=d):f==="bottom"&&d<n&&(n=d))}let s=t.index;if(t.visible.size>0)s=Math.min(...t.visible);else{const c=[];s!==null&&c.push(s),n!==1/0&&c.push(n-1),r!==-1/0&&c.push(r),s=Math.max(0,Math.min(...c))}return{targetIndex:s}}function _({boundingClientRect:e,intersectionRect:t}){const{top:o,bottom:r}=e,{top:n,bottom:s}=t;return(o^0)===(n^0)?"bottom":"top"}const A=5;function C(e=document.body){const t=e.querySelectorAll('.book-box_content [data-name="header"]'),o=Array.from(e.querySelectorAll('.book-box_layout-settings-contents [data-name="header"]')),r=new Map(o.map((i,w)=>[i.dataset.key,w])),n={index:null,visible:new Set},s=L(o.map(i=>i.parentElement),r,n),a=new IntersectionObserver(s,{threshold:.5}),l=()=>{for(const i of Array.from(t))a.observe(i)},c=Array.from(e.querySelectorAll('.book-box_content [data-name=".page"]')),m=new Map(c.map(i=>i.dataset.key).filter(i=>Boolean(i)).map(i=>[i,+i.slice(A)])),g=M(m,{index:null,visible:new Set}),u=new IntersectionObserver(g,{threshold:.5}),f=()=>{for(const i of c)u.observe(i)};return{headersObserver:a,pageObserver:u,observeNavigation:()=>{l(),f()},disconnectNavigation:()=>{a.disconnect(),u.disconnect()}}}const O="book-box-theme";function H(e){const{element:t,selector:o=".book-box"}=e!=null?e:{};return t?[t]:Array.from(document.querySelectorAll(o))}const T="book-box_theme-dark",q="book-box_theme-sepia";function P(e){const{theme:t}=e;for(const o of H(e))t==="dark"&&o.classList.add(T),t==="sepia"&&o.classList.add(q)}function B(e){const{storageKey:t}=e!=null?e:{},o=localStorage.getItem(t!=null?t:O);!o||o!=="dark"&&o!=="light"&&o!=="sepia"||P({theme:o,...e!=null?e:{}})}const R={push:E,replace:x},v="book-box_highlight";function K(e,t){const o=document.querySelector(e);if(!o)return;const{useHistory:r=!1,url:n}=t!=null?t:{};o.scrollIntoView(),r&&n&&R[typeof r=="string"?r:"replace"](n),o.classList.add(v),setTimeout(()=>o?o.classList.remove(v):void 0,1e3)}function U(e,t){K(\`.book-box_content *[data-layout='top'][data-key='\${e}']\`,t)}function $(){window.gotoKey=U}function D(){$(),document.addEventListener("DOMContentLoaded",()=>{B();const{observeNavigation:e}=C();e()})}D();

</script>
    <style type="text/css">
:root{--book-box-color-name-black: #181a1f;--book-box-color-name-dark: #292d34;--book-box-color-name-dark-black: #21252b;--book-box-color-name-dark-gray: #343942;--book-box-color-name-light-white: #fafafa;--book-box-color-name-light: #f1f3f5;--book-box-color-name-light-gray: #ebebec;--book-box-color-name-light-gray-medium: #e8e8e8;--book-box-color-name-gray-light: #abb2be;--book-box-color-name-gray-light-medium: #9da5b3;--book-box-color-name-gray: #5c6370;--book-box-color-name-gray-dark: #4c5363;--book-box-color-name-gray-blue: #7587a6;--book-box-color-name-blue: #558efc;--book-box-color-name-blue-light: #598cef;--book-box-color-name-blue-dark: #507ac9;--book-box-color-name-blue-sky: #65b0ed;--book-box-color-name-cyan: #5bb6c1;--book-box-color-name-red: #bc514a;--book-box-color-name-red-light: #de6d77;--book-box-color-name-green-light: #99c27c;--book-box-color-name-green-herbal: #5c893c;--book-box-color-name-orange-light: #d0996a;--book-box-color-name-orange-dark: #ac885b;--book-box-color-name-yellow-light: #e4bf7f;--book-box-color-name-yellow: #e9c062;--book-box-color-name-violet-light: #c57bdb;--book-box-color-name-violet: #9545ad;--book-box-color-name-white: #ffffff;--book-box-color-label-dark: rgb(29, 29, 29);--book-box-color-label-sepia: rgb(241, 226, 192)}.book-box{--book-box-color-background: white;--book-box-color-background-hover: rgb(239, 246, 255);--book-box-color-background-accent: rgb(221, 236, 255);--book-box-color-text: black;--book-box-color-text-secondary: gray;--book-box-color-text-accent: rgb(0, 96, 185);--book-box-color-page: var(--book-box-color-text-secondary);--book-box-color-shadow: gray;--book-box-color-divider: rgb(222, 225, 231);--book-box-size-text: 1em;--book-box-size-text-small: .9em;--book-box-size-text-control: 1rem;--book-box-size-text-line: calc(1.5 * var(--book-box-size-text));--book-box-size-elem-control: 2rem;--book-box-size-offset: 2em;--book-box-size-offset-small: 8px;--book-box-size-page-column-width: 2em;--book-box-size-offset-right:max(var(--book-box-size-offset), var(--book-box-size-page-column-width));--book-box-size-page-max-width: 900px;--book-box-z-index-content: 10000;--book-box-z-index-settings: 10001;--book-box-z-index-settings-view: 10001;--book-box-z-index-panel: 10003;color:var(--book-box-color-text);background-color:var(--book-box-color-background);position:relative;line-height:var(--book-box-size-text-line);font-family:sans-serif;hyphens:auto}.book-box_theme-dark{--book-box-color-background: var(--book-box-color-label-dark);--book-box-color-background-hover: rgb(41, 45, 49);--book-box-color-background-accent: rgb(67, 73, 82);--book-box-color-text: rgb(224, 224, 224);--book-box-color-text-secondary: rgb(167, 164, 164);--book-box-color-text-accent: rgb(57, 144, 224);--book-box-color-page: var(--book-box-color-text-secondary);--book-box-color-shadow: rgb(82, 81, 81);--book-box-color-divider: rgb(114, 115, 117)}.book-box_theme-sepia{--book-box-color-background: var(--book-box-color-label-sepia);--book-box-color-background-hover: rgb(221, 205, 169);--book-box-color-background-accent: rgb(216, 196, 149);--book-box-color-text: rgb(33, 24, 24);--book-box-color-text-secondary: rgb(107, 81, 81);--book-box-color-text-accent: rgb(154, 55, 55);--book-box-color-page: var(--book-box-color-text-secondary);--book-box-color-shadow: rgb(126, 95, 95);--book-box-color-divider: rgb(105, 77, 77)}.book-box span{line-height:var(--book-box-size-text-line)}.book-box_layout{position:relative}.book-box_layout-settings{position:fixed;bottom:0;right:0;z-index:var(--book-box-z-index-settings);display:flex;flex-direction:column;gap:8px;margin:1rem}.book-box_layout-settings-item{display:block;padding:8px;background-color:var(--book-box-color-background-accent);border-radius:4px;cursor:pointer;text-align:center;width:2rem;height:2rem;line-height:2rem;font-size:2rem}.book-box_layout-settings-panel .book-box_layout-panel-header{position:sticky;top:0}.book-box_layout-settings-namespace .book-box_layout-panel{grid-template-columns:1fr auto}.book-box_layout-settings-navigation_item{padding:4px 1rem}.book-box_layout-settings-navigation_item:hover{background-color:var(--book-box-color-background-hover);color:var(--book-box-color-text-accent);cursor:pointer}.book-box_layout-settings-contents .book-box_layout-panel{grid-template-columns:1fr auto}.book-box_layout-settings-contents .book-box_layout-panel-content{max-width:max(50vw,300px);font-size:.8em;overflow:auto}.book-box_layout-settings-contents-item{padding:4px 1rem}.book-box_layout-settings-contents-item:hover{background-color:var(--book-box-color-background-hover);color:var(--book-box-color-text-accent);cursor:pointer}.book-box_layout-settings-contents-item-current{background-color:var(--book-box-color-background-accent);color:var(--book-box-color-text-accent)}.book-box_layout-settings-media .book-box_layout-panel{grid-template-columns:1fr auto}.book-box_layout-settings-media-grid{width:100%;display:grid;grid-template-columns:repeat(auto-fit,100px)}.book-box_layout-settings-media .book-box-image .book-box_media-figure-caption{display:none}.book-box_layout-settings-design .book-box_layout-panel{grid-template-columns:1fr auto}.book-box_layout-settings-design .book-box_layout-panel-content>div:last-child{padding:var(--book-box-size-offset-small)}.book-box_layout-settings-design-theme{border:1px solid var(--book-box-color-divider);padding:4px 8px;border-radius:var(--book-box-size-offset-small);display:inline-flex;gap:8px;cursor:pointer}.book-box_layout-settings-design-theme>div:first-child{border-radius:50%;border:1px solid var(--book-box-color-divider);height:1.5em;width:1.5em;display:flex;justify-content:center;align-items:center}.book-box_layout-settings-design-theme:nth-child(1)>div:after,.book-box_theme-dark .book-box_layout-settings-design-theme:nth-child(2)>div:after,.book-box_theme-sepia .book-box_layout-settings-design-theme:nth-child(3)>div:after{content:"";display:block;background-color:var(--book-box-color-text);width:.5em;height:.5em;border-radius:50%}.book-box_theme-dark .book-box_layout-settings-design-theme:not(:nth-child(2))>div:after,.book-box_theme-sepia .book-box_layout-settings-design-theme:not(:nth-child(3))>div:after{display:none}.book-box_layout-panel-tumbler{display:none}.book-box_layout-panel-tumbler:checked+label+.book-box_layout-panel{display:grid;opacity:1;pointer-events:unset}.book-box_layout-panel-tumbler-fast+label+.book-box_layout-panel{display:grid;opacity:0;pointer-events:none}.book-box_layout-panel{display:none;position:fixed;z-index:var(--book-box-z-index-panel);top:0;left:0;bottom:0;right:0;width:100vw;height:100vh}.book-box_layout-panel .book-box_layout-panel-content{background-color:var(--book-box-color-background);box-shadow:0 0 10px var(--book-box-color-shadow);overscroll-behavior:none;overflow:scroll;min-width:300px;max-width:100vw}.book-box_layout-panel .book-box_layout-panel-tumbler,.book-box_layout-panel-content .book-box-header-mark,.book-box_layout-panel-content .book-box-page{display:none}.book-box_layout-panel-header{max-height:var(--book-box-size-elem-control);display:grid;grid-template-columns:1fr auto;background:var(--book-box-color-background);border-bottom:1px solid var(--book-box-color-divider);z-index:var(--book-box-z-index-panel)}.book-box_layout-panel-header>div{overflow:hidden;text-overflow:ellipsis;line-height:var(--book-box-size-elem-control);padding:0 var(--book-box-size-offset-small);font-size:var(--book-box-size-text-control)}.book-box_control-close{width:var(--book-box-size-elem-control);height:var(--book-box-size-elem-control);line-height:var(--book-box-size-elem-control);font-size:1.8rem;text-align:center}.book-box_layout-tabs{display:flex;flex-wrap:wrap;position:relative}.book-box_layout-tabs>input{display:none}.book-box_layout-tabs>label{display:flex;height:2.5rem;flex-grow:2;cursor:pointer;justify-content:center;align-items:center}.book-box_layout-tabs>label:hover{background-color:var(--book-box-color-background-hover)}.book-box_layout-tabs>input:checked+label{background-color:var(--book-box-color-background-accent)}.book-box_layout-tabs>div{opacity:.5;left:0;position:absolute;top:0;width:100%;z-index:-1}.book-box_layout-tabs>input:checked:nth-of-type(1)~div:nth-of-type(1),.book-box_layout-tabs>input:checked:nth-of-type(2)~div:nth-of-type(2),.book-box_layout-tabs>input:checked:nth-of-type(3)~div:nth-of-type(3),.book-box_layout-tabs>input:checked:nth-of-type(4)~div:nth-of-type(4),.book-box_layout-tabs>input:checked:nth-of-type(5)~div:nth-of-type(5),.book-box_layout-tabs>input:checked:nth-of-type(6)~div:nth-of-type(6),.book-box_layout-tabs>input:checked:nth-of-type(7)~div:nth-of-type(7),.book-box_layout-tabs>input:checked:nth-of-type(8)~div:nth-of-type(8),.book-box_layout-tabs>input:checked:nth-of-type(9)~div:nth-of-type(9),.book-box_layout-tabs>input:checked:nth-of-type(10)~div:nth-of-type(10){position:relative;opacity:1;z-index:1;border-top:1px solid var(--book-box-color-divider)}.book-box_layout-settings-view{position:fixed;top:0;right:0;z-index:var(--book-box-z-index-settings-view);margin:1rem}.book-box_layout-settings-view-tumbler{display:none}.book-box_layout-settings-view-tumbler:checked+label:after{content:"\u2926"}.book-box_layout-settings-view-tumbler:not(:checked)+label:after{content:"\u2922"}.book-box_layout-settings-view-tumbler:checked+label+div+.book-box_content{position:fixed;top:0;bottom:0;left:0;right:0;overflow:auto;z-index:var(--book-box-z-index-content)}.book-box_content{color:var(--book-box-color-text);background-color:var(--book-box-color-background);overflow:hidden}.book-box_content>div{position:relative;max-width:var(--book-box-size-page-max-width);padding:16px var(--book-box-size-offset);padding-right:var(--book-box-size-offset-right);margin:auto}@media (max-width: 400px){.book-box{--book-box-size-offset: 1em}}.book-box_media-figure{margin:0;width:100%}.book-box_media-figure>div{width:100%;display:flex}.book-box_media-figure picture{width:100%;display:flex}.book-box_media-figure-caption{display:flex;text-align:center;font-size:.9em;font-style:italic}.book-box_media-inline{display:inline-block;width:auto}.book-box_media-inline>figure>div{display:inline-block;width:auto}.book-box_media-block{display:flex}.book-box_media-full{justify-content:stretch}.book-box_media-center>figure>div{justify-content:center}.book-box_media-center>figure>figcaption{justify-content:center}.book-box_media-center>figure picture{justify-content:center}.book-box_media-start>figure>div{justify-content:flex-start}.book-box_media-start>figure>figcaption{justify-content:flex-start}.book-box_media-start>figure picture{justify-content:flex-start}.book-box_media-end>figure>div{justify-content:flex-end}.book-box_media-end>figure>figcaption{justify-content:flex-end}.book-box_media-end>figure picture{justify-content:flex-end}.book-box_align-center{text-align:center}.book-box_align-start{text-align:start}.book-box_align-end{text-align:end}.book-box_loadable-content{display:none;opacity:0;pointer-events:none}.book-box_loadable-loaded .book-box_loadable-content{display:block;opacity:1;pointer-events:inherit}.book-box_loadable-progress{background-color:#d3d3d3;color:#000;height:100%;width:100%;overflow:scroll;word-wrap:break-word}.book-box_loadable-loaded .book-box_loadable-progress{display:none}.book-box_loadable-error{background-color:#f08080;display:none}.book-box_loadable-error-loaded .book-box_loadable-error{display:block}.book-box_layout-offline .book-box_loadable{box-shadow:5px 5px gray}.book-box_clickable:hover{cursor:pointer;color:var(--book-box-color-text-accent)}.book-box_highlight{color:var(--book-box-color-text-accent);transition:color 1s}.book-box-title{text-align:center}.book-box-authors{text-align:center;padding:1rem}.book-box-draft{display:inline-block;border:5px solid red;padding:2px;--yellow: rgb(255, 255, 161);--red: rgb(255, 217, 179);background-color:var(--yellow);color:#000;background:repeating-linear-gradient(-45deg,var(--yellow),var(--yellow) 20px,var(--red) 20px,var(--red) 40px)}.book-box-header{display:inline-block}.book-box-header-mark{display:inline-block;min-height:1.5rem;max-height:4rem;font-size:1.2rem;line-height:1em;font-weight:400;padding:4px;color:var(--book-box-color-text-secondary);opacity:0}.book-box-header-container:hover .book-box-header-mark{opacity:1}.book-box-label{display:inline-block}.book-box-label-mark{cursor:pointer;border:1px solid var(--book-box-color-divider)}.book-box-label-panel-mark{display:inline-block;font-style:italic;color:var(--book-box-color-text-secondary)}.book-box-label-panel-content{padding:var(--book-box-size-offset-small)}.book-box-label-panel-header{padding:0 var(--book-box-size-offset-small);height:100%}.book-box-label-panel-goto{font-size:.9em;padding:2px 4px;margin:4px 0;border:1px solid var(--book-box-color-divider);border-radius:4px;display:inline-flex;justify-content:center;align-items:center;height:1.2em}.book-box-label-panel-header .book-box-label-panel-goto{margin-left:4px}.book-box-label-panel-goto:hover{color:var(--book-box-color-text-accent);cursor:pointer}.book-box-label-input+label{padding:2px 4px;border-radius:2px}.book-box-label-input:checked+label{background:var(--book-box-color-background-accent);color:var(--book-box-color-text-accent);border-color:transparent}.book-box-label-data{grid-template-rows:1fr auto}.book-box-label-data .book-box_layout-panel-content{max-height:70vh}.book-box-label-data .book-box-page,.book-box-label-data .book-box-header-mark{display:none}.book-box-format-small{font-size:var(--book-box-size-text-small)}.book-box-external{border:1px solid var(--book-box-color-divider);padding:var(--book-box-size-offset-small);border-radius:var(--book-box-size-offset-small)}.book-box-page{position:absolute;background-color:var(--book-box-color-background);color:var(--book-box-color-page);font-size:calc(var(--book-box-size-text) * .8);font-weight:400;font-style:normal;font-family:sans-serif;line-height:1.5rem;right:0;max-width:var(--book-box-size-offset-right);text-align:right;padding:0 8px}.book-box-area{display:block}.book-box-area.book-box-area-inline{display:inline-block}.book-box-link{color:var(--book-box-color-text-accent)}.book-box-audio audio{max-width:100%}.book-box-code pre{font-family:Menlo,monospace;border:1px solid var(--book-box-color-divider);border-radius:var(--book-box-size-offset-small);padding:2px 4px;margin:0;width:100%}.book-box-code-with-lang pre{border-top-left-radius:0}.book-box-code-lang-mark{display:inline-block;padding:2px 4px;font-size:.9em;font-style:italic;color:var(--book-box-color-text-secondary);border:1px solid var(--book-box-color-divider);border-bottom:none;border-radius:var(--book-box-size-offset-small) var(--book-box-size-offset-small) 0 0}.book-box-list{margin:var(--book-box-size-offset-small) 0}.book-box-separator{height:2px;background-color:var(--book-box-color-divider);border:none}.book-box-table>figure>div>div{max-width:100%;overflow-x:auto;justify-content:unset}.book-box-table table{border:1px solid var(--book-box-color-divider);border-collapse:collapse;padding:0;margin:0}.book-box-table thead{white-space:nowrap}.book-box-table th{font-weight:400}.book-box-table [data-name=cell]{border:1px solid var(--book-box-color-divider);padding:0 1em;min-width:1em}.book-box--error{border:1px solid red;border-radius:var(--book-box-size-offset-small);padding:var(--book-box-size-offset-small);margin:var(--book-box-size-offset-small) 0}.book-box--error pre{word-break:break-all;white-space:pre-wrap}

</style>
  </head>
  <body>
    %BOOK
  </body>
</html>
`;