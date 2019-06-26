export type Predicate<T> = (model: T) => boolean;
export type PredicateHoc<T> = (...args: any[]) => Predicate<T>;

export interface Filter<DataModel> {
    (model: DataModel): boolean;
}

export function AggregateFilter<DataModel>(
    ...predicates: Predicate<DataModel>[]
): Filter<DataModel> {
    return (model: DataModel): boolean => {
        return predicates.every(predicate => predicate(model));
    };
};
