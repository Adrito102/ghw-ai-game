import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const baseFiles = [
  {
    name: "cat",
    img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=200"
  },
  {
    name: "dog",
    img: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=200"
  },
  {
    name: "car",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200"
  },
  {
    name: "tree",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=200"
  }
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect,
    logout,
    user
  } = useAuth0();

  const [cards, setCards] = React.useState([]);
  const [first, setFirst] = React.useState(null);
  const [second, setSecond] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [gameStarted, setGameStarted] = React.useState(false);

  const startGame = () => {
    const doubled = [...baseFiles, ...baseFiles].map((item, index) => ({
      ...item,
      uid: index,
      flipped: false,
      matched: false
    }));

    setCards(shuffle(doubled));
    setScore(0);
    setFirst(null);
    setSecond(null);
    setGameStarted(true);
  };

  const handleClick = (card) => {
    if (card.flipped || card.matched) return;

    setCards((prev) =>
      prev.map((c) =>
        c.uid === card.uid ? { ...c, flipped: true } : c
      )
    );

    if (!first) {
      setFirst(card);
    } else if (!second) {
      setSecond(card);
    }
  };

  React.useEffect(() => {
    if (!first || !second) return;

    if (first.name === second.name) {
      setCards((prev) =>
        prev.map((c) =>
          c.name === first.name ? { ...c, matched: true } : c
        )
      );
      setScore((s) => s + 1);
    } else {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.uid === first.uid || c.uid === second.uid
              ? { ...c, flipped: false }
              : c
          )
        );
      }, 600);
    }

    setFirst(null);
    setSecond(null);
  }, [first, second]);

  const allMatched = cards.length > 0 && cards.every((c) => c.matched);

  if (isLoading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return isAuthenticated ? (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px"
      }}
    >
      <h1 style={{ marginBottom: "10px" }}>🎮 Memory Match</h1>
      <p style={{ opacity: 0.7 }}>{user?.email}</p>

      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Logout
      </button>

      <button
        onClick={startGame}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          fontSize: "16px",
          borderRadius: "10px",
          border: "none",
          background: "#3b82f6",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        {gameStarted ? "Restart Game" : "Start Game"}
      </button>

      <h3 style={{ marginTop: "15px" }}>Score: {score}</h3>

      {allMatched && (
        <div style={{ marginTop: "10px", color: "#22c55e" }}>
          <h2>🎉 You Won!</h2>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 100px)",
          gap: "12px",
          marginTop: "25px"
        }}
      >
        {cards.map((card) => (
          <div
            key={card.uid}
            onClick={() => handleClick(card)}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "12px",
              background:
                card.flipped || card.matched ? "#1e293b" : "#334155",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
            }}
          >
            {card.flipped || card.matched ? (
              <img
                src={card.img}
                alt={card.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
            ) : (
              <span style={{ fontSize: "24px", color: "#fff" }}>?</span>
            )}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>GHW API Project</h1>
      <button
        onClick={() => loginWithRedirect()}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          borderRadius: "10px",
          border: "none",
          background: "#3b82f6",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        Login
      </button>
    </div>
  );
}

export default App;