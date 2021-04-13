export const getQueryParams = () => {
    if (!window.location.search) {
        return {};
    }

    const params = window.location.search.substr(1).split('&');

    return params.reduce((acc, param) => {
        const pair = param.split('=');

        if (pair.length === 2) {
            pair[1] = pair[1].replace(/%/g, '');
            acc[pair[0]] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
        }

        return acc;
    }, {});
};

export const removeQueryParam = param => {
    const params = getQueryParams();
    delete params[param];
    const search = getSearchString(params);

    window.history.replaceState({}, document.title, `${window.location.pathname}?${search}`);
};

export const getSearchString = params => {
    const keys = Object.keys(params);

    return keys.reduce((acc, key, index) => `${acc}${key}=${params[key]}${index === keys.length - 1 ? '' : '&'}`, '');
};

export const removeQueryParams = paramsKeys => {
    const queryParams = getQueryParams();

    paramsKeys.forEach(key => {
        delete queryParams[key];
    });

    const search = getSearchString(queryParams);

    window.history.replaceState({}, document.title, `${window.location.pathname}?${search}`);
};

export const addQueryParams = (params, history) => {
    const queryParams = getQueryParams();

    Object.keys(params).forEach(key => {
        queryParams[key] = params[key];
    });

    debugger;

    if (history) {
        const searchString = getSearchString(queryParams);
        const { pathname } = history.location;
        const search = searchString ? `?${searchString}` : searchString;

        history.replace({
            pathname,
            search,
        });
    } else {
        const url = createUrlWithParams(origin, queryParams);
        window.history.replaceState({}, document.title, url);
    }
};

export const createUrlWithParams = (url, queryParams) => {
    if (!url) {
        return '';
    }

    const search = url.split('?')[1];
    const searchString = getSearchString(queryParams);

    return search ? `${url}&${searchString}` : `${url}${searchString ? `?${searchString}` : ''}`;
};

export const getCurrentSearch = () => {
    return window.location.search;
};
