interface Props {
  numPets: number;
  numTypes: number;
  predomGen: string;
}

export default function SummaryCard({ numPets, numTypes, predomGen }: Props) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Number of Pets Displayed:</th>
            <th>Number of Pet Types Displayed:</th>
            <th>Predominant Gender of Pets Displayed:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{numPets}</td>
            <td>{numTypes}</td>
            <td>{predomGen}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
