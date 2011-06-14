/*
 * konami jQuery extension v0.1
 * http://ryanday.org/konami
 *
 * Copyright (c) 2009 Ryan Day
 * Dual licensed under the MIT and GPL licenses.
 *
 * http://docs.jquery.com/License
 *
 * for another great implementation checkout
 *	http://plugins.jquery.com/project/konami-code
 *
 */

//- http://en.wikipedia.org/wiki/Konami_code
(function($){
 	var callbacks = [];
	
	$.extend($,{
		konami:function fn(cb,ctx){
			if(!fn.setup){
				fn.setup = true;
				var buffer = "";
				var code = "38384040373937396665";
				var konami = function(ev){
					var key = ev.keyCode || ev.which;

					if(key){
						buffer += (key+'');
						//console.log(buffer);
						if(buffer == code){
							buffer = "";
							$.each(callbacks,function(k,o){
								o.cb.call(o.ctx,ev);
							});
						} else if(code.indexOf(buffer) !== 0){
							if(buffer.indexOf(key) == 0){
								buffer = key;
							} else {
								buffer = "";
							}
						}
					}
			
				}
			
				var lastDown;
				$(document).bind('keyup',function(ev){
					if(ev.keyCode == lastDown){
						lastDown = false;
						konami(ev);
					}
				});
				
				$(document).bind('keydown',function(ev){
					lastDown = ev.keyCode;
				});
			}
			if(cb) callbacks.push({ctx:ctx||document.body,cb:cb});
		}
	});
	$.fn.extend({
		//refactor into event system.. removed event to stop leak?
		konami:function(cb){
			//console.log(this);
			this.each(function(){
				$.konami(cb,this);
			});
			return this;
		},
		unkonami:function(){
			this.each(function(){
				var el = this;
				//eww bad squared
				$.each(callbacks,function(k,o){
					if(o.ctx === el) callbacks.splice(k,1);
				});
			});
			return this;
		}
	});
})(jQuery);
