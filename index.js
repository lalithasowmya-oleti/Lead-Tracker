let myLeads =[]
let oldLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn =document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click",function(){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
      })
})

function render(leads){
    let listItems = "" //created listItems variable to hold list items and assigned it to an empty string to begin with
    for(let i = 0; i < leads.length; i++){
        listItems += `<li>
            <a target='_blank' href ='${leads[i]}'>
                ${leads[i]}
            </a>
        </li> `      
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    inputEl.value =""//clear out the input field after submit
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads) //whatever we searched displays when renderLEads() is called
    console.log(localStorage.getItem("myLeads"))
})