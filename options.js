document.onload
//this "listens" for when the 'Add new Record' located on the html page is clicked and then fires the function addnewrecord show
document.getElementById("addnewrecord").addEventListener("click", addnewrecordshow)
// this "listens" for when the "cancel" button is clicked on the "Add New Record Form" and fires the canceladding function to show the records again. 
document.getElementById("canceladd").addEventListener("click", canceladding)
// this "listens" for when the "Add New Record" button is clicked on the "Add New Record Form" and fires the addnewrecord function 
document.getElementById("recordadd").addEventListener("click", addnewrecord)




//getting sheet data
chrome.identity.getAuthToken({ 'interactive': true }, getToken); //this is what initially gets access to the sheet
//this will get a token each time this page is loaded
function getToken(token) {
    
    
    let init = {
         method: 'GET',
         async: true,
         headers: {
           Authorization: 'Bearer ' + token,
           'Content-Type': 'application/json'
         },
         'contentType': 'json'
       };
       fetch(
           "https://sheets.googleapis.com/v4/spreadsheets/1M8ft0poflmMyYPFr7xMg7rNxD1WkYXEbi4RYl9rjxC4/values/Sheet1!A5:Z10000001",  // Replace 1M8ft0poflmMyYPFr7xMg7rNxD1WkYXEbi4RYl9rjxC4 with your sheetID. You can find this in the URL of your sheet. Replace Sheet1!A5:Z10000001 with your sheet name followed by the "!" and what where you want to start at. I started at A5
           init)
           .then((data) => {
           
           return data.json();
           }).then ((completedata) => {
 
             const rows = completedata.values;
 
             if (!rows || rows.length === 0){
 
                document.getElementById("displaysheetdata").innerHTML="No Records Found"  //this will display if the sheet is empty
 
                 return;
             }

             let data1="";

             // I used a card to display the records here. You can also use a table as well. 
             rows.map((row)=> {
               
                 data1+=`
                 
                 <div class="card mb-4 " data-id=${row[0]}>
                 
                 
                 <span class="card-header mb-4"><strong>Name:</strong>
                 <span class="nameeditdisplay">${row[1]}</span></span>              
               <p mt-4>
                <span class="card-body mt-3"><strong>Email:</strong>
                 <span class="card-text emaileditdisplay">${row[2]}</span>
                 </p>
                 <p>
                 <span class="card-body mt-3"><strong>Phone:</strong>
                 <span class="card-text phoneeditdisplay">${row[3]}</span></span>
                 </p>
                 <p>
                 <span class="card-body mt-3"><strong>City:</strong>
                 <span class="card-text cityeditdisplay ">${row[4]}</span></span>
                 </p>
                 <button href="#" id="editrecordbtn" type="button" class="btn btn-primary align-self-end mt-2">    
             Edit</button>
               <button href="#" id="deleterecordbtn" type="button" class="btn btn-danger align-self-end mt-2">Delete</button>
                 </div>
               
                 `
                     
             })
             

             document.getElementById("displaysheetdata").innerHTML=data1 // This will populate the div with ID displaysheetdata on the html page. 
                          
             
         })
    }

    //edit records
const recordedit =document.querySelector("#displaysheetdata")

recordedit.addEventListener('click', (e) => {
    e.preventDefault();
  
  let editrecordbtn = e.target.id == 'editrecordbtn';
  
        if(editrecordbtn){
            const parent = e.target.parentElement

            
            let recordid = e.target.parentElement.dataset.id
            let nameeditdisplay = parent.querySelector('.nameeditdisplay').textContent
            let phoneeditdisplay = parent.querySelector('.phoneeditdisplay').textContent
            let cityeditdisplay = parent.querySelector('.cityeditdisplay').textContent
            let emaileditdisplay = parent.querySelector('.emaileditdisplay').textContent
            
            console.log(recordid)
            console.log(nameeditdisplay)
            console.log(phoneeditdisplay)
            console.log(cityeditdisplay)
            console.log(emaileditdisplay)
            let editrecordform=""
  
            editrecordform=`
            <div id="editarescalationform">
              <h5 class ="mt-4 text-center"><strong>Edit Record</strong> </h5>              
            <form class="row g-3 mt-4">
            <div class="col-md-3">
              <label for="nameeditdisplay" class="form-label">Name</label>
              <input type="text" class="form-control"  id="nameeditdisplay"value= ${nameeditdisplay}>
              
            </div>
            <div class="col-md-3">
              <label for="emaileditdisplay" class="form-label casenoaredit">Email</label>
              <input type="text" class="form-control"  id="emaileditdisplay" value= ${emaileditdisplay}>
              
            </div>
            <div class="col-md-3">
              <label for="phoneeditdisplay" class="form-label casenoaredit">Phone Number</label>
              <input type="text" class="form-control"  id="phoneeditdisplay" value=${phoneeditdisplay}>
              
            </div>
            <div class="col-3">
              <label for="cityeditdisplay" class="form-label">City</label>
              <input type="text"  class="form-control" id="cityeditdisplay" value=${cityeditdisplay}>
            </div>
           
           
            <div class="col-12 text-center">
              <button id="updatearescalationbtn" type="button" class="btn btn-primary">Update Escalation</button>
              <button id="cancelareditbtn" type="button" class="btn btn-primary">Cancel Update</button>
            </div>
           </form>
           </div>
             `
             document.getElementById("displaysheetdata").style.display="none"
             document.getElementById("recordeditview").style.display="block"
             document.getElementById("addnewrecord").style.display="none"
             document.getElementById("pagetitle").style.display="none"
             
            
             
             
             document.getElementById("recordeditview").innerHTML=editrecordform
             document.getElementById("cancelareditbtn").addEventListener("click", cancelaredit);
             document.getElementById("updatearescalationbtn").addEventListener("click", updaterecord);
           
             function cancelaredit(){
           
              window.location.reload()
             }
           
             function updaterecord(){
               chrome.identity.getAuthToken({ 'interactive': true }, getToken);
           
               function getToken(token) {
                 
                 let initeqplread = {
                   method: 'GET',
                   async: true,
                   headers: {
                     Authorization: 'Bearer ' + token,
                     'Content-Type': 'application/json'
                   },
                   'contentType': 'json'
                 };
                 fetch(
                   "https://sheets.googleapis.com/v4/spreadsheets/1M8ft0poflmMyYPFr7xMg7rNxD1WkYXEbi4RYl9rjxC4/values/Sheet1!A5:Z10000001",
                   initeqplread)
                   
                   .then((data) => {
                     
                     return data.json();
           
                     }).then ((completedata) => {
                       
                     const numRows = completedata.data ? completedata.data.length: 0
                     console.log(`${numRows} rows retrieved`)
                      source = completedata.values;
                     const input = source.filter(function (row, index) {
                       row.unshift(index);
                       return row;
                       
                   }).filter(function (iRow) {
                           return iRow[1] === recordid;
                       });
                       var index = parseInt(input[0]) + 5; //Saves the old index
                       input[0].shift();
                       let namechange = document.getElementById('nameeditdisplay').value
                       let emailchange = document.getElementById('emaileditdisplay').value
                       let phonechange = document.getElementById('phoneeditdisplay').value
                       let citychange = document.getElementById('cityeditdisplay').value
                       
                       console.log (index)
                  input[0]= recordid ; //Update the row with stuff
                   input[1] = namechange;
                   input[2]= emailchange;
                   input[3]= phonechange;
                   input[4]= citychange;
                   
           
                   let values = [
           
                     
                   
                   input[0],
                   input[1],
                   input[2],
                   input[3],
                   input[4],
                   
                 
                       
                   ];
           
                   
                   const resource = {
                       values
                   };
           
                   console.log(values)
                   chrome.identity.getAuthToken({ 'interactive': true }, getToken);
           
                   function getToken(token) {
                   var payload = {
                     
                     "range": "Sheet1!A" + index + ":E" ,
                     "values": resource
                   }
                 let  range = "Sheet1!A" + index + ":E"
                 let key ="AIzaSyDD1_zbd7lerlCa7R8wV8GA4t5WcWE-R-0"
               let initeqplupdate = {
                 method: 'PUT',
                 async: true,
                 
                 headers: {
                   Authorization: 'Bearer ' + token,
                   
                 },
                 body: JSON.stringify(payload)
                 
               };
               fetch(
                   `https://sheets.googleapis.com/v4/spreadsheets/1M8ft0poflmMyYPFr7xMg7rNxD1WkYXEbi4RYl9rjxC4/values/${range}/?valueInputOption=USER_ENTERED&key=${key}`,
                   initeqplupdate).then(()=>{
                     alert("Record Updated")
                     window.location.reload()
                   })
                 }
                     })
                   
                      
           
               }
             
               
           }
         
        
            

        }
 
    })

    


// This function fires if the "Add new Record" button is clicked on the html page. 
function addnewrecordshow(){

    document.getElementById("addingnewrecord").style.display="block"
    document.getElementById("displaysheetdata").style.display="none"
    document.getElementById("addnewrecord").style.display="none"
 
  }

  //This function fires if the "cancel" button is clicked on the "Add New Record" Form. 

  function canceladding(){

    document.getElementById("addingnewrecord").style.display="none"
    document.getElementById("displaysheetdata").style.display="block"
    document.getElementById("addnewrecord").style.display="block"
    
  }
//  This function fires when the "Add New Record" button on the form is clicked. 
  function addnewrecord(){

    let ID = (Math.floor(100000 + Math.random() * 90000000000000))
    let firstname = document.getElementById("name").value
    let EmailAddress = document.getElementById("email").value
    let Phone = document.getElementById("phone").value
    let City = document.getElementById("inputCity").value


    chrome.identity.getAuthToken({ 'interactive': true }, getToken);

    function getToken(token) {

     let   values=[[
            ID,
            firstname,
            EmailAddress,
            Phone,
            City

        ]]
    var payload ={
        "range":"Sheet1",
        "values": values
    }
    
    let init = {
        "range":"Sheet1",
        "majorDimension":"Rows",
         method: 'POST',
         async: true,
         headers: {
           Authorization: 'Bearer ' + token,
           'Content-Type': 'application/json'
         },
         'contentType': 'json',
         body:JSON.stringify(payload)
       };
       
      
       fetch(
           "https://sheets.googleapis.com/v4/spreadsheets/1M8ft0poflmMyYPFr7xMg7rNxD1WkYXEbi4RYl9rjxC4/values/Sheet1:append?valueInputOption=USER_ENTERED",
           init).then(()=>{
            console.log(init)
           }).then(()=>{
            alert("New Record Added")
            window.location.reload()
           })
  
    }
 
}

//Delete records


 
  
  
  const deleterecord =document.querySelector("#displaysheetdata")

  deleterecord.addEventListener('click', (e) => {
      e.preventDefault();
    
    let deleterecordbtn = e.target.id == 'deleterecordbtn';
    
          if(deleterecordbtn){
              const parent = e.target.parentElement
  
              
              let recordid = e.target.parentElement.dataset.id
              let nameeditdisplay = parent.querySelector('.nameeditdisplay').textContent
              let phoneeditdisplay = parent.querySelector('.phoneeditdisplay').textContent
              let cityeditdisplay = parent.querySelector('.cityeditdisplay').textContent
              let emaileditdisplay = parent.querySelector('.emaileditdisplay').textContent
              
              console.log(recordid)
              console.log(nameeditdisplay)
              console.log(phoneeditdisplay)
              console.log(cityeditdisplay)
              console.log(emaileditdisplay)

              if (confirm("Are you sure you want to delete" + " " + nameeditdisplay +"?" + " "  + "This CANNOT BE UNDONE!!")== true){
                chrome.identity.getAuthToken({ 'interactive': true }, getToken);

                function getToken(token) {
                 
                  let initeqplread = {
                    method: 'GET',
                    async: true,
                    headers: {
                      Authorization: 'Bearer ' + token,
                      'Content-Type': 'application/json'
                    },
                    'contentType': 'json'
                  };
                  fetch(
                    "https://sheets.googleapis.com/v4/spreadsheets/1M8ft0poflmMyYPFr7xMg7rNxD1WkYXEbi4RYl9rjxC4/values/Sheet1!A5:Z10000001",
                    initeqplread)
                    
                    .then((data) => {
                      
                      return data.json();
            
                      }).then ((completedata) => {
                        
                      const numRows = completedata.data ? completedata.data.length: 0
                      
             
                      source = completedata.values;
                      const input = source.filter(function (row, index) {
                        row.unshift(index);
                        return row;
                        
                    }).filter(function (iRow) {
                            return iRow[1] === recordid;
                        });
                        var index = parseInt(input[0]) + 5; //Saves the old index
                        input[0].shift();
                        
                        console.log(index)
                        chrome.identity.getAuthToken({ 'interactive': true }, getToken);
           
                        function getToken(token) {
                          sheetnumber = "1M8ft0poflmMyYPFr7xMg7rNxD1WkYXEbi4RYl9rjxC4"
                        var payload = {

                          "requests":
                          [{
                          "deleteDimension":{
                            "range": {
                            
                            "sheetId": 0,
                            "dimension": "ROWS", 
                            "startIndex": index -1,
                            "endIndex": index 
                          }
                          }
                        }
                        ]
                        }
                        
                    //  let  range = "Sheet1!A" + index + ":E"
                    //  let key ="AIzaSyDD1_zbd7lerlCa7R8wV8GA4t5WcWE-R-0"
                    let initeqplupdate2 = {
                      method: 'POST',
                      async: true,
                      
                      headers: {
                        Authorization: 'Bearer ' + token,
                        
                      },
                      body: JSON.stringify(payload)
                      
                    };
                    fetch(
                        `https://sheets.googleapis.com/v4/spreadsheets/${sheetnumber}:batchUpdate`,
                        initeqplupdate2).then (()=>{
                          window.location.reload()
                        })
                    }
               })
              
              
            
                }


              } else {
                window.location.reload()
              }

          }
        })