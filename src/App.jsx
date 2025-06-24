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

  const handleClick = async () => {
    setLoading(true);
    try {
      const data = await getQuotes();
      if (data && data.length > 0) {
        setQuote(data[0].quote);
        setAuthor(data[0].author);
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
          Random Quote generator
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
