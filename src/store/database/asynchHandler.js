import * as actionCreators from '../actions/actionCreators.js'

export const loginHandler = ({ credentials, firebase }) => (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    ).then(() => {
      console.log("LOGIN_SUCCESS");
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  };

export const logoutHandler = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch(actionCreators.logoutSuccess);
    });
};

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).then(resp => firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: `${newUser.firstName[0]}${newUser.lastName[0]}`,
    })).then(() => {
        dispatch(actionCreators.registerSuccess);
    }).catch((err) => {
        dispatch(actionCreators.registerError);
    });
};

export const updateHandlerName = (todoList, firebase, newName) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore.collection("todoLists").doc(todoList.id).update({name: newName});
};

export const updateHandlerOwner = (todoList, firebase, newName) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore.collection("todoLists").doc(todoList.id).update({owner: newName});
};

export const updateSorting = (todoList, firebase, items) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore.collection("todoLists").doc(todoList.id).update({items: items});
};

export const updateNewList = (todoList, firebase, object, history) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  // firestore.child(id).set(object).then().catch();
  // firestore.push().set(object);
  // console.log(firestore.collection("todoLists").doc("todoLists").update({todoLists: todoLists}))
  firestore.collection('todoLists').add(object).then(ref => history.push('/todoList/' + ref.id));;
  firestore.collection('todoLists').orderBy('last_updated');
};

export const updateMoveUp = (todoList, firebase) => (dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  firestore.collection("todoLists").doc(todoList.id).update({items: todoList.items});
};

export const updateMoveDown = (todoList, firebase) => (dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  firestore.collection("todoLists").doc(todoList.id).update({items: todoList.items});
};

export const updateRemoveItem = (todoList, firebase) => (dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  firestore.collection("todoLists").doc(todoList.id).update({items: todoList.items});
};

export const updateDelete = (todoList, firebase, listToRemove) => (dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  firestore.collection("todoLists").doc(listToRemove.id).delete();
  // firestore.collection('todoLists').then(ref => history.push('/:any'));

};

export const updateTop = (listOfLists, firebase, todoList) => (dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  firestore.collection("todoLists").doc(todoList.id).update({last_updated: todoList.last_updated});
  firestore.collection('todoLists').orderBy('last_updated');
};

export const updateNewItem = (todoList, firebase, newItem) => (dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  // console.log(newItem)
  // console.log(todoList.items)
  todoList.items.push(newItem)
  // console.log(todoList)
  // console.log(test)
  // var newItemList = todoList.items.push(newItem);
  firestore.collection("todoLists").doc(todoList.id).update({items: todoList.items});
};

export const updateEditItem = (todoList, firebase) => (dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  // console.log(newItem)
  // console.log(todoList.items)
  // todoList.items.push(newItem)
  // console.log(todoList)
  // console.log(test)
  // var newItemList = todoList.items.push(newItem);
  firestore.collection("todoLists").doc(todoList.id).update({items: todoList.items});
};