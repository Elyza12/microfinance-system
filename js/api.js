const API_URL = "https://script.google.com/macros/s/AKfycbzJPQZw9vc81-X2GzYKUB44tk7q7IJQJG7lfmVG8mAnjcBOED0Jn700WmH13-Zv2ZJTDQ/exec"; // Replace with your Web App URL

// Borrowers
async function getBorrowers() {
    const res = await fetch(API_URL, {method:"POST", body: JSON.stringify({action:"getBorrowers"})});
    return await res.json();
}

async function addBorrower(borrowerData){
    const res = await fetch(API_URL, {method:"POST", body: JSON.stringify({action:"addBorrower", data: borrowerData})});
    return await res.json();
}

// Loans
async function getLoans(borrowerID){
    const res = await fetch(API_URL, {method:"POST", body: JSON.stringify({action:"getLoans", borrowerID})});
    return await res.json();
}

async function addLoan(loanData){
    const res = await fetch(API_URL, {method:"POST", body: JSON.stringify({action:"addLoan", data: loanData})});
    return await res.json();
}

async function getAllLoans(){
    const res = await fetch(API_URL, {method:"POST", body: JSON.stringify({action:"getAllLoans"})});
    return await res.json();
}

// Payments
async function recordPayment(payment){
    const res = await fetch(API_URL, {method:"POST", body: JSON.stringify({action:"recordPayment", payment})});
    return await res.json();
}

async function getAllPayments(){
    const res = await fetch(API_URL, {method:"POST", body: JSON.stringify({action:"getAllPayments"})});
    return await res.json();
}
