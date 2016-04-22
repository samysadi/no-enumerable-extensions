var a = "$$WHITELIST_EXTENSIONS$$";

var whitelistExtensions = new Array();
for (var k in a) {
	var v =a[k].trim().toLowerCase();
	if (v)
		whitelistExtensions.push(v);
	v = null;
}
a = null;

var count = navigator.plugins.length;
var newObject = {};
var newLength = 0;
for (i = 0; i < count; i++) {
	var plugin = navigator.plugins[i];
	var name = plugin.name.toLowerCase();
	//var filename = plugin.filename.toLowerCase();
	//var description = plugin.description.toLowerCase();

	var exclude = false;
	for (var k in whitelistExtensions) {
		if (name.indexOf(whitelistExtensions[k]) > 0) {
			exclude = true;
			break;
		}
	}

	if (!exclude)
		continue;

	newObject[newLength] = plugin;
	newLength++;
}

newObject.length = newLength;

Object.defineProperty(unsafeWindow.navigator, "plugins", {value: cloneInto(newObject, unsafeWindow.navigator)});

