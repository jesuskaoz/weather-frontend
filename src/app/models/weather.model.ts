export class Weather {
    constructor(
        public max_temp: number,
        public min_temp: number,
        public valid_date: string,
        public lon: number ,
        public lat: number ,
        public city_name: string
    ) {}
}
