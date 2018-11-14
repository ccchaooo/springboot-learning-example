// 屏蔽鼠标右键

if (document.layers){
    document.captureEvents(Event.MOUSEDOWN);
    document.onmousedown=clickNS4;
    document.onkeydown=OnDeny();
}else if (document.all&&!document.getElementById){
    document.onmousedown=clickIE4;
    document.onkeydown=OnDeny();
}
 
document.oncontextmenu=new Function("return false");

function clickIE4(){
	if (event.button==2){
            return false;
    }
}
 
function clickNS4(e){
    if (document.layers||document.getElementById&&!document.all){
        if (e.which==2||e.which==3){
                return false;
        }
    }
}
 
function OnDeny(){
    if(event.ctrlKey || event.keyCode==78 && event.ctrlKey || event.altKey || event.altKey && event.keyCode==115){
        return false;
    }
}
 


/*

if (window.Event)
  document.captureEvents(Event.MOUSEUP);

function nocontextmenu()
{
 event.cancelBubble = true
 event.returnValue = false;

 return false;
}

function norightclick(e)
{
 if (window.Event)
 {
  if (e.which == 2 || e.which == 3)
   return false;
 }
 else
  if (event.button == 2 || event.button == 3)
  {
   event.cancelBubble = true
   event.returnValue = false;
   return false;
  }

}
document.oncontextmenu = nocontextmenu;  // for IE5+
document.onmousedown = norightclick;     // for all others
*/