function $(r){return document.querySelector(r)}function jq(r){return document.querySelectorAll(r)}function startWatch(){time=setTimeout(add,1e3)}function add(){sec++,sec>=60&&(sec=0,min++,min>=60&&(min=0,hour++)),timeWindow.innerHTML=(hour?hour>9?hour:"0"+hour:"00")+":"+(min?min>9?min:"0"+min:"00")+":"+(sec>9?sec:"0"+sec),startWatch()}function cl(){window.location.reload()}function frogJump(r){if(parseInt(r.target.dataset.curpos)>0){for(var e,t,n,o,i,c,a=jq("li button"),s=r.target,l=0;l<a.length;l++)if(0==parseInt(a[l].dataset.curpos)){o=l;break}if(r.target.getAttribute("class").indexOf("male")>-1){for(var f=0;f<a.length;f++)if(a[f]==s){t=a[f+1],e=a[f+2],n=f;break}0==parseInt(t.dataset.curpos)?(frogUl.insertBefore(crc(t),frogUl.children[n]),frogUl.insertBefore(crc(s),frogUl.children[o+1])):0==parseInt(e.dataset.curpos)&&(frogUl.insertBefore(crc(e),frogUl.children[n+1]),frogUl.insertBefore(crc(s),frogUl.children[o+2]))}else{for(var f=0;f<a.length;f++)if(a[f]==s){i=a[f-1],c=a[f-2],n=f;break}0==parseInt(i.dataset.curpos)?(frogUl.insertBefore(crc(i),frogUl.children[o+1]),frogUl.insertBefore(crc(s),frogUl.children[n])):0==parseInt(c.dataset.curpos)&&(frogUl.insertBefore(crc(c),frogUl.children[o+2]),frogUl.insertBefore(crc(s),frogUl.children[n-1]))}}for(var d=jq("#frogJump li"),u="",g=jq("#frogJump li button"),f=0;f<d.length;f++)(""==d[f].innerHTML||"undefined"==typeof d[f].innerHTML)&&d[f].remove();for(var f=0;f<g.length;f++)u+=g[f].dataset.curpos;"4560123"==u&&($(".a").classList.add("res"),stop.click(),$(".res h3 span").innerHTML=$("h2").innerHTML)}function crc(r){var e=document.createElement("li");return e.appendChild(r),e}var timeWindow=$("h2"),start=$("#startbtn"),stop=$("#stopbtn"),clear=$("#clearbtn"),frogUl=$("#frogJump"),sec=0,min=0,hour=0,time,farr=jq("#frogJump button");$("form").addEventListener("submit",function(r){r.preventDefault()}),stop.classList.remove("hd"),start.addEventListener("click",function(){frogUl.addEventListener("click",frogJump);for(var r=0;r<farr.length;r++)farr[r].disabled=!1;$("p").classList.add("hd"),startWatch(),start.disabled=!0}),stop.addEventListener("click",function(){frogUl.removeEventListener("click",frogJump),clearTimeout(time);for(var r=0;r<farr.length;r++)farr[r].disabled=!0;$("p").classList.remove("hd"),start.disabled=!1}),clear.addEventListener("click",cl),$("#playAgain").addEventListener("click",cl);