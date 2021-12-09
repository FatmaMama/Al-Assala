class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    };

    search(){
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: 'i'
            }
        } : {};

        this.query = this.query.find({...keyword});
        return this;
    };

    filter() {
        const queryObj = {...this.queryString};
        const removeFields = ['keyword', 'page', 'limit', 'sort'];
        removeFields.forEach(el =>  delete(queryObj[el]));
        
        //Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        
        this.query = this.query.find(JSON.parse(queryStr));
        return this
    };

    sort() {
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    };

    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit || 3;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
};

module.exports = ApiFeatures;