async function loadDashboard() {
    const loans = await getAllLoans(); // we will create this function in api.js
    const payments = await getAllPayments(); // fetch all payments

    // Active Loans
    const activeLoans = loans.filter(l => l.Status == "ACTIVE").length;
    document.getElementById("activeLoans").innerText = activeLoans;

    // Total Released
    const totalReleased = loans.reduce((sum,l)=>sum + parseFloat(l.Principal || 0),0);
    document.getElementById("totalReleased").innerText = "₱" + totalReleased;

    // Total Collected
    const totalCollected = payments.reduce((sum,p)=>sum + parseFloat(p.TotalPaid || 0),0);
    document.getElementById("totalCollected").innerText = "₱" + totalCollected;

    // Total Profit (interest + penalty)
    const totalProfit = payments.reduce((sum,p)=>sum + parseFloat(p.InterestPaid || 0) + parseFloat(p.PenaltyPaid || 0),0);
    document.getElementById("totalProfit").innerText = "₱" + totalProfit;

    // Overdue Loans
    const today = new Date();
    const overdueLoans = loans.filter(l => l.Status=="ACTIVE" && new Date(l.DueDate) < today).length;
    document.getElementById("overdueLoans").innerText = overdueLoans;
}
