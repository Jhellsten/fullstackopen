import React from 'react';
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { id: 1, name: 'Arto Hellas', number: '040-123456' },
        { id: 2,name: 'Martti Tienari', number: '040-123456' },
        { id: 3,name: 'Arto Järvinen', number: '040-123456' },
        { id: 4,name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      etsittava: ''
    }
  }
  lisaaHenkilo = async (event) => {
    event.preventDefault()
    const uusiNimi = {
        name: this.state.newName,
        number: this.state.newNumber,
        id: this.state.persons.length + 1
    }
    const olemassa = (verrattava) => this.state.persons.filter(nimi => nimi.name.toLowerCase() === verrattava.toLowerCase()).length
    const tarkistus = olemassa(uusiNimi.name)
    if(await tarkistus > 0) {
        alert('Nimi on jo olemassa')
    } else {
        const nimet = this.state.persons.concat(uusiNimi)
        this.setState({
        persons: nimet,
        newName: '',
        newNumber: ''
    })
    }
    
  }
  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }
  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }
  handleEtsittavaChange = (event) => {
      console.log(event.target.value)
    this.setState({ etsittava: event.target.value })
  }

  render() {
    const nimet = this.state.persons.filter(i => i.name.toLowerCase().indexOf(this.state.etsittava.toLowerCase()) > -1)
    console.log(nimet)
    const esita = () => nimet.map(nimi => <li key={nimi.id}>{nimi.name} {nimi.number}</li>)
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form >
          <div>
            Rajaa näytettäviä: <input 
            value={this.state.etsittava}
            onChange={this.handleEtsittavaChange}
            placeholder="Syötä nimi"
            />
          </div>
        </form>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.lisaaHenkilo}>
          <div>
            nimi: <input 
            value={this.state.newName}
            onChange={this.handleNameChange}
            placeholder="Syötä nimi"
            />
          </div>
          puhelinnumero: <input 
            value={this.state.newNumber}
            onChange={this.handleNumberChange}
            placeholder="Syötä numero"
            />
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
            {esita()}
        </ul>

        <div>
      debug: {this.state.newName}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
