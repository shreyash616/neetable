import React from 'react'

const Checkbox = ({
    name,
    id,
    label,
    value,
    checked,
    onChange
}) => {

    return <div className="form-check">
        <input name={name} className="form-check-input" type="checkbox" value={value} onChange={onChange} id={id} checked={checked} />
        <label className="form-check-label text-muted" htmlFor={id}>
            {label}
        </label>
    </div>
}

export default Checkbox