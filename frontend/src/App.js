import './App.css';
import SignIn from './containers/SignIn';
import Market from './containers/Market';

const signedIn = true;

const App = () => {
    return (
        signedIn? <Market /> : <SignIn />
    )
};

export default App;
