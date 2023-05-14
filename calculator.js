document.getElementById('calorie-form').addEventListener('submit', function(e){
  document.getElementById('results').style.display = 'none';

  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateCalories, 2000);

  e.preventDefault();
});

function calculateCalories(e) {
  
  const age = document.getElementById('age');
  const gender = document.querySelector('input[name="customRadioInline1"]:checked');
  const weight = document.getElementById('weight');
  const height = document.getElementById('height');
  const activity = document.getElementById('list').value;
  const totalCalories = document.getElementById('total-calories');
  
  
  if (age.value === '' || weight.value === '' || height.value === '' || 80 < age.value || age.value < 15) {
    errorMessage('გთხოვთ, დარწმუნდით, რომ ყველაფერი სწორად შეიყვანეთ')
  } else if(gender.id === 'male' && activity === "1") {
    totalCalories.value = Math.round((parseInt(height.value) * 10) + 
    (6.25 * parseInt(weight.value)) - (5 * parseInt(age.value)) + 5)
  } else if(gender.id === 'male' && activity === "2") {
    totalCalories.value = Math.round((parseInt(height.value) * 10) + 
    (6.25 * parseInt(weight.value)) - (5 * parseInt(age.value)) + 5 - 400);
  } else if (gender.id === 'male' && activity === "3") {
    totalCalories.value = Math.round((parseInt(height.value) * 10) + 
    (6.25 * parseInt(weight.value)) - (5 * parseInt(age.value)) + 5 + 500)
  } 
  
  else if(gender.id === 'female' && activity === "1") {
    totalCalories.value = Math.round((parseInt(height.value) * 10) + 
    (6.25 * parseInt(weight.value)) - (5 * parseInt(age.value)) - 161); 
  } else if(gender.id === 'female' && activity === "2") {
    totalCalories.value = Math.round((parseInt(height.value) * 10) + 
    (6.25 * parseInt(weight.value)) - (5 * parseInt(age.value)) - 161 - 400);
  } else if(gender.id === 'female' && activity === "3") {
    totalCalories.value = Math.round((parseInt(height.value) * 10) + 
    (6.25 * parseInt(weight.value)) - (5 * parseInt(age.value)) - 161 + 500);
  }

  document.getElementById('results').style.display = 'block';

  document.getElementById('loading').style.display = 'none';
}

function errorMessage(error) {
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'none';
  const errorDiv = document.createElement('div');
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 4000);
}

function clearError() {
  document.querySelector('.alert').remove();
}

