import React, { useEffect, useState } from "react";
import getQuotes from "./getQuotes";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Snackbar,
  Stack,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const data = await getQuotes();
      setQuote(data[0].quote);
      setAuthor(data[0].author);
    } catch (err) {
      alert("Failed to load quote. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${quote}" - ${author}`);
    setToastOpen(true);
  };

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div className="app">
      <Typography variant="h3" gutterBottom>
        {" "}
        Random Quote generator{" "}
      </Typography>
      <Card className="card">
        <CardContent>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {quote && (
                <>
                  <Typography variant="h6" gutterBottom>
                    {quote}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    className="margin-top"
                  >
                    {author}
                  </Typography>
                  <hr />
                </>
              )}

              <Stack spacing={1}>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={handleClick}
                >
                  Get Another Quote
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<ContentCopyIcon />}
                  onClick={handleCopy}
                  fullWidth
                >
                  Copy to Clipboard
                </Button>
              </Stack>
            </>
          )}
        </CardContent>
      </Card>

      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        message="Copied to clipboard!"
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </div>
  );
}

export default App;
