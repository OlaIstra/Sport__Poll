import React from 'react'

import './Input.css'

import TextField from '@material-ui/core/TextField';

const inputCustom = (props) => {

    let element = null
    let validationClasses

    props.invalid ?
        validationClasses = 'show__invalid'
        : validationClasses = 'hide__invalid'

    let validationError = <p className={validationClasses}>Please fill the blank</p>;

    switch(props.elementType) {
        case ('text'):
            element = <TextField type="text"
                                    value={props.value}
                                    onChange={props.changed}
                                    {...props.elementConfig}
                                     required
                                     label="Required"
                                     margin="normal"
                                     variant="outlined"
            />
            break
        case ('radio'):
            element = <input type="radio"
                                    value={props.value}
                                    onChange={props.changed}
                                    {...props.elementConfig}/>
            break
        case ('textarea'):
            element = <textarea
                                value={props.value}
                                onChange={props.changed}
                                {...props.elementConfig}/>
            break
        case ('select'):
            element = <select
                                value={props.value}
                                onChange={props.changed}
                                >
                                    {props.elementConfig.options.map((option, index) => {
                                        return <option key={index} value={option.value}>{option.displayValue}</option>
                                    })}
                            </select>
            break
        default:
            element = <TextField
                        required
                        value={props.value}
                        {...props.elementConfig}
                        label="Required"
                        margin="normal"
                        variant="outlined"
            />
    }

    return (
            <div>
                <label>{props.label}</label>
                {element}
                {validationError}
            </div>
        )
}

export default inputCustom
