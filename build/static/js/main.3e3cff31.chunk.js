(this.webpackJsonpwhiteboard=this.webpackJsonpwhiteboard||[]).push([[0],{133:function(e,t,n){e.exports={placer:"placer_placer___P3AP"}},136:function(e,t,n){},17:function(e,t,n){e.exports={controls:"Tools_controls__1Nbhf",toolBtn:"Tools_toolBtn__2uH3c",pointer:"Tools_pointer__1rXRd",active:"Tools_active__3uvvl",arrowSubMenu:"Tools_arrowSubMenu__2ucIk",text:"Tools_text__382N8"}},22:function(e,t,n){e.exports={fieldset:"alignment_fieldset__2_LAT",radio:"alignment_radio__12Jza","label-1":"alignment_label-1__3AHHS","label-3":"alignment_label-3__3OE4L",wrap:"alignment_wrap__2-hle",label:"alignment_label__38TwN"}},29:function(e,t,n){e.exports={bg:"modal_bg__3tErl",bgAppear:"modal_bgAppear__2XsUD",dialog:"modal_dialog__UQRek",appear:"modal_appear__3MYo9"}},295:function(e,t,n){"use strict";n.r(t),t.default=n.p+"static/media/align-top.66e36ea3.svg"},296:function(e,t,n){"use strict";n.r(t),t.default=n.p+"static/media/align-middle.c7187bf0.svg"},297:function(e,t,n){"use strict";n.r(t),t.default=n.p+"static/media/align-bottom.5504fcb1.svg"},298:function(e,t,n){"use strict";n.r(t);n(136);var a=n(0),i=n.n(a),c=n(35),r=n.n(c),o=n(11),s=n(9),l=n(8),d={esc:"Escape",enter:"Enter",backspace:"Backspace",del:"Delete"},u=Object(l.a)(Object(l.a)(Object(l.a)(Object(l.a)({},{0:"0",1:"1",2:"2",v:"v",h:"h",n:"n",p:"p",e:"e",z:"z",t:"t",space:" ",plus:"+",minus:"-","[":"[","]":"]","?":"?"}),{meta:"Meta",shift:"Shift"}),{up:"ArrowUp",down:"ArrowDown",left:"ArrowLeft",right:"ArrowRight",tab:"Tab"}),d),b="mouse-pointer",f="pencil",j="eraser",h="sticky-note",m="text",x=["#FF6900","#FCB900","#7BDCB5","#00D084","#8ED1FC","#0693E3","#ABB8C3","#EB144C","#F78DA7","#9900EF"],v=n(41),g=n.n(v);function O(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((function(e){return"string"===typeof e&&""!==e.trim()})).join(" ").trim()}function p(e){if(e.isContentEditable)return!0;var t=e.tagName.toLowerCase();if("textarea"===t)return!0;if("input"!==t)return!1;if(e.disabled)return!1;if(e.readonly)return!1;var n=(e.getAttribute("type")||"text").toLowerCase();return!!["date","datetime","datetime-local","email","month","number","password","search","tel","text","url","week"].includes(n)}var w=function(e){return Math.round(100*(e+Number.EPSILON))/100},y=n(24),N=Object(y.b)({name:"tool",initialState:{cursor:b,draw:{thickness:5,color:"#FF6900"}},reducers:{setTool:function(e,t){e.cursor=t.payload},setDrawColor:function(e,t){e.draw.color=t.payload},setDrawThickness:function(e,t){e.draw.thickness=t.payload}}}),_=N.actions,E=_.setTool,C=_.setDrawColor,A=_.setDrawThickness,k=N.reducer,S={};S[u.p]=f,S[u.e]=j,S[u.v]=b,S[u.n]=h,S[u.t]=m;var T=function(){var e=Object(a.useState)(null),t=Object(s.a)(e,2),n=t[0],i=t[1],c=Object(o.d)();return Object(a.useEffect)((function(){function e(e){p(document.activeElement)||(e.metaKey&&e.shiftKey&&e.key===u.z?c(v.ActionCreators.redo()):e.shiftKey||!e.metaKey||e.key!==u.z||c(v.ActionCreators.undo()))}function t(e){if(!p(document.activeElement)){var t=S[e.key];t&&c(E(t)),i(e.key),setTimeout((function(){i(null)}),200)}}return window.addEventListener("keyup",t),window.addEventListener("keydown",e),function(){window.removeEventListener("keyup",t),window.removeEventListener("keydown",e)}}),[c]),{lastShortcut:n}},I=n(15),R=n(27),M=n(134),Y=n(43),L=n.n(Y),B=n(1);var D=function(e){var t=e.id,n=e.label,i=e.hideLabel,c=void 0===i||i,r=e.step,o=void 0===r?"1":r,l=e.min,d=void 0===l?"1":l,u=e.max,b=e.startingValue,f=void 0===b?1:b,j=e.onChange,h=void 0===j?function(e){}:j,m=e.example,x=e.className,v=Object(a.useState)(f),g=Object(s.a)(v,2),p=g[0],w=g[1];return Object(B.jsxs)("div",{className:O("form-control",x,L.a.container),children:[Object(B.jsx)("label",{htmlFor:t,className:O("form-label",L.a.label,c&&"visually-hidden",!c&&"d-block"),children:n}),Object(B.jsx)("input",{className:O("form-range",L.a.range),type:"range",id:t,min:d,max:u,step:o,value:p,onChange:function(e){w(Number(e.target.value)),h(e)}}),m&&Object(B.jsx)("div",{className:L.a.example,children:m(p)})]})},z=n(44),F=n.n(z);var P={setDrawThickness:A,setDrawColor:C},X=Object(o.c)((function(e){return{draw:e.tool.draw}}),P)((function(e){var t=e.show,n=void 0!==t&&t,a=e.draw,i=e.setDrawColor,c=e.setDrawThickness;return Object(B.jsxs)("div",{className:O(F.a.settingsContainer,n&&F.a.show),children:[Object(B.jsx)(D,{className:F.a.slider,id:"drawThickness",label:"Change the thickness of the drawing tool",min:"1",max:"40",startingValue:a.thickness,onChange:function(e){c(Number(e.target.value))},example:function(e){return Object(B.jsx)("svg",{viewBox:"0 0 100 100",width:"40",height:"40",xmlns:"http://www.w3.org/2000/svg",children:Object(B.jsxs)("g",{children:[Object(B.jsx)("circle",{cx:"50%",cy:"50%",r:e,fill:a.color}),Object(B.jsx)("text",{x:"50%",y:"50%",className:F.a.px,textAnchor:"middle",dominantBaseline:"middle",children:e})]})})}}),Object(B.jsx)(M.a,{color:a.color,triangle:null,colors:x,onChange:function(e){i(e.hex)}})]})})),q=n(61),H=n.n(q);var Q=function(e){var t=e.id,n=e.children,c=e.startX,r=void 0===c?0:c,o=e.startY,d=void 0===o?0:o,b=e.onDragEnd,f=void 0===b?function(e){e.x,e.y}:b,j=Object(a.useRef)(null),h=Object(a.useRef)(!1),m=Object(a.useRef)(null),x=Object(a.useState)(!1),v=Object(s.a)(x,2),g=v[0],p=v[1],w=Object(a.useRef)(null),y=Object(a.useState)({x:r,y:d}),N=Object(s.a)(y,2),_=N[0],E=N[1];Object(a.useEffect)((function(){w.current=j.current.getBoundingClientRect()}),[]);var C=Object(a.useCallback)((function(e){var t=e.shiftKey?20:5;switch(e.key){case u.right:E((function(e){return e.x>=window.innerWidth-w.current.width?e:{x:e.x+t,y:e.y}}));break;case u.left:E((function(e){return e.x<=20?e:{x:e.x-t,y:e.y}}));break;case u.up:E((function(e){return e.y<=20?e:{x:e.x,y:e.y-t}}));break;case u.down:E((function(e){return e.y>=window.innerHeight-w.current.height?e:{x:e.x,y:e.y+t}}))}}),[]);function A(){m.current&&(window.removeEventListener("keydown",C),m.current=null,p(!1))}function k(){h.current&&(h.current=!1,window.removeEventListener("mousemove",S),window.removeEventListener("mouseup",k),document.body.classList.remove("cursor-grabbing"),f(_))}function S(e){h.current&&E((function(t){var n=e.clientX,a=e.clientY;return n>=window.innerWidth-w.current.width?n=t.x:n<=5&&(n=5),a>=window.innerHeight-w.current.height?a=t.y:a<=5&&(a=5),{x:n,y:a}}))}var T=_.x-7,I=_.y-15,R=g?O(n.props.className,H.a.keyMoving):n.props.className;return Object(B.jsxs)("div",{className:O(H.a.dragContainer),style:{top:"".concat(I,"px"),left:"".concat(T,"px")},children:[Object(B.jsx)("span",{id:t,className:"visually-hidden",children:"Press space bar to grab"}),Object(B.jsx)("button",{className:H.a.handle,onMouseDown:function(e){0===e.button&&(e.preventDefault(),A(),h.current=!0,window.addEventListener("mousemove",S),window.addEventListener("mouseup",k),document.body.classList.add("cursor-grabbing"))},onKeyUp:function(e){if(m.current)switch(e.key){case u.enter:case u.space:A(),f(_);break;case u.esc:E(m.current),A()}else m.current||e.key!==u.space&&e.key!==u.enter||(k(),m.current=Object(l.a)({},_),p(!0),window.addEventListener("keydown",C))},"aria-describedby":t,children:Object(B.jsxs)("span",{className:"visually-hidden",children:["Move ",t," on the canvas"]})}),i.a.cloneElement(n,{ref:j,className:R})]})},J=n(129),U=n(130),V=n(131),W=n(132),Z=n(17),G=n.n(Z);var K={setTool:E},$=Object(o.c)((function(e){return{cursor:e.tool.cursor}}),K)((function(e){var t=e.setTool,n=e.cursor,i=Object(a.useState)(!1),c=Object(s.a)(i,2),r=c[0],o=c[1];return Object(B.jsx)(Q,{id:"drag-tools",startX:20,startY:.2*window.innerHeight,children:Object(B.jsxs)("div",{className:"shadow-light ".concat(G.a.controls),children:[Object(B.jsxs)("button",{id:"tool-".concat(b),type:"button",className:O("btn-clear",G.a.toolBtn,G.a.pointer,n===b&&G.a.active),"data-tooltip":"Select (V)",onClick:function(){o(!1),t(b)},children:[Object(B.jsx)(J.a,{"aria-hidden":"true"}),Object(B.jsx)("span",{className:"visually-hidden",children:"Select tool"})]}),Object(B.jsxs)("button",{id:"tool-".concat(f),type:"button",className:O("btn-clear",G.a.toolBtn,n===f&&G.a.active),"data-tooltip":"Draw (P)",onClick:function(){o(!1),n===f?o(!r):t(f)},children:[Object(B.jsx)(U.a,{}),Object(B.jsx)("span",{className:"visually-hidden",children:"Pen tool"}),Object(B.jsx)("span",{className:G.a.arrowSubMenu})]}),Object(B.jsx)(X,{show:n===f&&r}),Object(B.jsxs)("button",{id:"tool-".concat(j),type:"button",className:O("btn-clear",G.a.toolBtn,n===j&&G.a.active),"data-tooltip":"Erase (E)",onClick:function(){o(!1),t(j)},children:[Object(B.jsx)(W.a,{}),Object(B.jsx)("span",{className:"visually-hidden",children:"Eraser tool"})]}),Object(B.jsxs)("button",{id:"tool-".concat(h),type:"button",className:O("btn-clear",G.a.toolBtn,n===h&&G.a.active),"data-tooltip":"Note (N)",onClick:function(){o(!1),t(h)},children:[Object(B.jsx)(V.a,{}),Object(B.jsx)("span",{className:"visually-hidden",children:"Add a sticky note to the canvas"})]}),Object(B.jsxs)("button",{id:"tool-".concat(m),type:"button",className:O("btn-clear",G.a.toolBtn,n===m&&G.a.active),"data-tooltip":"Text (T)",onClick:function(){o(!1),t(m)},children:[Object(B.jsx)("span",{"aria-hidden":"true",className:G.a.text,children:"T"}),Object(B.jsx)("span",{className:"visually-hidden",children:"Add text to the canvas"})]})]})})})),ee=n(86),te=n(301),ne=Object(y.b)({name:"canvas",initialState:{lines:[],items:[]},reducers:{setLines:function(e,t){return Object(l.a)(Object(l.a)({},e),{},{lines:t.payload})},addLine:function(e,t){return Object(l.a)(Object(l.a)({},e),{},{lines:[].concat(Object(ee.a)(e.lines),[t.payload])})},addItem:function(e,t){if(!t.payload.type)throw new Error("item is missing a type "+JSON.stringify(t.payload));var n=e.items.map((function(e){return e.selected=!1,e}));t.payload.id=Object(te.a)(),e.items=[].concat(Object(ee.a)(n),[t.payload])},updateItem:function(e,t){e.items=e.items.map((function(e){return e.selected=!1,e.id===t.payload.id?t.payload:e}))},deleteItem:function(e){e.items=e.items.filter((function(e){return!e.selected}))},clearSelected:function(e){e.items=e.items.map((function(e){return e.selected=!1,e}))}}}),ae=ne.actions,ie=ae.setLines,ce=(ae.addLine,ae.addItem),re=ae.updateItem,oe=ae.deleteItem,se=ae.clearSelected,le=function(e){return e.canvas.present.lines},de=ne.reducer,ue=Object(y.b)({name:"note",initialState:{activeNote:void 0,newNote:void 0},reducers:{setActiveNote:function(e,t){e.activeNote=t.payload},clearActiveNote:function(e){e.activeNote=void 0},setNewNote:function(e,t){e.newNote=t.payload},clearNewNote:function(e){e.newNote=void 0}}}),be=ue.actions,fe=be.setActiveNote,je=be.clearActiveNote,he=be.setNewNote,me=be.clearNewNote,xe=ue.reducer,ve=n(29),ge=n.n(ve),Oe=document.getElementById("modal-root");function pe(e,t){var n=e.id,i=e.title,r=e.hideTitle,o=void 0!==r&&r,s=e.children,l=e.onHide,d=void 0===l?function(){}:l,b=Object(a.useRef)(null),f=Object(a.useRef)(null);function j(){f.current.classList.remove(ge.a.appear),b.current.classList.remove(ge.a.bgAppear),setTimeout(d,350)}Object(a.useEffect)((function(){return document.body.classList.add("has-dialog"),document.querySelector("#root").setAttribute("aria-hidden","true"),setTimeout((function(){f.current&&f.current.classList.add(ge.a.appear),b.current&&b.current.classList.add(ge.a.bgAppear)}),100),function(){document.body.classList.remove("has-dialog"),document.querySelector("#root").removeAttribute("aria-hidden")}}),[]),Object(a.useImperativeHandle)(t,(function(){return{hide:j}}));var h=Object(B.jsx)("div",{ref:b,className:ge.a.bg,onKeyUp:function(e){e.key===u.esc&&j()},onClick:function(e){e.target.classList.contains(ge.a.bg)&&j()},children:Object(B.jsxs)("div",{role:"dialog",id:n,"aria-labelledby":"".concat(n,"_label"),"aria-modal":"true",className:ge.a.dialog,ref:f,children:[Object(B.jsx)("div",{id:"".concat(n,"_label"),className:o?"visually-hidden":null,children:i}),s]})});return Object(c.createPortal)(h,Oe)}var we=Object(a.forwardRef)(pe),ye=n(62),Ne=n.n(ye);var _e=function(e){var t=e.className,n=e.selected,i=e.palette,c=e.onSelectColor,r=void 0===c?function(e){}:c,o=Object(a.useState)(n),l=Object(s.a)(o,2),d=l[0],u=l[1];return Object(B.jsxs)("fieldset",{className:O(Ne.a.fieldset,t),children:[Object(B.jsx)("legend",{className:"visually-hidden",children:"Select a color"}),i.map((function(e){return Object(B.jsxs)("div",{className:"form-group ".concat(Ne.a.wrap),children:[Object(B.jsx)("input",{className:Ne.a.radio,type:"radio",name:"color",id:"color-".concat(e),checked:e===d,onChange:function(e){u(e.target.value),r(e.target.value)},value:e}),Object(B.jsx)("label",{htmlFor:"color-".concat(e),style:{backgroundColor:e},children:e})]},e)}))]})},Ee=n(22),Ce=n.n(Ee),Ae={left:n(292).default,center:n(293).default,right:n(294).default,top:n(295).default,middle:n(296).default,bottom:n(297).default};var ke=function(e){var t=e.className,n=e.selectedHorizontal,i=void 0===n?"center":n,c=e.selectedVertical,r=void 0===c?"middle":c,o=e.onChangeHorizontal,l=e.onChangeVertical,d=Object(a.useState)(i),u=Object(s.a)(d,2),b=u[0],f=u[1],j=Object(a.useState)(r),h=Object(s.a)(j,2),m=h[0],x=h[1];return Object(B.jsxs)("div",{className:O("d-flex justify-content-around",t),children:[Object(B.jsxs)("fieldset",{className:Ce.a.fieldset,children:[Object(B.jsx)("legend",{className:"visually-hidden",children:"Select a horizontal alignment"}),["left","center","right"].map((function(e,t){return Object(B.jsxs)("div",{className:O("form-group",Ce.a.wrap),children:[Object(B.jsx)("input",{className:Ce.a.radio,type:"radio",name:"horizontal",id:"align-horiz-".concat(e),checked:e===b,onChange:function(e){f(e.target.value),o(e.target.value)},value:e,title:e}),Object(B.jsxs)("label",{className:O(Ce.a.label,Ce.a["label-".concat(t+1)]),htmlFor:"align-horiz-".concat(e),children:[Object(B.jsx)("img",{"aria-invalid":"true",alt:"",src:Ae[e]}),Object(B.jsx)("span",{className:"visually-hidden",children:e})]})]},"align-horiz-".concat(e))}))]}),Object(B.jsxs)("fieldset",{className:Ce.a.fieldset,children:[Object(B.jsx)("legend",{className:"visually-hidden",children:"Select a vertical alignment"}),["top","middle","bottom"].map((function(e,t){return Object(B.jsxs)("div",{className:O("form-group",Ce.a.wrap),children:[Object(B.jsx)("input",{className:Ce.a.radio,type:"radio",name:"vertical",id:"align-vert-".concat(e),checked:e===m,onChange:function(e){x(e.target.value),l(e.target.value)},value:e,title:e}),Object(B.jsxs)("label",{className:O(Ce.a.label,Ce.a["label-".concat(t+1)]),htmlFor:"align-vert-".concat(e),children:[Object(B.jsx)("img",{"aria-invalid":"true",alt:"",src:Ae[e]}),Object(B.jsx)("span",{className:"visually-hidden",children:e})]})]},"align-vert-".concat(e))}))]})]})},Se=n(37),Te=n.n(Se),Ie=["#feff9c","#6ed2d0","#def350","#ff6b81","#ff339a","#ff992a"],Re={type:h,id:null,x:null,y:null,width:300,height:300,text:"",fontSize:32,color:Ie[0],scaleX:.75,scaleY:.75,rotation:0,align:"center",verticalAlign:"middle"};var Me={updateItem:re,setNewNote:he},Ye=Object(o.c)(null,Me)((function(e){var t=e.onSave,n=void 0===t?function(){}:t,i=e.onCancel,c=void 0===i?function(){}:i,r=e.onClose,o=void 0===r?function(){}:r,l=e.note,d=void 0===l?Re:l,u=e.x,b=e.y,f=e.updateItem,j=e.setNewNote,h=Object(a.useState)(d.text),m=Object(s.a)(h,2),x=m[0],v=m[1],g=Object(a.useState)(d.fontSize),p=Object(s.a)(g,2),w=p[0],y=p[1],N=Object(a.useState)(d.color),_=Object(s.a)(N,2),E=_[0],C=_[1],A=Object(a.useState)(d.align),k=Object(s.a)(A,2),S=k[0],T=k[1],I=Object(a.useState)(d.verticalAlign),R=Object(s.a)(I,2),M=R[0],Y=R[1],L=Object(a.useRef)(null),z=Object(a.useRef)(null),F=Object(a.useRef)(null);return Object(a.useEffect)((function(){L.current&&L.current.focus()}),[L]),Object(B.jsx)(we,{id:"addNote",title:"Add Sticky Note",hideTitle:!0,ref:F,onHide:function(){o()},children:Object(B.jsx)("div",{children:Object(B.jsxs)("form",{onSubmit:function(e){e.preventDefault();var t={text:x,fontSize:w,color:E,align:S,verticalAlign:M};if(d.id)f(Object.assign({},d,t));else{t.x=u,t.y=b;var a=z.current.getBoundingClientRect();t.origin={x:a.x,y:a.y},j(Object.assign({},d,t))}n(),F.current.hide()},children:[Object(B.jsxs)("div",{ref:z,style:{backgroundColor:E},className:O("form-group","flex-center",Te.a.note),children:[Object(B.jsx)("label",{className:"visually-hidden",id:"stickyNoteLabel",children:"Enter your sticky note text"}),Object(B.jsx)("div",{className:Te.a.textContainer,children:Object(B.jsx)("div",{ref:L,style:{fontSize:w+"px",textAlign:S,verticalAlign:M},role:"textbox","aria-multiline":"true","aria-labelledby":"stickyNoteLabel","aria-required":"true",className:Te.a.textEdit,contentEditable:!0,suppressContentEditableWarning:!0,tabIndex:0,onInput:function(e){v(e.target.textContent)},children:d.text})})]}),Object(B.jsxs)("div",{className:Te.a.actions,children:[Object(B.jsx)(D,{hideLabel:!1,id:"noteFontSize",label:"Change the font size",min:"32",max:"128",startingValue:w,onChange:function(e){y(Number(e.target.value))}}),Object(B.jsx)(ke,{className:"mb-3",selectedHorizontal:S,selectedVertical:M,onChangeHorizontal:function(e){T(e)},onChangeVertical:function(e){Y(e)}}),Object(B.jsx)("div",{className:O("p-2",Te.a.colors),children:Object(B.jsx)(_e,{selected:E,palette:Ie,onSelectColor:function(e){C(e)}})}),Object(B.jsxs)("div",{className:"d-flex justify-content-end mt-4 pe-2",children:[Object(B.jsx)("button",{type:"button",className:"btn btn-secondary",onClick:function(e){e.preventDefault(),c(),F.current.hide()},children:"cancel"}),Object(B.jsx)("button",{className:"btn btn-primary ms-2",type:"submit",children:"save"})]})]})]})})})})),Le=n(2),Be=n.n(Le);Be.a.shape({tool:Be.a.string.isRequired,color:Be.a.string.isRequired,thickness:Be.a.number.isRequired,points:Be.a.arrayOf(Be.a.number).isRequired});var De=function(e){var t=e.line;return t?Object(B.jsx)(I.c,{points:t.points,stroke:t.color,strokeWidth:t.tool===j?20:t.thickness,tension:.5,lineCap:t.tool===j?"square":"round",globalCompositeOperation:t.tool===j?"destination-out":"source-over"}):null};var ze=function(e){var t=e.lines,n=void 0===t?[]:t;return Object(B.jsx)(B.Fragment,{children:n.map((function(e,t){return Object(B.jsx)(De,{line:e},"line-".concat(t))}))})},Fe=n(135);var Pe=function(e){var t=e.enabled,n=void 0!==t&&t,c=e.onTransformEnd,r=e.onTransform,o=void 0===r?function(e,t){}:r,s=e.minWidth,d=void 0===s?100:s,u=e.minHeight,b=void 0===u?100:u,f=e.withRef,j=void 0===f?null:f,h=e.children,m=e.anchors,x=void 0===m?["top-left","top-right","bottom-right","bottom-left"]:m,v=e.keepRatio,g=void 0===v||v,O=e.rotateEnabled,p=void 0===O||O,w=Object(Fe.a)(e,["enabled","onTransformEnd","onTransform","minWidth","minHeight","withRef","children","anchors","keepRatio","rotateEnabled"]),y=Object(a.useRef)(null),N=Object(a.useRef)(null);return Object(a.useEffect)((function(){n&&N.current&&(N.current.nodes([y.current]),N.current.getLayer().batchDraw())}),[n]),Object(a.useEffect)((function(){"function"===typeof j&&y.current&&j(y)}),[y,j]),Object(B.jsxs)(B.Fragment,{children:[i.a.cloneElement(h,{ref:y,onTransformEnd:function(e){c(y.current,e)},onTransform:function(e){o(y.current,e)}}),n&&Object(B.jsx)(I.g,Object(l.a)(Object(l.a)({},w),{},{ref:N,keepRatio:g,rotateEnabled:p,enabledAnchors:x,boundBoxFunc:function(e,t){return t.width<d||t.height<b?e:t}}))]})};Be.a.shape({id:Be.a.string,x:Be.a.number.isRequired,y:Be.a.number.isRequired,width:Be.a.number.isRequired,height:Be.a.number.isRequired,text:Be.a.string.isRequired,fontSize:Be.a.number.isRequired,color:Be.a.string.isRequired,scaleX:Be.a.number,scaleY:Be.a.number,rotation:Be.a.number,align:Be.a.string,verticalAlign:Be.a.string});var Xe={addItem:ce,updateItem:re,setActiveNote:fe,clearNewNote:me},qe=Object(o.c)((function(e){return{currentTool:e.tool.cursor}}),Xe)((function(e){var t=e.note,n=e.setActiveNote,a=e.currentTool,i=e.clearNewNote,c=e.addItem,r=e.updateItem;return Object(B.jsx)(Pe,{enabled:t.selected&&a===b,onTransformEnd:function(e){r(Object(l.a)(Object(l.a)({},t),{},{x:e.x(),y:e.y(),scaleX:e.scaleX(),scaleY:e.scaleY(),rotation:e.rotation()}))},withRef:function(e){e.current&&t.origin&&e.current.to({x:t.x,y:t.y,duration:.2,onFinish:function(){c(Object(l.a)(Object(l.a)({},t),{},{origin:null})),i()}})},children:Object(B.jsxs)(I.a,{draggable:a===b,x:t.origin?t.origin.x:t.x,y:t.origin?t.origin.y:t.y,rotation:t.rotation,onClick:function(e){2!==e.evt.detail||n(t)},onDragEnd:function(e){r(Object(l.a)(Object(l.a)({},t),{},{x:e.target.x(),y:e.target.y()}))},onMouseDown:function(e){1!==e.evt.detail||t.selected||r(Object(l.a)(Object(l.a)({},t),{},{selected:!0}))},scaleX:t.scaleX,scaleY:t.scaleY,children:[Object(B.jsx)(I.d,{fill:t.color,width:t.width,height:t.height,shadowOffsetX:0,shadowOffsetY:5,shadowBlur:3,shadowEnabled:!0,shadowColor:"#3c4043",shadowOpacity:.26}),Object(B.jsx)(I.f,{width:t.width,height:t.height,padding:10,text:t.text,fontSize:t.fontSize,fontFamily:"sans-serif",fill:"#000000",align:t.align,verticalAlign:t.verticalAlign,fontStyle:"bold"})]})})})),He=Object(y.b)({name:"text",initialState:{activeText:void 0},reducers:{setActiveText:function(e,t){e.activeText=t.payload},clearActiveText:function(e){e.activeText=void 0}}}),Qe=He.actions,Je=Qe.setActiveText,Ue=Qe.clearActiveText,Ve=He.reducer;Be.a.shape({id:Be.a.string,x:Be.a.number.isRequired,y:Be.a.number.isRequired,width:Be.a.number.isRequired,height:Be.a.number.isRequired,text:Be.a.string,fontSize:Be.a.number.isRequired,color:Be.a.string.isRequired,scaleX:Be.a.number,scaleY:Be.a.number,rotation:Be.a.number});var We={updateItem:re,setActiveText:Je},Ze=Object(o.c)((function(e){return{currentTool:e.tool.cursor,currentActiveText:e.text.activeText}}),We)((function(e){var t=e.data,n=e.updateItem,i=e.setActiveText,c=e.currentTool,r=e.currentActiveText,o=Object(a.useRef)({scaleX:1,scaleY:1}),s=Object(R.a)((function(e){var t=w(e.scaleX()),n=w(e.scaleY());t===o.current.scaleX&&n===o.current.scaleY||(t===o.current.scaleX||n!==o.current.scaleY?o.current={scaleX:t,scaleY:n}:e.setAttrs({scaleX:o.current.scaleX,width:Math.max(e.width()*t,40)}))}),5);return Object(B.jsx)(Pe,{anchors:["top-left","top-right","bottom-left","bottom-right","middle-left","middle-right"],minWidth:40,minHeight:40,keepRatio:!0,enabled:t.selected&&c===b&&(null===r||void 0===r?void 0:r.id)!==t.id,onTransformEnd:function(e){var a=w(e.scaleX()),i=w(e.scaleY());n(Object(l.a)(Object(l.a)({},t),{},{x:e.x(),y:e.y(),scaleX:a,scaleY:i,rotation:e.rotation()}))},onTransform:s,children:Object(B.jsx)(I.f,{draggable:c===b,x:t.x,y:t.y,rotation:t.rotation,onClick:function(e){2!==e.evt.detail||i(t)},onDragEnd:function(e){n(Object(l.a)(Object(l.a)({},t),{},{x:e.target.x(),y:e.target.y()}))},onMouseDown:function(e){1!==e.evt.detail||t.selected||n(Object(l.a)(Object(l.a)({},t),{},{selected:!0}))},scaleX:t.scaleX,scaleY:t.scaleY,width:t.width,height:t.height,text:(null===r||void 0===r?void 0:r.id)===t.id?"":t.text,fontSize:t.fontSize,fontFamily:"sans-serif",fill:"#000000",align:"left",verticalAlign:"top",fontStyle:"bold",lineHeight:1.5})})}));function Ge(e){var t=e.item;switch(t.type){case h:return Object(B.jsx)(qe,{note:t},t.id);case m:return Object(B.jsx)(Ze,{data:t},t.id);default:return null}}var Ke=function(e){var t=e.items,n=e.lines,a=e.newNote;return Object(B.jsxs)(I.b,{children:[Object(B.jsx)(ze,{lines:n}),t.map((function(e){return Object(B.jsx)(Ge,{item:e},e.id)})),a&&Object(B.jsx)(qe,{note:a})]})},$e=n(133),et=n.n($e);var tt=function(e){var t=e.width,n=e.height,i=e.onFinish,c=e.onCancel,r=Object(a.useRef)(null);return Object(a.useEffect)((function(){function e(e){r.current&&(r.current.style.top="".concat(e.clientY,"px"),r.current.style.left="".concat(e.clientX,"px"))}function t(e){i(e.clientX,e.clientY,e)}function n(e){e.key===d.esc&&c()}return window.addEventListener("mousemove",e),window.addEventListener("click",t),window.addEventListener("keyup",n),function(){window.removeEventListener("mousemove",e),window.removeEventListener("click",t),window.removeEventListener("keyup",n)}}),[c,i]),Object(B.jsx)("div",{ref:r,style:{width:"".concat(t,"px"),height:"".concat(n,"px")},className:et.a.placer})},nt=n(85),at=n.n(nt),it={type:m,x:0,y:0,width:null,height:null,text:"",fontSize:32,color:"#000000",scaleX:1,scaleY:1,rotation:0};var ct=function(e){var t=e.x,n=void 0===t?0:t,i=e.y,c=void 0===i?0:i,r=e.textData,o=void 0===r?it:r,s=e.onSave,d=e.onCancel,b=Object(a.useRef)({x:n,y:c}),f=Object(a.useRef)(null),j=o.width?{width:o.width}:{width:400};return Object(B.jsx)(Q,{id:"flyingTextInput",startX:n,startY:c-25,onDragEnd:function(e){b.current=e,console.log(b.current,e)},children:Object(B.jsxs)("form",{className:at.a.inputContainer,children:[Object(B.jsx)("label",{className:"visually-hidden",htmlFor:"enterText",children:"Add text to canvas"}),Object(B.jsx)("div",{style:j,ref:f,autoCorrect:"off",autoCapitalize:"off",role:"textbox","aria-multiline":"true","aria-labelledby":"enterText",className:at.a.input,contentEditable:!0,suppressContentEditableWarning:!0,tabIndex:0,onKeyUp:function(e){e.key===u.esc&&d()},onBlur:function(e){if(e.target.textContent.trim()){var t=f.current.getBoundingClientRect();s(Object(l.a)(Object(l.a)({},o),{},{x:b.current.x,y:b.current.y,width:t.width,height:t.height,text:e.target.textContent}))}else d()},children:o.text})]})})};function rt(e,t,n){var a=e.target.getStage().getPointerPosition(),i=n[n.length-1];return i.points=t===f?i.points.concat([a.x,a.y+26]):i.points.concat([a.x+13,a.y+13]),n.splice(n.length-1,1,i),Array.from(n)}var ot=function(){var e=Object(a.useState)(f),t=Object(s.a)(e,2),n=t[0],i=t[1],c=Object(a.useState)([]),r=Object(s.a)(c,2),l=r[0],d=r[1],u=Object(a.useRef)(!1),b=Object(a.useRef)(!1),j=Object(o.d)(),h=Object(o.e)((function(e){return e.tool.draw.color})),m=Object(o.e)((function(e){return e.tool.draw.thickness})),x=Object(o.e)(le);return Object(a.useEffect)((function(){d(x)}),[x,d]),{lines:l,drawMouseDown:function(e){if(0===e.evt.button){u.current=!0;var t=e.target.getStage().getPointerPosition();if(n===f){var a=Array.from(l);a.push({tool:n,color:h,thickness:m,points:[t.x,t.y+26]}),d(a)}else{var i=Array.from(l);i.push({tool:n,color:h,thickness:m,points:[t.x+13,t.y+13]}),d(i)}}},drawMouseMove:function(e){u.current&&(b.current=!0,d(rt(e,n,l)))},drawMouseUp:function(e){u.current=!1,b.current?b.current=!1:d(rt(e,n,l)),setTimeout((function(){j(ie(l))}),1)},setDrawTool:i}},st=[{isIdle:!0,isPlacing:!1,isPlaced:!1},{isIdle:!1,isPlacing:!0,isPlaced:!1},{isIdle:!1,isPlacing:!1,isPlaced:!0}];var lt=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=Object(a.useRef)(0),n=Object(a.useState)(st[t.current]),i=Object(s.a)(n,2),c=i[0],r=i[1],o=Object(a.useState)({x:0,y:0}),l=Object(s.a)(o,2),d=l[0],u=l[1];function b(){t.current=0,r(st[0])}function f(e,n){e&&n&&u({x:e,y:n}),t.current===st.length-1?b():(t.current=t.current+1,r(st[t.current]))}return Object(a.useEffect)((function(){e&&(t.current=1,r(st[1]))}),[e]),{state:c,reset:b,position:d,next:f}};var dt={setTool:E,clearActiveNote:je,clearActiveText:Ue,deleteItem:oe,addItem:ce,updateItem:re,clearSelected:se},ut=Object(o.c)((function(e){return{currentTool:e.tool.cursor,canvasItems:e.canvas.present,editNote:e.note.activeNote,newNote:e.note.newNote,editText:e.text.activeText}}),dt)((function(e){var t=e.currentTool,n=e.setTool,i=e.canvasItems,c=e.editNote,r=e.clearActiveNote,l=e.newNote,d=e.lastShortcut,x=e.clearActiveText,v=e.editText,g=e.deleteItem,O=e.addItem,p=e.updateItem,w=e.clearSelected,y=ot(),N=y.lines,_=y.drawMouseDown,E=y.drawMouseMove,C=y.drawMouseUp,A=y.setDrawTool,k=Object(a.useState)({w:window.innerWidth,h:window.innerHeight}),S=Object(s.a)(k,2),T=S[0],M=S[1],Y=Object(a.useState)(!1),L=Object(s.a)(Y,2),D=L[0],z=L[1],F=lt(h===t),P=lt(m===t),X=new Image;return X.onload=function(){z(!0)},X.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAB50lEQVR4Xu3VPU9UUQAG4UMClAQlrBRrIVJLKf+/glJqPgq2kDWCoVsw0YSCim4p5obn/oCTuTN5z9lYrVb/hi9jYEOQTItnEEFaPQSJ9RBEkJqBGI83RJCYgRiOhQgSMxDDsRBBYgZiOBYiSMxADMdCBIkZiOFYiCAxAzEcCxEkZiCGYyGCxAzEcCxEkJiBGI6FCBIzEMOxEEFiBmI4FiJIzEAMx0IEiRmI4ViIIDEDMRwLESRmIIZjIYLEDMRwLESQmIEYjoUIEjMQw5nMQh6f/o7F7Z+x/P0wZns7Y/5pd2xvbcZ0ro8zmSBXN7/G2fnFyx9//3Y0Dj/vr28gdsJkgpz+uBzXi+WLvi/z2Tg5/hrTuT7OZIJYyPqx3/SE5zfk5/1Y3j2M2cedMT/44A15U8MOe9XAZK6s99JPkFhpQQSJGYjhWIggMQMxHAsRJGYghmMhgsQMxHAsRJCYgRiOhQgSMxDDsRBBYgZiOBYiSMxADMdCBIkZiOFYiCAxAzEcCxEkZiCGYyGCxAzEcCxEkJiBGI6FCBIzEMOxEEFiBmI4FiJIzEAMx0IEiRmI4ViIIDEDMRwLESRmIIZjIYLEDMRwLESQmIEYjoUIEjMQw7EQQWIGYjgWIkjMQAzHQgSJGYjh/Adx+KvcF/eo4AAAAABJRU5ErkJggg==",Object(a.useEffect)((function(){A(t)}),[t,A]),Object(a.useEffect)((function(){d!==u.del&&d!==u.backspace?d===u.esc&&(F.state.isPlacing?F.reset():P.state.isPlacing?P.reset():i.items.find((function(e){return e.selected}))&&w()):g()}),[d,g,F,P,i.items,w]),Object(a.useEffect)((function(){var e=Object(R.a)((function(){M({w:window.innerWidth,h:window.innerHeight})}),25);return window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}}),[]),Object(a.useEffect)((function(){t!==m&&P.state.isPlacing?P.reset():t!==h&&F.state.isPlacing&&F.reset()}),[t,F,P]),Object(B.jsxs)(B.Fragment,{children:[Object(B.jsx)(o.b.Consumer,{children:function(e){var n=e.store;return Object(B.jsxs)(I.e,{width:T.w,height:T.h,tabIndex:0,onMouseDown:function(e){t!==f&&t!==j||_(e),"Stage"!==e.target.constructor.name&&"Line"!==e.target.constructor.name||w()},onMousemove:function(e){t!==f&&t!==j||E(e)},onMouseup:function(e){t!==f&&t!==j||C(e)},className:"whiteboard cursor-".concat(t),children:[Object(B.jsx)(I.b,{listening:!1,children:D&&Object(B.jsx)(I.d,{x:0,y:0,width:T.w,height:T.h,fillPatternImage:X,listening:!1})}),Object(B.jsx)(o.a,{store:n,children:Object(B.jsx)(Ke,{items:i.items,lines:N,newNote:l})})]})}}),F.state.isPlacing&&Object(B.jsx)(tt,{width:"200",height:"200",onFinish:function(e,t){F.next(e,t)},onCancel:function(){F.reset(),n(b)}}),P.state.isPlacing&&Object(B.jsx)(tt,{width:"400",height:"80",onFinish:function(e,t){P.next(e,t)},onCancel:function(){P.reset(),n(b)}}),Object(B.jsx)($,{}),P.state.isPlaced&&Object(B.jsx)(ct,{x:P.position.x,y:P.position.y,onSave:function(e){O(e),n(b),x(),P.reset()},onCancel:function(){n(b),x(),P.reset()}}),v&&Object(B.jsx)(ct,{x:v.x,y:v.y,textData:v,onSave:function(e){p(e),n(b),x()},onCancel:function(){n(b),x()}}),(F.state.isPlaced||c)&&Object(B.jsx)(Ye,{note:c,x:F.position.x,y:F.position.y,onClose:function(){n(b),r(),F.reset()}})]})}));var bt=function(){var e=T().lastShortcut;return Object(B.jsx)("div",{className:"App",children:Object(B.jsx)(ut,{lastShortcut:e})})},ft=n(19),jt=Object(ft.c)({tool:k,canvas:g()(de),note:xe,text:Ve}),ht=Object(y.a)({reducer:jt});r.a.render(Object(B.jsx)(i.a.StrictMode,{children:Object(B.jsx)(o.a,{store:ht,children:Object(B.jsx)(bt,{})})}),document.getElementById("root"))},37:function(e,t,n){e.exports={note:"addNoteModal_note__gFYx9",textarea:"addNoteModal_textarea__12CPn",textContainer:"addNoteModal_textContainer__2ESK8",textEdit:"addNoteModal_textEdit__2C1sA",actions:"addNoteModal_actions__OuQAq",colors:"addNoteModal_colors__iM_1T"}},43:function(e,t,n){e.exports={container:"slider_container__2Tm_d",range:"slider_range__1xNOW",example:"slider_example__313gz"}},44:function(e,t,n){e.exports={settingsContainer:"drawSettings_settingsContainer__3BARp",show:"drawSettings_show__1IpqZ",slider:"drawSettings_slider__s1xYo",px:"drawSettings_px__239md"}},61:function(e,t,n){e.exports={dragContainer:"draggable_dragContainer__37P1o",handle:"draggable_handle__2zrDe",keyMoving:"draggable_keyMoving__j1IX4"}},62:function(e,t,n){e.exports={fieldset:"colorPicker_fieldset__B-ZSC",radio:"colorPicker_radio__2wjUZ",wrap:"colorPicker_wrap___SnW6"}},85:function(e,t,n){e.exports={inputContainer:"flyingTextInput_inputContainer__OjZHS",input:"flyingTextInput_input__12fUF"}}},[[298,1,2]]]);
//# sourceMappingURL=main.3e3cff31.chunk.js.map