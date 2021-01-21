import React from "react";
import { Button, Error, Form, Input, Label } from "./styles/form-elements";
import { ReactComponent as LoadingIcon } from "./icons/hourglass.svg";
import useCreateWilder from "./hooks/useCreateWilder";

function AddWilder(): JSX.Element {
  const {
    inputCity,
    inputName,
    formSubmission,
    loading,
    delayed,
    error,
  } = useCreateWilder();

  return (
    <Form onSubmit={formSubmission}>
      <Label htmlFor="name-input">Name :</Label>
      <Input
        id="name-input"
        type="text"
        placeholder="Type the name"
        value={inputName.value}
        onChange={inputName.onChange}
      />
      <Label htmlFor="city-input">City :</Label>
      <Input
        id="city-input"
        type="text"
        placeholder="Type the city"
        value={inputCity.value}
        onChange={inputCity.onChange}
      />
      {error !== "" && <Error>{error}</Error>}
      <Button disabled={loading} showLoading={loading && !delayed}>
        {loading && !delayed ? <LoadingIcon /> : "Add"}
      </Button>
    </Form>
  );
}

export default AddWilder;
