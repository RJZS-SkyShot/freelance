function signup() {
  fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value
    })
  }).then(()=>alert("Signup Successful"));
}

function login() {
  fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      email: loginEmail.value,
      password: loginPassword.value
    })
  })
  .then(res=>res.json())
  .then(data=>{
    if(data.success) location="dashboard.html";
    else alert("Wrong login");
  });
}

function submitPAN(e) {
  e.preventDefault();
  fetch("http://localhost:5000/service", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      service_type:"PAN",
      data:{name:name.value,dob:dob.value,aadhaar:aadhaar.value,mobile:mobile.value}
    })
  }).then(()=>alert("Submitted"));
}

function submitWebsite(e) {
  e.preventDefault();
  fetch("http://localhost:5000/service", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      service_type:"Website",
      data:{
        name:name.value,
        business:business.value,
        type:type.value,
        budget:budget.value,
        features:features.value,
        mobile:mobile.value
      }
    })
  }).then(()=>alert("Submitted"));
}
function sendData(service, data) {
  fetch("http://localhost:5000/service", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      service_type: service,
      data: data
    })
  }).then(()=>alert(service + " Submitted"));
}

/* GST */
function submitGST(e){
  e.preventDefault();
  sendData("GST", {
    name: name.value,
    gst: gst.value,
    mobile: mobile.value,
    period: period.value
  });
}

/* ITR */
function submitITR(e){
  e.preventDefault();
  sendData("ITR", {
    name: name.value,
    pan: pan.value,
    income: income.value,
    mobile: mobile.value
  });
}

/* PAN */
function submitPAN(e){
  e.preventDefault();
  sendData("PAN", {
    name: name.value,
    dob: dob.value,
    aadhaar: aadhaar.value,
    mobile: mobile.value
  });
}

/* Voter */
function submitVoter(e){
  e.preventDefault();
  sendData("Voter", {
    name: name.value,
    dob: dob.value,
    address: address.value,
    mobile: mobile.value
  });
}

/* Website */
function submitWebsite(e){
  e.preventDefault();
  sendData("Website", {
    name: name.value,
    business: business.value,
    type: type.value,
    budget: budget.value,
    mobile: mobile.value
  });
}

/* Investment */
function submitInvestment(e){
  e.preventDefault();
  sendData("Investment", {
    name: name.value,
    amount: amount.value,
    type: type.value,
    mobile: mobile.value
  });
}

/* Admission */
function submitAdmission(e){
  e.preventDefault();
  sendData("Admission", {
    name: name.value,
    course: course.value,
    mobile: mobile.value
  });
}
/* Aadhaar */
function submitAadhar(e){
  e.preventDefault();
  sendData("Aadhaar Update", {
    name: name.value,
    aadhaar: aadhaar.value,
    updateType: updateType.value,
    mobile: mobile.value
  });
}

/* TDS */
function submitTDS(e){
  e.preventDefault();
  sendData("TDS", {
    name: name.value,
    tan: tan.value,
    amount: amount.value,
    quarter: quarter.value,
    mobile: mobile.value
  });
}

/* Stock */
function submitStock(e){
  e.preventDefault();
  sendData("Stock Advice", {
    name: name.value,
    budget: budget.value,
    risk: risk.value,
    mobile: mobile.value
  });
}

/* Form Filling */
function submitFormFill(e){
  e.preventDefault();
  sendData("Form Filling", {
    name: name.value,
    formType: formType.value,
    details: details.value,
    mobile: mobile.value
  });
}
function submitNewGST(e){
  e.preventDefault();

  sendData("New GST Registration", {
    name: name.value,
    business: business.value,
    pan: pan.value,
    aadhaar: aadhaar.value,
    mobile: mobile.value,
    email: email.value,
    address: address.value,
    type: type.value
  });
}
function buyNote(noteName){
  alert(noteName + " Purchased");

  // Future: payment integration
}