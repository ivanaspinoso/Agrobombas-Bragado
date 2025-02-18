import React from 'react'

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Cargando imagen y datos</span>
      </div>
    </div>
  )
}

export default Spinner


{/* <div className="spinner-border" role="status">
<span className="visually-hidden">Cargando...</span>
</div> */}