import React from "react";
export const LoadMore = ({ setPage }) => {
  const onLoadMore = () => {
    setPage((prevStart) => prevStart + 1);
  };
  return <button onClick={onLoadMore}>Load more</button>;
};
