const $yearDropdown = document.querySelector('#year-select');
const $ulList = document.querySelector('ul');
const $seasonHeader = document.querySelector('#season');
const $yearHeader = document.querySelector('#year');
const $seasonSelect = document.querySelector('#season-select');
const $yearSelect = document.querySelector('#year-select');
const $trailer = document.querySelector('#trailer');
const $bookmarkMessage = document.querySelector('#bookmark-message');
const $animeList = document.querySelector('#anime-list');
const $bookmarkList = document.querySelector('#bookmark-list');
const $bookmarkIcon = document.querySelector('#bookmark-icon');
const $seasonYrHeader = document.querySelector('#season-yr-header');
const $bookmarkHeader = document.querySelector('#bookmark-header');
const $logo = document.querySelector('#logo');
const $bmList = document.querySelector('#bm-list');
// const $ulNode = document.querySelectorAll('ul');

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
        let title = '';
        if (data.list[i].title_english === null) {
          title = data.list[i].title;
        } else {
          title = data.list[i].title_english;
        }

        infoImg.setAttribute('src', data.list[i].images.jpg.image_url);
        infoImg.setAttribute('alt', `${title}.img`);
        infoTitle.textContent = title;

        synopsis.textContent = data.list[i].synopsis;
      }
    }

    toggleInfoModal = !toggleInfoModal;
    if (toggleInfoModal === true) {
      $infoModal.classList.remove('hidden');
    }
  }

  const playTitle = document.querySelector('#play-title');

  if (event.target.classList.contains('play')) {
    for (let i = 0; i < data.list.length; i++) {
      if (data.list[i].mal_id === Number($animeLi.dataset.malId)) {
        let title = '';
        if (data.list[i].title_english === null) {
          title = data.list[i].title;
        } else {
          title = data.list[i].title_english;
        }

        playTitle.textContent = title;
        $trailer.setAttribute('src', data.list[i].trailer.embed_url);
      }
    }

    togglePlayModal = !togglePlayModal;
    if (togglePlayModal === true) {
      $playModal.classList.remove('hidden');
    }
  }

  const $bmTitle = document.querySelector('#bm-title');

  if (event.target.classList.contains('bookmark')) {
    for (let i = 0; i < data.list.length; i++) {
      if (data.list[i].mal_id === Number($animeLi.dataset.malId)) {
        let title = '';
        if (data.list[i].title_english === null) {
          title = data.list[i].title;
        } else {
          title = data.list[i].title_english;
        }

        $bmTitle.textContent = title;
        data.list[i].currentEpisode = 0;
        data.temp = data.list[i];
      }
    }

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
    $trailer.setAttribute('src', '');
  }
});

$bookmarkConfirm.addEventListener('click', function (event) {
  let duplicate = false;
  for (let i = 0; i < data.bookmark.length; i++) {
    if (data.bookmark[i].mal_id === data.temp.mal_id) {
      duplicate = true;
    }
  }

  if (!duplicate) {
    data.bookmark.push(data.temp);
    $bmList.appendChild(renderBookmark(data.temp));
  }

  toggleNoEntries();
  bmModalClose();
  viewSwap('bookmark-list');
});

$bookmarkExit.addEventListener('click', bmModalClose);

function bmModalClose() {
  toggleBookmarkModal = !toggleBookmarkModal;
  if (toggleBookmarkModal === false) {
    $bookmarkModal.classList.add('hidden');
  }
}

const $entryList = document.querySelector('#entry-list');

function currentAnime() {
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
}

document.addEventListener('DOMContentLoaded', function (event) {
  currentAnime();

  for (let i = 0; i < data.bookmark.length; i++) {
    const bookmarkEntry = renderBookmark(data.bookmark[i]);
    $bmList.appendChild(bookmarkEntry);
  }

  toggleNoEntries();
});

$seasonSelect.addEventListener('change', function () {
  titleChange();
  deleteDOM();
  animeSwap($yearSelect.value, $seasonSelect.value);
});

$yearSelect.addEventListener('change', function () {
  titleChange();
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

function titleChange() {
  $seasonHeader.textContent = `${capitalize($seasonSelect.value)} `;
  $yearHeader.textContent = `${$yearSelect.value} `;
}

function capitalize(word) {
  let capped = '';
  for (let i = 0; i < word.length; i++) {
    if (i === 0) {
      capped += word[i].toUpperCase();
    }
    if (i !== 0) {
      capped += word[i].toLowerCase();
    }
  }
  return capped;
}

function renderAnime(entry) {
  let title = '';
  if (entry.title_english === null) {
    title = entry.title;
  } else {
    title = entry.title_english;
  }

  const listEl = document.createElement('li');
  listEl.setAttribute('data-mal-id', entry.mal_id);

  const entryDiv = document.createElement('div');
  entryDiv.setAttribute('class', 'row-entry');

  const imgDiv = document.createElement('div');
  imgDiv.setAttribute('class', 'col-img');

  const imgEl = document.createElement('img');
  imgEl.setAttribute('class', 'entry-img');
  imgEl.setAttribute('src', entry.images.jpg.image_url);
  imgEl.setAttribute('alt', `${title}.img`);

  const colDiv = document.createElement('div');
  colDiv.setAttribute('class', 'col-entry entry-contain');

  const titleDiv = document.createElement('div');
  titleDiv.setAttribute('class', 'title margin-top-remove');

  const titleTxt = document.createElement('h4');
  titleTxt.setAttribute('class', 'white-font');
  titleTxt.textContent = title;

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

function renderBookmark(entry) {
  let title = '';
  if (entry.title_english === null) {
    title = entry.title;
  } else {
    title = entry.title_english;
  }

  const listEl = document.createElement('li');
  listEl.setAttribute('data-mal-id', entry.mal_id);

  const entryDiv = document.createElement('div');
  entryDiv.setAttribute('class', 'row-entry');

  const imgDiv = document.createElement('div');
  imgDiv.setAttribute('class', 'col-img');

  const imgEl = document.createElement('img');
  imgEl.setAttribute('class', 'entry-img');
  imgEl.setAttribute('src', entry.images.jpg.image_url);
  imgEl.setAttribute('alt', `${title}.img`);

  const colDiv = document.createElement('div');
  colDiv.setAttribute('class', 'col-entry entry-contain');

  const titleDiv = document.createElement('div');
  titleDiv.setAttribute('class', 'title margin-top-remove');

  const titleTxt = document.createElement('h4');
  titleTxt.setAttribute('class', 'white-font');
  titleTxt.textContent = title;

  const progressDiv = document.createElement('div');
  progressDiv.setAttribute('class', 'progress-div');

  let totalEpisode = 'Unknown';
  if (entry.episodes !== null) {
    totalEpisode = entry.episodes;
  }

  const progressEl = document.createElement('progress');
  progressEl.setAttribute('class', 'tracker');
  progressEl.setAttribute('max', totalEpisode);
  progressEl.setAttribute('value', '0');

  const progressTxt = document.createElement('p');
  progressTxt.setAttribute('class', 'progress-text white-font');

  const spanEpisode = document.createElement('span');
  spanEpisode.setAttribute('class', 'episode');
  spanEpisode.textContent = entry.currentEpisode;

  const spanDivider = document.createElement('span');
  spanDivider.textContent = '/';

  const spanTotal = document.createElement('span');
  spanTotal.setAttribute('class', 'total');
  spanTotal.textContent = totalEpisode;

  const buttonDiv = document.createElement('div');
  buttonDiv.setAttribute('class', 'progress-buttons');

  const minusButton = document.createElement('i');
  minusButton.setAttribute('class', 'fa-solid fa-square-minus margin-left progress-size');

  const plusButton = document.createElement('i');
  plusButton.setAttribute('class', 'fa-solid fa-square-plus margin-left progress-size');

  const deleteButton = document.createElement('i');
  deleteButton.setAttribute('class', 'fa-solid fa-trash progress-size align-right');

  listEl.appendChild(entryDiv);
  entryDiv.appendChild(imgDiv);
  imgDiv.appendChild(imgEl);
  entryDiv.appendChild(colDiv);
  colDiv.appendChild(titleDiv);
  titleDiv.appendChild(titleTxt);
  colDiv.appendChild(progressDiv);
  progressDiv.appendChild(progressEl);
  progressDiv.appendChild(progressTxt);
  progressTxt.appendChild(spanEpisode);
  progressTxt.appendChild(spanDivider);
  progressTxt.appendChild(spanTotal);
  colDiv.appendChild(buttonDiv);
  buttonDiv.appendChild(minusButton);
  buttonDiv.appendChild(plusButton);
  buttonDiv.appendChild(deleteButton);

  return listEl;
}

function toggleNoEntries() {
  if (data.bookmark.length === 0) {
    $bookmarkMessage.classList.remove('hidden');
  } else {
    $bookmarkMessage.classList.add('hidden');
  }
}

function viewSwap(view) {
  if (view === 'anime-list') {
    $animeList.classList.remove('hidden');
    $seasonSelect.classList.remove('hidden');
    $yearSelect.classList.remove('hidden');
    $seasonYrHeader.classList.remove('hidden');
    $bookmarkList.classList.add('hidden');
    $bookmarkHeader.classList.add('hidden');
  } else {
    $animeList.classList.add('hidden');
    $seasonSelect.classList.add('hidden');
    $yearSelect.classList.add('hidden');
    $seasonYrHeader.classList.add('hidden');
    $bookmarkList.classList.remove('hidden');
    $bookmarkHeader.classList.remove('hidden');
  }
}

$bookmarkIcon.addEventListener('click', function (event) {
  viewSwap('bookmark-list');
});

$logo.addEventListener('click', function (event) {
  viewSwap('anime-list');
});

// $bmList.addEventListener('click', function (event) {
//   if (event.target.tagName !== 'I') {
//     return;
//   }

//   if (event.target.classList.contains('fa-square-minus')) {
//   }

//   if (event.target.classList.contains('fa-square-plus')) {
//   }

//   if (event.target.classList.contains('fa-trash')) {
//   }
// });

// function decrease() {

// }
