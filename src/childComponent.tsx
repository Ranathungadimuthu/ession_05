import React from "react";

interface ChildComponent {
    userData:[];
    callBackParentCom: (value: number) => void;
    editUserData:(value: number) => void;
}


const ChildComponent = (props:ChildComponent) =>{
    const { userData, callBackParentCom, editUserData } = props;

    const callBack = (value: number) => {
        callBackParentCom(value);
    }; 

 return(
     <>
     <table>
         <thead>
             <tr>
                 <th>Name</th>
                 <th>Age</th>
                 <th>Address</th>
             </tr>
         </thead>
         <tbody>
             {userData.map((value:any, key:number) => {
                 return(
             <tr key= { key }>
                 <td onClick={ () => callBack(key) }>{ value.name }</td>
                 <td onClick={ () => callBack(key) }>{value.age }</td>
                 <td onClick={ () => callBack(key) }>{ value.address }</td>
                 <td><button onClick={ () => editUserData(key) }>Edit</button></td>
             </tr>
                 )
             })}
         </tbody>
     </table>
     </>
 )
};

export default ChildComponent;