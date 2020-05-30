import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

const Form = ({ search, setSearch, setConsult }) => {

    //State
    const [error, setError] = useState(false);

    //Extraction
    const { city, country } = search;

    // onChange
    const handleChange = e => {
        //Update State
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        });
    }

    // onSubmit
    const handleSubmit = e => {
        e.preventDefault();

        //Validation
        if(city.trim() === '' || country.trim() === '') {
            setError(true);
            return;
        }

        setError(false);

        //Main Component
        setConsult(true);
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            {error ? <Error message='All fields are required'/>  :null}
            <div className="input-field col s12">
                <input
                    type="text"
                    name="city"
                    id="city"
                    value={city}
                    onChange={handleChange}
                />
                <label hmtlfor="city">City: </label>
            </div>

            <div className="input-field col s12">
                <select
                    name="country"
                    id="country"
                    value={country}
                    onChange={handleChange}
                >
                    <option value="">-- Select Country --</option>
                    <option value="US">US</option>
                    <option value="MX">Mexico</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="VE">Venezuela</option>
                </select>
                <label hmtlfor="country">Country: </label>
            </div>

            <div className="input-field col s12">
                <input 
                    type="submit"
                    value="Search Weather"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                />
            </div>
        </form>
    );
}

Form.propTypes = {
    search: PropTypes.object.isRequired,
    setSearch: PropTypes.func.isRequired,
    setConsult: PropTypes.func.isRequired
}

export default Form;