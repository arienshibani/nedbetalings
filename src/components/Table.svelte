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
            <th>Restgjeld</th>
            <th>Innbetaling</th>
            <th>Gebyr</th>
            <th>Renter</th>
            <th>Total</th>
        </tr>
    </thead>

    {#if paymentObjects != undefined}
        {#each paymentObjects.nedbetalingsplan.innbetalinger as payment}
            <tr style="font-size: 100%">
                <td>{payment.dato}</td>
                <td>{formatPrettyNumber(Math.ceil(payment.restgjeld))}kr</td>
                <td>{formatPrettyNumber(Math.ceil(payment.innbetaling))}kr</td>
                <td>{formatPrettyNumber(Math.ceil(payment.gebyr))}kr</td>
                <td>{formatPrettyNumber(Math.ceil(payment.renter))}kr</td>
                <td>{formatPrettyNumber(Math.ceil(payment.total))}kr</td>
            </tr>
        {/each}
    {/if}
    <tbody />
</table>
<div />
