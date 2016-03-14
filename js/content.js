var passViewer = (function(){
	var inputs,layer,height,delay;
	var init = function(){
		inputs = document.getElementsByTagName("input");
		var passwords = 0;
		height = 32;
		for(var i=0,l=inputs.length;i<l;i++){
    		if(inputs[i].type=="password"){
    			passwords++;
    			inputs[i].addEventListener("keyup",function(){
    				createViewer(this);
    			},false);
    		}
    	}
    	if(passwords){
			chrome.runtime.sendMessage('show');
		}
	}
	var createViewer = function(elem){
		var b = elem.getBoundingClientRect(),top = b.top ,left = b.left,width = elem.offsetWidth;
		clearTimeout(delay);
		if(!layer){
			layer = document.createElement("div");
			setCss(layer,{
				'position' : 'absolute',
				'top' : top - height + 'px',
				'left' : left + 'px',
				'minWidth' : width + 'px',
				'height' : height + 'px',
				'boxSizing' : 'border-box',
				'background' : 'orange',
				'color' : '#fff',
				'lineHeight' : height + 'px',
				'fontSize' : '18px',
				'textAlign' : 'center',
				'zIndex' : '99999999999',
				'overflow' : 'auto',
				'padding' : '0 5px'
			});
			document.body.appendChild(layer);
		};
		setCss(layer,{
			'top' : top - height + 'px',
			'left' : left + 'px',
			'display' : 'block'
		});
		layer.innerText = elem.value;
		delay = setTimeout(function(){
			setCss(layer,{
				'display' : 'none'
			});
		},5000);
	}
	var setCss = function(elem,settings){
		for(var index in settings){
			elem['style'][index] = settings[index];
		}
		return elem;
	}
	return { init : init }
})();
window.onload = function(){
	setTimeout(function(){
	   passViewer.init();
	},2000);
}
