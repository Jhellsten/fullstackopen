import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        hyvä: 0,
        neutraali: 0,
        huono: 0,
        yhteensä: [],
        keskiarvo: 0,
        prosentteina: 0,
      }
    }
  
    klikki = {

        hyvä: () => {
        this.setState({
            hyvä: this.state.hyvä + 1,
            yhteensä: this.state.yhteensä.concat(1)
            },this.laskelmat)
        },
        neutraali: () => {
        this.setState({
            neutraali: this.state.neutraali + 1,
            yhteensä: this.state.yhteensä.concat(0),
        },this.laskelmat)
        },

        huono: () => {
        this.setState({
            huono: this.state.huono + 1,
            yhteensä: this.state.yhteensä.concat(-1),
        },this.laskelmat)
        }
    }
    laskelmat = () => {
        const positiiviset = this.state.yhteensä.filter(n => n === 1).length
        const nollat = this.state.yhteensä.length
        this.setState({
            keskiarvo: (this.state.yhteensä.reduce((e, t) => {
                return e + t
            }, 0) / this.state.yhteensä.length).toFixed(1),
            prosentteina: ((positiiviset / nollat) * 100).toFixed(1)
        })

    }
    positiivisetProsentteina = () => {
        const positiiviset = this.state.yhteensä.filter(n => n === 1).length
        const nollat = this.state.yhteensä.length
        this.setState({ 
            prosentteina: (positiiviset / nollat) * 100
        })
    }

    Button = () => {
        return (
            <div>
                <button onClick={this.klikki.hyvä}>hyvvä</button>
                <button onClick={this.klikki.neutraali}>neutraali</button>
                <button onClick={this.klikki.neutraali}>huono</button>
            </div>
        )
    }

    Statistics = () => {
        return (
            <div>
                <this.Statistic />
            </div>
        )
        
    }

    Statistic = () => {
        if (this.state.yhteensä.length === 0) {
            return (<div><p>Ei yhtään palautetta annettu</p></div>)
        } 
        return (
            <table>
                <tbody>
                        <tr>
                        <td>Hyvä: {this.state.hyvä}</td>
                        </tr>
                        <tr>
                            <td>Neutdaali: {this.state.neutdaali}</td>
                        </tr>
                        <tr>
                            <td>Huono: {this.state.huono}</td>
                        </tr>
                        <tr>
                            <td>Keskiarvo: {this.state.keskiarvo}</td>
                        </tr>
                        <tr>
                            <td>Positiivisia: {this.state.prosentteina}%</td>
                        </tr>
                </tbody>
            </table>
        )
    }

  
    render() {
      return (
        <div>
          <div>
            <h2>Anna palautetta</h2>
                <this.Button />
            <h2>Statistiikka</h2>
            <this.Statistics />
          </div>
        </div>
      )
    }
  }
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )