async function loadBorrowers(){
    const borrowers = await getBorrowers();
    const ul = document.getElementById("borrowerList");
    const select = document.getElementById("borrowerSelect");
    ul.innerHTML = ""; select.innerHTML = "";
    borrowers.forEach(b=>{
        ul.innerHTML += `<li>${b.BorrowerID} - ${b.FullName}</li>`;
        select.innerHTML += `<option value="${b.BorrowerID}">${b.FullName}</option>`;
    });
}

async function addBorrowerHandler(){
    const b = {
        FullName: document.getElementById("borrowerName").value,
        Contact: document.getElementById("borrowerContact").value,
        Address: document.getElementById("borrowerAddress").value,
        Status: "Active"
    };
    const result = await addBorrower(b);
    alert("Borrower Added: "+result.BorrowerID);
    loadBorrowers();
}

async function addLoanHandler(){
    const l = {
        BorrowerID: document.getElementById("borrowerSelect").value,
        Principal: parseFloat(document.getElementById("loanPrincipal").value),
        InterestType: document.getElementById("interestType").value,
        InterestRate: parseFloat(document.getElementById("interestRate").value),
        InterestAmount: parseFloat(document.getElementById("interestRate").value),
        ReleaseDate: document.getElementById("releaseDate").value,
        DueDate: document.getElementById("dueDate").value,
        MonthlyPenalty: parseFloat(document.getElementById("monthlyPenalty").value)||0,
        Notes:""
    };
    const result = await addLoan(l);
    if(result.success) alert("Loan Created: "+result.LoanID);
    else alert(result.message);
}
