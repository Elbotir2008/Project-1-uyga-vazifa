const btnAdd = document.getElementById("btn-add");
const btnEdit = document.getElementById("btn-edit");
const btnDelete = document.getElementById("btn-delete");
const btnSave = document.getElementById("btn-save");

const studentsData = document.getElementById("students-data");
const studentsForm = document.getElementById("student-form");
const searchBox = document.getElementById("search-box");

const inputSearch = document.getElementById("search");
const inputFilter = document.getElementById("filter");
const inputFilter2 = document.getElementById("filter2");
const inputFirstName = document.getElementById("firstName");
const inputLastName = document.getElementById("lastName");
const inputGroup = document.getElementById("input-group");
const date = document.getElementById("date");
const inputDoesWork = document.getElementById("doesWork");
const lavozim = document.getElementById("lavozim");
const lavozimTuri = document.getElementById("lavozim-turi");
const maosh = document.getElementById("maosh");

let students = JSON.parse(localStorage.getItem("students")) || [];
let studentToEdit = null;

function saveStudent() {
  students = JSON.parse(localStorage.getItem("students")) || [];
  let newStudents;
  let newStudent;
  if (studentToEdit) {
    newStudent = {
      id: studentToEdit.id,
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
      inputGroup: inputGroup.value,
      date: date.value,
      lavozim: lavozim.value,
      lavozimTuri: lavozimTuri.value,
      maosh: maosh.value,
      doesWork: inputDoesWork.checked,
    };
    newStudents = students.map((student) =>
      student.id !== studentToEdit.id ? student : newStudent
    );
  } else {
    newStudent = {
      id: Math.floor(Math.random() * 100000),
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
      inputGroup: inputGroup.value,
      date: date.value,
      lavozim: lavozim.value,
      lavozimTuri: lavozimTuri.value,
      maosh: maosh.value,
      doesWork: inputDoesWork.checked,
    };
    newStudents = [...students, newStudent];
  }
  localStorage.setItem("students", JSON.stringify(newStudents));
  displayStudents(newStudents);
  studentsForm.reset();
  studentToEdit = null;
}

function deleteStudent(id) {
  students = JSON.parse(localStorage.getItem("students")) || [];
  if (window.confirm("Are you sure you want to delete this student?")) {
    let filteredStudents = students.filter((student) => student.id !== id);
    localStorage.setItem("students", JSON.stringify(filteredStudents));
    displayStudents(filteredStudents);
    students = JSON.parse(localStorage.getItem("students"));
  }
}

function editStudent(id) {
  let student = students.find((student) => student.id === id);
  studentToEdit = { ...student };
  inputFirstName.value = studentToEdit.firstName;
  inputLastName.value = studentToEdit.lastName;
  inputGroup.value = studentToEdit.inputGroup;
  date.value = studentToEdit.date;
  lavozim.value = studentToEdit.lavozim;
  lavozimTuri.value = studentToEdit.lavozimTuri;
  maosh.value = studentToEdit.maosh;
  inputDoesWork.checked = studentToEdit.doesWork;
}

btnSave.addEventListener("click", saveStudent);

inputFilter.addEventListener("change", function (e) {
  students = JSON.parse(localStorage.getItem("students")) || [];
  let val = e.target.value;
  let filteredNewStudents = students.filter(
    (student) => student.lavozimTuri === val
  );
  displayStudents(filteredNewStudents);
});
inputFilter2.addEventListener("change", function (e) {
  students = JSON.parse(localStorage.getItem("students")) || [];
  let val = e.target.value;
  let filteredNewStudents2 = students.filter(
    (student) => student.inputGroup === val
  );
  displayStudents(filteredNewStudents2);
});

function displayStudents(students) {
  let str = "";
  students.map((student, index) => {
    str += `
    <tr class="">
      <th scope="row">${index + 1}</th>
      <td>${student.firstName}</td>
      <td>${student.lastName}</td>
      <td>${student.inputGroup}</td>
      <td>${student.date}</td>
      <td>${student.lavozim}</td>
      <td>${student.lavozimTuri}</td>
      <td>${student.maosh}</td>
      <td>${student.doesWork ? "Yes" : "No"}</td>
      <td>
        <button id="btn-edit" class="btn btn-warning" data-bs-toggle="modal"
        data-bs-target="#exampleModal" onclick="editStudent(${
          student.id
        })">Edit</button>
        <button id="btn-delete" class="btn btn-danger" onclick="deleteStudent(${
          student.id
        })">Delete</button>
      </td>
    </tr>
    `;
  });
  studentsData.innerHTML = str;
}

displayStudents(students);

let str = "";
function displayProducts(products) {
  // studentsData.innerHTML = "";
  str = "";
  students.map((students) => {
    str += `
    <tr class="">
      <th scope="row">${index + 1}</th>
      <td>${students.firstName}</td>
      <td>${students.lastName}</td>
      <td>${students.inputGroup}</td>
      <td>${students.date}</td>
      <td>${students.lavozim}</td>
      <td>${students.lavozimTuri}</td>
      <td>${students.maosh}</td>
      <td>${students.doesWork ? "Yes" : "No"}</td>
      <td>
        <button id="btn-edit" class="btn btn-warning" data-bs-toggle="modal"
        data-bs-target="#exampleModal" onclick="editStudent(${
          students.id
        })">Edit</button>
        <button id="btn-delete" class="btn btn-danger" onclick="deleteStudent(${
          students.id
        })">Delete</button>
      </td>
    </tr>
    `;
  });
  studentsData.innerHTML = str;
}
displayProducts(students);

function searchProductFunc(query) {
  const filteredProducts = studentsData.filter(
    (p) =>
      students.firstName.toLowerCase().includes(query.toLowerCase()) ||
      students.lastName.toLowerCase().includes(query.toLowerCase())
  );
  displayProducts(filteredProducts);
}

let timeOut;
searchBox.addEventListener("keyup", function (e) {
  // clearTimeout(timeOut);
  searchProductFunc(e.target.value);
});
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cartProducts")) || [];
  let prod = products.find((p) => p.id === id);
  cart.push(prod);
  localStorage.setItem("cartProducts", JSON.stringify(cart));
}
