import { Container, FormControl, Row } from "react-bootstrap";
import { ErrorComponent, LoadMore, Loading, PokemonCard } from "../components";
import React, { useEffect, useState } from "react";
import { enhanceDataWithImages, handleErrors } from "../utils";

import { API_URL } from "../constants/const";
import { GetStaticProps } from "next";
import Head from "next/head";
import { Pokemon } from "../models/pokemon.model";
import c from "../styles/index.module.css";
import useDebouncedCallback from "../hooks/useDebounceCallback";
import { useQuery } from "react-query";

/**
 * Fetches at runtime
 * */
const getPokemon = async (_?: any, query?: string): Promise<Pokemon[]> => {
  const res = await fetch(`/api/search?${query}`);
  const data = await handleErrors(res);
  return enhanceDataWithImages(data);
};

/**
 * Fetches at build time
 * */
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${API_URL}/search`);
  const data = await handleErrors(res);
  return {
    props: {
      data: enhanceDataWithImages(data),
    },
  };
};

type Props = {
  data: Pokemon[];
};

const PokemonList: React.FC<Props> = ({ data }) => {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [page, setPage] = useState(1);
  const { data: queryData, error, isFetching } = useQuery(
    ["q", debouncedQuery ? `q=${escape(debouncedQuery)}` : `page=${page}`],
    getPokemon,
    { enabled: !!debouncedQuery || page !== 1 }
  );
  const [pokemonData, setPokemonData] = useState<Pokemon[]>(data);

  useEffect(() => {
    if (!debouncedQuery && queryData) {
      setPokemonData(queryData);
    }
  }, [queryData, debouncedQuery]);

  useEffect(() => {
    queryData && setPokemonData(queryData);
  }, [queryData]);

  const queryPokemon = useDebouncedCallback(
    (e) => {
      setQuery(e.target.value);
    },
    (e) => {
      setDebouncedQuery(e.target.value);
    },
    300
  );

  return (
    <div className="container">
      <Head>
        <title>Pokemon! - SSG</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Pokemon" key="title" />
        <meta
          name="description"
          content="A List of all Pokemon"
          key="description"
        />
      </Head>

      <Container>
        <FormControl
          placeholder="Search Pokémon by name"
          aria-label="Search Pokémon by name"
          value={query}
          onChange={queryPokemon}
          className={c.searchBar}
        />
        {pokemonData && (
          <Row>
            {pokemonData.map((pokemon) => (
              <PokemonCard key={pokemon.id} {...pokemon} />
            ))}
          </Row>
        )}
        <Loading isLoading={isFetching} />
        <ErrorComponent error={error} />
        <Row className="justify-content-md-center">
          {!error && !isFetching && !debouncedQuery && (
            <LoadMore setPage={setPage} />
          )}
        </Row>
      </Container>
    </div>
  );
};

export default PokemonList;
