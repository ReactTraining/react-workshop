import React from 'react'
import PropTypes from 'prop-types'

function ProductFilterItem({ children, item, onChange, selected = false }) {
  // The reason for the odd logic with onChange and checked is because some
  // lectures use this component but without passing props for onChange and selected
  return (
    <div className="no-wrap">
      <label>
        <input
          type="checkbox"
          onChange={onChange ? e => onChange(e.target.name) : null}
          checked={onChange ? selected : null}
          name={item}
        />{' '}
        <span>{children}</span>
      </label>
    </div>
  )
}

ProductFilterItem.propTypes = {
  onChange: PropTypes.func
}

export default ProductFilterItem
