import React, { useState } from 'react';
import getQuotes from './getQuotes';

import { Button, Card, CardContent, Typography, CircularProgress } from '@mui/material';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const data = await getQuotes();
      setQuote(data[0].quote);
      setAuthor(data[0].author);
    } catch(err) {
      alert('Failed to load quote. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='app'>
      <Typography variant='h3' gutterBottom> Random Quote generator </Typography>
      <Card className='card'>
        <CardContent>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {quote && (
                <>
                  <Typography variant='h6' gutterBottom>
                    {quote}
                  </Typography>
                  <Typography variant='subtitle2' color='textSecondary' className='margin-top'>
                    {author}
                  </Typography>
                  <hr/>
                </>
              )}
              <Button color='primary' variant='contained' fullWidth onClick={handleClick}>
                Click for Quotes
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


export default App;
