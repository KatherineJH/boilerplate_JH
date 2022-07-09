import React from 'react'
// import {Icon} from '@ant-design/compatible';

function Footer() {
  return (
    <div style={{
      height: '80px', display: 'flex',
      flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', fontSize:'1rem'
    }}>
      <p> Welcome to Movie Blog App!  
        {/* <Icon type="smile" /> */}
      </p>
    </div>
  )
}

export default Footer;