import React from 'react'
import ReactDOM from 'react-dom'
import countriesService from './services/countries.js'
import Filtteri from './Components/Filtteri.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [
      {
          name: '',
          capital: '',
          population: 0,
          flag: '',
          numericCode: ''
      }],
      etsittava: ''
    }
  }

  handleEtsittavaChange = (event) => {
    this.setState({ etsittava: event.target.value })
  }
  handleChangeEtsittava = (event) => {
      console.log(event)
    this.setState({ etsittava: event })
  }

  async componentDidMount() {
    const res = await countriesService.getAll()
    this.setState({ countries: res.data })
  }
  render() {
    const maat = this.state.countries.filter(i => i.name.toLowerCase().indexOf(this.state.etsittava.toLowerCase()) > -1)
    const esita = () => maat.map(maa => <li value={maa.nimi} onClick={() => this.handleChangeEtsittava(maa.name)} key={maa.numericCode}>{maa.name}  {maa.number} </li>)
    const yksiMaa = () => maat.map(maa => <ul key={maa.numericCode}><li><h2>{maa.name}</h2></li><li>Capital: {maa.capital}</li><li>Population: {maa.population}</li><img src={maa.flag} alt={maa.name}></img></ul>)
    if(esita().length === 1) {
        return (
            <div>
              <Filtteri etsittava={this.state.etsittava} handleEtsittavaChange={this.handleEtsittavaChange} esita={esita()} />
              <h2>Maat</h2>
              <ul>
                  {yksiMaa()} 
              </ul>
            </div>
          )
    } else {
        return (
        <div>
            <Filtteri etsittava={this.state.etsittava} handleEtsittavaChange={this.handleEtsittavaChange} esita={esita()} />
            <h2>Maat</h2>
            <ul>
                {esita()} 
            </ul>
        </div>
        )
    }
  }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
