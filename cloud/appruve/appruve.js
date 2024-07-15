const baseURL = process.env.APPRUVE_API_URL;
const ID_TYPES = [
  "passport",
  "driver_license",
  "voter",
  "ssnit",
  "tin",
  "digital_address",
];

const verifyId = async ({ type, id, is_new_id = true }) => {
  if (!type) {
    if (!(type in ID_TYPES)) {
      return Promise.reject(
        `ID type must be one of ${Object.values(ID_TYPES)}`
      );
    }
    return Promise.reject("Missing id type");
  }
  if (!id) {
    return Promise.reject("Missing id");
  }
  try {
    const body = {};
    let requestPath = `/${type}`;
    let key = "id";
    switch (type) {
      case "tin":
        key = "tin";
        break;
      case "digital_address":
        key = "digital_address";
        break;
    }
    body[key] = id;

    const url = baseURL + requestPath;

    const token = `Bearer ${process.env.APPRUVE_ACCESS_TOKEN}`;

    const response = await Parse.Cloud.httpRequest({
      url: url,
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
      body: body,
    });
    return Promise.resolve(response.data);
  } catch (response) {
    if (response.status === 404) {
      return Promise.reject(
        "The id you provided was invalid. Please provide a valid ID to continue"
      );
    } else {
      return Promise.reject(
        "There was an error validating your id, please try again later. If issue continues, please contact the app administrator"
      );
    }
  }
};

module.exports = {
  verifyId,
};
