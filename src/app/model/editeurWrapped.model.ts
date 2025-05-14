import { Editeur } from "./editeur.model";

export class EditeurWrapped {
    _embedded!: {
        editeurs: Editeur[];
    };
}