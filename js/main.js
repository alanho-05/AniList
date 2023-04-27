/* exported $ulChild $playConfirm  $bookmarkConfirm */
const $yearDropdown = document.querySelector('#year-select');
const $ulList = document.querySelector('ul');
const $ulChild = $ulList.childNodes;
const $seasonSelect = document.querySelector('#season-select');
const $yearSelect = document.querySelector('#year-select');

const currentYear = new Date().getFullYear();

for (let i = currentYear; i >= 2000; i--) {
  const yearOption = document.createElement('option');
  yearOption.text = i;
  yearOption.value = i;
  $yearDropdown.append(yearOption);
}

// Creates year dropdown option; from 2000 to current year.

const currentMonth = new Date().getMonth();
const winter = document.querySelector('#winter');
const spring = document.querySelector('#spring');
const summer = document.querySelector('#summer');
const fall = document.querySelector('#fall');

if (currentMonth < 3) {
  winter.setAttribute('selected', '');
} else if (currentMonth < 6) {
  spring.setAttribute('selected', '');
} else if (currentMonth < 9) {
  summer.setAttribute('selected', '');
} else {
  fall.setAttribute('selected', '');
}

// Selects current season based on the current month.

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

  const $animeLi = event.target.closest('li');
  const infoImg = document.querySelector('#info-img');
  const infoTitle = document.querySelector('#info-title');
  const synopsis = document.querySelector('#synopsis');

  if (event.target.classList.contains('info')) {
    for (let i = 0; i < data.list.length; i++) {
      if (data.list[i].mal_id === Number($animeLi.dataset.malId)) {
        infoImg.setAttribute('src', data.list[i].images.jpg.image_url);

        if (data.list[i].title_english === null) {
          infoTitle.textContent = data.list[i].title;
        } else infoTitle.textContent = data.list[i].title_english;

        synopsis.textContent = data.list[i].synopsis;
      }
    }
    toggleInfoModal = !toggleInfoModal;
    if (toggleInfoModal === true) {
      $infoModal.classList.remove('hidden');
    }
  }

  if (event.target.classList.contains('play')) {
    togglePlayModal = !togglePlayModal;
    if (togglePlayModal === true) {
      $playModal.classList.remove('hidden');
    }
  }

  if (event.target.classList.contains('bookmark')) {
    toggleBookmarkModal = !toggleBookmarkModal;
    if (toggleBookmarkModal === true) {
      $bookmarkModal.classList.remove('hidden');
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

const $entryList = document.querySelector('#entry-list');

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.jikan.moe/v4/seasons/now?page=1');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  data.list = xhr.response.data;
  for (let i = 0; i < xhr.response.data.length; i++) {
    const animeEntry = renderAnime(xhr.response.data[i]);
    $entryList.appendChild(animeEntry);
  }
});
xhr.send();

$seasonSelect.addEventListener('change', function () {
  deleteDOM();
  animeSwap($yearSelect.value, $seasonSelect.value);
});

$yearSelect.addEventListener('change', function () {
  deleteDOM();
  animeSwap($yearSelect.value, $seasonSelect.value);
});

function animeSwap(year, season) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.jikan.moe/v4/seasons/${year}/${season}`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.list = xhr.response.data;
    for (let i = 0; i < xhr.response.data.length; i++) {
      const animeEntry = renderAnime(xhr.response.data[i]);
      $entryList.appendChild(animeEntry);
    }
  });
  xhr.send();
}

function deleteDOM() {
  while ($ulList.firstChild) {
    $ulList.removeChild($ulList.firstChild);
  }
}

function renderAnime(entry) {
  const listEl = document.createElement('li');
  listEl.setAttribute('data-mal-id', entry.mal_id);

  const entryDiv = document.createElement('div');
  entryDiv.setAttribute('class', 'row-entry');

  const imgDiv = document.createElement('div');
  imgDiv.setAttribute('class', 'col-img');

  const imgEl = document.createElement('img');
  imgEl.setAttribute('class', 'entry-img');
  imgEl.setAttribute('src', entry.images.jpg.image_url);

  const colDiv = document.createElement('div');
  colDiv.setAttribute('class', 'col-entry test');

  const titleDiv = document.createElement('div');
  titleDiv.setAttribute('class', 'title margin-top-remove');

  const titleTxt = document.createElement('h4');
  titleTxt.setAttribute('class', 'white-font');
  if (entry.title_english === null) {
    titleTxt.textContent = entry.title;
  } else titleTxt.textContent = entry.title_english;

  const buttonDiv = document.createElement('div');
  buttonDiv.setAttribute('class', 'buttons');

  const infoButton = document.createElement('i');
  infoButton.setAttribute('class', 'fa-solid fa-circle-info info');

  const playButton = document.createElement('i');
  playButton.setAttribute('class', 'fa-brands fa-youtube play');

  const bookmarkButton = document.createElement('i');
  bookmarkButton.setAttribute('class', 'fa-solid fa-bookmark bookmark');

  listEl.appendChild(entryDiv);
  entryDiv.appendChild(imgDiv);
  imgDiv.appendChild(imgEl);
  entryDiv.appendChild(colDiv);
  colDiv.appendChild(titleDiv);
  titleDiv.appendChild(titleTxt);
  colDiv.appendChild(buttonDiv);
  buttonDiv.appendChild(infoButton);
  buttonDiv.appendChild(playButton);
  buttonDiv.appendChild(bookmarkButton);

  return listEl;
}
