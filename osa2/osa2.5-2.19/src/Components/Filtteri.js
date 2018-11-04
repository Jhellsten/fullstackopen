import React from 'react'

const Filtteri = (props) => {
    return (
        <div>
            <h2>Puhelinluettelo</h2>
          <div>
            Rajaa näytettäviä: <input 
            value={props.etsittava}
            onChange={props.handleEtsittavaChange}
            placeholder="Syötä nimi"
            />
          </div>
        </div>
    )
}


export default Filtteri