import React from 'react'
import cssModule from 'react-css-modules'
import styles from './Top10.css'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import Request from 'superagent'
import _ from 'lodash'

class Top10 extends React.Component {
  static propTypes = {}

  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      endDate: moment()
    }
    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleEndDateChange = this.handleEndDateChange.bind(this)
  }

  componentDidMount () {
    this.getTopNSectAct()
  }

  getTopNSectAct = function () {
    var url =
            'http://localhost:3001/api/fait_activites/topNSpectPart/' +
            (this.refs.query.value ? this.refs.query.value : 10) +
            '/' +
            this.state.startDate.format() +
            '/' +
            this.state.endDate.format()

    Request.get(url).then(res => {
      this.setState({ topNSectAct: JSON.parse(res.text) })
      console.log(res.text)
    })
  }

  handleStartDateChange (date) {
    this.setState({
      startDate: date
    })
    setTimeout(() => {
      this.getTopNSectAct()
    }, 100)
  }

  handleEndDateChange (date) {
    if (date < this.state.startDate) {
      this.setState({
        startDate: date
      })
    }
    this.setState({
      endDate: date
    })
    setTimeout(() => {
      this.getTopNSectAct()
    }, 100)
  }

  render () {
    var resultat = _.map(this.state.topNSectAct, top => {
      return (
        <tr>
          <td>
            {top._id.nomActivite}
          </td>
          <td>
            {top.NbSpectateursTotaux}
          </td>
        </tr>
      )
    })

    return (
      <div>
        <div className='col-md-6'>
          <div className='col-md-6'>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleStartDateChange}
              placeholderText='Enter date debut'
                        />
          </div>
          <div className='col-md-6'>
            <DatePicker
              selected={this.state.endDate}
              onChange={this.handleEndDateChange}
              placeholderText='Enter date fin'
                        />
          </div>
        </div>
        <div className='n col-md-2'>
          <div className='input-group'>
            <span className='input-group-btn'>
              <button className='btn btn-secondary' type='button'>
                                N!
                            </button>
            </span>
            <input
              ref='query'
              onChange={e => {
                this.getTopNSectAct()
              }}
              type='text'
              class='form-control'
              placeholder='Search for...'
              aria-label='Search for...'
                        />
          </div>
        </div>
        <div className='col-md-8'>
          <table className='table table-striped'>
            <tbody>
              <tr>
                <th>Nom Activite</th>
                <th>Total spectateurs</th>
              </tr>
              {resultat}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default cssModule(Top10, styles)
