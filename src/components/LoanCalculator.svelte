<script>
  //Downpayment plan API request:
  import DownPaymentTable from "./DownPaymentPlan.svelte";

  // Variables
  let years = 15;
  let loanAmount = 5500000;
  let interestRateInput = 250;
  let loanFee = 50;

  // Makes large integers more readable by adding spacing between every 3d digit.
  const formatPrettyNumber = (largeInteger) => {
    return largeInteger.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // Math: https://en.wikipedia.org/wiki/Amortizing_loan
  $: interestRate = interestRateInput / 100;
  $: totalPayments = years * 12;
  $: monthlyInterestRate = interestRate / 100 / 12;
  $: monthlyPayment =
    (loanAmount *
      Math.pow(1 + monthlyInterestRate, totalPayments) *
      monthlyInterestRate) /
    (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
  $: totalPaid = monthlyPayment * totalPayments;
  $: interestPaid = totalPaid - loanAmount;

  //Make variables readable:
  $: formattedTotalPaid = formatPrettyNumber(Math.ceil(totalPaid));
  $: formattedMonthlyPaiment = formatPrettyNumber(Math.ceil(monthlyPayment));
  $: formattedInterestPaid = formatPrettyNumber(Math.ceil(interestPaid));
  $: formattedLoanAmout = formatPrettyNumber(Math.ceil(loanAmount));
</script>

<style>
  .outputs {
    text-align: center;
    border: none;
  }

  .loanOverview {
    margin-top: 15px;
  }

  .numberInputLoanAmount {
    width: 100px;
    text-align: center;
    border: none;
    font-size: 100%;
    font-family: "Work Sans", sans-serif;
    font-weight: bold;
  }
</style>

<main>
  <div class="container forms section">
    <div class="row">
      <h2>Nedbetalings <b>Kalkulator</b></h2>
      <p>
        Med nedbetalings kalkulatoren kan du enkelt beregne kostnadene for ditt
        lån, og få en oversikt over nedbetalingsplanen. Faktiske lånekostnader
        kan avvike noe fra beregningen og er avhengig av blandt annet
        betalingsevne og sikkerhet.
      </p>
    </div>

    <div class="row">
      <div class="columns six">
        <label>Ønsket lånebeløp (NOK)
          <input
            bind:value={loanAmount}
            class="u-full-width customSlider"
            type="range"
            step="50000"
            min="1"
            max="10000000" />
        </label>
      </div>

      <div class="columns six">
        <div style="text-align: center">
          <label>
            <input
              bind:value={loanAmount}
              class="u-full-width numberInputLoanAmount"
              type="number"
              step="50000"
              min="1" />
          </label>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="columns six">
        <label>Lånegebyr
          <input
            bind:value={loanFee}
            class="u-full-width customSlider"
            type="range"
            step="10"
            min="0"
            max="1000" />
        </label>
      </div>

      <div class="columns six outputs"><b>{loanFee} kr</b></div>
    </div>

    <div class="row">
      <div class="columns six ">
        <label>Nedbetalingstid
          <input
            bind:value={years}
            class="u-full-width customSlider"
            type="range"
            min="1"
            max="35" />
        </label>
      </div>
      <div class="columns six outputs"><b>{years} År</b></div>
    </div>

    <div class="row">
      <div class="columns six">
        <label>Nominell Rente
          <input
            bind:value={interestRateInput}
            class="u-full-width customSlider"
            type="range"
            min="1"
            max="1000"
            id="interest-slider" />
        </label>
      </div>
      <div class="columns six outputs"><b>{interestRate} %</b></div>
    </div>

    <h4 class="loanOverview">
      Ved å betale
      <b>{formattedMonthlyPaiment}</b>
      kr i måneden over
      <b>{years * 12}</b>
      termin, vil du få et lån på
      <b>{formattedLoanAmout}</b>
      kr. Total kostnad for dette lånet blir
      <b>{formattedInterestPaid}</b>
      kr
    </h4>

    <br />
    <div class="sixteen columns">
      <DownPaymentTable {loanAmount} {interestRate} {years} {loanFee} />
    </div>
  </div>
</main>
