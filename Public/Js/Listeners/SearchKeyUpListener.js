class SearchKeyUpListener {
    constructor(searchService, searchResponseReceiveListener) {
        this.searchService = searchService;
        this.searchResponseReceiveListener = searchResponseReceiveListener;
    }
    handleEvent(event) {
        const input = event.target;
        let search = input.value;
        search = search.trim();
        if (search.length == 0)
            return;
        this.searchService.search(search, this.searchResponseReceiveListener);
    }
}
export default SearchKeyUpListener;
//# sourceMappingURL=SearchKeyUpListener.js.map