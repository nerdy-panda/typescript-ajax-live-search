class Program {
    constructor() {
        this.search = null;
        this.loading = null;
        this.result = null;
        this.request = new XMLHttpRequest;
        this.keyUpListener = (event) => {
            if (this.request.readyState !== 0)
                this.request.abort();
            const input = event.target;
            let search = input.value;
            search = search.trim();
            if (search.length == 0) {
                this.hideResult();
                return;
            }
            this.httpSearch(search, { handleEvent: this.responseReceiveListener });
            this.showLoading();
        };
        this.windowClickListener = (event) => {
            var _a;
            const target = event.target;
            const resultElements = (_a = this.result) === null || _a === void 0 ? void 0 : _a.querySelectorAll("*");
            const noCloseElements = [
                ...Array.from(resultElements), this.search, this.result,
            ];
            for (const noCloseElement of noCloseElements)
                if (target == noCloseElement)
                    return;
            this.hideResult();
        };
        this.responseReceiveListener = (event) => {
            this.hideLoading();
            const request = event.target;
            const responseJson = request.response;
            const response = window.JSON.parse(responseJson);
            const itemsCount = response.count;
            this.clearResult();
            this.showResult();
            if (itemsCount == 0)
                return this.notFoundResult();
            const products = response.products;
            this.printProductsToResult(products);
        };
    }
    main() {
        this.search = window.document.body.querySelector('#search');
        this.loading = window.document.body.querySelector("#loading");
        this.result = window.document.body.querySelector("#result");
        this.search.addEventListener('keyup', this.keyUpListener);
        window.addEventListener('click', this.windowClickListener);
    }
    httpSearch(search, responseReceiveListener) {
        const method = "GET";
        const destination = `Ajax/search.php?search=${search}`;
        this.request.addEventListener('load', responseReceiveListener);
        this.request.open(method, destination);
        this.request.send();
    }
    clearHtml(element) {
        element.innerHTML = "";
    }
    showElement(element) {
        element.classList.add("dis-block");
    }
    hideElement(element) {
        element.classList.remove('dis-block');
    }
    showLoading() {
        this.showElement(this.loading);
    }
    hideLoading() {
        this.hideElement(this.loading);
    }
    showResult() {
        this.showElement(this.result);
    }
    hideResult() {
        this.hideElement(this.result);
    }
    notFoundMessageElement() {
        const message = window.document.createElement('h2');
        message.innerText = "Not Found Any Result !!!";
        return message;
    }
    notFoundResult() {
        var _a;
        const messageElement = this.notFoundMessageElement();
        (_a = this.result) === null || _a === void 0 ? void 0 : _a.appendChild(messageElement);
    }
    clearResult() {
        this.clearHtml(this.result);
    }
    printProductsToResult(products) {
        var _a, _b;
        const search = (_a = this.search) === null || _a === void 0 ? void 0 : _a.value;
        this.highlightProductsBySearchValue(products, search);
        for (const product of products) {
            const productComponent = this.searchProductComponent(product);
            (_b = this.result) === null || _b === void 0 ? void 0 : _b.appendChild(productComponent);
        }
    }
    highlightProductBySearchValue(product, search) {
        const pattern = new RegExp(`(${search})`, "gi");
        const replaced = "<b class='search-highlight'>$1</b>";
        const title = product.title.replace(pattern, replaced);
        const describe = product.describe.replace(pattern, replaced);
        product.title = title;
        product.describe = describe;
        return product;
    }
    highlightProductsBySearchValue(products, search) {
        for (const product of products)
            this.highlightProductBySearchValue(product, search);
    }
    getProductThumbnail(product) {
        if (product.thumbnail == null)
            return "default.png";
        return product.thumbnail;
    }
    searchProductComponent(product) {
        const productElement = window.document.createElement("section");
        const thumbnail = this.getProductThumbnail(product);
        productElement.classList.add("product");
        const body = `
                <section>
                    <h2>${product.title}</h2>
                </section>
                <section>
                    <div>
                        <img src="img/${thumbnail}" alt="">
                    </div>
                    <section>
                        <p>
                            ${product.describe}
                        </p>
                    </section>
                </section>
                <section>
                    <a href="#">
                        ${product.created_at}
                    </a>
                    <a href="#">read more</a>
                </section>
        `;
        productElement.innerHTML = body;
        return productElement;
    }
}
export default Program;
//# sourceMappingURL=Program.js.map