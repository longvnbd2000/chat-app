
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Chat from './Chat/Chat';
import Home from './Home/Home'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home}/>
      <Route path="/chat" component={Chat}/>
    </Router>
    
  );
}

export default App;
