<script>
    export let paymentObjects;
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
                <td>{Math.ceil(payment.restgjeld)}kr</td>
                <td>{Math.ceil(payment.innbetaling)}kr</td>
                <td>{Math.ceil(payment.gebyr)}kr</td>
                <td>{Math.ceil(payment.renter)}kr</td>
                <td>{Math.ceil(payment.total)}kr</td>
            </tr>
        {/each}
    {/if}
    <tbody />
</table>
<div />
