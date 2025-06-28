const metricInputs = document.getElementById('metric-inputs');
const imperialInputs = document.getElementById('imperial-inputs');

document.querySelectorAll('input[name="unit"]').forEach(radio => {
  radio.addEventListener('change',()=>{
    if(radio.value==='metric'){
      metricInputs.style.display='flex';
      imperialInputs.style.display='none';
    } 
    else{
      metricInputs.style.display='none';
      imperialInputs.style.display='flex';
    }});
});

function calculateBMI(){
  const unit=document.querySelector('input[name="unit"]:checked').value;
  let bmi=0;

  if (unit==='metric') {
    const heightCm=parseFloat(document.getElementById('height-m').value);
    const weightKg=parseFloat(document.getElementById('weight-m').value);
    if (!heightCm||!weightKg || heightCm>300 || weightKg>500) {
        return showResult('Please enter valid values.');
    }
    const heightM=heightCm/100;
    bmi=weightKg/(heightM*heightM);
  } 
  else {
    const heightFt=parseFloat(document.getElementById('height-ft').value);
    const heightIn=parseFloat(document.getElementById('height-in').value);
    const weightLbs=parseFloat(document.getElementById('weight-i').value);
    const totalIn=(heightFt*12)+heightIn;
    if (!totalIn||!weightLbs|| totalIn>119 || weightLbs>1103){
        return showResult('Please enter valid values.');
    }
    bmi=(weightLbs/(totalIn*totalIn))*703;
  }

  bmi=bmi.toFixed(1);
  let classification='';
  if (bmi<18.5)classification='Underweight';
  else if(bmi<24.9)classification ='Normal weight';
  else if (bmi<29.9)classification ='Overweight';
  else classification='Obese';

  showResult(`Your BMI is: <strong>${bmi}</strong><br>You are in the <strong>${classification}</strong> range.<br>Healthy BMI range: <strong>18.5 - 24.9</strong>`);
}
function showResult(message) {
    document.getElementById('result').innerHTML = message;
}
function resetInput(){
  document.getElementById('height-m').value='';
  document.getElementById('weight-m').value='';
  document.getElementById('height-ft').value='';
  document.getElementById('height-in').value='';
  document.getElementById('weight-i').value='';
   document.querySelector('input[name="unit"][value="metric"]').checked = true;
  document.getElementById('metric-inputs').style.display = 'flex';
  document.getElementById('imperial-inputs').style.display = 'none';
  document.getElementById('result').textContent = '';
}