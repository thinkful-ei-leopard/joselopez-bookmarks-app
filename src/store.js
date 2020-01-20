
const store = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0
};


function changeAdding() {
    store.adding = !store.adding
}


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
    changeAdding
};