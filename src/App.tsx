import { useEffect, useState } from "react";
import { fetchAccessToken, getExpiresIn } from "./services/auth";
import { makeApiCall } from "./services/petfinder";
import logo from "./assets/logo.webp";
import SummaryCard from "./components/summaryCard";
import PetListItem from "./components/PetListItem";
import "./App.css";

type Pet = {
  url: string | null;
  type: string | null;
  gender: string | null;
  name: string | null;
  photos: Array<{
    small: string | null;
  }>;
};

function App() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [numPets, setNumPets] = useState<number>(20);
  const [numTypes, setNumTypes] = useState<number>(0);
  const [predomGender, setPredomGender] = useState<string>("");
  const [petName, setPetName] = useState<string>("");

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
      if (animal.type === "Male") males++;
      else females++;
    });

    return males >= females ? "Male" : "Female";
  };

  const handleSearch = (name: string) => {
    setPets(pets.filter((pet) => pet.name === name));
  };

  const filterMales = () => {
    setPets(pets.filter((pet) => pet.gender === "Male"));
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
      setPets(data.animals);
      setNumTypes(findNumTypes(data.animals));
      setPredomGender(findPredomGen(data.animals));
    };

    init();
  }, []);

  useEffect(() => {
    setNumTypes(findNumTypes(pets));
    setPredomGender(findPredomGen(pets));
    setNumPets(pets.length);
  }, [pets]);

  return (
    <>
      <header>
        <img className="logo" src={logo} alt="logo"></img>
        <h2>Pets4Adoption</h2>
      </header>
      <main>
        <input
          className="search-bar"
          type="text"
          placeholder="Search for pet name..."
          onChange={(e) => setPetName(e.target.value)}
        ></input>
        <button onClick={() => handleSearch(petName)}>Search</button>
        <table>
          <tbody>
            <tr>
              <td>
                <button onClick={filterMales}>Male</button>
                <button>Female</button>
              </td>
            </tr>
          </tbody>
        </table>
        <SummaryCard
          numPets={numPets}
          numTypes={numTypes}
          predomGen={predomGender}
        ></SummaryCard>
        <ul>
          {pets.map((pet, index) => (
            <li key={index}>
              <PetListItem
                url={pet.url}
                name={pet.name}
                type={pet.type}
                gender={pet.gender}
                image={pet.photos[0]?.small || null}
              ></PetListItem>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;
