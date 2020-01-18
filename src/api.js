
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/[joselopez]';


function listApiFetch(...args) {
    let error;
    return fetch(...args)
        .then(response => {
            if (!response.ok) {
                error = {code: response.status};

                if(!response.headers.get('content-type').includes('json')) {
                    error.message = response.statusText;
                    return Promise.reject(error)
                }
            }
            return response.json();
        })
        .then(data => {
            if(error) {
                error.message = data.message;
                return Promise.reject(error);
            }
            return data
        });
        
};


function getBookMarks() {
    return listApiFetch(`${BASE_URL}/bookmarks`)
}


function createBookMark(title, url, desc = 'No Description', rating = 1){
    const newBookMark = JSON.stringify({ title, url, desc, rating });
    return listApiFetch(`${BASE_URL}/bookmarks`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: newBookMark
    });
}

export default {
    listApiFetch,
    getBookMarks,
    createBookMark,
};
