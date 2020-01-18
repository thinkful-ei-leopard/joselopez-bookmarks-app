import $ from 'jquery';
import store from './store';
import api from './api';


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