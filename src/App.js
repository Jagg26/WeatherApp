import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Weather from './components/Weather';
import Error from './components/Error';

function App() {

  //State
  const [search, setSearch] = useState({
    city: '',
    country: ''
  });
  const [consult, setConsult] = useState(false);
  const [result, setResult] = useState({});
  const [ error, setError ] = useState(false);

  const { city, country } = search;

  useEffect(() => {
    const consultAPI = async () => {

      if (consult) {
        const appId = '61e70e53e709775c043e7748309e5ef9';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},
      ${country}&appid=${appId}`;

        const response = await fetch(url);
        const result = await response.json();

        setResult(result);
        setConsult(false);

        if(result.cod === "404"){
          setError(true);
        } else {
          setError(false);
        }

      }

    }
    consultAPI()
    // eslint-disable-next-line
  }, [consult]);

  let component;
  if(error) {
    component = <Error message="No results" />
  } else {
    component = <Weather 
                  result={result}
                />
  }

  

  return (

    <Fragment>
      <Header
        title='Weather React App'
      />

      <div className="contenedor-form">
        <div className='container'>
          <div className="row">
            <div className="col m6 s12">
              <Form
                search={search}
                setSearch={setSearch}
                setConsult={setConsult}
              />
            </div>
            <div className="col m6 s12">
              {component}
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  );
}

export default App;
