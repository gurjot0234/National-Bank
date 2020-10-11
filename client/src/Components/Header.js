import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';

const Header = (props)=> {
    return (
        <nav>
    <div className="nav-wrapper nav-background">
      <span className="padding-left-10">National Bank</span>
      <span className="right padding-left-10 padding-right-30">{props.userName}</span>
      <span className="right padding-left-10"><Link to='/'>Logout</Link></span>
      <span className="right padding-left-10"><Link to='/transfer' >Transfer</Link></span>
      <span className="right "><Link to='/dashboard' >Dashboard</Link></span>
      
    </div>
  </nav>
    )
}
const mapStateToProps = (state)=>{
  return {
      userName: state.userName,
      
  }
}

export default connect(mapStateToProps)(Header);
