!function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}({1:function(t,e,n){t.exports=n("WdqB")},WdqB:function(t,e,n){"use strict";function i(){f.isLoggedIn()&&document.body.classList.add("logged-in")}function r(){f.getCartQuantity()&&document.body.classList.add("items-in-cart")}function o(){document.getElementById("js_first_name").innerText=f.getFirstName(),document.getElementById("js_last_name").innerText=f.getLastName()}function a(){var t={"My Purchase History":"Event Registrations"},e=document.querySelector(".mpp_formTitle");if(e)for(var n in t)t.hasOwnProperty(n)&&e.innerText===n&&(e.innerText=t[n]);document.body.classList.add("titles-replaced")}function s(){if(!document.getElementById("SignUp")){var t=document.createElement("div");t.setAttribute("id","SignUp"),t.className="SignUp",t.innerHTML=b,document.getElementById("UpdatePanel1").appendChild(t)}}function u(){document.getElementById("btnForgotPassword").innerText="Recover Your Password"}function c(t){var e=document.createElement("script");e.setAttribute("data-id","og-embed-script"),e.setAttribute("data-church-code","faithpromise_org"),e.setAttribute("data-default-page",t.path),e.setAttribute("data-token-type","mp-token"),e.setAttribute("data-mp-token",window.fp.MPP_User_Data),e.setAttribute("data-bg-color","#f9f9f9"),e.src="https://www.onlinegiving.org/assets/embed.js",x.get().appendChild(e)}function g(){B.addEventListener("click",function(){T=!T,P.classList.toggle(j,T)})}function d(){document.addEventListener("click",l)}function l(t){t.target===P||B.contains(t.target)||P.contains(t.target)||(T=!1,P.classList.remove(j))}function p(){document.getElementById("js_qty_in_cart").innerText=f.getCartQuantity()}Object.defineProperty(e,"__esModule",{value:!0});var f={isLoggedIn:function(){return!!m&&!m.innerText.match(/login/i)},getCartQuantity:function(){return y?parseInt(y.innerText.replace(/\D/g,"")):0},getFirstName:function(){return this.isLoggedIn()?v[v.length-1].trim():null},getLastName:function(){return this.isLoggedIn()?v.slice(0,-1).join(",").trim():null}},m=document.getElementById("userLink"),h=m?m.innerText:"",v=h.split(","),y=document.getElementById("cartLink"),_={init:function(){i(),r(),o(),a()}},w={init:function(){u(),s()}},b='\n    <h1>Welcome to the new <span class="nowrap">Faith Promise</span> Portal</h1>\n    <p>\n      If you haven\'t already done so, please <a class="nowrap" href="/portal/create_account.aspx">Sign Up</a>.\n      Creating an account will provide you with giving history and allow you to give more easily in the future. Or, you can always <a class="nowrap" href="/portal/giving/guest">Give as a Guest</a>.\n      Thank you so much for helping us make this transition and furthering the mission of Faith Promise Church. If you have questions or need assistance, please contact us by sending an email to <a href="mailto:giving@faithpromise.org">giving@faithpromise.org</a>.\n    </p>\n',x={get:function(){return document.getElementById("fp_content")}},I={giving:{path:"/donate/index",login_required:!0},"giving/profile":{path:"/donate/profile",login_required:!0},"giving/recurring":{path:"/donate/recurring",login_required:!0},"giving/guest":{path:"/donate/guest_donate",login_required:!1}},E={init:function(t){var e=I[t];if(e.login_required&&!f.isLoggedIn())return window.location.href="/portal/login.aspx?ReturnUrl=/portal/"+t;c(e)}},L={init:function(){g(),d(),p()}},B=document.getElementById("js_nav_toggle"),P=document.getElementById("js_nav"),T=!1,j="is-visible",k=!1;window.setupCustomerEvents=function(){if(!k){k=!0;var t=window.location.pathname.replace(/^\/portal\/?/i,"");switch(L.init(),_.init(),t){case"giving":case"giving/recurring":case"giving/profile":case"giving/guest":E.init(t);break;case"login.aspx":w.init()}}}}});