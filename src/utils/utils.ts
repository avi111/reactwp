export const snakeToRegularCase = (snakeCaseString: string): string => {
  // Replace underscores with spaces
  const regularCaseString = snakeCaseString
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return regularCaseString;
};

export const regularToSnakeCase = (regularCaseString: string): string =>
  regularCaseString
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("-");
