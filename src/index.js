import $ from 'jquery';
import './index.css';
import api from './api';
import store from './store';
import bookmarklist from './bookmark-list';




function main(){
    api.getBookMarks()
        .then((items) => {
            items.forEach((item) => store.addItem(item));
            bookmarklist.render();
        });
    
    bookmarklist.bindEventListeners()
    bookmarklist.render()
}



$(main)