export type Predicate = (model: any) => boolean;
export type PredicateHoc = (...args: any[]) => Predicate;

export interface Filter<DataModel> {
    predicate(model: DataModel): boolean;
}

export function AggregateFilter<DataModel>(
    ...predicates: ((model: DataModel) => boolean)[]
): Filter<DataModel> {
    return {
        predicate(model: DataModel): boolean {
            return predicates.every(predicate => predicate(model));
        },
    };
}
