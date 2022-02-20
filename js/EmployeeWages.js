

class EmployeePayrollData {
  // getter and setter method
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
    if(actualDate>currentDate)
    {    
      throw "Future Date. Date is Invalid"
    }
    else
      this._startDate = new Date(startDate).toLocaleDateString();
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
});

//save event
const save = () => {
  try {
    let employeePayrollData = createEmployeePayroll();
    createAndUpdateStorage(employeePayrollData);
    alert("Details Saved")
  } catch (e) {
    alert(e);
    return;
  }
};

//create data object
const createEmployeePayroll = () => {
  let employeePayrollData = new EmployeePayrollData();
  try {
  } catch (e) {
    setTextValue(".text-error", e);
    throw e;
  }
  try {
    employeePayrollData.name = getInputValueById("#name");
    let date =
    getInputValueById("#day") +
    " " +
    getInputValueById("#month") +
    " " +
    getInputValueById("#year");
    employeePayrollData.startDate=Date.parse(date);
  } catch(e){
    throw e
  }
  employeePayrollData.profilePic = getSelectedValues("[name=profile]").pop();
  employeePayrollData.gender = getSelectedValues("[name=gender]").pop();
  employeePayrollData.department = getSelectedValues("[name=department]");
  employeePayrollData.salary = getInputValueById("#salary");
  employeePayrollData.note = getInputValueById("#notes");
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
