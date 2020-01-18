
const store = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0
};


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