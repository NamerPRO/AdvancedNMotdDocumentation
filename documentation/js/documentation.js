var toggleSwitch = null;
var currentTheme = null;

window.onload = function() {
	toggleSwitch = document.getElementById('docs-theme-toggle-button');
	currentTheme = localStorage.getItem('theme');
	if (currentTheme != null) {
		document.documentElement.setAttribute('data-theme', currentTheme);
		if (currentTheme === 'dark') {
			toggleSwitch.click();
		}
	}
	toggleSwitch.addEventListener('change', switchTheme, false);
}

function switchTheme(e) {
    if (e.target.checked) {
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('theme', 'dark');
    } else {
		document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('theme', 'light');
	}
}
