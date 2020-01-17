export default {
    getBookmarks
};

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/[joselopez]';

function getBookmarks() {
    return fetch(`${BASE_URL}/bookmarks`)
}