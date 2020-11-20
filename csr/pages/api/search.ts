import { NextApiRequest, NextApiResponse } from "next";

import pokemon from "../../pokemon.json";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify(
      pokemon.filter(({ name: { english } }) => english.match(filter))
    )
  );
};
