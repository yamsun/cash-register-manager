var checkBtn = document.querySelector("#checkBtn");
var billAmount = document.querySelector("#bill-amount");
var cashRcvd = document.querySelector("#cash-rcvd");
// var billAmountValue = billAmount.value;
// var cashRcvdValue = cashRcvd.value;
var errorDiv = document.querySelector("#error-msg");
var resetBtn = document.querySelector("#resetBtn");

var checkboxRow = document.getElementById("checkbox-row");
var checkboxCells = checkboxRow.getElementsByTagName("td");
var myHistory = {"billAmt":[],"cashRcvd":[],"moneyMade":[]};

var historyBtn = document.getElementById("view-history-btn");
historyBtn.addEventListener("click",showHistoryFn);

var hideHistoryBtn = document.getElementById("hide-history-btn");
hideHistoryBtn.addEventListener("click",hideHistoryFn);

var clearHistoryBtn = document.getElementById("clear-history-btn");
clearHistoryBtn.addEventListener("click",clearHistoryFn)

// checkboxCells.length is 11
// check if a checkbox is checked or not => https://flaviocopes.com/how-to-check-checkbox-checked/
//

// var availableNotes = []; //list of available notes


//below function gives the html element of the available kind of notes
function getElementsInNotesList(){
    var availableNotes = [];
    for(i=0; i<checkboxCells.length; i++){
        if((checkboxCells[i].getElementsByTagName("input")[0].checked)== true ){
            availableNotes.push(document.getElementById("kindOfNotes").getElementsByTagName("td")[i]);
        }
    }
    return availableNotes;
}

//check if a checkbox element is checked or not
//returns true or false
//input in form of listOfAllCheckbox[i]
function isChecked(element){
    return (element.getElementsByTagName("input")[0].checked);
}

//this function returns number values of available kind of notes
function getValuesInNotesList(){
    var availableNotes = [];
    var myList = getElementsInNotesList();
    for(i=0;i<myList.length;i++){
        availableNotes.push(Number(myList[i].innerText));
    }
    return availableNotes; 
}


var listOfAllNotes = document.getElementById("kindOfNotes").getElementsByTagName("td");
var listOfAllCheckbox = checkboxCells;
var listOfNumberOfNotes = document.getElementById("noteCount").getElementsByTagName("td");


function showFinalResult(){
    var amount = calculateMoneyToReturn();
    console.log("amount ",amount);
    for(i=0;i<11;i++){
        var isAvailable = isChecked(listOfAllCheckbox[i]);
        var noteValue = Number(listOfAllNotes[i].innerText);
        var noOfNoteValue = listOfNumberOfNotes[i].innerText; //this is string, not a number yet
        console.log(isAvailable);
        console.log(noteValue);
        console.log(noOfNoteValue);
        if(isChecked(listOfAllCheckbox[i])){
            var answer = Math.floor(amount/noteValue);
            listOfNumberOfNotes[i].innerText = answer;
            amount = amount - noteValue*answer;
        }
        else{
            listOfNumberOfNotes[i].innerText="0" //if note not available, means unchecked then 0
        }
    }
}








function getClassNameOfNotesListElement(num){

}

function calculateMoneyToReturn(){
    let moneyToReturn = Number(document.getElementById("cash-rcvd").value)-Number(document.getElementById("bill-amount").value);
    if(moneyToReturn<0){
        showError("!! Cash Received is less than Bill Amount !!");
        return 0; //will show 0 notes there, otherwise it was displaying NaN
    }
    else if(moneyToReturn==0){
        showError("Nothing to return !!");
        return 0; //will show 0 notes there, otherwise it was displaying NaN
    }
    else{
        return moneyToReturn;
    }

}

function showError(txt){
    // console.log("error consoled");
    errorDiv.innerText = txt;
    errorDiv.style.display="block";
}

function resetBtnClickHandler(){
    //reset btn erases all value without any external js
    //this function is to erase any previous error-msg
    showError("");
    //write code here to disable cash input button until bill input is not done
    //code below is to reset the table

    
    for(i=0;i<11;i++){
        //set every checkbox to checked state
        checkboxCells[i].getElementsByTagName("input")[0].checked = true; 

        //set every no. of notes to 0
        listOfNumberOfNotes[i].innerText="0";


    }
    
    // now set inputs to blank

    billAmount.value="";
    cashRcvd.value="";



}

var myIndex=0;
function checkBtnClickHandler(){
    showError(""); //reset error msg to empty
    
    showFinalResult();

    //store in history 
    var myBill =Number(document.getElementById("bill-amount").value);
    var myCash = Number(document.getElementById("cash-rcvd").value);

    myIndex=myIndex+1;

    makeHistory(myBill,myCash,myIndex); //update history in DOM everytime user click the Check button
    //I tried storing values in object and then updationg only when view history is clicked but things got messed up like re-printing old ones



    
}


// var myIndex=0;

function makeHistory(bill,cash,index){
    // var myIndex=0;

        // var myIndex = Index +1; //index on page should show starting from one na lol
        var myBill = bill;
        var myCash = cash;
        var myMoneyMade = myCash - myBill;
        var newTableRow = document.createElement('tr');
        var newIndex = document.createElement('td');
        var newBill = document.createElement('td');
        var newCash = document.createElement('td');
        var newMoneyMade = document.createElement('td');
        newIndex.innerText = myIndex;
        newBill.innerText = myBill;
        newCash.innerText = myCash;
        newMoneyMade.innerText = myMoneyMade;
        
        newTableRow.appendChild(newIndex);
        newTableRow.appendChild(newBill);
        newTableRow.appendChild(newCash);
        newTableRow.appendChild(newMoneyMade);

        var myHistoryTable = document.getElementById("history-table");
        myHistoryTable.appendChild(newTableRow);
    // }
}


function showHistoryFn(){
    document.getElementById("history-section").style.display="block";
    //unhide history section
}
function hideHistoryFn(){
    document.getElementById("history-section").style.display="none";
    
}

function clearHistoryFn(){
    myIndex=0; //set index to 0 again, otherwise even after clearing history index was startnig from where prev index ended 
    var myTableRows = document.getElementById("history-table").getElementsByTagName("tr");
    //leave first tr coz that is th (table-heading)

    for(i=myTableRows.length-1; i>0; i-- ){
        myTableRows[i].remove();
    }


}

function billAmountChangeHandler(data){ 
    //data.target.value is same as billAmount.value , can use any here
    //document.getElementById("cash-rcvd") is same as cashRcvd, can use any here

    showError("");

    if(data.target.value>0){ 
        document.getElementById("cash-rcvd").disabled = false;
    }
    else{
        document.getElementById("cash-rcvd").disabled = true;
    }
}

function cashAmountChangeHandler(){
    showError("");
    return;
}

// function(){}


billAmount.addEventListener("input",  billAmountChangeHandler);
cashRcvd.addEventListener("input",cashAmountChangeHandler);
checkBtn.addEventListener("click", checkBtnClickHandler);
resetBtn.addEventListener("click",resetBtnClickHandler);



