
function ThisURL() {
	var URL = unescape(location.href);
	var xstart = URL.lastIndexOf("/") + 1;
	var xend = URL.length;
	var hereName = URL.substring(xstart,xend);
	var herePath = URL.substring(0,xstart);
	return herePath;
}

