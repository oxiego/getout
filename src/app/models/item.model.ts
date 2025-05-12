import { Category } from "./category.model";
import { Measure } from "./measure.model";

export interface Item {
    uuid: string;
    name: string;
    manufactorer: string;
    articleLink: string;
    description: string;
    articleMeasure: Measure;
    packedMeasure: Measure;
    weight: number;
    paidPrice: number;
    category: Category;
}
