import React, { Component } from 'react'
import logo from '../../../public/assets/logo/ukmhub_sidebar.png'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchProfile } from '../../actions/index.js'
const compId = localStorage.getItem('companyId')

class Sidebar extends Component {
  componentDidMount(){
    this.props.fetchProfile(compId)
  }
  
  render(){
    return (
      <div className="sidebar">
      	<div className="sidebar-wrapper" style={{background:'rgba(45,45,45,0.8)'}}>
          <div className="logo" style={{textAlign:'center', background:'white', borderRight: '1px solid rgba(20,20,20,0.1)'}}>
            <Link to='/map'>
                <img src={logo} style={{width:'75%', padding:'1px 15px'}} alt='ukmhub logo'></img>
            </Link>
          </div>

          <ul className="nav">

  					<li className={this.props.activeNavigation[0]}>
              <Link to='/map'>
                <i className="pe-7s-share"></i>
                <p>Map View</p>
              </Link>
  					</li>

            <li className={this.props.activeNavigation[1]} style={{marginBottom: 20}}>
              <Link to='/list'>
                <i className="pe-7s-menu"></i>
                <p>List View</p>
              </Link>
            </li>

            {
              ( this.props.profile.type === 'corporate' ) ?

                <div>
                  <li className={this.props.activeNavigation[2]} style={{borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop: 8}}>
                    <Link to='/create-request' style={{padding:'10px 15px'}}>
                      <i className="pe-7s-note"></i>
                      <p>Create Request</p>
                    </Link>
                  </li>

                  <li className={this.props.activeNavigation[3]} style={{marginBottom: 20, borderBottom:'1px solid rgba(255,255,255,0.1)', paddingBottom: 20}}>
                    <Link to='/request-list' style={{padding:'10px 15px'}}>
                      <i className="pe-7s-notebook"></i>
                      <p>UKM Request List</p>
                    </Link>
                  </li>
                </div>
              :
                <div>
                  <li className={this.props.activeNavigation[2]} style={{borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop: 8}}>
                    <Link to='/create-request' style={{padding:'10px 15px'}}>
                      <i className="pe-7s-note"></i>
                      <p>Create Request</p>
                    </Link>
                  </li>

                  <li className={this.props.activeNavigation[3]} style={{marginBottom: 20, borderBottom:'1px solid rgba(255,255,255,0.1)', paddingBottom: 20}}>
                    <Link to='/request-list' style={{padding:'10px 15px'}}>
                      <i className="pe-7s-notebook"></i>
                      <p>Corporate Request List</p>
                    </Link>
                  </li>
                </div>
            }

            <li className={this.props.activeNavigation[4]}>
              <Link to='/message'>
                <i className="pe-7s-comment"></i>
                <p>Message</p>
              </Link>
            </li>

          </ul>
      	</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProfile: (id) => dispatch(fetchProfile(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
