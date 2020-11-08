<script>
  //Downpayment plan API request:
  import DownPaymentTable from "./PaymentPlanButton.svelte";

  // Variables
  let years = 15;
  let loanAmount = 2500000;
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
      (Math.pow(1 + monthlyInterestRate, totalPayments) - 1) +
    loanFee;
  $: totalPaid = monthlyPayment * totalPayments;
  $: interestPaid = totalPaid - loanAmount;

  //Make variables readable:
  $: formattedTotalPaid = formatPrettyNumber(Math.ceil(totalPaid));
  $: formattedMonthlyPaiment = formatPrettyNumber(Math.ceil(monthlyPayment));
  $: formattedInterestPaid = formatPrettyNumber(Math.ceil(interestPaid));
  $: formattedLoanAmout = formatPrettyNumber(Math.ceil(loanAmount));
</script>

<style>
  .outputs /*Output fields from sliders*/ {
    text-align: center;
    border: none;
    padding: 15px;
  }

  /*Text-info regarding loan */
  .loanOverview {
    margin-top: 5rem;
  }

  /*Input field for loan amount. */
  .numberInputLoanAmount {
    width: 100px;
    text-align: center;
    border: none;
    font-size: 100%;
    font-family: "Work Sans", sans-serif;
    font-weight: bold;
  }

  /*Info-popups on hover*/
  .infolink:before {
    content: "?";
    display: inline-block;
    font-family: sans-serif;
    font-weight: bold;
    text-align: center;
    width: 1.8ex;
    height: 1.8ex;
    font-size: 1.4ex;
    line-height: 1.8ex;
    border-radius: 1.2ex;
    margin-right: 4px;
    padding: 1px;
    color: white;
    background: rgba(116, 192, 139, 0.8);
    border: 1px solid rgba(116, 192, 139, 0.8);
    text-decoration: none;
  }

  .infolink:hover:before {
    color: white;
    background: rgba(116, 192, 139, 0.8);
    border-color: white;
    text-decoration: none;
  }

  /* Tooltip container */
  .tooltip {
    position: relative;
    display: inline-block;
    margin-left: 2%;
  }

  /* Tooltip text */
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 30vw;
    background-color: rgb(14 14 14 / 90%);
    font-size: 90%;
    color: #fff;
    text-align: center;
    padding: 25px 20px;
    border-radius: 6px;
    position: absolute;
    font-weight: normal;
    z-index: 1;
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  .tooltip:hover .tooltiptext {
    visibility: visible;
  }
</style>

<main>
  <div class="container forms section">
    <div class="row">
      <h2 style="margin-top: 5rem;">Nedbetalings <b>Kalkulator</b></h2>
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
            min="10000"
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
        <label>Termingebyr
          <div class="infolink tooltip" href="#">
            <span class="tooltiptext">Normalt legger banken til et lite beløp på
              toppen av det du betaler av avdrag og renter på lånet, hver måned.
              Termingebyret dekker derfor administrasjonskostnadene som banken
              bruker for å betjene lånet ditt.</span>
          </div>
          <input
            bind:value={loanFee}
            class="u-full-width customSlider"
            type="range"
            step="10"
            min="0"
            max="150" />
        </label>
      </div>

      <div class="columns six outputs"><b>{loanFee} kr</b></div>
    </div>

    <div class="row">
      <div class="columns six">
        <label>Nominell Rente
          <div class="infolink tooltip">
            <span class="tooltiptext">Nominell rente er rentesatsen på lånet før
              gebyrer, og er vanligvis oppgitt som en årlig rente (pro anno,
              eller p.a., som betyr per år). Effektiv rente er nominell rente
              pluss gebyrer og andre kostnader.</span>
          </div>
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
      Du kan få et lån på
      <b>{formattedLoanAmout}</b>
      kr hvis du betaler
      <b>{formattedMonthlyPaiment}</b>
      kr i måneden over
      <b>{years * 12}</b>
      terminer. Total kostnad for dette lånet blir
      <b>{formattedInterestPaid}</b>
      kr.
    </h4>

    <br />
    <div class="sixteen columns">
      <DownPaymentTable {loanAmount} {interestRate} {years} {loanFee} />
    </div>
  </div>
</main>
