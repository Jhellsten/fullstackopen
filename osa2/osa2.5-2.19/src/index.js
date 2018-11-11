import React from 'react'
import ReactDOM from 'react-dom'
import personsService from './services/persons.js'
import Lomakkeet from './Components/Lomakkeet.js'
import Filtteri from './Components/Filtteri.js'
import Notification from './Components/Notification.js'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      etsittava: '',
      error: null,
      success: null

    }
  }
  lisaaHenkilo = async (event) => {
    event.preventDefault()
    const uusiNimi = {
        name: this.state.newName,
        number: this.state.newNumber,
        id: this.state.persons.length + 1
    }
    const olemassa = (verrattava) => this.state.persons.filter(nimi => nimi.name.toLowerCase() === verrattava.toLowerCase())
    const tarkistus = olemassa(uusiNimi.name)
    try {
      if(tarkistus.length > 0) {
        if(window.confirm(`${uusiNimi.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
          try {
            await personsService.update((uusiNimi.id - 1) , uusiNimi)
          } catch (error) {
            this.setState({
              error: error.message
            })
            setTimeout(() => {
              this.setState({error: null})
            }, 5000)
          }
          const res = await personsService.getAll()
          this.setState({
            persons: res.data,
            newName: '',
            newNumber: '',
            success: `Henkilo '${uusiNimi.name}' numero on päivitetty palvelimelle`
          })
        }
      } else {
          const nimet = this.state.persons.concat(uusiNimi)
          try {
            await personsService.create(uusiNimi)
          } catch (error) {
            this.setState({
              error: error.message
            })
            setTimeout(() => {
              this.setState({error: null})
            }, 5000)
          }
          this.setState({
          persons: nimet,
          newName: '',
          newNumber: '',
          success: `Henkilo '${uusiNimi.name}' on lisätty palvelimelle`
          })
          setTimeout(() => {
            this.setState({success: null})
          }, 5000)
      }
    } catch (error) {
      this.setState({
        error: `Henkilo '${uusiNimi.name}' on jo valitettavasti poistettu palvelimelta`,
      })
      setTimeout(() => {
        this.setState({error: null})
      }, 5000)
    }
    
  }
  poistaHenkilo = async (poistettava) => {
    const henkilo = this.state.persons.filter(i => i.id === poistettava)
    if (window.confirm(`Poistetaanko ${henkilo[0].name}`)) {
      try {
        await personsService.del(poistettava)
      } catch (error) {
        console.log(error.message)
        this.setState({
          error: error.message
        })
        setTimeout(() => {
          this.setState({error: null})
        }, 5000)
      }
      let henkilot = this.state.persons
      henkilot.splice(henkilot.findIndex((i) => i[0] === poistettava), 1)
        this.setState({
        persons: henkilot,
        error: `Henkilo '${henkilo[0].name}' on poistettu palvelimelta`
          })
          setTimeout(() => {
            this.setState({success: null})
          }, 5000)
    } else {
      this.setState({
        error: 'Ei poistettu'
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
        <Notification failure={this.state.error} success={this.state.success}/>
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
