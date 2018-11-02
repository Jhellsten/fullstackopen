import React from 'react'

const Kurssi = ({kurssi}) => {
    const rivit = (osa) => kurssi.osat[osa].osat.map(osa => <li key={osa.id}>{osa.nimi} {osa.tehtavia}</li>)
    const yhteensa = (osa) => kurssi.osat[osa].osat.map(osa => osa.tehtavia).reduce((n, s) =>  s + n)
    return (
        <div>
            <h2>{kurssi.osat[0].nimi}</h2>
            <ul>
                {rivit(0)}
                <li>Yhteensä  {yhteensa(0)} tehtävää</li>
            </ul>
            <h2>{kurssi.osat[1].nimi}</h2>
            <ul>
                {rivit(1)}
                <li>Yhteensä  {yhteensa(1)} tehtävää</li>
            </ul>
        </div>
    )
}


export default Kurssi