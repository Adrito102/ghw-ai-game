import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Real images
const baseFiles = [
  { name: "cat", img: "https://placekitten.com/100/100" },
  { name: "dog", img: "https://placedog.net/100/100" },
  { name: "car", img: "https://via.placeholder.com/100?text=Car" },
  { name: "tree", img: "https://via.placeholder.com/100?text=Tree" }
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

    const newCards = cards.map((c) =>
      c.uid === card.uid ? { ...c, flipped: true } : c
    );
    setCards(newCards);

    if (!first) {
      setFirst(card);
    } else if (!second) {
      setSecond(card);
    }
  };

  React.useEffect(() => {
    if (first && second) {
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
        }, 800);
      }
      setFirst(null);
      setSecond(null);
    }
  }, [second]);

  const allMatched = cards.length > 0 && cards.every((c) => c.matched);

  if (isLoading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return isAuthenticated ? (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🎮 AI Image Matching Game</h1>
      <p>Welcome: {user.email}</p>

      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
        style={{ marginBottom: "10px" }}
      >
        Logout
      </button>

      <br />

      <button
        onClick={startGame}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          marginTop: "10px"
        }}
      >
        {gameStarted ? "Restart Game" : "Start Game"}
      </button>

      <h3>Score: {score}</h3>

      {allMatched && (
        <div style={{ marginTop: "20px", color: "green" }}>
          <h2>🎉 You Won!</h2>
          <p>Great job!</p>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 110px)",
          gap: "12px",
          justifyContent: "center",
          marginTop: "20px"
        }}
      >
        {cards.map((card) => (
          <div
            key={card.uid}
            onClick={() => handleClick(card)}
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "12px",
              background:
                card.flipped || card.matched ? "#ffffff" : "#222",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              transition: "0.3s"
            }}
          >
            {card.flipped || card.matched ? (
              <img
                src={card.img}
                alt={card.name}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px"
                }}
              />
            ) : (
              <span style={{ color: "#fff", fontSize: "24px" }}>?</span>
            )}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>GHW API Project</h1>
      <button
        onClick={() => loginWithRedirect()}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Login
      </button>
    </div>
  );
}

export default App;