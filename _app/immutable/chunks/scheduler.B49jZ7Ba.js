function k(){}function w(t,n){for(const e in n)t[e]=n[e];return t}function M(t){return!!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function j(t){return t()}function S(){return Object.create(null)}function E(t){t.forEach(j)}function v(t){return typeof t=="function"}function A(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let f;function B(t,n){return t===n?!0:(f||(f=document.createElement("a")),f.href=n,t===f.href)}function D(t){return Object.keys(t).length===0}function q(t,...n){if(t==null){for(const o of n)o(void 0);return k}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function P(t,n,e){t.$$.on_destroy.push(q(n,e))}function U(t,n,e,o){if(t){const r=y(t,n,e,o);return t[0](r)}}function y(t,n,e,o){return t[1]&&o?w(e.ctx.slice(),t[1](o(n))):e.ctx}function G(t,n,e,o){if(t[2]&&o){const r=t[2](o(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const a=[],h=Math.max(n.dirty.length,r.length);for(let s=0;s<h;s+=1)a[s]=n.dirty[s]|r[s];return a}return n.dirty|r}return n.dirty}function H(t,n,e,o,r,a){if(r){const h=y(n,e,o,a);t.p(h,r)}}function I(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let o=0;o<e;o++)n[o]=-1;return n}return-1}function J(t){const n={};for(const e in t)e[0]!=="$"&&(n[e]=t[e]);return n}function K(t,n){const e={};n=new Set(n);for(const o in t)!n.has(o)&&o[0]!=="$"&&(e[o]=t[o]);return e}let l;function d(t){l=t}function _(){if(!l)throw new Error("Function called outside component initialization");return l}function L(t){_().$$.on_mount.push(t)}function N(t){_().$$.after_update.push(t)}function Q(t,n){return _().$$.context.set(t,n),n}function R(t){return _().$$.context.get(t)}const i=[],b=[];let u=[];const m=[],x=Promise.resolve();let g=!1;function C(){g||(g=!0,x.then(z))}function T(){return C(),x}function O(t){u.push(t)}const p=new Set;let c=0;function z(){if(c!==0)return;const t=l;do{try{for(;c<i.length;){const n=i[c];c++,d(n),F(n.$$)}}catch(n){throw i.length=0,c=0,n}for(d(null),i.length=0,c=0;b.length;)b.pop()();for(let n=0;n<u.length;n+=1){const e=u[n];p.has(e)||(p.add(e),e())}u.length=0}while(i.length);for(;m.length;)m.pop()();g=!1,p.clear(),d(t)}function F(t){if(t.fragment!==null){t.update(),E(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(O)}}function V(t){const n=[],e=[];u.forEach(o=>t.indexOf(o)===-1?n.push(o):e.push(o)),e.forEach(o=>o()),u=n}export{w as A,K as B,Q as C,J as D,R as E,B as F,q as a,U as b,P as c,G as d,N as e,b as f,I as g,S as h,v as i,z as j,D as k,O as l,V as m,k as n,L as o,l as p,d as q,E as r,A as s,T as t,H as u,j as v,i as w,C as x,M as y,_ as z};
