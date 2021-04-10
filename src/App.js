import React, { Fragment, useEffect, useState } from 'react';
import Clima from './components/Clima';
import Error from './components/Error';
import Formulario from './components/Formulario';
import Header from './components/Header';

function App() {
	//state del formulario
	const [busqueda, guardarBusqueda] = useState({
		ciudad: '',
		pais: '',
	});
	const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [ error, guardarError] = useState(false);

	const { ciudad, pais } = busqueda;

	useEffect(() => {
		const consultarAPI = async () => {
			if (consultar) {
        const appId = 'cb8802884be1fc93472a3e3ed0da7714';
			const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

			const respuesta = await fetch(url);
			const resultado = await respuesta.json();

      guardarResultado(resultado);
      guardarConsultar(false);

      //para revisarnsi hay resultados verdaderos o que en realidad existan
      if (resultado.cod === "404") {
        guardarError(true);
        
      } else {
        guardarError(false);
      }
        
      }
		};
		consultarAPI();
	}, [consultar, ciudad, pais,resultado, guardarBusqueda, guardarConsultar, guardarError, error]);

  //cargando condicional de componentes
      let componente;
      if (error) {
        componente = <Error mensaje="no se encontraron resultados"/>
      } else {
        componente = <Clima resultado={resultado}/>
      }


	return (
		<Fragment>
			<Header titulo="App Clima REACT " />
			<div className="contenedor-form">
				<div className="container">
					<div className="row">
						<div className=" col m6 s12">
							<Formulario
								busqueda={busqueda}
								guardarBusqueda={guardarBusqueda}
								guardarConsultar={guardarConsultar}
							/>
						</div>
						<div className=" col m6 s12">{componente} </div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default App;
