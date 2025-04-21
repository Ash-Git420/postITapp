import * as yup from "yup"; //import all exports from the yup
export const userSchemaValidation = yup.object().shape({
  name: yup.string().required("Name is required!"),
  email: yup
    .string()
    .email("Not valid email format")
    .required("Email is required"),
  password: yup.string().min(4).max(20).required("Password is required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords Don't Match")
    .required(),

  /* age1: yup
    .number()
    .typeError("Value must be a number..")
    .integer("value must be an integer...")
    .required("Age is required..")
    .min(10)
    .max(18),
  age2: yup
    .string()
    .matches(/^\d+$/, " value must be a whole number...")
    .required("Age is required..")
    .test("is integer", "value must be a integer..", (value) => {
      if (!value) return false;
      return Number.isInteger(Number(value));
    })
    .test("within-range", "Age is must be between 10 and 18..", (value) => {
      const numValue = Number(value);
      return numValue >= 10 && numValue <= 18;
    }),
  salary: yup
    .string()
    .matches(/^\d+\.\d+$/, " value must have a decimal number...")
    .required("Salary is required..")
    .test("is-decimal", "value must have  a decimal..", (value) => {
      if (!value) return false;
      return /^\d+\.\d+$/.test(value);
    }),*/
});
