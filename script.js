let url = `https://6662d4f862966e20ef0a3257.mockapi.io/Table`;
let array = [];
let userId = "";
document.getElementById("updateData").style.display = "none";

// get api
async function apiCall() {
  let response = await fetch(url);
  let data = await response.json();
  let arrData = data;

  let user = "";
  let tbody = document.getElementById("tbody");

  for (let i = 0; i < arrData.length; i++) {
    user += `
                <tr>
                    <td>${arrData[i].Name}</td>
                    <td>${arrData[i].LastName}</td>
                    <td>${arrData[i].RollNo}</td>
                    <td>${arrData[i].Fess}</td>
                    <td><input type="button" value="Edit" id="edit" onclick="ApiEdit(${arrData[i].id})"><input type="button" value="Delete" id="delete" onclick="ApiDelete(${arrData[i].id})"></td>
                </tr>
            `;
  }
  tbody.innerHTML = user;
}

// add data

async function Adddata() {
  let name = document.getElementById("name").value;
  let lastName = document.getElementById("lastName").value;
  let rollNo = document.getElementById("rollNo").value;
  let fees = document.getElementById("fees").value;
  let obj = { Name: name, LastName: lastName, RollNo: rollNo, Fess: fees };

  if (name == "" || lastName == "" || rollNo == "" || fees == "") {
    alert("please enter the data");
  } else {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      document.getElementById("name").value = "";
      document.getElementById("lastName").value = "";
      document.getElementById("rollNo").value = "";
      document.getElementById("fees").value = "";
      apiCall();
    });
  }
}

// delete data
async function ApiDelete(id) {
  fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then(() => {
    document.getElementById("name").value = "";
      document.getElementById("lastName").value = "";
      document.getElementById("rollNo").value = "";
      document.getElementById("fees").value = "";
      document.getElementById("addData").style.display = "inline-block";
      document.getElementById("updateData").style.display = "none";
    apiCall();
  });
}

// edit data
async function ApiEdit(id) {
  let response = await fetch(`${url}/${id}`);
  let data = await response.json();
  let arrData = data;
  userId = id;
  document.getElementById("name").value = arrData.Name;
  document.getElementById("lastName").value = arrData.LastName;
  document.getElementById("rollNo").value = arrData.RollNo;
  document.getElementById("fees").value = arrData.Fess;
  document.getElementById("updateData").style.display = "inline-block";
  document.getElementById("addData").style.display = "none";
  apiCall();
}

// update data
async function ApiUpdate() {
  let name = document.getElementById("name").value;
  let lastName = document.getElementById("lastName").value;
  let rollNo = document.getElementById("rollNo").value;
  let fees = document.getElementById("fees").value;
  let obj = { Name: name, LastName: lastName, RollNo: rollNo, Fess: fees };
  if (name == "" || lastName == "" || rollNo == "" || fees == "") {
    alert("please enter the data");
  } else {
    fetch(`${url}/${userId}`, {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      document.getElementById("name").value = "";
      document.getElementById("lastName").value = "";
      document.getElementById("rollNo").value = "";
      document.getElementById("fees").value = "";
      userId = "";
      document.getElementById("addData").style.display = "inline-block";
      document.getElementById("updateData").style.display = "none";
      apiCall();
    });
  }
}
