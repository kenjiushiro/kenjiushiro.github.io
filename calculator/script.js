const billInput = document.getElementById('bill-input');
const numberOfPeopleInput = document.getElementById('number-of-people-input');

const percent5Btn = document.getElementById('5-percent-btn');
const percent10Btn = document.getElementById('10-percent-btn');
const percent15Btn = document.getElementById('15-percent-btn');
const percent25Btn = document.getElementById('25-percent-btn');
const percent50Btn = document.getElementById('50-percent-btn');
const percentCustomBtn = document.getElementById('custom-percent-btn');

const percentButtons = [percent5Btn, percent10Btn, percent15Btn, percent50Btn, percent25Btn];

const resetBtn = document.getElementById('reset-btn');

const tipPersonSpan = document.getElementById('tip-person-span');
const totalPersonSpan = document.getElementById('total-person-span');

const getSelectedTip = () => {
  const percent = document.getElementsByClassName('tip-selected')[0].getAttribute('tip');
  return Number(percent);
};

const clearButtons = () => {
  percentButtons.forEach(btn => {
    btn.classList.remove('tip-selected');
  });
}

const selectTip = (e) => {
  clearButtons();
  percentCustomBtn.value = '';
  e.target.classList.add('tip-selected');
  setAmounts();
};

percentButtons.forEach(btn => {
  btn.addEventListener('click', selectTip);
});

percentCustomBtn.addEventListener('change', () => {
  const customPercent = Number(percentCustomBtn.value);
  if (customPercent != 0) {
    clearButtons();
    percentCustomBtn.classList.add('tip-selected');
    percentCustomBtn.setAttribute('tip', customPercent);
    setAmounts();
  }

})
const setAmounts = () => {
  const bill = Number(billInput.value);
  const numberOfPeople = Number(numberOfPeopleInput.value);
  const selectedTip = getSelectedTip();

  if (bill && numberOfPeople) {
    const tip = bill * (selectedTip / 100);
    const total = bill + tip;

    const totalPerPerson = total / numberOfPeople;
    totalPersonSpan.innerText = totalPerPerson;

    const tipPerPerson = tip / numberOfPeople;
    tipPersonSpan.innerText = tipPerPerson;
  } else {
    totalPersonSpan.innerText = 0;
    tipPersonSpan.innerText = 0;
  }
};

resetBtn.addEventListener('click', ()=> {
  clearButtons();
  percent5Btn.classList.add('tip-selected');
  percentCustomBtn.value = '';
  billInput.value = 0
  numberOfPeopleInput.value = 0
  setAmounts();
});

billInput.addEventListener('change', setAmounts);
numberOfPeopleInput.addEventListener('change', setAmounts);
