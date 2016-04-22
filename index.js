//let { window: {navigator} } = require('sdk/addon/window');
var data = require("sdk/self").data;
var sp = require("sdk/simple-prefs");

var a = sp.prefs['whitelist'].split(",");
var whitelist = new Array();
for (var k in a) {
	var v = a[k].trim();
	if (v)
		whitelist.push(v);
	v = null;
}
a = null;

//commented because the script doesn't seem to work properly and out of memory error
// occurs when cloning a plugin object (but as long as plugins is empty everything's fine)
//var cs = data.load("script.js");
//cs = cs.replace("$$WHITELIST_EXTENSIONS$$", sp.prefs['whitelistExtensions']);

var cs = 'Object.defineProperty(unsafeWindow.navigator, "plugins", {value: cloneInto({length:0}, unsafeWindow.navigator)});';

require('sdk/page-mod').PageMod({
	include: /.*/,
	exclude: [/^about:.*$/].concat(whitelist),
	contentScriptWhen: "start",
	attachTo: ['existing', 'top', 'frame'],
	contentScript: cs
});
