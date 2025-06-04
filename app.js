document.getElementById("surveyForm").addEventListener("submit", function (e) {
e.preventDefault();

const fullName = document.getElementById("fullName").value.trim();
const email = document.getElementById("email").value.trim();
const dob = document.getElementById("dob").value;
const contact = document.getElementById("contact").value.trim();
const error = document.getElementById("error");

if (!fullName || !email || !dob || !contact) {
error.textContent = "Please fill in all fields.";
return;
}

const age = calculateAge(dob);
if (age < 5 || age > 120) {
error.textContent = "Age must be between 5 and 120.";
return;
}

const ratings = ["movies", "radio", "eatOut", "tv"];
for (let r of ratings) {
if (!document.querySelector(`input[name="${r}"]:checked`)) {
error.textContent = "Please select a rating for all 4 questions.";
return;
}
}

const foodChoices = [...document.querySelectorAll('input[name="food"]:checked')].map(cb => cb.value);

const data = {
fullName,
email,
dob,
contact,
age,
foodChoices,
ratings: {
movies: parseInt(document.querySelector('input[name="movies"]:checked').value),
radio: parseInt(document.querySelector('input[name="radio"]:checked').value),
eatOut: parseInt(document.querySelector('input[name="eatOut"]:checked').value),
tv: parseInt(document.querySelector('input[name="tv"]:checked').value)
}
};

firebase.firestore().collection("surveys").add(data)
.then(() => {
alert("Survey submitted successfully!");
document.getElementById("surveyForm").reset();
error.textContent = "";
})
.catch(err => {
console.error("Error: ", err);
error.textContent = "Failed to submit. Please try again.";
});
});

function calculateAge(dob) {
const birth = new Date(dob);
const today = new Date();
let age = today.getFullYear() - birth.getFullYear();
const m = today.getMonth() - birth.getMonth();
if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
return age;
}