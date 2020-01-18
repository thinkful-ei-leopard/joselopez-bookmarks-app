
const store = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0
};

console.log(store)
//filter items by changing value of filter, then filter by rating using
// filter method

function findById(id){
    return this.store.find(currentItem => currentItem.id === id);
};

function addItem(item) {
    store.bookmarks.push(item);
};



export default {
    findById,
    addItem,
    store
};