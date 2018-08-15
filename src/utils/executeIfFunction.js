const executeIfFunction = f => (typeof f === 'function' ? f() : f);

export default executeIfFunction;
