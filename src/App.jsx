import Header from './components/Header';
import FormEmpleado from './components/FormEmpleado';
import Footer from './components/Footer';

/* Estoy intentando acostumbrarme a usar variables y comentarios en ingles porque a la larga va a ser mejor, para que no piense que lo saqué de internet ajjjaja */
/* Aunque despues me empecé a marear y algunas variables de edicion los puse en español nomas */

function App() {
  return (
    <>
      <Header />

      <main className='p-3 container'>
        <FormEmpleado />
      </main>

      <Footer />
    </>
  );
}

export default App;