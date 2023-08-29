class DocsThemeElement extends HTMLElement {
	
	constructor() {
		super()
	}
	
	connectedCallback() {
		this.innerHTML = `
		<style type="text/css">
			/* Dark theme switcher */

			theme-component #docs-theme {
				position: fixed;
				right: 1%;
				top: 1%;
				color: var(--docs-theme-color);
				font: 20px Arial;
			}

			theme-component .switch::before {
				display: block;
				content: "Toggle documentation theme:";
				width: 300px;
				position: relative;
				right: 270px;
				top: 50%;
				color: var(--switch-color-before);
				transform: translateY(-50%);
			}

			theme-component .switch {
				display: inline-block;
				height: 34px;
				position: relative;
				width: 60px;
			}

			theme-component .switch input {
				display:none;
			}

			theme-component .slider {
				background-color: var(--slider-background-color);
				bottom: 0;
				cursor: pointer;
				left: 0;
				position: absolute;
				right: 0;
				top: 0;
				transition: 0.4s;
			}

			theme-component .slider::before {
			  background-color: var(--slider-background-color-before);
			  bottom: 4px;
			  content: "";
			  height: 26px;
			  left: 4px;
			  position: absolute;
			  transition: 0.4s;
			  width: 26px;
			}

			theme-component input:checked + .slider {
			  background-color: var(--slider-input-checked);
			}

			theme-component input:checked + .slider::before {
			  transform: translateX(26px);
			}

			theme-component .slider.round {
			  border-radius: 34px;
			}

			theme-component .slider.round::before {
			  border-radius: 50%;
			}

			/* End dark theme switcher */
		</style>
		
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