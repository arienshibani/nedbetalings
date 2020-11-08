<script>
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
</style>

<divclass class="downpaymentTable" />
<table class="u-full-width ">
    <thead>
        <tr>
            <th>Dato</th>
            <th>Å Betale</th>
            <th>Betjening</th>
            <th>Restgjeld</th>
            <th>Gebyr og Renter</th>
        </tr>
    </thead>

    {#if paymentObjects != undefined}
        {#each paymentObjects.nedbetalingsplan.innbetalinger as payment}
            <tr style="font-size: 100%">
                <td name="Dato">{payment.dato}</td>
                <td name="Å betale">
                    {formatPrettyNumber(Math.ceil(payment.total))}kr
                </td>
                <td name="Betjening">
                    {formatPrettyNumber(Math.ceil(payment.innbetaling))}kr
                </td>
                <td name="Restgjeld">
                    {formatPrettyNumber(Math.ceil(payment.restgjeld))}
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
