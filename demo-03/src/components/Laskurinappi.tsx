import { useState } from 'react';

interface Props {
  children: string;
  onPainallus: () => void;
}

const Laskurinappi = ({ children, onPainallus }: Props) => {

  const [laskuri, setLaskuri] = useState<number>(0);

  const painettu = (): void => {
    setLaskuri(laskuri + 1);
    onPainallus();
  }

  return (
    <button className="laskurinappi" onClick={painettu}>
      {children} ({laskuri})
    </button>
  );
};

export default Laskurinappi;
