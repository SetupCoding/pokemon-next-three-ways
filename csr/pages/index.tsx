import { Container, FormControl, Row } from "react-bootstrap";
import { ErrorComponent, Loading, PokemonCard } from "../components";
import { useEffect, useState } from "react";

import Head from "next/head";
import { Pokemon } from "../models/pokemon.model";
import { handleErrors } from "../utils/handleErrors";
import useDebouncedCallback from "../hooks/useDebounceCallback";
import { useQuery } from "react-query";

const getPokemon = async (_, query): Promise<Pokemon[]> => {
  const res = await fetch(`/api/search?q=${escape(query)}`);
  const data = await handleErrors(res);
  return data.map((pokemon) => ({
    ...pokemon,
    image: `/pokemon/${pokemon.name.english
      .toLowerCase()
      .replace(" ", "-")}.jpg`,
  }));
};

const Home = () => {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [pokemonCount, setPokemonCount] = useState(0);
  const { data, error, isFetching } = useQuery(
    ["q", debouncedQuery],
    getPokemon
  );

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
          placeholder="Search"
          aria-label="Search"
          value={query}
          onChange={queryPokemon}
        />
        {data && (
          <Row>
            {data.map((pokemon) => (
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

export default Home;
