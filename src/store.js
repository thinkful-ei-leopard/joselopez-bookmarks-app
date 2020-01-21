
const store = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0
};


function findById(id){
    return store.bookmarks.find(currentItem => currentItem.id === id);
};

function addItem(item) {
    item.expanded = false;
    store.bookmarks.push(item);
};


export default {
    findById,
    addItem,
    store,
};