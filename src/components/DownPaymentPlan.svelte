<script>
    import Table from "./Table.svelte";

    //Handle date's for the POST request:
    import format from "date-fns/format";
    import addDays from "date-fns/addDays";
    import addMonths from "date-fns/addMonths";
    import addYears from "date-fns/addYears";

    let showTable = false;
    let loading = false;
    let downpaymentPlan = "";
    const API_URL =
        "https://visningsrom.stacc.com/dd_server_laaneberegning/rest/laaneberegning/v1/nedbetalingsplan";

    //Props recieved from parent component (UserInput)
    export let loanAmount;
    export let interestRate;
    export let years;
    export let loanFee;

    const getTodaysDateString = (
        daysToAdd = 0,
        monthsToAdd = 0,
        yearsToAdd = 0
    ) => {
        let today = new Date();

        if (yearsToAdd > 0) {
            today = addYears(today, yearsToAdd);
        }

        if (monthsToAdd > 0) {
            today = addMonths(today, monthsToAdd);
        }

        if (daysToAdd > 0) {
            today = addDays(today, daysToAdd);
        }

        return today.toISOString().slice(0, 10);
        s;
    };

    async function postLoan() {
        if (!showTable) {
            //Only request data if table is hidden.
            loading = true; //Flag loading process
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            let raw = JSON.stringify({
                laanebelop: loanAmount,
                nominellRente: interestRate,
                terminGebyr: loanFee,
                utlopsDato: getTodaysDateString(0, 0, years),
                saldoDato: getTodaysDateString((14, 0, 0)), //Customer recieves payment after 2 weeks.
                datoForsteInnbetaling: getTodaysDateString(0, 1, 0), //Payments start after 1 month.
                ukjentVerdi: "TERMINBELOP",
            });

            let requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            fetch(API_URL, requestOptions)
                .then((response) => response.text())
                .then((result) => (downpaymentPlan = JSON.parse(result)))
                .then(() => ((showTable = true), (loading = false)))
                .catch((error) => console.log("error", error));
        } else {
            showTable = false; //Reset the flag upon second click.
        }
    }
</script>

<div>
    <button type="button" on:click={postLoan}>
        {showTable ? 'Skjul Nedbetalingsplan' : 'Vis Nedbetalingsplan'}
    </button>

    {#if loading}<br />Henter nedbetalingsplan..{/if}
    {#if showTable}
        <Table paymentObjects={downpaymentPlan} />
    {/if}
</div>
