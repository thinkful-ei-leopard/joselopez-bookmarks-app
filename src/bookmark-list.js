import $ from 'jquery';
import store from './store';
import api from './api';


function handleAddBookMarkButton() {
    $('.container').on('click','.show-bookmark-form', event => {
        $('form').removeClass('hideBookMarkForm')
    })
}

function generateBookMark(item) {
    let itemTitle = `<span class="bookmark-item bookmark-item-toggled">
    ${item.title}</span>`;
    return `<li class="js-item-element" data-item-id="${item.id}">
    ${itemTitle}
    <div class="bookmark-item-controls">
    <button class="bookmark-toggleviewbutton js-item-toggle">
    <span class="button-label"> View description </span>
    </button>
    <button class="bookmark-delete js-item-delete">
    <span class="button-label"> delete </span>
    </button>
    </div>
    </li>`
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
    $('#bookmark-list-form').submit(function(event) {
        event.preventDefault();
        let formData = $('#bookmark-list-form').serializeJson();
        console.log(formData)
        api.createBookMark(formData)
            .then((newItem) => {
                store.addItem(newItem);
                render();
            })
    })
}


function render(){
    let itemsStore = store.store;

    let items = itemsStore.bookmarks;

    const bookMarkListitems = concatBookMarks(items)
    $('.js-bookmark-list').html(bookMarkListitems)
}


function bindEventListeners() {
    handleAddBookMarkButton()
    handleNewBookMarkSubmit()
}

export default {
    render,
    bindEventListeners
}