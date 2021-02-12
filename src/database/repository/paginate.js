exports.paginate = {
  currentPage: 1,
  limit: 12,
  options: {},
  route: '',
  linksPerPage: 5,
  setLimit: function (limit) {
    this.limit = limit;
  },
  setRequest: function (request) {
    this.currentPage = request.query['page'] ?? 1;
    this.setRoute(request);
  },
  setOptions: function (options) {
    this.options = options;
  },
  paginate: function (model) {
    const offset = this.currentPage * this.limit - this.limit;
    return model.findAndCountAll({
      ...this.options,
      limit: this.limit,
      offset,
    });
  },
  setRoute: function (request) {
    this.route = '?';
    const query = request.query;
    for (const key in query) {
      if (key !== 'page') {
        this.route += `${key}=${query[key]}&`;
      }
    }
  },
  render: function (total) {
    const totalPages = Math.ceil(total / this.limit);

    let startLinks = 1;
    if (+this.currentPage > +this.linksPerPage) {
      startLinks = +this.currentPage - +this.linksPerPage;
    }

    let endLinks = totalPages;
    if (+this.currentPage + +this.linksPerPage < +totalPages) {
      endLinks = +this.currentPage + +this.linksPerPage;
    }

    let links = `<ul class="pagination">`;

    if (this.currentPage > 1) {
      links += `<li class="page-item"><a href="${this.route}page=1" class="page-link">First</a><li>`;
      links += `<li class="page-item"><a href="${this.route}page=${
        this.currentPage - 1
      }" class="page-link">Previous</a><li>`;
    }

    for (let index = startLinks; index <= endLinks; index++) {
      const active = this.currentPage == index ? 'active' : '';
      links += `<li class="page-item ${active}"><a href="${this.route}page=${index}" class="page-link">${index}</a><li>`;
    }

    if (this.currentPage < totalPages) {
      links += `<li class="page-item"><a href="${this.route}page=${
        +this.currentPage + 1
      }" class="page-link">Next</a><li>`;
      links += `<li class="page-item"><a href="${this.route}page=${totalPages}" class="page-link">Last</a><li>`;
    }

    links += `<ul>`;

    return links;
  },
};
