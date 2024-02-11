import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import Counter from './components/Counter';
import ItemList from './components/ItemList';
import PostList from './components/PostList';

function App() {
  return (
    <div className="App">
      <h1 class="text-2xl font-bold text-center">MADE USING FUNCTIONAL COMPONENT</h1>
      <Button />
      <h1 class="text-2xl font-bold text-center">MADE USING CLASS COMPONENT</h1>
      <Counter />
      <hr />
      <h1 class="text-2xl font-bold text-center">REACT HOOK</h1>
      <ItemList />
      <hr />
      <h1 class="text-2xl font-bold text-center">FETCH API</h1>
      <PostList />
    </div>
  );
}

export default App;