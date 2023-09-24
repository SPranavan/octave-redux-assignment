import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {addUser} from "./features/Users";
import {deleteUser} from "./features/Users";
import {resetUser} from "./features/Users";
import Pagination from 'react-bootstrap/Pagination';
import {useEffect} from 'react';
import {Alert} from 'react-bootstrap';

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.value);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');  

  const [showAlertRed, setShowAlertRed] = useState(false);
  const [alertMessageRed, setAlertMessageRed] = useState('');  
  
  const usersPerPage = 5;
  const totalPages = Math.ceil(users.length / usersPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }else if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [users, currentPage, totalPages]);

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const usersToDisplay = users.slice(startIndex, endIndex);  

  // Determine whether to show pagination based on the number of pages
  const showPagination = totalPages > 1;

  // Calculate the number of pagination items to display (maximum 2 pages)
  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => setCurrentPage(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  const handleShowAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);

    // Automatically hide the alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 2500); 
  };

  const handleShowAlertRed = (message) => {
    setAlertMessageRed(message);
    setShowAlertRed(true);

    // Automatically hide the alert after 3 seconds
    setTimeout(() => {
      setShowAlertRed(false);
    }, 2500); 
  };

  return (
    <div className="App">
      <div className='input-outer-container'>
          <div className='input-inner-container d-flex flex-column'>
              <input type='text' placeholder='Enter Name' className="app-input" onChange={(event)=>{
                  setName(event.target.value);
              }} required/>
              <input type='text' placeholder='Enter Age' className="app-input" onChange={(event)=>{
                  setAge(event.target.value);
              }} required/>
          </div>
          <div className='input-btn-container mt-2 mb-4 d-flex ms-auto'>
              <button className="app-btn-1" onClick={()=>{
                const nextId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
                dispatch(addUser({
                  id: nextId,
                  name: name,
                  age: age,
                  }));
                  handleShowAlert('User added successfully.');
                  }}>Add User
              </button>

              <button className="app-btn-1 ms-3" onClick={() => {
                  dispatch(resetUser());
                  setCurrentPage(1); // Reset currentPage to 1
                  handleShowAlertRed('All users deleted successfully.');
                }}>
                Reset
              </button>
          </div>
      </div>
      <div className='displayUsers me-5 ms-5 d-flex flex-row'>
          {usersToDisplay.map((user) => (
              <div className='singleuser me-5 ms-5 d-flex flex-column border' key={user.id} >
                  <div className='singleuser-text d-flex flex-column align-items-center'>
                      <div className='userName'>Name : {user.name}</div>
                      <div className='userAge'>Age : {user.age}</div>
                  </div>
                  <div>
                  <button className="app-btn-2" onClick={() => {
                      dispatch(deleteUser({
                        id: user.id
                        }));
                        handleShowAlertRed('User deleted successfully.');
                      }}> Delete User
                </button>
                  </div>
              </div>
          ))}
      </div>
      <Alert
        show={showAlert}
        variant="info"
        onClose={() => setShowAlert(false)}
        dismissible
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999, // Adjust the z-index as needed
        }}
      >
        {alertMessage}
      </Alert>     
      <Alert
        show={showAlertRed}
        variant="danger"
        onClose={() => setShowAlertRed(false)}
        dismissible
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999, // Adjust the z-index as needed
        }}
      >
        {alertMessageRed}
      </Alert>     

      {showPagination && (
        <Pagination className="app-pagination mt-4">
          <Pagination.Prev
            onClick={() =>
              setCurrentPage((prevPage) =>
                prevPage > 1 ? prevPage - 1 : prevPage
              )
            }
            disabled={currentPage === 1}
          />
          {paginationItems}
          <Pagination.Next
            onClick={() =>
              setCurrentPage((prevPage) =>
                prevPage < totalPages ? prevPage + 1 : prevPage
              )
            }
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}
    </div>
  );
}

export default App;