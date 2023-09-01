class DocsThemeElement extends HTMLElement {
	
	constructor() {
		super()
	}
	
	connectedCallback() {
		this.innerHTML = `
		<link rel="stylesheet" type="text/css" href="css/theme_switcher.css"/>
		
		<div id="docs-theme">
			<label id="docs-theme-toggle-button" class="switch" for="checkbox">
				<input type="checkbox" id="checkbox"/>
				<div class="slider round"></div>
			</label>
		</div>
		`;
	}
	
}

customElements.define('theme-component', DocsThemeElement);