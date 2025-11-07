interface Props {
  image: string | null;
  name: string | null;
  type: string | null;
  gender: string | null;
  url: string | null;
}

export default function PetListItem({ image, name, type, gender }: Props) {
  return (
    <div className="pet-card">
      {image && <img className="pet-card-photo" src={image} alt={name || "Pet"} />}
      <div className="pet-card-info">
        <h3>{name}</h3>
        <p>
          <strong>Type:</strong> {type}
        </p>
        <p>
          <strong>Gender:</strong> {gender}
        </p>
      </div>
    </div>
  );
}
