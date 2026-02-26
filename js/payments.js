async function recordPaymentHandler(){
    const loanID = document.getElementById("loanSelect").value;
    const borrowerID = document.getElementById("borrowerSelect").value;
    const principalPaid = parseFloat(document.getElementById("principalPaid").value) || 0;
    const interestPaid = parseFloat(document.getElementById("interestPaid").value) || 0;
    const penaltyPaid = parseFloat(document.getElementById("penaltyPaid").value) || 0;

    const payment = {
        LoanID: loanID,
        BorrowerID: borrowerID,
        PrincipalPaid: principalPaid,
        InterestPaid: interestPaid,
        PenaltyPaid: penaltyPaid,
        Notes:""
    };

    const res = await fetch(API_URL, {
        method:"POST",
        body: JSON.stringify({action:"recordPayment", payment: payment})
    });
    const result = await res.json();

    if(result.success){
        alert(`Payment recorded!\nNew Balance: ${result.Balance}\nLoan Status: ${result.LoanStatus}`);
        loadLoansForBorrower(); // refresh loan select
    } else {
        alert("Error: " + result.message);
    }
}
