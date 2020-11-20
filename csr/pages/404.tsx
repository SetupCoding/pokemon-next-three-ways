import { Container, Row } from "react-bootstrap";

import Link from "next/link";

export const Custom404: React.FC = () => (
  <Container>
    <Row className="justify-content-md-center">
      <h1>404 - Page Not Found</h1>
    </Row>
    <Link href="/">
      <a>
        <Row className="justify-content-md-center">
          <h1>Missingno will lead you back home</h1>
        </Row>
        <Row className="justify-content-md-center">
          <img src={"/404Pokemon.png"} />
        </Row>
      </a>
    </Link>
  </Container>
);

export default Custom404;