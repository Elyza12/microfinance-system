async function loadDashboard() {
    const loans = await getAllLoans();
    const payments = await getAllPayments();

    const activeLoans = loans.filter(l => l.Status == "ACTIVE").length;
    document.getElementById("activeLoans").innerText = activeLoans;

    const totalReleased = loans.reduce((sum,l)=>sum + parseFloat(l.Principal||0),0);
    document.getElementById("totalReleased").innerText = "₱" + totalReleased;

    const totalCollected = payments.reduce((sum,p)=>sum + parseFloat(p.TotalPaid||0),0);
    document.getElementById("totalCollected").innerText = "₱" + totalCollected;

    const totalProfit = payments.reduce((sum,p)=>sum + parseFloat(p.InterestPaid||0) + parseFloat(p.PenaltyPaid||0),0);
    document.getElementById("totalProfit").innerText = "₱" + totalProfit;

    const today = new Date();
    const overdueLoans = loans.filter(l => l.Status=="ACTIVE" && new Date(l.DueDate) < today).length;
    document.getElementById("overdueLoans").innerText = overdueLoans;
}
