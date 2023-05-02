/* exported data */

let data = {
  view: 'anime-list',
  list: [],
  bookmark: [],
  editing: null,
  nextEntryId: 1
};

const previousEntryJSON = localStorage.getItem('watchlist-local-storage');

document.addEventListener('beforeunload', function (event) {
  const entryJSON = JSON.stringify(data);
  localStorage.setItem('watchlist-local-storage', entryJSON);
});

if (previousEntryJSON !== null) {
  data = JSON.parse(previousEntryJSON);
}
