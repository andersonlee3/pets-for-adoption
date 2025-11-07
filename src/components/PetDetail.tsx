import { useParams, Link } from "react-router-dom";
import type { Pet } from "../types/Pet";
import Sidebar from "./Sidebar";
import "../App.css";

interface Props {
  pets: Pet[];
  numPets: number;
  numTypes: number;
  predomGen: string;
}

export default function PetDetail({ pets, numPets, numTypes, predomGen }: Props) {
  const { id } = useParams<{ id: string }>();
  const pet = pets.find((p) => p.id === Number(id));

  if (!pet) {
    return (
      <div className="app-container">
        <Sidebar numPets={numPets} numTypes={numTypes} predomGen={predomGen} />
        <main className="main-content">
          <h2>Pet not found</h2>
          <Link to="/">← Back to Dashboard</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar numPets={numPets} numTypes={numTypes} predomGen={predomGen} />
      <main className="main-content">
        <Link to="/" className="back-link">
          ← Back to Dashboard
        </Link>

        <div className="pet-detail">
          <div className="pet-detail-header">
            <h1>{pet.name}</h1>
            {pet.photos && pet.photos[0]?.large && (
              <img
                src={pet.photos[0].large}
                alt={pet.name || "Pet photo"}
                className="pet-detail-photo"
              />
            )}
          </div>

          <div className="pet-detail-info">
            <section className="info-section">
              <h2>Basic Information</h2>
              <p>
                <strong>Type:</strong> {pet.type}
              </p>
              <p>
                <strong>Species:</strong> {pet.species}
              </p>
              <p>
                <strong>Breed:</strong> {pet.breeds?.primary}
                {pet.breeds?.secondary && ` / ${pet.breeds.secondary}`}
                {pet.breeds?.mixed && " (Mixed)"}
              </p>
              <p>
                <strong>Age:</strong> {pet.age}
              </p>
              <p>
                <strong>Gender:</strong> {pet.gender}
              </p>
              <p>
                <strong>Size:</strong> {pet.size}
              </p>
              <p>
                <strong>Color:</strong> {pet.colors?.primary}
                {pet.colors?.secondary && ` / ${pet.colors.secondary}`}
              </p>
            </section>

            <section className="info-section">
              <h2>Description</h2>
              <p>{pet.description || "No description available."}</p>
            </section>

            <section className="info-section">
              <h2>Attributes</h2>
              <ul>
                <li>Spayed/Neutered: {pet.attributes?.spayed_neutered ? "Yes" : "No"}</li>
                <li>House Trained: {pet.attributes?.house_trained ? "Yes" : "No"}</li>
                {pet.attributes?.declawed !== null && (
                  <li>Declawed: {pet.attributes?.declawed ? "Yes" : "No"}</li>
                )}
                <li>Special Needs: {pet.attributes?.special_needs ? "Yes" : "No"}</li>
                <li>Shots Current: {pet.attributes?.shots_current ? "Yes" : "No"}</li>
              </ul>
            </section>

            <section className="info-section">
              <h2>Environment</h2>
              <ul>
                {pet.environment?.children !== null && (
                  <li>Good with Children: {pet.environment?.children ? "Yes" : "No"}</li>
                )}
                {pet.environment?.dogs !== null && (
                  <li>Good with Dogs: {pet.environment?.dogs ? "Yes" : "No"}</li>
                )}
                {pet.environment?.cats !== null && (
                  <li>Good with Cats: {pet.environment?.cats ? "Yes" : "No"}</li>
                )}
              </ul>
            </section>

            {pet.tags && pet.tags.length > 0 && (
              <section className="info-section">
                <h2>Tags</h2>
                <div className="tags">
                  {pet.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            )}

            <section className="info-section">
              <h2>Contact Information</h2>
              {pet.contact?.email && (
                <p>
                  <strong>Email:</strong> {pet.contact.email}
                </p>
              )}
              {pet.contact?.phone && (
                <p>
                  <strong>Phone:</strong> {pet.contact.phone}
                </p>
              )}
              {pet.contact?.address && (
                <p>
                  <strong>Location:</strong> {pet.contact.address.city}, {pet.contact.address.state}{" "}
                  {pet.contact.address.postcode}
                </p>
              )}
            </section>

            {pet.url && (
              <a href={pet.url} target="_blank" rel="noopener noreferrer" className="view-link">
                View on Petfinder →
              </a>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
