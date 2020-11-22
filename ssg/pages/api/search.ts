import { NextApiRequest, NextApiResponse } from "next";

import pokemon from "../../pokemon.json";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const filter = req.query.q
    ? new RegExp(req.query.q as string, "i")
    : undefined;

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify(
      filter
        ? pokemon.filter(({ name: { english } }) => english.match(filter))
        : pokemon
    )
  );
};
