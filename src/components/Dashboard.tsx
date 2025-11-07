import { useState } from "react";
import { Link } from "react-router-dom";
import type { Pet } from "../types/Pet";
import Sidebar from "./Sidebar";
import TypeDistributionChart from "./TypeDistributionChart";
import GenderAgeChart from "./GenderAgeChart";
import PetListItem from "./PetListItem";
import "../App.css";

interface Props {
  pets: Pet[];
  numPets: number;
  numTypes: number;
  predomGen: string;
}

export default function Dashboard({ pets, numPets, numTypes, predomGen }: Props) {
  const [petName, setPetName] = useState<string>("");

  // Filter pets based on search term
  const filteredPets = petName
    ? pets.filter((pet) => pet.name?.toLowerCase().includes(petName.toLowerCase()))
    : pets;

  return (
    <div className="app-container">
      <Sidebar numPets={numPets} numTypes={numTypes} predomGen={predomGen} />
      <main className="main-content">
        <h1>Pet Adoption Dashboard</h1>

        <input
          className="search-bar"
          type="text"
          placeholder="Search for pet name..."
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
        />

        <div className="charts">
          <TypeDistributionChart pets={filteredPets} />
          <GenderAgeChart pets={filteredPets} />
        </div>

        <section className="pet-list-section">
          <h2>Available Pets ({filteredPets.length})</h2>
          <div className="pet-list">
            {filteredPets.map((pet) => (
              <Link to={`/pet/${pet.id}`} key={pet.id} className="pet-link">
                <PetListItem
                  url={pet.url}
                  name={pet.name}
                  type={pet.type}
                  gender={pet.gender}
                  image={pet.photos[0]?.small || null}
                />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
