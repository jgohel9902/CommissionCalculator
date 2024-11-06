document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Getting the input values
        const agentName = document.getElementById('Agent Name').value;
        const agentNumber = document.getElementById('Agent Number').value;
        const agentCity = document.getElementById('Agent City').value;
        const totalCostPhones = parseFloat(document.getElementById('totalcostofphones').value);
        const totalCostAccessories = parseFloat(document.getElementById('totalcostofaccessories').value);
        const commissionReceived = parseFloat(document.getElementById('Commission Received').value) || 0;

        // Validating numeric fields
        if (isNaN(totalCostPhones) || isNaN(totalCostAccessories) || isNaN(commissionReceived)) {
            alert('Numeric fields must have valid numbers.');
            return;
        }

        // Validating agent number using regex
        const agentNumberRegex = /^[A-Za-z]{2}\d{6}$/;
        if (!agentNumberRegex.test(agentNumber)) {
            alert('Agent Number must be in the format XX999999.');
            return;
        }

        // Calculating total sale and commission
        const totalSelling = totalCostPhones + totalCostAccessories;
        let commissionPercentage;

        if (totalSelling < 10000) {
            commissionPercentage = 0.1;
        } else if (totalSelling >= 10000 && totalSelling <= 20000) {
            commissionPercentage = 0.15;
        } else {
            commissionPercentage = 0.2;
        }

        const totalCommissionEarned = totalSelling * commissionPercentage;
        const remainingCommission = totalCommissionEarned - commissionReceived;

        // Display output
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = `
            <h2>Information for Commission for ${agentName}</h2>
            <p><strong>Agent Number:</strong> ${agentNumber}</p>
            <p><strong>Agent City:</strong> ${agentCity}</p>
            <p><strong>Total Sale:</strong> $${totalSelling.toFixed(2)}</p>
           
            <p><strong>Total Commission:</strong> $${totalCommissionEarned.toFixed(2)}</p>
            <p><strong>Commission Received:</strong> $${commissionReceived.toFixed(2)}</p>
            <p><strong>Pending Commission:</strong> $${remainingCommission.toFixed(2)}</p>
        `;
    });
});