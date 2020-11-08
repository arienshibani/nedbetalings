<script>
    //List of individual payment objects from POST response made by PaymentPlanButton.
    export let paymentObjects;

    // Makes large integers more readable by adding spacing between every 3d digit.
    const formatPrettyNumber = (largeInteger) => {
        return largeInteger.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };
</script>

<style>
    .downpaymentTable {
        max-height: 200px;
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
        margin-left: 5%;
    }

    /* Tooltip text */
    .tooltip .tooltiptext {
        visibility: hidden;
        width: 10vw;
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

    @media (max-width: 400px) {
        .tooltip .tooltiptext {
            visibility: hidden;
            width: 30vw;
            background-color: rgb(14 14 14 / 90%);
            font-size: 75%;
            color: #fff;
            text-align: center;
            padding: 10px 15px;
            border-radius: 6px;
            position: absolute;
            font-weight: normal;
            z-index: 1;
        }
    }

    /* Show the tooltip text when you mouse over the tooltip container */
    .tooltip:hover .tooltiptext {
        visibility: visible;
    }
</style>

<divclass class="downpaymentTable" />
<table class="u-full-width ">
    <thead>
        <tr>
            <th>Dato</th>
            <th>Restgjeld</th>
            <th>
                Terminbeløp
                <div class="infolink tooltip" href="#">
                    <span class="tooltiptext">Terminbeløpet er totalsummen av
                        avdrag, gebyrer og renter som du betaler for lånet hver
                        måned.
                    </span>
                </div>
            </th>
            <th>
                Avdrag
                <div class="infolink tooltip" href="#">
                    <span class="tooltiptext">Den summen du betaler på lånet som
                        trekkes fra hva du skylder banken.</span>
                </div>
            </th>

            <th>
                Renter
                <div class="infolink tooltip" href="#">
                    <span class="tooltiptext">Det banken tar betalt for å låne
                        deg penger.</span>
                </div>
            </th>
        </tr>
    </thead>

    {#if paymentObjects != undefined}
        {#each paymentObjects.nedbetalingsplan.innbetalinger as payment}
            <tr style="font-size: 100%">
                <td name="Dato">{payment.dato}</td>
                <td name="Restgjeld">
                    {formatPrettyNumber(Math.ceil(payment.restgjeld))}kr
                </td>
                <td name="Terminbeløp">
                    {formatPrettyNumber(Math.ceil(payment.total))}kr
                </td>
                <td name="Innbetaling">
                    {formatPrettyNumber(Math.ceil(payment.innbetaling))}kr
                </td>

                <td name="Renter/Gebyr">
                    {formatPrettyNumber(Math.ceil(payment.gebyr + payment.renter))}kr
                </td>
            </tr>
        {/each}
    {/if}
    <tbody />
</table>
<footer style="text-align: center; margin-top: 75;">
    <a href="https://github.com/arienshibani/nedbetalings">Github</a>
</footer>
<div />
