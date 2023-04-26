const $yearDropdown = document.querySelector('#year-select');

const currentYear = new Date().getFullYear();

for (let i = currentYear; i >= 2000; i--) {
  const yearOption = document.createElement('option');
  yearOption.text = i;
  yearOption.value = i;
  $yearDropdown.append(yearOption);
}
// Creates year dropdown option; from 2000 to current year.

// const $animeList = document.querySelector('#anime-list');

// const xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://api.jikan.moe/v4/seasons/now?page=1');
// xhr.responseType = 'json';
// xhr.addEventListener('load', function () {
//   console.log(xhr.status);
//   console.log(xhr.response);
//   for (let i = 0; i < xhr.response.length; i++) {
//     const liTag = document.createElement('li');
//     liTag.textContent = xhr.response[i].name;
//     $userList.appendChild(liTag);
//   }
// });
// xhr.send();
