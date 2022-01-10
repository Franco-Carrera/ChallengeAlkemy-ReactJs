import { useContext, useState } from "react";
import "./Search.css";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Context from "../../context/HeroContext";
import { Formik, Field, Form } from "formik";

const Search = () => {
  const { search, alreadySerched, setNotification } = useContext(Context);
  //Estado que setea las palabras ya buscadas
  const [serchedWords, SetSerchedWords] = useState([]);

  return (
    <Formik
      initialValues={{
        name: "",
      }}
      onSubmit={(values, { resetForm }) => {
        if (alreadySerched(values.name.toLowerCase(), serchedWords)) {
          return setNotification(
            "error",
            `You already search the word: '${values.name}'`,
            3000
          );
        } else {
          SetSerchedWords(values.name.toLowerCase());
          search(values.name.toLowerCase());
          resetForm();
        }
      }}
    >
      {() => (
        <Form>
          <Stack gap={3} direction="horizontal">
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Search a super hero"
            />
            <Button className="search__submit" type="submit" variant="primary">
              Search
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default Search;
