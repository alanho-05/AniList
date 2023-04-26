/* exported $ulChild $playConfirm  $bookmarkConfirm */
const $yearDropdown = document.querySelector('#year-select');
const $ulList = document.querySelector('ul');
const $ulChild = $ulList.childNodes;

const currentYear = new Date().getFullYear();

for (let i = currentYear; i >= 2000; i--) {
  const yearOption = document.createElement('option');
  yearOption.text = i;
  yearOption.value = i;
  $yearDropdown.append(yearOption);
}

// Creates year dropdown option; from 2000 to current year.

let toggleInfoModal = false;
const $infoModal = document.querySelector('#info-modal');
const $infoExit = document.querySelector('.info-exit');

let togglePlayModal = false;
const $playModal = document.querySelector('#play-modal');
const $playConfirm = document.querySelector('.play-confirm');
const $playExit = document.querySelector('.play-exit');

let toggleBookmarkModal = false;
const $bookmarkModal = document.querySelector('#bookmark-modal');
const $bookmarkConfirm = document.querySelector('.bookmark-confirm');
const $bookmarkExit = document.querySelector('.bookmark-exit');

$ulList.addEventListener('click', function (event) {
  if (event.target.tagName !== 'I') {
    return;
  }

  const classList = event.target.classList;

  for (let i = 0; i < classList.length; i++) {
    if (classList[i] === 'info') {
      toggleInfoModal = !toggleInfoModal;
      if (toggleInfoModal === true) {
        $infoModal.classList.remove('hidden');
      }
    } else if (classList[i] === 'play') {
      togglePlayModal = !togglePlayModal;
      if (togglePlayModal === true) {
        $playModal.classList.remove('hidden');
      }
    } else if (classList[i] === 'bookmark') {
      toggleBookmarkModal = !toggleBookmarkModal;
      if (toggleBookmarkModal === true) {
        $bookmarkModal.classList.remove('hidden');
      }
    }
  }
});

$infoExit.addEventListener('click', function (event) {
  toggleInfoModal = !toggleInfoModal;
  if (toggleInfoModal === false) {
    $infoModal.classList.add('hidden');
  }
});

$playExit.addEventListener('click', function (event) {
  togglePlayModal = !togglePlayModal;
  if (togglePlayModal === false) {
    $playModal.classList.add('hidden');
  }
});

$bookmarkExit.addEventListener('click', function (event) {
  toggleBookmarkModal = !toggleBookmarkModal;
  if (toggleBookmarkModal === false) {
    $bookmarkModal.classList.add('hidden');
  }
});

// const $animeList = document.querySelector('#anime-list');

// const xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://api.jikan.moe/v4/seasons/now?page=1');
// xhr.responseType = 'json';
// xhr.addEventListener('load', function () {
//   console.log(xhr.status);
//   console.log(xhr.response.data[4].synopsis);
//   for (let i = 0; i < xhr.response.length; i++) {
//     const liTag = document.createElement('li');
//     liTag.textContent = xhr.response[i].name;
//     $userList.appendChild(liTag);
//   }
// });
// xhr.send();
