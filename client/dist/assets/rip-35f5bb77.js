import{g as u}from"./index-25d3d03b.js";function b(e,n){for(var i=0;i<n.length;i++){const r=n[i];if(typeof r!="string"&&!Array.isArray(r)){for(const t in r)if(t!=="default"&&!(t in e)){const a=Object.getOwnPropertyDescriptor(r,t);a&&Object.defineProperty(e,t,a.get?a:{enumerable:!0,get:()=>r[t]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var s,o;function p(){if(o)return s;o=1,s=e,e.displayName="rip",e.aliases=[];function e(n){n.languages.rip={comment:{pattern:/#.*/,greedy:!0},char:{pattern:/\B`[^\s`'",.:;#\/\\()<>\[\]{}]\b/,greedy:!0},string:{pattern:/("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,greedy:!0},regex:{pattern:/(^|[^/])\/(?!\/)(?:\[[^\n\r\]]*\]|\\.|[^/\\\r\n\[])+\/(?=\s*(?:$|[\r\n,.;})]))/,lookbehind:!0,greedy:!0},keyword:/(?:=>|->)|\b(?:case|catch|class|else|exit|finally|if|raise|return|switch|try)\b/,builtin:/@|\bSystem\b/,boolean:/\b(?:false|true)\b/,date:/\b\d{4}-\d{2}-\d{2}\b/,time:/\b\d{2}:\d{2}:\d{2}\b/,datetime:/\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\b/,symbol:/:[^\d\s`'",.:;#\/\\()<>\[\]{}][^\s`'",.:;#\/\\()<>\[\]{}]*/,number:/[+-]?\b(?:\d+\.\d+|\d+)\b/,punctuation:/(?:\.{2,3})|[`,.:;=\/\\()<>\[\]{}]/,reference:/[^\d\s`'",.:;#\/\\()<>\[\]{}][^\s`'",.:;#\/\\()<>\[\]{}]*/}}return s}var d=p();const c=u(d),f=b({__proto__:null,default:c},[d]);export{f as r};
