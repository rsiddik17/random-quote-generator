import React, { Component } from 'react';
import getQuotes from './getQuotes';

import { Button, Card, CardContent, Typography } from '@mui/material';

class App extends Component {
  state = {
    quote: '',
    author: ''
  }

  handleClick = () => {
    getQuotes().then((data) => {
      this.setState({
        quote: data[0].quote,
        author: data[0].author
      })
    })
  }
  
  render() {
    return (
    <div className="app">
      <Typography variant="h2">Random Quote Generator</Typography>
      <Card className="card">
        <CardContent>
          <Typography variant="h5">{this.state.quote}</Typography>
          <Typography className="margin-top" color="textSecondary">{this.state.author}</Typography>
          <hr />
          <Button color="primary" variant="outlined" onClick={() => this.handleClick()}>Click for Quotes</Button>
        </CardContent>
      </Card>
    </div>
  );
  }
}


export default App;
