import { Item } from "./item.model";

export interface Packlist {
    uuid?: string | null;
    name: string;
    items: Item[];
}
