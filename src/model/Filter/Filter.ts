export interface Filter<DataModel> {
  predicate(model: DataModel): boolean;
}

export function AggregateFilter<DataModel>(filters: Filter<DataModel>[]):
    Filter<DataModel> {
  return {
    predicate(model: DataModel): boolean {
      for (const filter of filters) {
        if (filter.predicate(model) === false) return false;
      }
      return true;
    }
  }
}