interface Props {
  yhteensa: number;
}

const Yhteenveto = ({ yhteensa }: Props) => {
  return (
    <p className="yhteenveto">Kulkuneuvoja yhteensä: {yhteensa}</p>
  );
};

export default Yhteenveto;
