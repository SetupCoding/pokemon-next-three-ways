import { HttpError } from "../models/http-error.model";
import React from "react";
import { Row } from "react-bootstrap";
type Props = {
  error?: HttpError;
};
export const ErrorComponent: React.FC<Props> = ({ error }) =>
  error ? (
    <>
      <Row className="justify-content-md-center">{error.message}</Row>
    </>
  ) : null;
