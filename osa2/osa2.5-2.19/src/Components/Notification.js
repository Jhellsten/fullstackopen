import React from 'react'
import '../index.css'

const Notification = ({failure, success}) => {
  
  if (failure === null && success === null) {
    return null  
  } 
  if (success !== null && failure === null){
    return (
      <div className="success">
        {success}
      </div>
  )} 
  if(failure !== null && success === null) {
    return (
      <div className="error">
        {failure}
      </div>
    )}
    else {
      return null
    }
  }

 
export default Notification