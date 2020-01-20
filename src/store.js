
const store = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0
};


function changeAdding() {
    store.adding = !store.adding
}


//filter items by changing value of filter, then filter by rating using
// filter method

function findById(id){
    return store.bookmarks.find(currentItem => currentItem.id === id);
};

function addItem(item) {
    item.expanded = false;
    store.bookmarks.push(item);
};

// changes the expanded property
// function toggleExpanded(item){
//     return item.expanded = !item.expanded;
// }



export default {
    findById,
    addItem,
    store,
    changeAdding
    // toggleExpanded
};