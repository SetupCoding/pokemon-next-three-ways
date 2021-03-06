import { Col, Container, Row } from "react-bootstrap";
import { ErrorComponent, Home, Loading } from "../../components";

import Head from "next/head";
import Image from "next/image";
import { Pokemon } from "../../models/pokemon.model";
import React from "react";
import c from "../../components/pokemon-card.module.css";
import { handleErrors } from "../../utils";
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
    getPokemon,
    { retry: false, enabled: !!router.query.id }
  );
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
                <Image
                  layout="fill"
                  src={`/pokemon/${data.name.english
                    .toLowerCase()
                    .replace(" ", "-")}.jpg`}
                  alt={`Image of ${data.name.english}`}
                  objectFit="contain"
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
