const $yearDropdown = document.querySelector('#year-select');

const currentYear = new Date().getFullYear();

for (let i = currentYear; i >= 2000; i--) {
  const yearOption = document.createElement('option');
  yearOption.text = i;
  yearOption.value = i;
  $yearDropdown.append(yearOption);
}
// Creates year dropdown option; from 2000 to current year.
