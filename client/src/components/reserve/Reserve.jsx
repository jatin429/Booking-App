import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./reserve.css"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import useFetch from "../../hooks/useFetch"
import { useContext, useState } from "react"
import { SearchContext } from "../../context/SearchContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const Reserve = ({setOpen,hotelid}) => {

  const {data,loading,}=useFetch(`/hotels/room/${hotelid}`)
  const {dates}=useContext(SearchContext);
  const [selectedRooms,setSelectedRooms]=useState([]);

   const handleSelect=(e)=>{
       const checked=e.target.checked;
       const value=e.target.value;
       setSelectedRooms(checked ? [...selectedRooms ,value] : selectedRooms.filter((item)=>item!==value)
       )
   }

   const getDatesInRange=(startDate,endDate)=>{
    const date=new Date(startDate.getTime())
    console.log("date=>",date)

   let list=[];
   while(date<=endDate){
       list.push(new Date(date).getTime());
       date.setDate(date.getDate()+1)
   }
   return list;
}
const allDates=getDatesInRange(dates[0].startDate,dates[0].endDate);

   const navigate=useNavigate();

   const handleClick=async()=>{
    try{
       await Promise.all(selectedRooms.map(roomId=>{
        const res=axios.put(`/rooms/avalibility/${roomId}`,{dates:allDates})
        return res.data;
       }))
    }catch(err){

    }
     setOpen(false);
     navigate("/");
   }

   const isAvailable=(roomNumber)=>{
        const isFound=roomNumber.unavailableDates.some((date)=>allDates.includes(new Date(date).getTime()))
        return !isFound;
   }

  console.log(selectedRooms)
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={()=>setOpen(false)}
          />
          <span className="">Select your rooms:</span>
          {data.map(item =>(
            <div className="rItem">
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">Max People:<b>{item.maxPeople}</b></div>
                 <div className="rPrice">{item.price}</div>
              </div>  
               <div className="rSelectRooms">
               {item.roomNumber.map((roomNumber)=>(
                    <div className="room">
                    <label>{roomNumber.number} </label>
                    <input type="checkbox" disabled={!isAvailable(roomNumber)} value={roomNumber._id} onChange={handleSelect}/>
                    </div>
          ))}  
               </div> 
               
            </div>
          ))}
          <button className="rButton" onClick={handleClick}>Reserve Now!</button>
      </div>
    </div>
  )
}
