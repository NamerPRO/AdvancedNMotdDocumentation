class DocsMenuElement extends HTMLElement {
	
	constructor() {
		super()
	}
	
	connectedCallback() {
		this.innerHTML = `
		<style type="text/css">
			/* Documentation list style */

			menu-component > #docs-menu {
				position: fixed;
				top: 50%;
				transform: translateY(-50%);
				background-color: var(--docs-menu-background-color);
				border: 2px solid var(--docs-menu-border-color);
				padding: 10px;
				border-radius: 10px;
				left: 1%;
				cursor: default;
				color: var(--docs-menu-color);
				user-select: none;
			}

			menu-component > #docs-menu ul {
				list-style: none;
			}

			menu-component > #docs-menu li {
				font: 17px Arial;
				padding: 10px;
			}

			menu-component > #docs-menu > ul > li > ul li {
				margin-left: 20px;
			}

			menu-component > #docs-menu > ul > li:first-child:hover,
			menu-component > #docs-menu > ul > li > ul > li > ul > li:hover {
				background-color: var(--docs-menu-list-items-hover-background-color);
				border-radius: 10px;
			}

			/* End documentation list style */
		</style>
		
		<div id="docs-menu">
			<ul>
				<li onclick="window.location.href='../index.html';">About Plugin</li>
				<li>Documentation
					<ul>
						<li style="margin-top: 10px;">DiamondBrackets
							<ul>
								<li>&#128274; Introducation & Syntax</li>
								<li>&#128274; String command</li>
								<li>&#128274; Substring command</li>
								<li>&#128274; Parse command</li>
								<li>&#128274; File command</li>
								<li>&#128274; Return command</li>
							</ul>
						</li>
						<li>Aliases
							<ul>
								<li>&#128274; Usage reasons</li>
								<li>&#128274; Placeholders aliases</li>
								<li>&#128274; Format rules aliases</li>
							</ul>
						</li>
						<li>API
							<ul>
								<li onclick="window.location.href='./preparing_extension_documentation.html';">Preparing extension</li>
								<li onclick="window.location.href='./creating_resource_file_documentation.html';">Creatings resources</li>
								<li>&#128274; Registering format rules</li>
								<li onclick="window.location.href='./registering_placeholders.html';"> Registering placeholders</li>
							</ul>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		`;
	}
	
}

customElements.define('menu-component', DocsMenuElement);