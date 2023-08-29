let motd;
let lines = 1;
let line1 = 'An AdvancedNMotd Motd...';
let line2 = '';

window.onload = function() {
	//Initialize motd edit area
	motd = document.getElementById('motd-area');
	motd.onkeydown = handleMotd;
	motd.onkeyup = handleMotdText;
	document.onkeydown = bindKeys;
	//---
}

function curToEnd() {
	range = document.createRange();
	range.selectNodeContents(motd);
	range.collapse(false);
	selection = window.getSelection();
	selection.removeAllRanges();
	selection.addRange(range);
}

function bindKeys(evt) {
	if (evt.target.id != 'motd-area') {
		switch (evt.code) {
			case 'Escape':
				break;
			case 'Digit1':
				openSubMenu('cchar');
				break;
			case 'Digit2':
				openSubMenu('lcolors');
				break;
			default:
				//curToEnd();
				break;
		}
	} else {
		if (evt.code == 'Escape') {
			motd.blur();
		} else if (evt.ctrlKey) {
			switch (evt.code) {
				case 'Digit1':
					evt.preventDefault();
					openSubMenu('cchar');
					break;
				case 'Digit2':
					evt.preventDefault();
					openSubMenu('lcolors');
					break;
				case 'KeyO':
					evt.preventDefault();
					makeObfuscated();
					break;
				case 'KeyJ':
					evt.preventDefault();
					makeDeobfuscated();
					break;
				case 'KeyQ':
					evt.preventDefault();
					deleteSelectedContent();
				case 'KeyE':
					evt.preventDefault();
					extractData();
					break;
			}
		}
	}
}

//Function to manage motd appearance in motd-area <div>
function handleMotd(evt) {
	if (event.key == 'Enter') {
		lines = document.querySelectorAll('#motd-area > br').length + 1;
		if ((line2 != '' && lines < 2) || ((line2 == '' || line2 == undefined) && lines < 3)) {
			document.execCommand('insertLineBreak');
		}
		evt.preventDefault();
	}
}

function handleMotdText(evt) {
	let txt = document.getElementById('motd-area').innerText;
	line1 = txt.split('\n')[0];
	line2 = txt.split('\n')[1];
	if (line2 == undefined) {
		line2 = '';
	}
	document.getElementById('textarea-1').value = '- "' + line1 + '"\n- "' + line2 + '"';
}

/* Function to execute button actions */
function buttonManager(btn) {
	switch (btn.getAttribute('name')) {
		case 'bold':
			document.execCommand('bold', false, null);
			break;
		case 'underline':
			document.execCommand('underline', false, null);
			break;
		case 'obfuscated':
			makeObfuscated();
			//obfuscateText(true);
			//handleMotdText();
			break;
		case 'deobfuscated':
			//document.execCommand('insertHTML', false, document.getSelection());
			extractData();
			//obfuscateText(false);
			//handleMotdText();
			break;
		case 'italic':
			document.execCommand('italic', false, null);
			break;
		case 'strikethrough':
			document.execCommand('strikethrough', false, null);
			break;
	}
	//selectField();
}

function getContentFromBlock(block) {
	let t = document.createElement('div');
	t.appendChild(block.cloneNode(true));
	return t;
}

function getHtml(t) {
	return getContentFromBlock(t).innerHTML;
}

function getText(t) {
	return getContentFromBlock(t).innerText;
}

function extractData() {
	let sel;
	let range;
    if (window.getSelection && (sel = window.getSelection()).rangeCount) {
		range = sel.getRangeAt(0);
		let replacement = range.cloneContents();
		range.deleteContents();
        range.insertNode(document.createTextNode(getText(replacement)));
	}
}

function ffunc(param) {
	document.getElementById('sub-tool-bar').classList.toggle('sub-menu-vision');
	if (!ff) {
		motd.style.top = '230px';
	} else {
		motd.style.top = '110px';
	}
	ff = !ff;
	document.getElementById(param).classList.toggle('sub-menu-vision');
	last = param;
}

let ff = false;
let last = '';
function openSubMenu(param) {
	if (!ff || (ff && param == last)) {
		ffunc(param);
	} else {
		openSubMenu(last);
		ffunc(param);
	}
}

/*function analizeString(str) {
	const States = { TAG: 0, SKIP: 1, STYLES: 2, CHECK: 3, GETSTYLES: 4 };
	let state = States.SKIP;
	let styles = '';
	let tagStyles = '';
	let tag = '';
	let tagContent = '';
	let f = true;
	
	let i = 0;
	for (;f; ++i) {
		//alert(str[i]);
		switch (state) {
			case States.SKIP:
				if (str[i] == '<') {
					state = States.TAG;
				} else if (str[i] == 's') {
					styles = 's';
					state = States.STYLES;
				} else if (str[i] == '>') {
					f = false;
				}
				break;
			case States.TAG:
				if (str[i] != ' ') {
					tag += str[i];
				} else {
					state = States.SKIP;
				}
				break;
			case States.STYLES:
				if (str[i] != '"') {
					styles += str[i];
				} else {
					state = States.CHECK;
				}
				break;
			case States.CHECK:
				if (styles == 'style=') {
					tagStyles = str[i];
					state = States.GETSTYLES;
				} else {
					state = States.SKIP;
				}
				break;
			case States.GETSTYLES:
				if (str[i] != '"') {
					tagStyles += str[i];
				} else {
					state = States.SKIP;
				}
				break;
		}
	}
	
	for (;; ++i) {
		if (str[i] != '<') {
			tagContent += str[i];
		} else {
			break;
		}
	}
	
	for (; str[i] != '>'; ++i) {}
	
	alert(tag + '\n' + tagStyles + '\n' + tagContent);
}*/

function deleteSelectedContent() {
	let sel;
	let range;
    if (window.getSelection && (sel = window.getSelection()).rangeCount) {
		range = sel.getRangeAt(0);
		let replacement = range.cloneContents();
		let contents = getHtml(replacement);
        range.deleteContents();
		
	}
}

//when part of text in tag selected this will fail
function stripTagEditor(line = '', tagToStrip = '', argsToStrip = '') {
	let lineLength = line.length;
	let openTagExists = false;
	let closeTagExists = false;
	const tagType = {NOTIN : 0, OPENED : 1, COLSED : 2};
	let inTagState = tagType.NOTIN;
	let tag = '';
	let resultLine = '';
	for (let i = 0; i < lineLength; ++i) {
		switch (line[i]) {
			case '<':
				if (inTagState == tagType.NOTIN) {
					inTagState = tagType.OPENED;
					continue;
				}
				break;
			case '/':
				if (i - 1 >= 0 && line[i - 1] == '<') {
					inTagState = tagType.CLOSED;
					continue;
				}
				break;
			case '>':
				if (inTagState == tagType.NOTIN) {
					resultLine += line[i];
					continue;
				}
				if (inTagState == tagType.OPENED) {
					if (!tag.localeCompare('br')) {
						resultLine += '</' + tagToStrip + '><br/><' + tagToStrip + ' ' + argsToStrip + '>';
						//alert();
					}
					if (tagToStrip.localeCompare(tag.split(' ', 1)[0])) {
						resultLine += '<' + tag + '>';
					}
				}
				if (inTagState == tagType.CLOSED) {
					if (tag.localeCompare(tagToStrip)) {
						resultLine += '</' + tag + '>';
					}
				}
				tag = '';
				inTagState = tagType.NOTIN;
				break;
			default:
				if (inTagState != tagType.NOTIN) {
					tag += line[i];
					continue;
				}
				resultLine += line[i];
				continue;
		}
	}
	resultLine += tag;
	return resultLine;
}

function replaceRange(s, start, end, substitute) {
    return s.substring(0, start) + substitute + s.substring(end);
}

function extractFromElement(elem) {
	var fragment = document.createDocumentFragment();
	while(elem.firstChild) {
		fragment.appendChild(elem.firstChild);
	}
	elem.parentNode.replaceChild(fragment, elem);
}

//WHEN we are inside a tag we can bypass line limit!!!
//Check whether to many useless <span> appear. If found remove.
function makeDeobfuscated() {
	let sel;
	let range;
    if (window.getSelection && (sel = window.getSelection()).rangeCount) {
		range = sel.getRangeAt(0);
		let replacement = range.cloneContents();
        range.deleteContents();
		let rawText = getHtml(replacement);
		let preprocessedText = stripTagEditor(rawText, 'marquee');
		
		let elem = document.createElement('span');
        elem.innerHTML = preprocessedText;
		
		if (!preprocessedText.localeCompare(rawText)) {
			let firstKid = document.getElementsByClassName('marquee-search-key');
			if (firstKid.length) {
				extractFromElement(firstKid[0]);
			}
		}
		
        range.insertNode(elem);
		//remove parent span due to its useless now
		extractFromElement(elem);
	}
}

//If two lines selected split to 2 parts, so marquee effect
//looks good <marquee>1<br>2</marquee>=<marquee>1</marquee><br><marquee>2</marquee>
function makeObfuscated() {
	let sel;
	let range;
    if (window.getSelection && (sel = window.getSelection()).rangeCount) {
		range = sel.getRangeAt(0);
		let replacement = range.cloneContents();
		let contents = getHtml(replacement);
		
		//this is used to surround selected text
		//with span tag, so surroundContents works
		range.deleteContents();
		let elem = document.createElement('span');
		//alert(contents);
		let parts = contents.split('<br>');
		alert(parts[0]);
		alert(parts[1]);
		elem.innerHTML = stripTagEditor(contents, 'marquee', 'hspace="0" vspace="0" truespeed="0" scrolldelay="10" direction="up" class="marquee-search-key" style="width: auto;"');
		range.insertNode(elem);
		
		//replace marquee with span with keyframes animation
		let mq = document.createElement('marquee');
		mq.style.width = 'auto';
		mq.setAttribute('hspace', 0);
		mq.setAttribute('vspace', 0);
		mq.setAttribute('truespeed', 0);
		mq.setAttribute('scrolldelay', 10);
		mq.setAttribute('direction', 'up');
		mq.setAttribute('class', 'marquee-search-key');
		range.surroundContents(mq);
		//remove parent span due to its useless now
		extractFromElement(mq.firstChild);
	}
}

function insertSymbol(txt) {
	if (document.activeElement == motd) {
		let selection = window.getSelection();
		let range = selection.getRangeAt(0);
		range.deleteContents();
		let node = document.createTextNode(txt);
		range.insertNode(node);
		selection.modify('move', 'right', 'character');
	}
}

/*function obfs(block) {
	let str = [];
	let txt = getContentFromBlock(block);
	for (let i = 0; i < txt.length; ++i) {
		str.push(String.fromCharCode(txt[i].charCodeAt(0) + 3));
	}
	return str.join('');
}

function deobfs(block) {
	let str = [];
	let txt = getContentFromBlock(block);
	for (let i = 0; i < txt.length; ++i) {
		str.push(String.fromCharCode(txt[i].charCodeAt(0) - 3));
	}
	return str.join('');
}

function obfuscateText(flag) {
    let sel;
	let range, txt;
    sel = window.getSelection();
    if (sel.rangeCount) {
		range = sel.getRangeAt(0);
		let replacement = range.cloneContents();
        range.deleteContents();
		let res = (flag) ? obfs(replacement) : deobfs(replacement);
        range.insertNode(document.createTextNode(res));
    }
}*/