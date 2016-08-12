
ls = {
	set : function(name, value) {
		if (window.localStorage) {			
			localStorage.removeItem(name);			
			localStorage.setItem(name, value);			
		}
	},
	get : function(name) {
		if (window.localStorage) {
			return localStorage.getItem(name);
		}
	},
	clear : function() {
		if (window.localStorage) {
			return localStorage.clear();
		}
	}
}; 

