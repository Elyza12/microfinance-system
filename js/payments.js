async function loadBorrowersForPayment(){
    const borrowers = await getBorrowers();
    const select = document.getElementById("borrowerSelect");
    select.innerHTML = "";
    borrowers.forEach(b=>{
        select.innerHTML += `<option value="${b.BorrowerID}">${b.FullName}</option>`;
    });
    select.onchange = loadLoansForBorrower;
    loadLoansForBorrower();
}

async function loadLoansForBorrower(){
    const borrowerID = document.getElementById("borrowerSelect").value;
    const loans = await getLoans(borrowerID);
    const select = document.getElementById("loanSelect");
    select.innerHTML = "";
    loans.filter(l=>l.Status=="ACTIVE").forEach(l=>{
        select.innerHTML += `<option value="${l.LoanID}">${l.LoanID} - Balance: ${l.Balance}</option>`;
    });
    loadPaymentHistory(borrowerID);
}

async function recordPaymentHandler(){
    const loanID = document.getElementById("loanSelect").value;
    const borrowerID = document.getElementById("borrowerSelect").value;
    const principalPaid = parseFloat(document.getElementById("principalPaid").value) || 0;
    const interestPaid = parseFloat(document.getElementById("interestPaid").value) || 0;
    const penaltyPaid = parseFloat(document.getElementById("penaltyPaid").value) || 0;

    const payment = {
        LoanID: loanID,
        BorrowerID:
