function nextSelect(elem) {
	if (elem.classList.contains('s-one')) {
		let next = document.getElementsByClassName('s-two')[0];
		switch (elem.value) {
			case 'AdvancedNMotd':
				next.innerHTML = `
					<option selected disabled>Select version</option>
					<option>Version 10.0.1</option>
					<option>Version 10.0.0</option>
				`;
				break;
			case 'Usage guide':
				next.innerHTML = `
					<option selected disabled>Select guide</option>
					<option>Diamond Brackets</option>
					<option>Aliases</option>
					<option>Development</option>
				`;
				break;
			case 'FAQ':
				next.innerHTML = `
					<option selected disabled>Select question</option>
					<option>Diamond Brackets</option>
					<option>Aliases</option>
					<option>Development</option>
				`;
				break;
		}
		next.disabled = false;
		elem.disabled = true;
	} else if (elem.classList.contains('s-two')) {
		let prev = document.getElementsByClassName('s-one')[0];
		let next = document.getElementsByClassName('s-three')[0];
		switch (prev.value) {
			case 'AdvancedNMotd':
				next.innerHTML = `
					<option selected disabled>Select version</option>
					<option>Download</option>
					<option>Source code</option>
					<option>Update info</option>
				`;
				break;
			case 'Usage guide':
				next.innerHTML = `
					<option selected disabled>Official documentation</option>
				`;
				break;
			case 'FAQ':
				next.innerHTML = `
					<option selected disabled>Official FAQ</option>
				`;
				break;
		}
		next.disabled = false;
		elem.disabled = true;
	} else if (elem.classList.contains('s-three')) {
		
	}
}