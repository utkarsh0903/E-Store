import React from 'react'

const FilterItem = ({key, title, filterOptions, handleFilterChange}) => {
  return (
    <div>
        <h2>{title}</h2>
        {
            filterOptions.map( (option) => {
                return <>
                    <label>
                        <input
                        key={key}
                        type="checkbox"
                        name="option"
                        value={option}
                        onChange={(event) => handleFilterChange({event})}
                        />{' '}
                        {option}
                    </label>
                    <br />
                </>
            })
        }
    </div>
  )
}

export default FilterItem