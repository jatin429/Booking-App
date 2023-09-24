import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewRoom = () => {
  const [info,setInfo]=useState({});
  const [hotelId,setHotelId]=useState(undefined);
  const [rooms,setRooms]=useState([]);
  const{data,loading,error}=useFetch("/hotels")
  console.log("hotels",data);
  const handleChange=(e)=>{
      setInfo((prev)=>({...prev,[e.target.id]:e.target.value}))
  }

  const handleClick=async (e)=>{
     e.preventDefault();
    //  to make an object as we have defined in our models we use map function
     const roomNumbers= rooms.split(",").map(room=>({number:room}))
     console.log("roomNumbers",roomNumbers);
     try{
        await axios.post(`/rooms/${hotelId}`,{...info,roomNumbers})
     }catch(err){
       console.log(err);
     }
}

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        <div className="bottom">
          {/* <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div> */}
          <div className="right">
            <form>
              {/* <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div> */}

              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleChange}/>
                </div>
              ))}
              <div className="formInput">
                  <label>Rooms</label>
                  <textarea onChange={e=>setRooms(e.target.value)} placeholder="Give Comma between each room numbers"/>
                </div>
              <div className="formInput" >
                  <label>Choose a hotel</label>
                  <select id="hotelId"  onChange={e=>setHotelId(e.target.value)}>
                    {loading ? "Loading" : data && data.map(hotel=>(
                      <option value={hotel._id}>{hotel.name}</option>
                    ))}
                  </select>
                </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
