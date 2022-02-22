isUpdate = false;

class EmployeePayrollData {
  // getter and setter method
  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    let nameRegex = RegExp("^[A-Z]{1}[a-z]{2,}$");
    if (nameRegex.test(name)) this._name = name;
    else throw "Name is Incorrect";
  }

  get profilePic() {
    return this._profilePic;
  }
  set profilePic(profilePic) {
    this._profilePic = profilePic;
  }

  get gender() {
    return this._gender;
  }

  set gender(gender) {
    this._gender = gender;
  }

  get department() {
    return this._department;
  }

  set department(department) {
    this._department = department;
  }

  get salary() {
    return this._salary;
  }

  set salary(salary) {
    this._salary = salary;
  }

  get note() {
    return this._note;
  }

  set note(note) {
    this._note = note;
  }

  get startDate() {
    return this._startDate;
  }

  set startDate(startDate) {
    let actualDate = new Date(startDate).getTime();
    let currentDate = new Date().getTime();
    if (actualDate > currentDate) {
      throw "Future Date. Date is Invalid";
    } else if (
      Math.abs(currentDate - actualDate) /
        (1000 * 60 * 60 * 24) >
      30
    ) {
      throw "Start Date is beyond 30 days.";
    } else this._startDate = new Date(startDate).toLocaleDateString();
  }
  // method
  toString() {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const empDate = this.startDate === undefined ? "undefined" : this.startDate;
    return (
      "id=" +
      this.id +
      ", name=" +
      this.name +
      ", gender=" +
      this.gender +
      ", profilePic=" +
      this.profilePic +
      ", department=" +
      this.department +
      ", salary=" +
      this.salary +
      ", " +
      "gender=" +
      this.gender +
      ", startDate=" +
      empDate +
      ", notes= " +
      this.note
    );
  }
}

//salary slider
const salary = document.querySelector("#salary");
const output = document.querySelector(".salary-output");
output.textContent = salary.value;
salary.addEventListener("input", function () {
  output.textContent = salary.value;
});

//on Load
window.addEventListener("DOMContentLoaded", (event) => {
  const name = document.querySelector("#name");
  const textError = document.querySelector(".text-error");
  name.addEventListener("input", function () {
    if (name.value.length == 0) {
      textError.textContent = "";
    } else {
      try {
        new EmployeePayrollData().name = name.value;
        textError.textContent = "";
      } catch (e) {
        textError.textContent = e;
      }
    }
  });
  checkForUpdate();
});

//save event
const save = () => {
  try {
    let employeePayrollData = createEmployeePayroll();
    createAndUpdateStorage(employeePayrollData);
    alert("Details Saved");
    resetForm();
  } catch (e) {
    alert(e);
    return;
  }
};

//create data object
const createEmployeePayroll = () => {
  let employeePayrollData = new EmployeePayrollData();
  try {
    employeePayrollData.name = getInputValueById("#name");
    let date =
      getInputValueById("#day") +
      " " +
      getInputValueById("#month") +
      " " +
      getInputValueById("#year");
    if (date == "  ") throw "Invalid Date";
    employeePayrollData.startDate = Date.parse(date);
  } catch (e) {
    throw e;
  }
  employeePayrollData.profilePic = getSelectedValues("[name=profile]").pop();
  employeePayrollData.gender = getSelectedValues("[name=gender]").pop();
  employeePayrollData.department = getSelectedValues("[name=department]");
  employeePayrollData.salary = getInputValueById("#salary");
  employeePayrollData.note = getInputValueById("#notes");
  employeePayrollData.id = new Date().getTime();
  return employeePayrollData;
};

//selectedValue Method
const getSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  let selItems = [];
  allItems.forEach((item) => {
    if (item.checked) selItems.push(item.value);
  });
  return selItems;
};

//getInputValueById
const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
};

//getInputValueByValue
const getInputElementValue = (id) => {
  let value = documentegetElementBy(id).value;
  return value;
};

//updateLocalStorage
function createAndUpdateStorage(employeePayrollData) {
  let employeePayrollList = JSON.parse(
    localStorage.getItem("EmployeePayrollList")
  );
  if (!isUpdate) {
    if (employeePayrollList != undefined) {
      employeePayrollList.push(employeePayrollData);
    } else {
      employeePayrollList = [employeePayrollData];
    }
    localStorage.setItem(
      "EmployeePayrollList",
      JSON.stringify(employeePayrollList)
    );
  }
  else{
    let data = employeePayrollList.find((empData) => empData._id == localStorage.getItem("empEdit"));
    let index=employeePayrollList.indexOf(data)
    employeePayrollList[index]=employeePayrollData;
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList))
    localStorage.removeItem("empEdit");
    alert("Update Succesfully")
    window.location.replace("../pages/homepage.html")
  }
}

//reset form
const resetForm = () => {
  setValue("#name", "");
  unsetSelectedValues("[name=profile]");
  unsetSelectedValues("[name=gender]");
  unsetSelectedValues("[fname=department]");
  setValue("#salary", "");
  setValue("#notes", "");
  setValue("#day", "");
  setValue("#month", "");
  setValue("#year", "");
};

const unsetSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach((item) => {
    item.checked = false;
  });
};

const setTextValue = (id, value) => {
  const element = document.querySelector(id);
  element.textContent = value;
};

const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
};

const checkForUpdate = () => {
  const employeePayrollJSON = localStorage.getItem("empEdit");
  isUpdate = employeePayrollJSON ? true : false;
  if (!isUpdate) {
    return;
  }
  setForm(JSON.parse(employeePayrollJSON));
};

const setForm = (id) => {
  const empPayrollList = JSON.parse(
    localStorage.getItem("EmployeePayrollList")
  );
  let employeePayrollObj = empPayrollList.find((empData) => empData._id == id);
  if (!employeePayrollObj) return;
  setValue("#name", employeePayrollObj._name);
  setSelectedValues("[name=profile]", employeePayrollObj._profilePic);
  setSelectedValues("[name=gender]", employeePayrollObj._gender);
  setSelectedValues("[name=department]", employeePayrollObj._department);
  setValue("#salary", employeePayrollObj._salary);
  setTextValue(".salary-output", employeePayrollObj._salary);
  setValue("#notes", employeePayrollObj._note);
  let date = employeePayrollObj._startDate.toString("DD/MMM/YYYY").split("/");
  setValue("#day", date[1]);
  if (date[0] == 1) {
    date[0] = "Jan";
  }
  if (date[0] == 2) {
    date[0] = "Feb";
  }
  if (date[0] == 3) {
    date[0] = "March";
  }
  if (date[0] == 4) {
    date[0] = "April";
  }
  if (date[0] == 5) {
    date[0] = "May";
  }
  if (date[0] == 6) {
    date[0] = "June";
  }
  if (date[0] == 7) {
    date[0] = "July";
  }
  if (date[0] == 8) {
    date[0] = "Aug";
  }
  if (date[0] == 9) {
    date[0] = "Sept";
  }
  if (date[0] == 10) {
    date[0] = "Oct";
  }
  if (date[0] == 11) {
    date[0] = "Nov";
  }
  if (date[0] == 12) {
    date[0] = "Dec";
  }
  setValue("#month", date[0]);
  setValue("#year", date[2]);
};

const setSelectedValues = (propertyValue, value) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach((item) => {
    if (Array.isArray(value)) {
      if (value.includes(item.value)) {
        item.checked = true;
      }
    } else if (item.value === value) item.checked = true;
  });
};
