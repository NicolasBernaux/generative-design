//const Form = require("./Form.js");
import Form from "./Form";
import { ask } from "../../utils/mockAsks";

const formulaire = new Form(ask);

formulaire.render();
