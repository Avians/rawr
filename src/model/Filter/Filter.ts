export interface Filter<DataModel> {
  predicate(model: DataModel): boolean;
}

export function AggregateFilter<DataModel>(
    ...predicates: ((model: DataModel) => boolean)[]): Filter<DataModel> {
  return {
    predicate(model: DataModel): boolean {
      for (const predicate of predicates) {
        if (predicate(model) === false) return false;
      }
      return true;
    }
  }
}