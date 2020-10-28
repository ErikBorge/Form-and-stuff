import React, { useEffect } from 'react';

import Form from './Form';

function App() {

  useEffect(() => {

  })


  return (
    <div className="app">
      <div className="app__popup">
        <div className="app__heading">
          <h1>Hello, person!</h1>
          <h3>Vennligst gi fra deg din personinformasjon.</h3>
        </div>
        <Form />
      </div>
    </div>
  );
}

export default App;
