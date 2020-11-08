<script>
	import LoanCalculator from "./components/LoanCalculator.svelte";
</script>

<style>
	* {
		font-family: "Work Sans", sans-serif;
	}

	.topNav {
		height: 5rem;
		background: rgb(223, 238, 243 / 0%);
		margin-bottom: 3rem;
		width: 100%;
	}

	html {
		background: rgb(209, 210, 194 / 20%);
	}

	body {
		margin: 0px;
	}

	.forms {
		padding: 25px 50px;
		max-width: 69%;
	}

	.section {
		margin-bottom: 30px;
	}

	.outputs {
		padding: 10px;
	}

	.button {
		border: 3px solid;
		margin: 5px;
	}

	input[type="number"]:focus {
		border: none;
	}

	input[type="number"] {
		text-align: right;
		background-color: #f0f8ff00;
		border: none;
		font-family: "Work Sans", sans-serif;
		width: 123%;
		width: 63%;
		font-weight: bold;
	}

	@media only screen and (max-width: 1111px) {
		.forms {
			max-width: 100%;
		}

		html {
			background: rgb(251, 251, 249);
		}
	}

	.columns {
		margin-left: 0%;
	}
</style>

<main>
	<header class="topNav" />
	<LoanCalculator class="forms" />
</main>
