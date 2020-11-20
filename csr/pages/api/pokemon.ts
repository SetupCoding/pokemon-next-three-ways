import { NextApiRequest, NextApiResponse } from "next";

import pokemon from "../../pokemon.json";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const idToFind = req.query.id as string;

  if (!idToFind) {
    res.statusCode = 400;
    res.end("Must have a name");
  } else {
    const found = pokemon.find(({ id }) => id === +idToFind);
    if (!found) {
      res.statusCode = 404;
      res.end(
        JSON.stringify({
          error: {
            status: 404,
            error: 'Not Found',
            message: `Pokemon with id ${req.query.id} not found`,
          },
        })
      );
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(found));
    }
  }
};
