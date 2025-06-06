import { createContext } from "react";
import { useState } from "react";
import {toast} from 'react-toastify'
import axios from 'axios'
    
export const AdminContext = createContext()

const AdminContextProvider = (props)=>{

    const [aToken,setAToken]= useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    const [doctors,setDoctors]=useState([])
    const [appointments,setAppointments] = useState([])
    const [dashData,setDashData] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async() => {

        try{

            const {data} = await axios.post(backendUrl+'/api/admin/all-doctors',{},{headers:{aToken}})
            if(data.success){
                setDoctors(data.doctors)
            }
            else{
                toast.error(data.message)
            }

        }catch(error){

            toast.error(error.message)

        }

    }

    const changeAvailability = async(docID)=>{

        try {

            const {data} = await axios.post(backendUrl+'/api/admin/change-availability',{docID} ,{headers:{aToken}})
            if(data.success){
                setDoctors(data.doctors)
                getAllDoctors()
            }
            else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
            
        }

    }

    const getAllAppointments = async()=>{
        try {

            const {data} = await axios.get(backendUrl+'/api/admin/appointments',{headers:{aToken}})
            console.log(data)
            if(data.success){
                setAppointments(data.appointments)
            }
            else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
            
        }
    }


    const cancelAppointment = async(appointmentId)=>{
        try {

            const {data} = await axios.post(backendUrl+'/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})

            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            }
            else{
                // console.log(data)
                toast.error(data.message)
            }


        } catch (error) {

            toast.error(error.message)
            
        }
    }

    const getDashData = async()=>{
        try {

            const {data} = await axios.get(backendUrl+'/api/admin/dashboard',{headers:{aToken}})
            if(data.success){
                // toast.success(data.message)
                setDashData(data.dashData)
            }
            else{
                // console.log(data)
                toast.error(data.message)
            }


            
        } catch (error) {
            toast.error(error.message)
            
            
        }
    }



    const value = {

        aToken,setAToken,
        backendUrl,doctors,getAllDoctors,changeAvailability,
        appointments,setAppointments,getAllAppointments,cancelAppointment,
        dashData,getDashData,


      

    }

    return(
        <AdminContext.Provider value={value}>

            {props.children}

        </AdminContext.Provider>
    )
}

export default AdminContextProvider