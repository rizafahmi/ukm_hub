import React, { Component } from 'react'
import '../../App.css'
import {connect} from 'react-redux'
import {otherCompanyRequestFetch} from '../../actions/index.js'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
import ListOfRequest from './ListOfRequest'
const compId = localStorage.getItem('companyId')

class RequestList extends Component {
  constructor(){
    super()
    this.state = {
      topbarTitle: 'Request List',
      activeNavigation: ['','','','active']
    }
  }

  componentWillMount(){
    this.props.otherCompanyRequestFetch(compId)
  }
  render () {
    return (
      <div className="wrapper">
        <Sidebar activeNavigation={this.state.activeNavigation} />
        <div className="main-panel">
          <Topbar title={this.state.topbarTitle} />
            {
              this.props.otherCompanyRequest < 1 ? <p>waiting...</p> :
              <ListOfRequest requests={this.props.otherCompanyRequest}/>
            }

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    otherCompanyRequest: state.otherCompanyRequest
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    otherCompanyRequestFetch: (id) => dispatch(otherCompanyRequestFetch(id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RequestList)
