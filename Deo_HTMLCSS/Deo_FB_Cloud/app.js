//Grabbing elements from html and setting as constants to manipulate
const charList = document.querySelector('#char-list');
const form = document.querySelector('#add-char-form');

//HTML elements are created once the data is updated
function renderChar(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let rating = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    rating.textContent = doc.data().rating;
    cross.textContent = "x";

    li.appendChild(name);
    li.appendChild(rating);
    li.appendChild(cross);

    charList.appendChild(li);

    //Deletes data when button is clicked
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('characters').doc(id).delete();
    });
}

//Saves data into firestore database
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('characters').add({
        name: form.name.value,
        rating: form.rating.value
    });
    form.name.value = '';
    form.rating.value = '';
});

//Realtime updates when inputting data, Don't need to refresh page for it to work.
db.collection('characters').orderBy('rating').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderChar(change.doc);
        } else if (change.type == 'removed'){
            let li = charList.querySelector('[data-id=' + change.doc.id + ']');
            charList.removeChild(li);
        }
    });
});