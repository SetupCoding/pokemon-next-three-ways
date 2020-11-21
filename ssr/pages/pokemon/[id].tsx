import { Col, Container, Row } from "react-bootstrap";

import { API_URL } from "../../constants/const";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Home } from "../../components";
import { HttpError } from "../../models/http-error.model";
import { Pokemon } from "../../models/pokemon.model";
import React from "react";
import c from "../../components/pokemon-card.module.css";

/**
 * getPokemon is gone
 * Error handling is done in _app.tsx
 * */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${API_URL}pokemon?id=${context.params.id}`);
  const errorCode = res.ok ? false : (res as HttpError).status;
  const data = await res.json();

  return {
    props: {
      data: data,
      error: errorCode ? data : null,
    },
  };
};
type Props = {
  data: Pokemon;
};
const PokemonDetails: React.FC<Props> = ({ data }) => {
  // const router = useRouter();
  // const { data, error, isFetching } = useQuery(
  //   ["id", router.query.id],
  //   getPokemon,
  //   { retry: false, enabled: !!router.query.id }
  // );
  return (
    <div>
      <Head>
        <title>{(data && data.name.english) || "Pokemon"}</title>
        <meta
          name="description"
          content={`Base stats of ${data?.name?.english}`}
          key="description"
        />
      </Head>
      <Home />
      <Container>
        {data && (
          <>
            <h1>{data.name.english}</h1>
            <Row>
              <Col xs={4} className={c.detailImage}>
                {/* next/Image currently not loading static assets https://github.com/vercel/next.js/issues/18237 */}
                {/* <Image
                  layout="fill"
                  src={`/pokemon/${data.name.english
                    .toLowerCase()
                    .replace(" ", "-")}.jpg`}
                  alt={`Image of ${data.name.english}`}
                  objectFit="contain"
                /> */}
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

      {/* <Loading isLoading={isFetching} /> */}
      {/* <ErrorComponent error={error} /> */}
    </div>
  );
};

export default PokemonDetails;
