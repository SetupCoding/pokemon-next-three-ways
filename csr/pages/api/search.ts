import { NextApiRequest, NextApiResponse } from "next";

import { LOAD_MORE_COUNT } from "../../constants/const";
import pokemon from "../../pokemon.json";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const filter = req.query.q
    ? new RegExp(req.query.q as string, "i")
    : undefined;
  const page = +req.query.page || 1;

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify(
      filter
        ? pokemon
            .filter(({ name: { english } }) => english.match(filter))
            .slice(0, LOAD_MORE_COUNT)
        : pokemon.slice(0, page * LOAD_MORE_COUNT)
    )
  );
};
