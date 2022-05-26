export const validateFormField = (toValidateField) => {
  let error = {};
  Object.keys(toValidateField).forEach((field) => {
    const element = document.getElementsByName(field)[0];
    console.log(element)
    const validateConditions =
      (element && element?.getAttribute("validator")?.split(",")) || [];
      console.log(validateConditions)
    validateConditions.length &&
      validateConditions.some((item) => {
        error[field] = validateError(item, toValidateField[field], field);
        return error[field] !== "";
      });
  });
  console.log(error)
  return error;
};

const validateError = (condition, fieldValue, fieldname) => {
  switch (condition) {
    case "required":
      return fieldValue.length === 0? `${fieldname} is required` : "";

    case "minlength50":
      return fieldValue.length < 50? `${fieldname} must have atleast 50 letters` : "";

    default:
      return "";
  }
};

export const checkErrors = (errors) => {
  return Object.values(errors).filter((item) => item).length ? true : false;
};
