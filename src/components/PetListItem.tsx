interface Props {
  image: string | null;
  name: string | null;
  type: string | null;
  gender: string | null;
  url: string | null;
}

export default function PetListItem({ image, name, type, gender, url }: Props) {
  return (
    <table className="pet-table">
      <thead>
        <tr>
          <th></th>
          <th>Name:</th>
          <th>Link:</th>
          <th>Type:</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{image && <img className="pet-photo" src={image}></img>}</td>
          <td>{name}</td>
          <td>{url && <a href={url}>{url}</a>}</td>
          <td>{type}</td>
          <td>{gender}</td>
        </tr>
      </tbody>
    </table>
  );
}
