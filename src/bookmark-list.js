import $ from 'jquery';
import store from './store';
import api from './api';



function generateBookMarkForm(){
    return `<form id="bookmark-list-form">
    <label for="url-entry">Website Url:</label>
    <input type="url" name="url-entry" class="js-url-entry" placeholder="e.g., Google.com"
      required>
      <label for="title-entry">Title:</label>
      <input type="text" name="title-entry" class="js-title-entry" placeholder="Google"
      required>
      <label for="description-entry">Description:</label>
      <input type="text" name="description-entry" class="js-description-entry" placeholder="Description"
      >
      <label for="rating">Rate:</label>
      <select name="rating" form="bookmark-list-form">
          <option value="1star">1</option>
          <option value="2star">2</option>
          <option value="3star">3</option>
          <option value="4star">4</option>
          <option value="5star">5</option>
        </select>
    <button type="submit">Add bookmark</button>
  </form>`
}

function handleAddBookMarkButton() {
    $('.container').on('click','.show-bookmark-form', event => {
        $('form').removeClass('hideBookMarkForm')
    })
}

function generateBookMark(item) {}


function render(){}


function bindEventListeners() {
    handleAddBookMarkButton()
}

export default {
    render,
    bindEventListeners
}