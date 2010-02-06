/*
 * konami jQuery extension v0.1
 * http://ryanday.org/konami
 *
 * Copyright (c) 2009 Ryan Day
 * Dual licensed under the MIT and GPL licenses.
 *
 * http://docs.jquery.com/License
 */

//- http://en.wikipedia.org/wiki/Konami_code
(function($){
	$.extend($,{
		konami:function fn(cb){
			if(!fn.setup){
				fn.setup = true;
				fn.callbacks = [];
				var buffer = "";
				var code = "38384040373937396665";
				var hits = 0;
				var konami = function(ev){

					var key = ev.keyCode || ev.which;

					hits++;
					var msg = 1;
					if(key){
						buffer += (key+'');
						if(buffer == code){
							buffer = "";
							$.each(fn.callbacks,function(k,v){
								v.call(this,ev);
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
			if(cb) fn.callbacks.push(cb);
		}
	});
})(jQuery);
