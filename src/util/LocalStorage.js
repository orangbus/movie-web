function localStorage() {
	return window.localStorage;
}

let Local = {
	set: (key, data) => {
		return localStorage().setItem(key, JSON.stringify(data));
	},
	get: (key) => {
		return JSON.parse(localStorage().getItem(key));
	},
	all: () => {
		const data = {};
		for (var i = localStorage().length - 1; i >= 0; i--) {
			var key = localStorage().key(i);
			data[key] = this.get(key);
		}
		return data;
	},
	remove: (key) => {
		return localStorage().removeItem(key);
	},

	clearAll: () => {
		return localStorage().clear();
	},

	has: (key) => {
		return localStorage().getItem(key) !== null;
	},
}

export default Local;

