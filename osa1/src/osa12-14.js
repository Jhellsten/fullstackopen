import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: {
        0:0,
        1:0,
        2:0,
        3:0,
        4:0,
        5:0
      }
    }
  }
    random = () => {
      this.setState({
        selected: (Math.floor(Math.random() * (anecdotes.length)))
      })
    }
    vote = () => {
      const kopio = {...this.state.votes}
      kopio[this.state.selected] += +1
      this.setState({
        votes: kopio
      })
    }
  

  render() {
    const korkein = Object.keys(this.state.votes).reduce((a, b) => this.state.votes[a] > this.state.votes[b] ? a : b)
    console.log(korkein)
    return (
      <div>
        <div>
          {this.props.anecdotes[this.state.selected]}  
          <p>Has {[this.state.votes[this.state.selected]]} votes</p>
        </div>
        <div>
          <button onClick={this.random}>Next anecdotes</button>
        </div>
        <div>
          <button onClick={this.vote}>Vote</button>
        </div>
        <div>
          <h2>Anecdote with most votes</h2>
          <p>{this.props.anecdotes[korkein]} </p>
          <p>Has {[this.state.votes[korkein]]} votes</p>
        </div>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)