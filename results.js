const db = firebase.firestore();

db.collection("surveys").get().then(snapshot => {
const docs = snapshot.docs;
const count = docs.length;

if (count === 0) {
document.getElementById("noDataMessage").style.display = "block";
return;
}

let totalAge = 0;
let minAge = Infinity;
let maxAge = -Infinity;
let pizzaCount = 0;
let totalEatOut = 0;

docs.forEach(doc => {
const data = doc.data();
const age = data.age;
const eatOut = data.ratings.eatOut;
const foods = data.foodChoices;

totalAge += age;
if (age > maxAge) maxAge = age;
if (age < minAge) minAge = age;

if (foods.includes("Pizza")) pizzaCount++;
totalEatOut += eatOut;
});

document.getElementById("totalSurveys").textContent = count;
document.getElementById("averageAge").textContent = (totalAge / count).toFixed(1);
document.getElementById("oldest").textContent = maxAge;
document.getElementById("youngest").textContent = minAge;
document.getElementById("pizzaPercent").textContent = ((pizzaCount / count) * 100).toFixed(1);
document.getElementById("avgEatOut").textContent = (totalEatOut / count).toFixed(1);

document.getElementById("resultsList").style.display = "block";
});