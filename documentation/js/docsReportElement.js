class DocsReportElement extends HTMLElement {
	
	constructor() {
		super()
	}
	
	connectedCallback() {
		this.innerHTML = `
		<style type="text/css">
			/* Documentation help buttons style */

			#docs-report {
				position: fixed;
				bottom: 1%;
				right: 1%;
			}

			#docs-report ul {
				list-style: none;
			}

			#docs-report li {
				display: block;
				font: 0.9vw Arial;
				text-align: center;
				padding: 0.5vw;
				border-radius: 1.2vw;
				border: 0.1vw solid var(--docs-report-border-color);
				width: 15vw;
				color: var(--docs-report-color);
				cursor: default;
				margin-top: 0.2vw;
				user-select: none;
			}

			#docs-report li:nth-child(1) {
				background-color: var(--docs-report-background-color-child-1);
			}

			#docs-report li:nth-child(2) {
				background-color: var(--docs-report-background-color-child-2);
			}

			#docs-report li:nth-child(3) {
				background-color: var(--docs-report-background-color-child-3);
			}

			#docs-report li:hover {
				background-color: var(--docs-report-list-items-background-color-hover);
				color: var(--docs-report-list-items-color-hover);
			}

			/* End documentation help buttons style */
		</style>
		
		<div id="docs-report">
			<ul>
				<li>Download plugin</li>
				<li>Supplement the article</li>
				<li>Report article</li> <!-- If there this page contains an error or provides wrong information of api-usage or else, click this -->
			</ul>
		</div>
		`;
	}
	
}

customElements.define('report-component', DocsReportElement);