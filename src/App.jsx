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
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("quoteHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const handleClick = async () => {
    setLoading(true);
    try {
      const data = await getQuotes();
      if (data && data.length > 0) {
        const newQuote = {
          quote: data[0].quote,
          author: data[0].author,
        };

        setHistory((prev) => {
          const updated = [newQuote, ...prev.slice(0, 4)];
          localStorage.setItem("quoteHistory", JSON.stringify(updated));
          return updated;
        });

        setQuote(newQuote.quote);
        setAuthor(newQuote.author);
      }
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

  const handleToggleDark = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("darkMode", next);
      return next;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("quoteHistory");
  };

  useEffect(() => {
    handleClick();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="app">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignContent="center"
        sx={{ width: "100%", maxWidth: 500 }}
      >
        <Typography variant="h3" gutterBottom>
          Random Quote Generator
        </Typography>
        <IconButton onClick={handleToggleDark} className="toggle-dark">
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Stack>

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

      {history.length > 0 && (
        <div className="history">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Typography variant="h6">Quote History</Typography>
            <Button
              onClick={handleClearHistory}
              color="error"
              size="small"
              variant="outlined"
            >
              Clear History
            </Button>
          </Stack>

          <div className="history-grid">
              {history.map((item, index) => (
            <Card key={index} className="card history-card">
              <CardContent>
                <Typography variant="body1">"{item.quote}"</Typography>
                <Typography variant="caption">
                  — {item.author}
                </Typography>
              </CardContent>
            </Card>
          ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
