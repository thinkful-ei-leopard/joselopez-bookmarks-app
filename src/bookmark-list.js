import $ from 'jquery';
import store from './store';
import api from './api';


function generateBookMarkForm() {
    return  `<form id="bookmark-list-form" role="bookmark list entry form">
    <label for="url">Website Url:</label>
    <input type="url" name="url" class="js-url-entry" placeholder="e.g., Google.com"
      required>
      <label for="title">Title:</label>
      <input type="text" name="title" class="js-title-entry" placeholder="e.g., Google"
      required>
      <label for="desc">Description:</label>
      <input type="text" name="desc" class="js-description-entry" placeholder="Description"
      >
      <label for="rating" class"rateLabel">Rate:</label>
      <select name="rating" form="bookmark-list-form" class="rateButton">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button class="bookMarkItButton" type="submit">Bookmark It!</button>
  </form>`
}

function handleAddBookMarkForm() {
    $('.container').on('click', '.show-bookmark-form', function(event) {
        store.store.adding = !store.store.adding
        console.log(store.store.adding)
        render()
    })
}


function generateBookMark(item) {
    let itemTitle = `<span class="bookmark-item bookmark-item-toggled">
    ${item.title} ${item.rating}/5</span>`;

    if(item.expanded) {
    return `<li class="js-item-element" data-item-id="${item.id}">
    ${itemTitle}
    <p class="descParagraph"> ${item.desc} </p>
    <form action="${item.url}" class="external">
    <input type="submit" class="expandedButton" value="Go to ${item.title}" />
    </form>
    <div class="bookmark-item-controls">
    <button class="bookmark-toggleviewbutton js-item-toggle">
    <span class="button-label"> Close Description </span>
    </button>
    <button class="bookmark-delete js-item-delete">
    <span class="button-label"> Delete </span>
    </button>
    </div>
    </li>`} else {
        return `<li class="js-item-element" data-item-id="${item.id}">
        ${itemTitle}
        <div class="bookmark-item-controls">
        <button class="bookmark-toggleviewbutton js-item-toggle">
        <span class="button-label"> View Description </span>
        </button>
        <button class="bookmark-delete js-item-delete">
        <span class="button-label"> Delete </span>
        </button>
        </div>
        </li>`
    }
}

function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  };


function handleDescriptionButton() {
    $('.bookmark-list').on('click', '.js-item-toggle', event => {
        const id = getItemIdFromElement(event.currentTarget);
        const item = store.findById(id);
        item.expanded = !item.expanded;
        render()
    })
}



function concatBookMarks(bookmark) {
    const list = bookmark.map((element) => generateBookMark(element))
    return list.join('')
}


$.fn.extend({
    serializeJson: function() {
      const formData = new FormData(this[0]);
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      return JSON.stringify(o);
    }
  });


function handleNewBookMarkSubmit(){
    $('.container').on('submit', '#bookmark-list-form', function(event) {
        event.preventDefault();
        let formData = $('#bookmark-list-form').serializeJson();
        console.log(formData)
        api.createBookMark(formData)
            .then((newItem) => {
                store.addItem(newItem);
                store.store.adding = !store.store.adding
                render();
            })
    })
}


function handleFilterButton() {
    $('.filterFeature').submit(function(event) {
        event.preventDefault();
        let userFilterValue = $('select#filterVal option:checked').val()
        store.store.filter = userFilterValue;
        render()
    })
}

function resetFilterFeature() {
    $('.filterFeature').on('click', '.resetFilt', function(event) {
        store.store.filter = 0;
        render()
    })
}

function handleDeleteButton() {
    $('ul').on('click', '.js-item-delete', function(event) {
        const id = getItemIdFromElement(event.currentTarget);
        const item = store.findById(id);
        api.deleteBookMark(item);
        let itemIndex = store.store.bookmarks.indexOf(item)
        store.store.bookmarks.splice(itemIndex, 1)
        render();
    })
}


// if filter property is greater than 0? then filter items in items var
// then render, get render value then add it to render prop


function render(){
    let itemsStore = store.store;
    let items = itemsStore.bookmarks;

    if(store.store.filter > 0) {
        items = items.filter(el=> el.rating == store.store.filter)
    }
    
    if(store.store.adding) {
    $('.formContainer').html(generateBookMarkForm())
    } else if(!store.store.adding) {
        $('#bookmark-list-form').remove()
    }

    const bookMarkListitems = concatBookMarks(items)
    $('.js-bookmark-list').html(bookMarkListitems)
}


function bindEventListeners() {
    handleNewBookMarkSubmit();
    handleDescriptionButton();
    handleAddBookMarkForm();
    handleFilterButton();
    resetFilterFeature();
    handleDeleteButton();
}

export default {
    render,
    bindEventListeners
}