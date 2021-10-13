import React, {useEffect, useState} from "react"
import './App.css';
import ChildComponent from "./childComponent";
import userData from "./data/userData"


function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [childArray, setChildArray] = useState();
  const [edUserData, setEdUserData] = useState([]);
  const [showEditUserPopup, setShowEditUserPopup] = useState(false);
  const [userDataEdited, setUserDataEdited] = useState();
  const [editIndexValue, setEditIndexValue] = useState(null);
  const [saveChangeData, setSaveChangeData] = useState([]);
  const [userName, setUserName] = useState();
  const [userAge, setUserAge] = useState();
  const [userAddress, setUserAddress] = useState();

  useEffect(() => {
   if(userData){
     const userDataFinal = [...userData];
     setEdUserData(userDataFinal);
   }
  },[]);

  useEffect(() => {
    if(userDataEdited){
      setShowEditUserPopup(true);
    }
  },[userDataEdited]);

  const parentCallBack = (value) => {
    console.log(value);
    setShowPopup(true);
    setChildArray(value);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const editUserData = (value) => {
    setUserDataEdited(edUserData[value]);
    setEditIndexValue(value);
  };

  const nameChange = (value, attribute) =>{
     if(attribute === "name"){
      setUserName(value.target.value);
     }

     if(attribute === "age"){
      setUserAge(value.target.value);
     }

     if(attribute === "address"){
      setUserAddress(value.target.value);
     }
     
     const changeValue = {key: editIndexValue, name: userName?userName: edUserData[editIndexValue].name, 
      age:userAge?userAge:edUserData[editIndexValue].age, 
      address:userAddress? userAddress: edUserData[editIndexValue].address};
    const currentArray = [...edUserData];
    currentArray[editIndexValue] = changeValue;
    setSaveChangeData(currentArray);
    console.log("currentArray", currentArray);
  };

  const saveChanges = () => {
    setEdUserData(saveChangeData);
    setUserName();
    setUserAge();
    setUserAddress();
    setShowEditUserPopup(false);
  };
 
  console.log("saveChangeData", saveChangeData);
  const editUserDataPopup = () => {
    return(
      <div className="editUser-data-popup">
      <span className="close button">&#10006;</span>
      <h3>Edit User Details</h3>
      <div className="edit-row-popup">
        <label className="label name">Name : </label>
        <div className="edit data row">
          <input type="text" name="name" placeholder= { userDataEdited.name } onChange = {(e) => nameChange(e, "name")}/>
        </div>
        <div className="edit-row-popup">
        <label className="label name">Age : </label>
        <div className="edit data row">
          <input type="text" name="name" placeholder= { userDataEdited.age } onChange = {(e) => nameChange(e, "age")}/>
        </div>
      </div>
      <div className="edit-row-popup">
        <label className="label name">Address : </label>
        <div className="edit data row">
          <input type="text" name="name" placeholder= { userDataEdited.address } onChange = {(e) => nameChange(e, "address")}/>
        </div>
      </div>
      <div className="edit-row-popup">
        <button onClick={saveChanges }>Save changes</button>
      </div>
      </div>
      </div>
    )
  };


  return (
    <div className="App">
      <ChildComponent userData={ edUserData } 
      callBackParentCom = { parentCallBack } editUserData = {editUserData } />

      {showPopup?(
        <div className="popup-parent">
          <span className="close-button">&#10006;</span>
          <h3>User Details</h3>
          <div className="row one">
            <label className="label">name : </label>
            <label className="label">{ userData[childArray].name }</label>
          </div>
          <div className="row one">
            <label className="label">Age : </label>
            <label className="label">{ userData[childArray].age }</label>
          </div>
          <div className="row one">
            <label className="label">Age : </label>
            <label className="label">{ userData[childArray].address }</label>
          </div>
        </div>
      ):null}
      { showEditUserPopup? editUserDataPopup(): null }
    </div>
  );
}

export default App;
