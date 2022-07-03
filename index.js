// chrome://extensions/
let myLead=[];

const ulEl = document.querySelector("#ul-el");
const inputEl =document.querySelector("#input-el");
const inputBtn = document.querySelector("#input-btn");
const tabBtn = document.querySelector("#tab-btn");
const deleteBtn = document.querySelector("#delete-btn");
// to fetch items from local storage, match the above empty list with the array name dowm "myLead"
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLead") )



// if items in loca storage, then push the items to myLead array in index.js and render the items
if (leadsFromLocalStorage){
  for (let i=0; i< leadsFromLocalStorage.length;i++){
    myLead.push(leadsFromLocalStorage[i]);
    console.log(myLead);
    render(myLead);
}
}

// save the current tab in chrome
tabBtn.addEventListener("click", function(){
  chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
    myLead.push(tabs[0].url);
    localStorage.setItem("myLeads",JSON.stringify(myLead));
    render(myLead);
  })
})

function render(leads){
  while (ulEl.hasChildNodes()) {
    console.log(ulEl)
      ulEl.removeChild(ulEl.children[0]);
    }
  for (let i=0; i<leads.length;i++){

    let li =document.createElement("li");
    let a =document.createElement("a");
    a.textContent = "https://"+leads[i];
    a.href ="https://"+leads[i];
    a.target= "_blank";
    li.appendChild(a);
    ulEl.appendChild(li);
  }
}


inputBtn.addEventListener("click", function(){
  let inputValue = inputEl.value;
  myLead.push(inputValue);
  localStorage.setItem("myLeads", JSON.stringify(myLead))
  console.log(localStorage.getItem("myLeads"));
  inputEl.value =" ";
  render(myLead);
})



deleteBtn.addEventListener("dblclick", function(){

  myLead=[];
  localStorage.setItem("myLeads", JSON.stringify(myLead))
  render(myLead);

})
