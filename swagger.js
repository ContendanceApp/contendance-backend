const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contendance Rest API",
    version: "3.0.0",
  },
  host: "api.contendance.studio",
  basePath: "/api",
  schemes: ["https"],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
