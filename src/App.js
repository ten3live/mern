import React from 'react'

import './App.css'
import Axios from 'axios'
import { useState, useEffect } from 'react'
function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [list, setList] = useState([]);
  const add = () => {
    console.log(name, age, description)
    Axios.post('https://serene-dawn-30671.herokuapp.com/insert', {
      name: name,
      age: age,
      description:description
    }).then((response) => {
      setList([...list, {_id:response.data._id, name: name, age: age, description: description }])
      // alert("Yay Worked");
    }).catch(() => {
      // alert("failed")
    })
  }
const updateFriend=(id)=>{
  const newAge=prompt("New Age");
  Axios.put('https://serene-dawn-30671.herokuapp.com/update',{newAge:newAge,id:id}).then(()=>{
    setList(list.map((val)=>{
      return val._id==id ? {_id:id,name:val.name,age:newAge,description:val.description} : val
    }))
  })
} 
const deleteFriend=(id)=>{
  Axios.delete(`https://serene-dawn-30671.herokuapp.com/delete/${id}`).then(()=>{
    setList(list.filter((val)=>{
      return val._id !=id;
    }))
  })
}  
  useEffect(() => {
    Axios.get('https://serene-dawn-30671.herokuapp.com/read')
      .then((response) => {
        // console.log(response.data)
        setList(response.data)
       
      }).catch(() => {
        console.log("Error")
      })
  }, [])
  return (
    <div className="App">
      <div className="inputs">
        <input type="text" onChange={(event) => {
          setName(event.target.value)
        }} />
        <input type="text" onChange={(event) => {
          setAge(event.target.value)
        }} />
        <input type="text" onChange={(event) => {
          setDescription(event.target.value)
        }} />
        <button onClick={add}>Add Friend</button>
      </div>
      <div className="listAll">
        {list.map((val) => {
          return (
            <div className="containerList">           
            <div className="item">
              <p>  Name  :  {val.name}    </p>
              <p>  Age :  {val.age}  </p>
              <p>  Desc : {val.description} </p>
            </div>
            <div>
              <button onClick={()=>{updateFriend(val._id)
              }}>Update</button>
              <button onClick={()=>{deleteFriend(val._id)
              }}>Delete</button></div>
            </div>
            )
        })}
      </div>
    </div>
  )
}


export default App;