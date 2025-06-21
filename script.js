let rate;
let years;
let loan;
function findrate() {
    rate = Math.floor((document.getElementById("rate").value / 100) * 20);
    document.getElementById("interest").value = rate;
}

function findyears() {
    years = Math.floor((document.getElementById("tenture").value / 100) * 30);
    document.getElementById("years").value = years;
}

function findloan() {
    loan = ((document.getElementById("range").value / 100) * 10000000);
    document.getElementById("loan").value = loan;
    console.log(loan);
}

document.getElementById("button").addEventListener("click", function () {
    let rates = parseFloat(document.getElementById("interest").value);
    let year = parseFloat(document.getElementById("years").value);
    let loans = parseFloat(document.getElementById("loan").value);
    document.getElementById("principal").textContent = `${loans}/-`;
    let monthly_interest = rates / (12 * 100);
    let months = parseFloat(year * 12);
    let emi = (loans * monthly_interest * (Math.pow(1 + monthly_interest, months))) / (Math.pow(1 + monthly_interest, months) - 1);
    document.getElementById("result").textContent = `Your monthly EMI is ${emi.toFixed(2)}/-`;
    let total_amount = emi * months;
    let int = total_amount - loans;
    document.getElementById("interest").textContent = `${int}/-`;
    document.getElementById("total").textContent = `${total_amount.toFixed(2)}/-`;

    if (window.pieChart) {
        window.pieChart.destroy();
    }

    let ctx = document.getElementById("loanPieChart").getContext("2d");
    window.pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                data: [loans, int],
                backgroundColor: ['rgb(209, 57, 57)', 'rgb(237, 155, 4)'], 
                borderWidth: 1
            }]
        }
    });
})