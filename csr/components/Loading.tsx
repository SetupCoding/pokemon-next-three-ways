import React from "react";
import { Row } from "react-bootstrap";
type Props = {
  isLoading?: boolean;
};
export const Loading: React.FC<Props> = ({ isLoading }) =>
  isLoading ? (
    <Row className="justify-content-md-center">Loading...</Row>
  ) : null;
