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

		width: 100%;
	}
</style>

<main>
	<header class="topNav" />
	<LoanCalculator />
</main>
