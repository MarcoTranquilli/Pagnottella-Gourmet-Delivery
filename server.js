import express from "express";
import { addProduct, getAllProducts } from "./firebase.js";

const app = express();
app.use(express.json());

// Aggiungi prodotto (esempio)
app.post("/api/prodotti", async (req, res) => {
  const { nome, prezzo } = req.body;
  await addProduct(nome, prezzo);
  res.send({ message: "Prodotto aggiunto!" });
});

// Leggi prodotti
app.get("/api/prodotti", async (req, res) => {
  const prodotti = await getAllProducts();
  res.send(prodotti);
});

app.listen(3000, () => console.log("🚀 Server in ascolto su http://localhost:3000"));
