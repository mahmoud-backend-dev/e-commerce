export class ApiFeature {
  constractor(mongoQuery, searchQuery) {
    (this.mongoQuery = mongoQuery), (this.searchQuery = searchQuery);
  }

  pagination() {
    if (this.searchQuery.page <= 0) this.searchQuery.page = 1;
    let PAGE_NUMBER = this.searchQuery.page * 1 || 1; // if string(NAN || 1)
    let PAGE_LIMIT = 3;
    let SKIP = (PAGE_NUMBER - 1) * PAGE_LIMIT;
    this.mongoQuery = this.mongoQuery.skip(SKIP).limit(PAGE_LIMIT);

    return this;
  }

  filter() {
    let filterObj = { ...this.searchQuery };
    let execludedQuery = ["page", "sort", "fields", "filter"];
    execludedQuery.forEach((q) => {
      delete filterObj[q];
    });
    filterObj = JSON.stringify(filterObj);
    filterObj = filterObj.replace(/(gt|gte|lt|lte)/g, (match) => `$ ${match}`);
    filterObj = JSON.parse(filterObj);
    this.mongoQuery.find(filterObj);
    return this;
  }

  sort() {
    if (this.searchQuery.sort) {
      let sortBy = this.searchQuery.sort.split(",").join(" ");
      this.mongoQuery.sort(sortBy);
    }
    return this;
  } // not sure

  fields() {
    if (this.searchQuery.fields) {
      let selected = this.searchQuery.fields.split(",").join(" ");
      this.mongoQuery.selecte(selected);
    }
    return this;
  }

  search() {
    if (this.searchQuery.keyword) {
      this.mongoQuery.find({
        $or: [
          { title: { $regex: this.searchQuery.keyword } },
          { description: { $regex: this.searchQuery.keyword } },
        ],
      });
    }
    return this;
  }
}
