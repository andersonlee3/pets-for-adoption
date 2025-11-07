interface Props {
  numPets: number;
  numTypes: number;
  predomGen: string;
}

export default function SummaryCard({ numPets, numTypes, predomGen }: Props) {
  return (
    <div className="summary-card">
      <h3>Summary</h3>
      <div className="summary-item">
        <span className="summary-label">Total Pets:</span>
        <span className="summary-value">{numPets}</span>
      </div>
      <div className="summary-item">
        <span className="summary-label">Pet Types:</span>
        <span className="summary-value">{numTypes}</span>
      </div>
      <div className="summary-item">
        <span className="summary-label">Predominant Gender:</span>
        <span className="summary-value">{predomGen}</span>
      </div>
    </div>
  );
}
