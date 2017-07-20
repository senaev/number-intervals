export type NumberInterval = {
    start: number;
    end: number;
};

export class NumberIntervals {
    private intervals: NumberInterval[] = [];

    public static isNumberInInterval(num: number, { start, end }: NumberInterval) {
        return start <= num && num <= end;
    }

    public add(interval: NumberInterval) {
        let { start, end } = interval;

        // Ищем интервалы, которые пересекаются с добавляемым
        const overlappingIntervals = this.getOverlappingIntervals(interval);

        overlappingIntervals.forEach((includedInterval) => {
            const { start: includedIntervalStart, end: includedIntervalEnd } = includedInterval;

            // Если интервал находится частично за пределами добавляемого, объединяем размеры
            if (includedIntervalStart < start) {
                start = includedIntervalStart;
            }
            if (includedIntervalEnd > end) {
                end = includedIntervalEnd;
            }

            // Удаляем пересекающиеся интервалы
            this.intervals.splice(this.intervals.indexOf(includedInterval), 1);
        });

        this.intervals.push({ start, end });
    }

    public has(num: number): boolean {
        return Boolean(this.getInterval(num));
    }

    public getInterval(num: number): NumberInterval | undefined {
        return this.intervals.find((interval) => {
            return NumberIntervals.isNumberInInterval(num, interval);
        });
    }

    public getOverlappingIntervals(interval: NumberInterval): NumberInterval[] {
        return this.intervals.filter(({ start, end }) => {
            return NumberIntervals.isNumberInInterval(start, interval)
                || NumberIntervals.isNumberInInterval(end, interval)
                || NumberIntervals.isNumberInInterval(interval.start, {start, end});
        });
    }

    public removeAll(): void {
        this.intervals = [];
    }

    public toString() {
        return this.intervals.reduce((prev, { start, end }) => `${prev}[${start} <-> ${end}]`, '');
    }
}
