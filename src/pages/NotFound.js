
import logo from '../logo.svg';
/*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/

function App() {    
  return (
    <div>
        <span className="font-medium text-indigo-600">404</span>
        <h1 className=" text-3xl font-bold tracking-tight text-gray-900">Page not found</h1>
        <p className="text-m leading-6 text-slate-500">Sorry, we couldn't find the page you're looking for.</p>
        <a className="text-indigo-600 hover:text-indigo-500" href="">Go back home</a>
    </div>
  );
}

export default App;