import logo from "../assets/logo.webp";
import SummaryCard from "./SummaryCard";
import "../App.css";

interface Props {
  numPets: number;
  numTypes: number;
  predomGen: string;
}

export default function Sidebar({ numPets, numTypes, predomGen }: Props) {
  return (
    <aside className="sidebar">
      <header>
        <img className="logo" src={logo} alt="logo" />
        <h2>Pets4Adoption</h2>
      </header>
      <SummaryCard numPets={numPets} numTypes={numTypes} predomGen={predomGen} />
    </aside>
  );
}
