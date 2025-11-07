import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchAccessToken, getExpiresIn } from "./services/auth";
import { makeApiCall } from "./services/petfinder";
import type { Pet } from "./types/Pet";
import Dashboard from "./components/Dashboard";
import PetDetail from "./components/PetDetail";
import "./App.css";

function App() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [numPets, setNumPets] = useState<number>(0);
  const [numTypes, setNumTypes] = useState<number>(0);
  const [predomGender, setPredomGender] = useState<string>("");

  const findNumTypes = (animals: Pet[]) => {
    const types = new Set(
      animals.map((animal) => animal.type).filter((type) => type !== null),
    );
    return types.size;
  };

  const findPredomGen = (animals: Pet[]) => {
    let males = 0;
    let females = 0;
    animals.forEach((animal) => {
      if (animal.gender === "Male") males++;
      else if (animal.gender === "Female") females++;
    });

    return males >= females ? "Male" : "Female";
  };

  useEffect(() => {
    const initApiAuth = async () => {
      await fetchAccessToken();
      const expiresIn = getExpiresIn();
      if (expiresIn) {
        const interval = setInterval(fetchAccessToken, expiresIn * 1000);
        return () => clearInterval(interval);
      }
    };

    const init = async () => {
      await initApiAuth();
      const data = await makeApiCall();
      if (data && data.animals) {
        setPets(data.animals);
        setNumTypes(findNumTypes(data.animals));
        setPredomGender(findPredomGen(data.animals));
        setNumPets(data.animals.length);
      }
    };

    init();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              pets={pets}
              numPets={numPets}
              numTypes={numTypes}
              predomGen={predomGender}
            />
          }
        />
        <Route
          path="/pet/:id"
          element={
            <PetDetail
              pets={pets}
              numPets={numPets}
              numTypes={numTypes}
              predomGen={predomGender}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;