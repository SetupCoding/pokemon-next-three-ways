import { Container, Row } from "react-bootstrap";

import Link from "next/link";

export const Custom404: React.FC = () => (
  <Container>
    <Row className="justify-content-md-center">
      <h1>404 - Page Not Found</h1>
    </Row>
    <Row className="justify-content-md-center">
      <Link href="/">
        <a>
          <h1>Missingno will lead you back home</h1>
        </a>
      </Link>
    </Row>
    <Row className="justify-content-md-center">
      <img
        src={`/404Pokemon.png`}
        alt="404 Pokemon"
        style={{
          width: "201px",
          height: "225px",
        }}
      />
    </Row>
  </Container>
);

export default Custom404;
