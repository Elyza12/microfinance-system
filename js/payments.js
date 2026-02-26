async function loadBorrowersForPayment(){
    const borrowers = await getBorrowers();
    const select = document.getElementById("borrowerSelect");
    select.innerHTML = "";
    borrowers.forEach(b=>{
        select.innerHTML += `<option value="${b.BorrowerID}">${b.FullName}</option>`;
    });
    select.onchange = loadLoansForBorrower;
    loadLoansForBorrower(); // load first borrower loans
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
    const totalPaid = principalPaid + interestPaid + penaltyPaid;

    // Update loan balance (in real scenario, call Google Apps Script)
    const loans = await getLoans(borrowerID);
    const loan = loans.find(l=>l.LoanID==loanID);
    loan.Balance -= totalPaid;
    if(loan.Balance <= 0) loan.Status="COMPLETED";

    // Normally here you would POST to API to save payment and update loan
    alert(`Payment recorded. New Balance: ${loan.Balance}. Status: ${loan.Status}`);
    loadLoansForBorrower();
}

async function loadPaymentHistory(borrowerID){
    const ul = document.getElementById("paymentHistory");
    // For now, just show a placeholder
    ul.innerHTML = `<li>Payments will appear here after submission.</li>`;
}
