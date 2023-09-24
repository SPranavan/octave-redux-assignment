import './App.css';
import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {addUser} from "./features/Users";
import {deleteUser} from "./features/Users";

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.value);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  
  return (
    <div className="App">
      <div className='addUser'>
          <input type='text' placeholder='Enter Name' onChange={(event)=>{
              setName(event.target.value);
          }}/>
          <input type='text' placeholder='Enter Age' onChange={(event)=>{
              setAge(event.target.value);
          }}/>
          <button onClick={()=>{dispatch(addUser({
              id: users[users.length-1].id + 1,
              name: name,
              age: age,
          }))}}>Add User</button>
      </div>
      <div className='displayUsers'>
          {users.map((user) => (
              <div className='singleuser' key={user.id}>
                  <div className='userName'>{user.name}</div>
                  <div className='userAge'>{user.age}</div>
                  <button onClick={()=>dispatch(deleteUser({
                      id:user.id
                  }))}> Delete User</button>
              </div>
          ))}
      </div>
    </div>
  );
}

export default App;