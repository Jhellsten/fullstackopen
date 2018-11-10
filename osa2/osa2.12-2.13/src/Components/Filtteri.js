import React from 'react'

const Filtteri = (props) => {
    if(props.esita.length > 10) {
    return (
        <div>
            <h2>Etsi maita</h2>
          <div>
            Maan nimi: <input 
            value={props.etsittava}
            onChange={props.handleEtsittavaChange}
            placeholder="Suomi"
            />
          <p>Liian monta osumaan, tarkenna hakua</p>
          </div>
        </div>
    )
    } else {
        return (
            <div>
                <h2>Etsi maita</h2>
              <div>
                Maan nimi: <input 
                value={props.etsittava}
                onChange={props.handleEtsittavaChange}
                placeholder="Suomi"
                />
              </div>
            </div>
        ) 
    }
}


export default Filtteri