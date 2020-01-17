import $ from 'jquery';
import './index.css';
import api from './api';
import bookmarklist from './bookmark-list';




function main(){
    api.getBookmarks()
        .then(response => response.json())
        .then(bookmarks => console.log(bookmarks));
    
    bookmarklist.bindEventListeners()
    bookmarklist.render()
}



$(main)