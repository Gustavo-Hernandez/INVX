import createDataContext from "./createDataContext";
import { storage, firestore } from "../api/firebase";
import { auth, admin } from "../api/firebase";

const itemsReducer = (state, action) => {
  switch (action.type) {
    case "set_error":
      return {...state, error: action.payload};
    case "set_folders":
      return {...state, folders: action.payload};
    case "set_items":
      return {...state, items: action.payload};  
    default:
      return state;
  }
};

const createItem = (dispatch) => async({name, units, minStock, unitPrice, folder, description, file})=>{
  let error = "";
  if (!name || name.length === 0) {
    error += "Invalid name.\n";
  }
  if (!units || units < 0) {
    error += "Units must not be negative.\n";
  }
  if (!unitPrice || unitPrice <= 0) {
    error += "Unit price must be greater than zero.\n"
  }
  if (!minStock || minStock <= 0) {
    error += "Low Stock treshold must be postitive.\n"
  }
  if (!folder || folder.length === 0) {
    error += "Folder does not exist.\n"
  }
  if (!description || description.length === 0) {
    description = "";
  }
  if (!file) {
    error += "You must provide an image.\n"
  }else { 
    if(!file.type.includes("image")){
      error += "File is not an image\n"
    }
    if (file.size > 200000) {
      error += "Image size should be less or equal to 200KB\n"
    }
  }
  if (error.length > 0) {
    await dispatch({type:"set_error", payload:error});
    return false;
  }else{
    try {
      const itemImagesRef = storage.ref().child(`itemImages/${new Date().getTime()+"_"+file.name}`);
      const response = await itemImagesRef.put(file);
      const url = await response.ref.getDownloadURL();
            
      const res = await firestore.collection("items").add({
        name,
        units,
        minStock,
        unitPrice,
        folder,
        description,
        url: url.toString(),
        visible: true
      });
      createLog(res.id, "ADD");

    } catch (err) {
      dispatch({type:"set_error", payload:err});
    }
    await dispatch({type:"set_error", payload:""});
    return true;
  }
  
}

const updateItem = (dispatch) => async({id, name, units, minStock, unitPrice, folder, description, file, editedFile}) =>{
  let error = ""
  if (!name || name.length === 0) {
    error += "Invalid name.\n";
  }
  if (!units || units < 0) {
    error += "Units must not be negative.\n";
  }
  if (!unitPrice || unitPrice <= 0) {
    error += "Unit price must be greater than zero.\n"
  }
  if (!folder || folder.length === 0) { //TODO: ADD FOLDER VALIDATION
    error += "Folder does not exist.\n"
  }
  if (!description || description.length === 0) {
    description = "";
  }
  if (editedFile) {
    if (!file) {
      error += "You must provide an image.\n"
    }else { 
      if(!file.type.includes("image")){
        error += "File is not an image\n"
      }
      if (file.size > 200000) {
        error += "Image size should be less or equal to 200KB\n"
      }
    }
  }
  if (error.length > 0) {
    await dispatch({type:"set_error", payload:error});
    return false;
  }else{
    try {
      if (editedFile) {
        const itemImagesRef = storage.ref().child(`itemImages/${new Date().getTime()+"_"+file.name}`);
        const response = await itemImagesRef.put(file);
        const url = await response.ref.getDownloadURL();
        firestore.collection("items").doc(id).update({
          name,
          units,
          minStock,
          unitPrice,
          folder,
          description,
          url: url.toString(),
        });
        createLog(id, "UPDATE");
      }else{
        firestore.collection("items").doc(id).update({
          name,
          units,
          minStock,
          unitPrice,
          folder,
          description
        });
        createLog(id, "UPDATE");
      }
    } catch (err) {
      dispatch({type:"set_error", payload:err});
    }
    await dispatch({type:"set_error", payload:""});
    return true;
  }
 
}

const createFolder = (dispatch)=> (name) =>{
  console.log("Here");
  firestore.collection("folders").doc(name).set({visible: true})
}


const deleteItem = (dispatch)=> (id) =>{
  firestore.collection("items").doc(id).update({visible: false})
  createLog(id, "DELETE");
}

const updateUnits = (dispatch)=> (id, n) =>{
  firestore.collection("items").doc(id).update({units: n});
  createLog(id, "UPDATE");
}

const setFolders = (dispatch) =>(folders) =>{
  dispatch({type:"set_folders", payload: folders})
}
const setItems = (dispatch) =>(items) =>{
  dispatch({type:"set_items", payload: items})
}

const clearError = (dispatch) =>() =>{
  dispatch({type:"set_error", payload: ""})
}

const createLog= (id, code)=>{
  let currentUser = auth.currentUser;
  if (currentUser) {
    firestore.collection("logs").doc().set({
      date: admin.firestore.Timestamp.fromDate(new Date()),
      user: currentUser.uid,
      code,
      id
    })
  }
}

export const { Provider, Context } = createDataContext(
  itemsReducer,
  {setFolders, setItems, createItem, clearError, deleteItem, updateUnits, updateItem, createFolder},
  {error: "", items:[], folders:[]}
);
