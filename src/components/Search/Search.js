import { useContext } from "react";
//import moduleName from './Search.css'
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Context from "../../context/HeroContext";
import { Formik, Field, Form } from "formik";

const Search = () => {
  const { search } = useContext(Context);

  return (
    <Formik
      initialValues={{
        name: "",
      }}
      onSubmit={(values, { resetForm }) => {
        search(values.name);
        resetForm();
      }}
    >
      {() => (
        <Form>
          <Stack gap={2} className="col-md-5 mx-auto" direction="horizontal">
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Search a super hero"
            />
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default Search;
