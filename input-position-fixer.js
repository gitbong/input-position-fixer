/**
 * Created by gitbong on 17/5/5.
 */
(function () {
	var getDomPositon = function (dom) {
		var obj = dom;
		var left = obj.offsetLeft;
		var top = obj.offsetTop;
		// console.log(top)
		var o = obj;
		while (o.offsetParent) {
			top += o.offsetTop;
			left += o.offsetLeft;
			o = o.offsetParent;
			// console.log(o.offsetTop)
		}
		return {x: left, y: top};
	};
	var ins = {
		init: function () {
			this.sw = window.innerWidth;
			this.sh = window.innerHeight;
			
			document.body.style.position = 'absolute';
			document.body.style.width = this.sw + 'px';
			document.body.style.height = this.sh + 'px';
			
			// alert(sw + '--' + sh)
		},
		update: function () {
			
			var ua = window.navigator.userAgent.toLowerCase();
			
			if (ua.indexOf('android') == -1)return;
			
			var _this = this;
			var inputArr = document.getElementsByTagName('input');
			var txtAreaArr = document.getElementsByTagName('textarea');
			var allInputArr = [];
			
			for (var ii = 0, len = inputArr.length; ii < len; ii += 1) {
				allInputArr.push(inputArr[ii]);
			}
			
			for (var jj = 0, len = txtAreaArr.length; jj < len; jj += 1) {
				allInputArr.push(txtAreaArr[ii]);
			}
			
			
			var mx, my;
			document.body.onmousedown = function (e) {
				mx = e.clientX;
				my = e.clientY;
			};
			
			var isFocus = false;
			
			for (var i = 0, len = allInputArr.length; i < len; i += 1) {
				(function () {
					var input = allInputArr[i];
					input.onfocus = function () {
						_this.onInputting(input);
						isFocus = true
					};
					input.onblur = function () {
						console.log(mx, my);
						isFocus = false;
					};
				})();
			}
			
			window.onresize = function () {
				if (isFocus) {
					var sh = window.innerHeight;
					
					var marginTop = (sh / 2 - my);
					
					if (marginTop < sh - this.sh)
						marginTop = sh - this.sh;
					
					document.body.scrollTop = -marginTop;
					// document.body.style.marginTop = marginTop + 'px';
				} else {
					// document.body.style.marginTop = '0px';
					
					setTimeout(function () {
						document.body.scrollTop = 0;
						// document.body.style.marginTop = '0px';
					}, 1000)
				}
			}
		},
		onInputting: function (input) {
			console.log(getDomPositon(input))
		}
	};
	ins.init();
	window.inputFixer = ins;
})();
