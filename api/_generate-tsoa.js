const { generateRoutes, generateSpec } = require("tsoa");

(async () => {
  const specOptions = {
    basePath: "/api",
    entryFile: "src/app.ts",
    noImplicitAdditionalProperties: "throw-on-extras",
    controllerPathGlobs: ["src/**/*.controller.ts"],
    outputDirectory: "tsoa",
    specVersion: 3,
    swagger: "2.0",
  };

  const routeOptions = {
    middleware: "express",
    basePath: "/",
    entryFile: "src/app.ts",
    noImplicitAdditionalProperties: "throw-on-extras",
    controllerPathGlobs: ["src/**/*.controller.ts"],
    routesDir: "tsoa",
    specVersion: 3,
  };

  await generateSpec(specOptions);
  await generateRoutes(routeOptions);
})();
