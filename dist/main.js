!function(){"use strict";var e;e=class{constructor(e){this.ele=e,this.ele.innerHTML="<h1>Its alive!</h1>",this.handleClick=this.handleClick.bind(this),this.ele.addEventListener("click",this.handleClick)}handleClick(){this.ele.children[0].innerText="Ouch!"}},document.addEventListener("DOMContentLoaded",(()=>{const t=document.getElementById("main");new e(t)}))}();
//# sourceMappingURL=main.js.map