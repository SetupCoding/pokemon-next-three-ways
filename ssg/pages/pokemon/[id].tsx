import { Col, Container, Row } from "react-bootstrap";
import { GetStaticPaths, GetStaticProps } from "next";
import { addImage, handleErrors } from "../../utils";

import { API_URL } from "../../constants/const";
import Head from "next/head";
import { Home } from "../../components";
import { Pokemon } from "../../models/pokemon.model";
import React from "react";
import c from "../../components/pokemon-card.module.css";

/**
 * Dynamic routes pre-rendered at build time
 * */
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${API_URL}/search?all=true`);
  const data = await handleErrors(res);
  return {
    paths: data.map(({ id }) => ({
      params: {
        id: id.toString(),
      },
    })),
    fallback: false,
  };
};

/**
 * Fetch data at build time
 * */
export const getStaticProps: GetStaticProps = async (context) => {
  //re-using the fetched data from getStaticPaths is only possible with filesystem cache right now https://github.com/vercel/next.js/discussions/11272
  const res = await fetch(`${API_URL}/pokemon?id=${context.params.id}`);
  const data = await handleErrors(res);
  return {
    props: {
      data: addImage(data, true),
    },
  };
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const res = await fetch(`${API_URL}/pokemon?id=${context.params.id}`);
//   const errorCode = res.ok ? false : (res as HttpError).status;
//   const data = await res.json();

//   return {
//     props: {
//       data: data,
//       error: errorCode ? data : null,
//     },
//   };
// };
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
                <img
                  src={data.image}
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
