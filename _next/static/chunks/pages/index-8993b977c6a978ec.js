(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,s,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return a(5477)}])},5477:function(e,s,a){"use strict";a.r(s),a.d(s,{default:function(){return g}});var n=a(5893),o=a(7294);function t(e){let{children:s}=e;return(0,n.jsx)("div",{className:"mx-auto flex flex-col space-y-4",children:(0,n.jsx)("div",{children:(0,n.jsx)("main",{className:"flex w-full flex-1 flex-col overflow-hidden",children:s})})})}var r=a(8122),l=a.n(r),i=a(5675),c=a.n(i),d=a(4740),m=a(4871),u=a.n(m);let _=e=>{let{color:s="#000",style:a="small"}=e;return(0,n.jsxs)("span",{className:"small"==a?u().loading2:u().loading,children:[(0,n.jsx)("span",{style:{backgroundColor:s}}),(0,n.jsx)("span",{style:{backgroundColor:s}}),(0,n.jsx)("span",{style:{backgroundColor:s}})]})};function g(){let[e,s]=(0,o.useState)(""),[a,r]=(0,o.useState)(!1),[i,m]=(0,o.useState)(null),[u,g]=(0,o.useState)(!1),[h,p]=(0,o.useState)({messages:[{message:"Hi, how can I guide your way around cloudjiffy?",type:"apiMessage"}],history:[]}),x=(0,o.useRef)(null),f=(0,o.useRef)(null);async function w(a){if(a.preventDefault(),m(null),!e){alert("Please input a question");return}p(s=>({...s,messages:[...s.messages,{type:"userMessage",message:e.trim()}]})),r(!0),s("");try{var n;let s=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:e.trim(),history:h.history})}),a=await s.json();console.log("data",a),a.error?m(a.error):p(s=>({...s,messages:[...s.messages,{type:"apiMessage",message:a.text,sourceDocs:a.sourceDocuments}],history:[...s.history,[e.trim(),a.text]]})),r(!1),null===(n=x.current)||void 0===n||n.scrollTo(0,x.current.scrollHeight)}catch(e){r(!1),m("An error occurred while fetching the data. Please try again."),console.log("error",e)}}(0,o.useEffect)(()=>{var e;null===(e=f.current)||void 0===e||e.focus()},[]);let y=s=>{"Enter"===s.key&&e?w(s):"Enter"===s.key&&s.preventDefault()};return(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)(t,{children:[(0,n.jsxs)("div",{className:"mx-auto flex flex-col gap-4",children:[(0,n.jsx)("h1",{className:"text-2xl font-bold leading-[1.1] tracking-tighter text-center text-blue-500",children:"waypost.ai cloudjiffy demo2"}),(0,n.jsxs)("main",{className:l().main,children:[(0,n.jsx)("div",{className:l().cloud,children:(0,n.jsx)("div",{ref:x,className:l().messagelist,children:h.messages.map((e,s)=>{let o,t;return"apiMessage"===e.type?(o=(0,n.jsx)(c(),{src:"/waypost_icon3.png",alt:"AI",width:"40",height:"40",className:l().boticon,priority:!0},s),t=l().apimessage):(o=(0,n.jsx)(c(),{src:"/usericon2.png",alt:"Me",width:"30",height:"30",className:l().usericon,priority:!0},s),t=a&&s===h.messages.length-1?l().usermessagewaiting:l().usermessage),(0,n.jsxs)("div",{className:t,children:[o,(0,n.jsx)("div",{className:l().markdownanswer,children:(0,n.jsx)(d.D,{linkTarget:"_blank",children:e.message})})]},"chatMessage-".concat(s))})})}),(0,n.jsx)("div",{className:l().center,children:(0,n.jsx)("div",{className:l().cloudform,children:(0,n.jsxs)("form",{onSubmit:w,children:[!u&&(0,n.jsx)("input",{type:"password",value:e,onChange:e=>s(e.target.value),placeholder:"Enter password here",className:l().passwordInput}),u&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("textarea",{disabled:a,onKeyDown:y,ref:f,autoFocus:!1,rows:1,maxLength:512,id:"userInput",name:"userInput",placeholder:a?"Waiting for response...":"Post here and I will guide your way",value:e,onChange:e=>s(e.target.value),className:l().textarea}),(0,n.jsx)("button",{type:"submit",disabled:a,className:l().generatebutton,children:a?(0,n.jsx)("div",{className:l().loadingwheel,children:(0,n.jsx)(_,{color:"#000"})}):(0,n.jsx)("svg",{viewBox:"0 0 20 20",className:l().svgicon,xmlns:"http://www.w3.org/2000/svg",children:(0,n.jsx)("path",{d:"M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"})})})]})]})})}),i&&(0,n.jsx)("div",{className:"border border-red-400 rounded-md p-4",children:(0,n.jsx)("p",{className:"text-red-500",children:i})})]})]}),(0,n.jsx)("footer",{className:"m-auto p-4",children:(0,n.jsx)("a",{href:"https://waypost.ai",children:"developed by waypost.ai with ❤️"})})]})})}_.defaultProps={style:"small"}},8122:function(e){e.exports={main:"Home_main__nLjiQ",header:"Home_header__GCVRv",cloudform:"Home_cloudform__W4PLJ",textarea:"Home_textarea__lSHf7",generatebutton:"Home_generatebutton__omKYX",loadingwheel:"Home_loadingwheel__IWJnE",svgicon:"Home_svgicon__PLaWz",messagelist:"Home_messagelist__YHr8p",messagelistloading:"Home_messagelistloading__tlCYV",usermessage:"Home_usermessage__tWHWR",usermessagewaiting:"Home_usermessagewaiting__PYv_4","loading-gradient":"Home_loading-gradient__8jpVG",apimessage:"Home_apimessage__VhfTn",fadein:"Home_fadein__CBLON",markdownanswer:"Home_markdownanswer__UUDfu",boticon:"Home_boticon__Xr0Q4",usericon:"Home_usericon___BrVD",center:"Home_center__4BFgC",cloud:"Home_cloud__S7par",pointsnormal:"Home_pointsnormal__yRwA_",pointsdim:"Home_pointsdim__x_zcw",footer:"Home_footer____T7K",topnav:"Home_topnav__BfkuW",navlogo:"Home_navlogo__AhPAx"}},4871:function(e){e.exports={loading:"loading-dots_loading__LomzL",spacer:"loading-dots_spacer__nBBvk",blink:"loading-dots_blink__yy72w",loading2:"loading-dots_loading2___zCAu"}}},function(e){e.O(0,[574,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);