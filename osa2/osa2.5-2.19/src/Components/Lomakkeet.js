import React from 'react'

const Lomakkeet = (props) => {
    return (
        <div>
            <h2>Lisää uusi</h2>
            <div>
                nimi: <input 
                value={props.newName}
                onChange={props.handleNameChange}
                placeholder="Syötä nimi"
                />
            </div>
            puhelinnumero: <input 
                value={props.newNumber}
                onChange={props.handleNumberChange}
                placeholder="Syötä numero"
                />
            <div>
                <button type="submit">lisää</button>
            </div>
        </div>
    )
    }

export default Lomakkeet