import React from 'react'
import ReactDOM from 'react-dom'
import personsService from './services/persons.js'
import Lomakkeet from './Components/Lomakkeet.js'
import Filtteri from './Components/Filtteri.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
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
    if(tarkistus > 0) {
        alert('Nimi on jo olemassa')
    } else {
        const nimet = this.state.persons.concat(uusiNimi)
        await personsService.create(uusiNimi)
        this.setState({
        persons: nimet,
        newName: '',
        newNumber: ''
    })
    }
    
  }
  poistaHenkilo = async (poistettava) => {
    const henkilo = this.state.persons.filter(i => i.id === poistettava)
    if (window.confirm(`Poistetaanko ${henkilo[0].name}`)) {
    await personsService.del(poistettava)
    let henkilot = this.state.persons
    henkilot.splice(henkilot.findIndex((i) => i[0] === poistettava), 1)
      this.setState({
      persons: henkilot,
      })
    } else {
      alert('Ei poistettu')
    }
    
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }
  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }
  handleEtsittavaChange = (event) => {
    this.setState({ etsittava: event.target.value })
  }

  async componentDidMount() {
    const res = await personsService.getAll()
    this.setState({ persons: res.data })
  }
  render() {
    const nimet = this.state.persons.filter(i => i.name.toLowerCase().indexOf(this.state.etsittava.toLowerCase()) > -1)
    const esita = () => nimet.map(nimi => <li key={nimi.id}>{nimi.name} {nimi.number} <button onClick={() => this.poistaHenkilo(nimi.id)} type="submit">poista</button></li>)
    return (
      <div>
        <Filtteri etsittava={this.state.etsittava} handleEtsittavaChange={this.handleEtsittavaChange} />
        <form onSubmit={this.lisaaHenkilo}>
            <Lomakkeet newName={this.state.newName} newNumber={this.state.newNumber} handleNameChange={this.handleNameChange} handleNumberChange={this.handleNumberChange} />
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
