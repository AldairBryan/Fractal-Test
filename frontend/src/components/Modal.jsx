import React, { Component } from 'react'
import Portal from './Portal'

import '../styles/Modal.css'

class Modal extends Component {
  render() {
    const { children, toggle, active } = this.props;

    return (
      <Portal>
        {active && (
          <div className='wrapper'>
            <div className='window'>
              <button className='btn-cerrar' onClick={toggle}>X</button>
              <div className='contenedor-children'>
                { children }
              </div>
            </div>
            <div onClick={toggle} className='background'/>
          </div>
        )}
      </Portal>
    )
  }
}

export default Modal