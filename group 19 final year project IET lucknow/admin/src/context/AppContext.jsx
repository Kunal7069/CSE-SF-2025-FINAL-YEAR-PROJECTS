import { createContext } from "react";

    
export const AppContext = createContext()

const AppContextProvider = (props)=>{

    const calculateAge = (dob)=> {
        const birthDate = new Date(dob);
        const today = new Date();
      
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
      
        // If birthday hasn't occurred yet this year, subtract 1
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
      
        return age;
      }

      const months = ["","JAN","FEB","MAR","APR","MAY","JUNE","JULY","AUG","SEPT","OCT","NOV","DEC"]

      const slotDateFormat = (slotDate)=>{
        const dateArray =slotDate.split('_')
        return dateArray[0]+ " "+ months[Number(dateArray[1])]+ " "+ dateArray[2]
      }
      

    const value = {

        calculateAge,slotDateFormat,


      

    }

    return(
        <AppContext.Provider value={value}>

            {props.children}

        </AppContext.Provider>
    )
}

export default AppContextProvider