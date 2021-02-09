import React, { useState } from 'react';
import MaskedInput from 'react-maskedinput';

import { postnr } from './utils/postnummer';


const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validateForm = (err) => {
  let valid = true;
  Object.values(err).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

function Form() {
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    zip: ''
  })
  const [validForm, setValidForm] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const handleValidation = (name, value) => {
    let newValue;
    switch (name) {
      case 'name':
        setErrors(prevErrors => ({...prevErrors, name:
          value === '' ?
            'Feltet må fylles ut!'
          : value.length < 5 ?
            'Det er vel ingen som har et så kort navn vel...?'
          : ''
        }))
        // setErrors(prevErrors => ({...prevErrors, name:'hello'}))
        break;
      case 'email':
        setErrors(prevErrors => ({...prevErrors, email:
          value === '' ?
            'Feltet må fylles ut!'
          : !validEmailRegex.test(value) ?
            'Dette var vel ikke en ekte epost...?'
          : ''
          }))
        break;
      case 'phone':
        newValue = value.replace(/\s|_/g,'').replace('+47', '')
        setErrors(prevErrors => ({...prevErrors, phone:
          value === '' ?
            'Feltet må fylles ut!'
          : newValue.length !== 8 ?
            'Med mindre du er ambulansen ellernoe må et telefonnummer ha 8 siffer!'
          : ''
          }))
        break;
      case 'zip':
        newValue = value.replace(/_/g,'')
        const poststed = postnr[newValue];
        (poststed) ? setLocation(poststed) : setLocation('');
        setErrors(prevErrors => ({...prevErrors, zip:
          value === '' ?
            'Feltet må fylles ut!'
          : newValue.length !== 4 ?
            'Ethvert postnummer er 4 siffer. Det er standard.'
          : !poststed ?
            "Postnummeret finnes ikke... :'("
          : ''
          }))
        break;
      default:
        break;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputs = document.querySelectorAll('#info-form input');
    inputs.forEach((item, i) => {
      handleValidation(item.name, item.value);
    });
    if (validateForm(errors)) {
      setValidForm(true);
      setShowErrorMsg(false);
    }
    else {
      setValidForm(false);
      setShowErrorMsg(true);
    }
  }

  return (
    <div className="form">
      { showErrorMsg &&<>
        <div className="form__errorBackground">
        </div>
          <div className="form__errorMsg">
            Skjemaet er ikke fylt ut riktig. <br/>Følg feilmeldingene.
            <div className="form__button" style={{marginTop: '20px'}}>
              <button onClick={ e => (
                e.preventDefault(),
                setShowErrorMsg(false)
              )}>
              Prøv igjen
              </button>
            </div>
          </div>
        </>
      }
      <form
        id="info-form"
        autoComplete="off"
        onSubmit={e => handleSubmit(e)}
        noValidate
        //action="https://heksemel.no/case/submit.php"
        //method="POST"
        >
        <div className="form__field">
          <label>Navn:</label>
          <input
            autoComplete="off"
            type="text"
            name="name"
            placeholder="Ola Nordmann"
            // value={object.name}
            //value={name}
            // onChange={e => handleChange(e)}
            onBlur={e => handleValidation(e.target.name, e.target.value)}
          />
          {errors.name.length > 0 && <span className='form__error'>{errors.name}</span>}
        </div>
        <div className="form__field">
          <label>E-post:</label>
          <input
            type="email"
            name="email"
            placeholder="navn@domene.no"
            // onChange={e => handleChange(e)}
            onBlur={e => handleValidation(e.target.name, e.target.value)}
          />
          {errors.email.length > 0 && <span className='form__error'>{errors.email}</span>}
        </div>
        <div className="form__field">
          <label>Telefon:</label>
          {/*<input
            type="tel"
            pattern="[0-9]{3} [0-9]{2} [0-9]{3}"
            name="phone"
            placeholder="815 493 00"
          />*/}
          <MaskedInput
            mask={"+47 111 11 111"}
            placeholder="+47 815 49 300"
            name="phone"

            // onChange={e => handleChange(e)}
            onBlur={e => handleValidation(e.target.name, e.target.value)}
            // value={props.value}
    				// options={{
    				// 	format: 'DD-MM-YYYY'
    				// }}
          />
          {errors.phone.length > 0 && <span className='form__error'>{errors.phone}</span>}
        </div>
        <div className="form__field">
          <label>Postnummer:</label>
          {/*<input
            type="number"
            name="areacode"
            placeholder="1234"
          />*/}
          <MaskedInput
            mask={"1111"}
            name="zip"
            id="zip"
            placeholder="1234"
            // onChange={e => handleChange(e)}
            onBlur={e => handleValidation(e.target.name, e.target.value)}
            // value={props.value}
    				// options={{
    				// 	format: 'DD-MM-YYYY'
    				// }}
          />
          { location && <span className="form__location">{location}</span>}
          {errors.zip.length > 0 && <span className='form__error'>{errors.zip}</span>}
        </div>
        <div className="form__field">
          <label>Kommentar:</label>
          <input
            name="comment"
            type="text"
            />
        </div>
        <div className="form__button">
          <button
            type="submit"
            value="Send inn"
          >
          Send inn
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
