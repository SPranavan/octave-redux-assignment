import './App.css';
import {useSelector} from "react-redux";

function App() {

  const users = useSelector((state) => state.users.value);
  return (
    <div className="App">
      <div className='addUser'>
          <input type='text' placeholder='Enter Name' />
          <input type='text' placeholder='Enter Age' />
          <button>Add User</button>
      </div>
      <div className='displayUsers'>
          {users.map((user) => (
              <div className='singleuser' key={user.id}>
                  <div className='userName'>{user.name}</div>
                  <div className='userAge'>{user.age}</div>
              </div>
          ))}
      </div>
    </div>
  );
}

export default App;