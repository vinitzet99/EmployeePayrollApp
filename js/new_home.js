window.addEventListener("DOMContentLoaded", (event) => {
  createInnerHtml();
});
const createInnerHtml = () => {
  const headerHtml = `<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>`;
  let empPayrollList = createEmployeePayrollJSON();
  let innerHtml = `${headerHtml}`;
  for (const empPayrollData of empPayrollList) {
    innerHtml = `${innerHtml} 
  <tr> 
    <td>
      <img class="profile" src="${empPayrollData._profilePic}" alt="">
    </td> 
    <td>${empPayrollData._name}</td> 
    <td>${empPayrollData._gender}</td>
    <td>${getDeptHtml(empPayrollData._department)}</td> 
    <td>${empPayrollData._salary}</td> 
    <td>${empPayrollData._startDate}</td> 
    <td> 
      <img name="${
        empPayrollData._id
      }" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
      <img name="${
        empPayrollData._id
      }" onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="edit">    
    </td> 
  </tr>`;
  }
  document.querySelector("#display").innerHTML = innerHtml;
};
const getDeptHtml = (deptList) => {
  let deptHtml = "";
  for (const dept of deptList) {
    deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`;
  }
  return deptHtml;
};
const createEmployeePayrollJSON = () => {
  let empPayrollListLocal = [
    {
      _name: "Narayan Mahadevan",
      _gender: "Male",
      _department: ["Engineering", "Finance"],
      _salary: "500000",
      _startDate: "29 Oct 2019",
      _note: "",
      _id: new Date().getTime(),
      _profilePic: "../assets/profile-images/Ellipse -2.png",
    },
    {
      _name: "Amarpa Shashanka Keerthi Kumar",
      _gender: "Female",
      _department: ["Sales"],
      _salary: "400000",
      _startDate: "29 Oct 2019",
      _note: "",
      _id: new Date().getTime() + 1,
      _profilePic: "../assets/profile-images/Ellipse -1.png",
    },
  ];
  return empPayrollListLocal;
};
