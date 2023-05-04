/* exported data */

let data = {
  view: 'anime-list',
  list: [],
  bookmark: [],
  temp: {},
  nextEntryId: 1
};

const previousEntryJSON = localStorage.getItem('watchlist-local-storage');

window.addEventListener('unload', function (event) {
  const entryJSON = JSON.stringify(data);
  localStorage.setItem('watchlist-local-storage', entryJSON);
});

if (previousEntryJSON !== null) {
  data = JSON.parse(previousEntryJSON);
}
