import { Category } from "./category.model";
import { Measure } from "./measure.model";

export interface Item {
    id: string;
    name: string;
    manufacturer: string;
    articelLink: string;
    description: string;
    articleMeasure: Measure;
    packedMeasure: Measure;
    weight: number;
    paidPrice: number;
    category: Category;
}
