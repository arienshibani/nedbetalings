<script>
    import Table from "./Table.svelte";
    import addDays from "date-fns/addDays";

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

    /**
     * Returns the date string, with chosen element (date, month or year) incremented by +1
     * @param {string} dateString - Datestring, in the form of "YYYY-MM-DD".
     * @param {string} [whatToIncrement] - A string representing which part of the date increment. Must be "date", "month" or "year".
     * @returns {string} - The incremented datestring.
     */
    const incrementDate = (dateString, whatToIncrement = "date") => {
        //Split dateString
        var splitDate = dateString.split("-");

        //Construct date object
        var dt = new Date(
            parseInt(splitDate[0], 10), // year
            parseInt(splitDate[1], 10 - 1), // month (starts with 0)
            parseInt(splitDate[2], 10) // date
        );

        if (whatToIncrement === "date") {
            dt.setDate(dt.getDate() + 1);
        }
        if (whatToIncrement == "month") {
            dt.setMonth(dt.getMonth() + 1);
        }
        if (whatToIncrement == "year") {
            dt.setFullYear(dt.getFullYear() + 1);
        }

        splitDate[0] = dt.getFullYear();

        splitDate[1] = "" + dt.getMonth();
        if (splitDate[1].length < 2) {
            //Concatenate "0" if month is represented with  1 digit.
            splitDate[1] = "0" + splitDate[1];
        }

        splitDate[2] = "" + dt.getDate();
        if (splitDate[2].length < 2) {
            //Concatenate "0" if date is 1 digit.
            splitDate[2] = "0" + splitDate[2];
        }

        return splitDate.join("-");
    };

    /**
     * Generate a DateString for today's date. Can also add years to it to reference a future date.
     * @param {integer} [addYears] - Optional, adds X amount of years to returned datestring.
     * @returns {string} - Returns today's date, in the form of a datestring.
     */
    const getTodaysDateString = (addYears = 0) => {
        let today = new Date();
        let date = today.getDate();
        let month = today.getMonth() + 1;
        let yyyy = today.getFullYear();

        //Append "0" to date if single digit
        if (date.toString().length == 1) {
            date = "0" + date;
        }

        return `${yyyy + addYears || yyyy}-${month}-${date}`;
    };

    async function postLoan() {
        if (!showTable) {
            loading = true;
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            let raw = JSON.stringify({
                laanebelop: loanAmount,
                nominellRente: interestRate,
                terminGebyr: loanFee,
                utlopsDato: getTodaysDateString(years),
                saldoDato: incrementDate(getTodaysDateString(), "month"),
                datoForsteInnbetaling: getTodaysDateString(0, 1),
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
                .then(() => console.log(downpaymentPlan))
                .then(() => ((showTable = true), (loading = false)))
                .catch((error) => console.log("error", error));
        } else {
            showTable = false;
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
