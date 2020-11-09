const auth = firebase.auth();

const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

const userDetails = doument.getElementById('userDetails');

const provider = new firebase.auth.GoogleAuthProvider();

signInBtn.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user => {
    if(user){
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        userDetails.innerHtml = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`
    }
    else{
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHtml = ' ';
    }
});

const db = firebase.firestore();

const createThing = document.getElementById('createYeet');
const yeetList = document.getElementById('yeetList');

let yeetRef;
let unsubscribe;

auth.onAuthStateChanged(user => {
    if(user){
        yeetRef = db.collection('things')

        createYeet.onclick = () => {
            yeetRef.add({
                uid: user.uid,
                name: faker.commerce.productName(),
                createdAt: serverTimeStamp()
            });
        }

    unsubscribe = yeetRef
        .where('uid', '==', user.uid)
        .onSnapshot(querySnapShot => {
            const items = querySnapShot.docs.map(doc => {
                return `<li>${doc.data().name}</li>`
            });
            yeetList.innerHtml = items.join('');
        });
    }
    else {
        unsubscribe && unsubscribe();
    }
});