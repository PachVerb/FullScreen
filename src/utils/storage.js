export function isObject (val) {
	return val !== null && typeof val === 'object';
}

export function localSetItem(key, val) {
	if (isObject(val)) {
		localStorage.setItem(key, JSON.stringify(val));
	} else {
		localStorage.setItem(key, val);
	}
}

export function localGetItem(key) {
	let val = localStorage.getItem(key);

	try {
		return JSON.parse(val);
	} catch (e) {
		return val;
	}
}

export function localRemoveItem(key) {
	localStorage.removeItem(key);
}

export function localClear() {
	localStorage.clear();
}



export function sessionSetItem(key, val) {
	if (isObject(val)) {
		sessionStorage.setItem(key, JSON.stringify(val));
	} else {
		sessionStorage.setItem(key, val);
	}
}

export function sessionGetItem(key) {
	let val = sessionStorage.getItem(key);

	try {
		return JSON.parse(val);
	} catch (e) {
		return val;
	}
}

export function sessionRemoveItem(key) {
	sessionStorage.removeItem(key);
}

export function sessionClear() {
	sessionStorage.clear();
}

export default {
	isObject,
	localSetItem,
	localGetItem,
	localRemoveItem,
	localClear,

	sessionSetItem,
	sessionGetItem,
	sessionRemoveItem,
	sessionClear
}