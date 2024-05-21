function App() {
  const getResponse = () => {
    fetch('/mock/list').then((data) => {
      console.log(data);
    })
  }

  const postResponse = () => {
    const data = {
      'name': 'cwl',
    }
    fetch('/mock/table',{
      method:'POST',
      body: JSON.stringify(data),
    })	
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getResponse}>
          get请求
        </button>

        <br />

        <button onClick={postResponse}>
          post请求
        </button>
      </header>
    </div>
  );
}

export default App;
