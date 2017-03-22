import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchProfile,createBuyRequestFetch,createSellRequestFetch} from '../../actions/index.js'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
import defaultImageRequest from '../../../public/assets/img/box-outline-filled.png'
const compId = localStorage.getItem('companyId')
import $ from 'jquery'

let requestInfo = {
  showTitleMessage: function (from, align) {
    $.notify({
      icon: 'pe-7s-close',
      message: '<p style="margin-top:8px">Please input the title</p>'
    }, {
      type: 'danger',
      timer: 4000,
      placement: {
        from: from,
        align: align
      }
    })
  },
  showRequestMessage: function (from, align) {
    $.notify({
      icon: 'pe-7s-close',
      message: '<p style="margin-top:8px">Request message is required</p>'
    }, {
      type: 'danger',
      timer: 4000,
      placement: {
        from: from,
        align: align
      }
    })
  },
  showTypeMessage: function (from, align) {
    $.notify({
      icon: 'pe-7s-close',
      message: '<p style="margin-top:8px">Please update your company profile type</p>'
    }, {
      type: 'danger',
      timer: 4000,
      placement: {
        from: from,
        align: align
      }
    })
  },
  showSubmitMessage: function (from, align) {
    $.notify({
      icon: 'pe-7s-cloud-download',
      message: '<p style="margin-top:8px">Request has been sent</p>'
    }, {
      type: 'info',
      timer: 4000,
      placement: {
        from: from,
        align: align
      }
    })
  }
}

class CreateRequest extends Component {
  constructor(){
    super()
    this.state = {
      topbarTitle: 'Create Request',
      activeNavigation: ['','','active','', ''],
      requestData:{
        request: '',
        title: '',
        price: '',
        image: defaultImageRequest
      }
    }
  }

  componentDidMount(){
    this.props.fetchProfile(compId)
  }


  onHandleSubmitRequest(data,id,companyType){
    if (this.state.requestData.title === '') {
      requestInfo.showTitleMessage('top','center')
    } else if (this.state.requestData.request === '') {
      requestInfo.showRequestMessage('top','center')
    } else {
      if (companyType === 'ukm'){
        this.props.createSellRequestFetch(data,id)
      } else if (companyType === 'corporate'){
        this.props.createBuyRequestFetch(data,id)
      } else {
        requestInfo.showTypeMessage('top','center')
      }
      requestInfo.showSubmitMessage('top','center')
      this.setState({
        requestData:{
          request: '',
          title: '',
          price: '',
          image: ''
        }
      })
    }

  }

  onHandleChange (e) {
    let newState = {}
    newState[e.target.name] = e.target.value
    const newData = Object.assign({}, this.state.requestData, newState);
    this.setState({requestData: newData})
  }

  render () {
    return (
      <div className="wrapper">
        <Sidebar activeNavigation={this.state.activeNavigation} />
        <div className="main-panel">
          <Topbar title={this.state.topbarTitle} />
          <div className='content'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='card'>
                    <div className='content'>
                      <form>
                        <div className='row'>
                          <div className='col-md-12'>
                            <div className='form-group'>
                              <label>
                                Title
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                name='title'
                                value={this.state.requestData.title}
                                placeholder='Request title'
                                onChange={this.onHandleChange.bind(this)} />
                            </div>
                          </div>
                        </div>

                        <div className='row'>
                          <div className='col-md-12'>
                            <div className='form-group'>
                              <label>
                                Request
                              </label>
                              <textarea
                                rows='3'
                                name='request'
                                className='form-control'
                                value={this.state.requestData.request}
                                placeholder='Request message goes in here. Post a message to all companies within your category'
                                onChange={this.onHandleChange.bind(this)} />
                            </div>
                          </div>
                        </div>

                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label>
                                Image (Optional)
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                name='image'
                                value={this.state.requestData.image}
                                placeholder='Request image URL'
                                onChange={this.onHandleChange.bind(this)} />
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label>
                                Price (Optional)
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                name='price'
                                value={this.state.requestData.price}
                                placeholder='Price Range'
                                onChange={this.onHandleChange.bind(this)} />
                            </div>
                          </div>
                        </div>

                        <hr />
                        <button
                          type='submit'
                          className='btn btn-primary btn-fill'
                          style={{marginRight: 20}}
                          onClick={(e) => {
                                     e.preventDefault()
                                     this.onHandleSubmitRequest(this.state.requestData,compId,this.props.profile.type)}}>
                          Submit Request
                        </button>
                        <div className='clearfix'></div>
                      </form>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProfile: (id) => dispatch(fetchProfile(id)),
    createBuyRequestFetch: (data,id) => dispatch(createBuyRequestFetch(data,id)),
    createSellRequestFetch: (data,id) => dispatch(createSellRequestFetch(data,id)),
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(CreateRequest)
