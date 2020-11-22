import { Container, FormControl, Row } from "react-bootstrap";
import { ErrorComponent, Loading, PokemonCard } from "../components";
import { enhanceDataWithImages, handleErrors } from "../utils";
import { useEffect, useState } from "react";

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
  const res = await fetch(`/api/search?q=${escape(query)}`);
  const data = await handleErrors(res);
  return enhanceDataWithImages(data);
};

const Home = ({ data }) => {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [pokemonCount, setPokemonCount] = useState(0);
  const { data: queryData, error, isFetching } = useQuery(
    ["q", debouncedQuery],
    getPokemon,
    { enabled: !!debouncedQuery }
  );
  const [pokemonData, setPokemonData] = useState<Pokemon[]>(data);

  useEffect(() => {
    queryData && setPokemonData(queryData);
  }, [queryData]);

  useEffect(() => {
    !debouncedQuery && setPokemonData(data);
  }, [debouncedQuery]);

  useEffect(() => {
    data &&
      setPokemonCount((prev) => (data.length > prev ? data.length : prev));
  }, [data]);

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
        <title>Pokemon!</title>
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
        {(data || pokemonData) && (
          <Row>
            {pokemonData.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                {...pokemon}
                pokemonCount={pokemonCount}
              />
            ))}
          </Row>
        )}
        <Loading isLoading={isFetching} />
        <ErrorComponent error={error} />
      </Container>
    </div>
  );
};

/**
 * Fetches at build time
 * */
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${API_URL}/search`);
  const data = await handleErrors(res);
  return {
    props: {
      data: enhanceDataWithImages(data, true),
    },
  };
};

export default Home;
