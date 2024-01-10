class Search {
    search(search, responseReceiveListener) {
        const method = "GET";
        const destination = `Ajax/search.php?search=${search}`;
        const request = new XMLHttpRequest;
        request.addEventListener('load', responseReceiveListener);
        request.open(method, destination);
        request.send();
    }
}
export default Search;
//# sourceMappingURL=Search.js.map