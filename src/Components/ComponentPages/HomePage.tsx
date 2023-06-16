import logo from '../../Assets/logo.svg';
import './HomePage.scss';

function HomePage() {
  return (
    <div className="homepage">      
      <header className="homepage-header">
        <img src={logo} className="homepage-logo" alt="logo" />
        <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
            className="homepage-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
        >
            Learn React
        </a>
        </header>
    </div>
  );
}

export default HomePage;
