interface Props {
  children: string;
  taso?: "iso" | "keski" | "pieni";
}

const Otsikko = ({ children, taso = "keski" }: Props) => {
  switch (taso) {
    case "iso":
      return <h1>{children}</h1>;
    case "keski":
      return <h2>{children}</h2>;
    case "pieni":
      return <h3>{children}</h3>;
  }
};

export default Otsikko;
