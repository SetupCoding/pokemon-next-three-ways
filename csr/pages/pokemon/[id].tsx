import { Col, Container, Row } from "react-bootstrap";
import { ErrorComponent, Loading } from "../../components";

import Head from "next/head";
import Link from "next/link";
import { Pokemon } from "../../models/pokemon.model";
import { handleErrors } from "../../utils/handleErrors";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

const getPokemon = async (_, id): Promise<Pokemon> => {
  const res = await fetch(`/api/pokemon?id=${escape(id)}`);
  return await handleErrors(res);
};

const PokemonDetails: React.FC = () => {
  const router = useRouter();
  const { data, error, isFetching } = useQuery(
    ["id", router.query.id],
    getPokemon
  );
  return (
    <div>
      <Head>
        <title>{(data && data.name.english) || "Pokemon"}</title>
      </Head>
      <Link href="/">
        <a>{"<"}</a>
      </Link>
      <Container>
        {data && (
          <>
            <h1>{data.name.english}</h1>
            <Row>
              <Col xs={4}>
                <img
                  src={`/pokemon/${data.name.english
                    .toLowerCase()
                    .replace(" ", "-")}.jpg`}
                  alt={`Image of ${data.name.english}`}
                  style={{
                    width: "100%",
                  }}
                />
              </Col>
              <Col xs={8}>
                {Object.entries(data.base).map(([key, value]) => (
                  <Row key={key}>
                    <Col xs={2}>{key}</Col>
                    <Col xs={10}>{value}</Col>
                  </Row>
                ))}
              </Col>
            </Row>
          </>
        )}
      </Container>

      <Loading isLoading={isFetching} />
      <ErrorComponent error={error} />
    </div>
  );
};

export default PokemonDetails;
