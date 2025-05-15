export enum MeasureUnit {
    CM = "CM",
    M = "M",
    MM = "MM",
    INCH = "INCH"
}

export interface Measure {
    unit: MeasureUnit;
	height: number;
    width: number;
    length: number;
}