(this["webpackJsonpacorn-react"]=this["webpackJsonpacorn-react"]||[]).push([[39],{562:function(e,t,a){"use strict";var s=a(0),c=a(78),r=a(130),i=a(129),l=a(320),o={config:{attributes:!0,childList:!1,subtree:!1}},n=function(){var e=Object(c.b)(),t=Object(s.useCallback)((function(t){Array.isArray(t)&&t.map((function(t){"attributes"===t.type&&"style"===t.attributeName&&e(Object(i.g)(t.target.style.paddingRight.indexOf("px")>-1?parseInt(t.target.style.paddingRight.replace("px",""),10):""))}))}),[e]);return function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:o,c=Object(s.useState)(null),r=Object(l.a)(c,2),i=r[0],n=r[1];Object(s.useEffect)((function(){var e=new MutationObserver(t);n(e)}),[t,a,n]),Object(s.useEffect)((function(){if(i){var t=a.config;return i.observe(e,t),function(){i&&i.disconnect()}}}),[i,e,a])}(document.body,t),!0};t.a=function(){var e=Object(c.c)((function(e){return e.settings})),t=e.color,a=e.layout,i=e.radius,l=e.navColor,o=Object(c.b)(),d=Object(c.c)((function(e){return e.menu})),b=d.attrMenuAnimate,u=d.attrMobile,m=d.placementStatus,j=m.placementHtmlData,f=m.dimensionHtmlData,h=d.behaviourStatus.behaviourHtmlData;n();var O=document.documentElement;return Object(s.useEffect)((function(){return setTimeout((function(){o(Object(r.b)()),O.setAttribute("data-show","true")}),30),O.setAttribute("data-color",t),O.setAttribute("data-layout",a),O.setAttribute("data-radius",i),O.setAttribute("data-navcolor",l),O.setAttribute("data-placement",j),O.setAttribute("data-dimension",f),O.setAttribute("data-behaviour",h),function(){O.removeAttribute("data-color"),O.removeAttribute("data-layout"),O.removeAttribute("data-radius"),O.removeAttribute("data-navcolor"),O.removeAttribute("data-show"),O.removeAttribute("data-placement"),O.removeAttribute("data-behaviour"),O.removeAttribute("data-dimension")}}),[]),Object(s.useEffect)((function(){O.setAttribute("data-placement",j),O.setAttribute("data-dimension",f),O.setAttribute("data-behaviour",h),O.setAttribute("data-navcolor",l),O.setAttribute("data-radius",i),O.setAttribute("data-color",t),O.setAttribute("data-layout",a)}),[O,j,f,h,l,i,t,a]),Object(s.useEffect)((function(){b?O.setAttribute("data-menu-animate",b):O.removeAttribute("data-menu-animate")}),[O,b]),Object(s.useEffect)((function(){u?O.setAttribute("data-mobile",u):O.removeAttribute("data-mobile")}),[O,u]),!0}},563:function(e,t,a){"use strict";var s=a(0),c=a(562),r=a(7);t.a=function(e){var t=e.left,a=e.right;return Object(c.a)(),Object(s.useEffect)((function(){document.body.classList.add("h-100");var e=document.getElementById("root");return e&&e.classList.add("h-100"),function(){document.body.classList.remove("h-100"),e&&e.classList.remove("h-100")}}),[]),Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("div",{className:"fixed-background"}),Object(r.jsx)("div",{className:"container-fluid p-0 h-100 position-relative",children:Object(r.jsxs)("div",{className:"row g-0 h-100",children:[Object(r.jsx)("div",{className:"offset-0 col-12 d-none d-lg-flex offset-md-1 col-lg h-lg-100",children:t}),Object(r.jsx)("div",{className:"col-12 col-lg-auto h-100 pb-4 px-4 pt-0 p-lg-0",children:a})]})})]})}},621:function(e,t,a){"use strict";var s=a(3),c=a(311),r=a(310),i=a.n(r),l=a(573),o=a.n(l),n=a(0),d=a(586),b=a(512),u=a(510),m=a(312),j=a(7),f=["bsPrefix","className","htmlFor"],h=n.forwardRef((function(e,t){var a=e.bsPrefix,r=e.className,l=e.htmlFor,o=Object(c.a)(e,f),d=Object(n.useContext)(u.a).controlId;return a=Object(m.c)(a,"form-check-label"),Object(j.jsx)("label",Object(s.a)(Object(s.a)({},o),{},{ref:t,htmlFor:l||d,className:i()(r,a)}))}));h.displayName="FormCheckLabel";var O=h;var v=["id","bsPrefix","bsSwitchPrefix","inline","reverse","disabled","isValid","isInvalid","feedbackTooltip","feedback","feedbackType","className","style","title","type","label","children","as"],p=n.forwardRef((function(e,t){var a=e.id,r=e.bsPrefix,l=e.bsSwitchPrefix,o=e.inline,f=void 0!==o&&o,h=e.reverse,p=void 0!==h&&h,x=e.disabled,w=void 0!==x&&x,N=e.isValid,g=void 0!==N&&N,y=e.isInvalid,A=void 0!==y&&y,P=e.feedbackTooltip,C=void 0!==P&&P,F=e.feedback,I=e.feedbackType,k=e.className,R=e.style,S=e.title,L=void 0===S?"":S,E=e.type,M=void 0===E?"checkbox":E,T=e.label,z=e.children,V=e.as,H=void 0===V?"input":V,q=Object(c.a)(e,v);r=Object(m.c)(r,"form-check"),l=Object(m.c)(l,"form-switch");var D=Object(n.useContext)(u.a).controlId,G=Object(n.useMemo)((function(){return{controlId:a||D}}),[D,a]),J=!z&&null!=T&&!1!==T||function(e,t){return n.Children.toArray(e).some((function(e){return n.isValidElement(e)&&e.type===t}))}(z,O),B=Object(j.jsx)(b.a,Object(s.a)(Object(s.a)({},q),{},{type:"switch"===M?"checkbox":M,ref:t,isValid:g,isInvalid:A,disabled:w,as:H}));return Object(j.jsx)(u.a.Provider,{value:G,children:Object(j.jsx)("div",{style:R,className:i()(k,J&&r,f&&"".concat(r,"-inline"),p&&"".concat(r,"-reverse"),"switch"===M&&l),children:z||Object(j.jsxs)(j.Fragment,{children:[B,J&&Object(j.jsx)(O,{title:L,children:T}),F&&Object(j.jsx)(d.a,{type:I,tooltip:C,children:F})]})})})}));p.displayName="FormCheck";var x=Object.assign(p,{Input:b.a,Label:O}),w=a(598),N=a(362),g=Object(N.a)("form-floating"),y=["controlId","as"],A=n.forwardRef((function(e,t){var a=e.controlId,r=e.as,i=void 0===r?"div":r,l=Object(c.a)(e,y),o=Object(n.useMemo)((function(){return{controlId:a}}),[a]);return Object(j.jsx)(u.a.Provider,{value:o,children:Object(j.jsx)(i,Object(s.a)(Object(s.a)({},l),{},{ref:t}))})}));A.displayName="FormGroup";var P=A,C=(a(506),a(587)),F=["as","bsPrefix","column","visuallyHidden","className","htmlFor"],I=n.forwardRef((function(e,t){var a=e.as,r=void 0===a?"label":a,l=e.bsPrefix,o=e.column,d=e.visuallyHidden,b=e.className,f=e.htmlFor,h=Object(c.a)(e,F),O=Object(n.useContext)(u.a).controlId;l=Object(m.c)(l,"form-label");var v="col-form-label";"string"===typeof o&&(v="".concat(v," ").concat(v,"-").concat(o));var p=i()(b,l,d&&"visually-hidden",o&&v);return f=f||O,o?Object(j.jsx)(C.a,Object(s.a)({ref:t,as:"label",className:p,htmlFor:f},h)):Object(j.jsx)(r,Object(s.a)({ref:t,className:p,htmlFor:f},h))}));I.displayName="FormLabel",I.defaultProps={column:!1,visuallyHidden:!1};var k=I,R=["bsPrefix","className","id"],S=n.forwardRef((function(e,t){var a=e.bsPrefix,r=e.className,l=e.id,o=Object(c.a)(e,R),d=Object(n.useContext)(u.a).controlId;return a=Object(m.c)(a,"form-range"),Object(j.jsx)("input",Object(s.a)(Object(s.a)({},o),{},{type:"range",ref:t,className:i()(r,a),id:l||d}))}));S.displayName="FormRange";var L=S,E=["bsPrefix","size","htmlSize","className","isValid","isInvalid","id"],M=n.forwardRef((function(e,t){var a=e.bsPrefix,r=e.size,l=e.htmlSize,o=e.className,d=e.isValid,b=void 0!==d&&d,f=e.isInvalid,h=void 0!==f&&f,O=e.id,v=Object(c.a)(e,E),p=Object(n.useContext)(u.a).controlId;return a=Object(m.c)(a,"form-select"),Object(j.jsx)("select",Object(s.a)(Object(s.a)({},v),{},{size:l,ref:t,className:i()(o,a,r&&"".concat(a,"-").concat(r),b&&"is-valid",h&&"is-invalid"),id:O||p}))}));M.displayName="FormSelect";var T=M,z=["bsPrefix","className","as","muted"],V=n.forwardRef((function(e,t){var a=e.bsPrefix,r=e.className,l=e.as,o=void 0===l?"small":l,n=e.muted,d=Object(c.a)(e,z);return a=Object(m.c)(a,"form-text"),Object(j.jsx)(o,Object(s.a)(Object(s.a)({},d),{},{ref:t,className:i()(r,a,n&&"text-muted")}))}));V.displayName="FormText";var H=V,q=n.forwardRef((function(e,t){return Object(j.jsx)(x,Object(s.a)(Object(s.a)({},e),{},{ref:t,type:"switch"}))}));q.displayName="Switch";var D=Object.assign(q,{Input:x.Input,Label:x.Label}),G=["bsPrefix","className","children","controlId","label"],J=n.forwardRef((function(e,t){var a=e.bsPrefix,r=e.className,l=e.children,o=e.controlId,n=e.label,d=Object(c.a)(e,G);return a=Object(m.c)(a,"form-floating"),Object(j.jsxs)(P,Object(s.a)(Object(s.a)({ref:t,className:i()(r,a),controlId:o},d),{},{children:[l,Object(j.jsx)("label",{htmlFor:o,children:n})]}))}));J.displayName="FloatingLabel";var B=J,Y=["className","validated","as"],_={_ref:o.a.any,validated:o.a.bool,as:o.a.elementType},K=n.forwardRef((function(e,t){var a=e.className,r=e.validated,l=e.as,o=void 0===l?"form":l,n=Object(c.a)(e,Y);return Object(j.jsx)(o,Object(s.a)(Object(s.a)({},n),{},{ref:t,className:i()(a,r&&"was-validated")}))}));K.displayName="Form",K.propTypes=_;t.a=Object.assign(K,{Group:P,Control:w.a,Floating:g,Check:x,Switch:D,Label:k,Text:H,Range:L,Select:T,FloatingLabel:B})},775:function(e,t,a){"use strict";a.r(t);a(0);var s=a(79),c=a(652),r=a(621),i=a(513),l=a(511),o=a(563),n=a(316),d=a(368),b=a(7);t.default=function(){var e=i.b().shape({password:i.d().min(6,"Must be at least 6 chars!").required("Password is required"),passwordConfirm:i.d().required("Password Confirm is required").oneOf([i.c("password"),null],"Must be same with password!")}),t=Object(l.d)({initialValues:{password:"",passwordConfirm:""},validationSchema:e,onSubmit:function(e){return console.log("submit form",e)}}),a=t.handleSubmit,u=t.handleChange,m=t.values,j=t.touched,f=t.errors,h=Object(b.jsx)("div",{className:"min-h-100 d-flex align-items-center",children:Object(b.jsx)("div",{className:"w-100 w-lg-75 w-xxl-50",children:Object(b.jsxs)("div",{children:[Object(b.jsxs)("div",{className:"mb-5",children:[Object(b.jsx)("h1",{className:"display-3 text-white",children:"Multiple Niches"}),Object(b.jsx)("h1",{className:"display-3 text-white",children:"Ready for Your Project"})]}),Object(b.jsx)("p",{className:"h6 text-white lh-1-5 mb-5",children:"Dynamically target high-payoff intellectual capital for customized technologies. Objectively integrate emerging core competencies before process-centric communities..."}),Object(b.jsx)("div",{className:"mb-5",children:Object(b.jsx)(c.a,{size:"lg",variant:"outline-white",href:"/",children:"Learn More"})})]})})}),O=Object(b.jsx)("div",{className:"sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border",children:Object(b.jsxs)("div",{className:"sw-lg-50 px-5",children:[Object(b.jsx)("div",{className:"sh-11",children:Object(b.jsx)(s.c,{to:"/",children:Object(b.jsx)("div",{className:"logo-default"})})}),Object(b.jsxs)("div",{className:"mb-5",children:[Object(b.jsx)("h2",{className:"cta-1 mb-0 text-primary",children:"Password trouble?"}),Object(b.jsx)("h2",{className:"cta-1 text-primary",children:"Renew it here!"})]}),Object(b.jsxs)("div",{className:"mb-5",children:[Object(b.jsx)("p",{className:"h6",children:"Please use below form to reset your password."}),Object(b.jsxs)("p",{className:"h6",children:["If you are a member, please ",Object(b.jsx)(s.c,{to:"/login",children:"login"}),"."]})]}),Object(b.jsx)("div",{children:Object(b.jsxs)("form",{id:"resetForm",className:"tooltip-end-bottom",onSubmit:a,children:[Object(b.jsxs)("div",{className:"mb-3 filled",children:[Object(b.jsx)(n.a,{icon:"lock-off"}),Object(b.jsx)(r.a.Control,{type:"password",name:"password",onChange:u,value:m.password,placeholder:"Password"}),f.password&&j.password&&Object(b.jsx)("div",{className:"d-block invalid-tooltip",children:f.password})]}),Object(b.jsxs)("div",{className:"mb-3 filled",children:[Object(b.jsx)(n.a,{icon:"lock-on"}),Object(b.jsx)(r.a.Control,{type:"password",name:"passwordConfirm",onChange:u,value:m.passwordConfirm,placeholder:"Verify Password"}),f.passwordConfirm&&j.passwordConfirm&&Object(b.jsx)("div",{className:"d-block invalid-tooltip",children:f.passwordConfirm})]}),Object(b.jsx)(c.a,{size:"lg",type:"submit",children:"Reset Password"})]})})]})});return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(d.a,{title:"Reset Password",description:"Reset Password Page"}),Object(b.jsx)(o.a,{left:h,right:O})]})}}}]);
//# sourceMappingURL=39.f3d85594.chunk.js.map