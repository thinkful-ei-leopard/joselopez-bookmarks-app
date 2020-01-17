import $ from 'jquery';
import './index.css';
import api from './api';


function main(){
    api.getBookmarks()
        .then(response => response.json())
        .then(bookmarks => console.log('bookmarks'))
}



$(main)