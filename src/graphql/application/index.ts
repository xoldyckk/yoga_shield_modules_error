import { createApplication } from "graphql-modules";
import { module } from "./module";

/*
This is the graphql application created by combining all the individual graphql modules.
*/
export const application = createApplication({
  modules: [module],
});
