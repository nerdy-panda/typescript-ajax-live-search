import { Product, SearchResponse } from "../../Types/Utils";

class Program {
    protected search : null | HTMLInputElement = null ;
    protected loading : null|HTMLElement = null ;
    protected result : null | HTMLElement = null ;
    protected request :XMLHttpRequest = new XMLHttpRequest;
    main():void {
        this.search = <HTMLInputElement> window.document.body.querySelector('#search');
        this.loading = window.document.body.querySelector("#loading");
        this.result = window.document.body.querySelector("#result");
        
        this.search.addEventListener('keyup',this.keyUpListener);
        window.addEventListener('click',this.windowClickListener);
        
    }
    protected keyUpListener = (event : KeyboardEvent):void => {
        if(this.request.readyState !== 0)        
            this.request.abort();
        const input : HTMLInputElement = <HTMLInputElement> event.target;
        let search : string = input.value;
        search = search.trim();
        if(search.length==0){
            this.hideResult();
            return ;
        }
        this.httpSearch(search, {handleEvent : this.responseReceiveListener});
        this.showLoading();
    }
    protected windowClickListener = (event:MouseEvent):void => {
        const target : HTMLElement = <HTMLElement> event.target;
        
        const resultElements : NodeListOf<HTMLElement> = <NodeListOf<HTMLElement>> this.result?.querySelectorAll("*");
        const noCloseElements : HTMLElement[] = [
            ...Array.from(resultElements) , <HTMLElement>this.search , <HTMLElement> this.result ,
        ];
        for (const noCloseElement of noCloseElements)
            if(target==noCloseElement)
                return;
        this.hideResult();
    }
    protected httpSearch(search : string , responseReceiveListener : EventListenerObject ):void {
        const method : string = "GET";
        const destination : string = `Ajax/search.php?search=${search}`;

        this.request.addEventListener('load', responseReceiveListener);
        this.request.open(method,destination);
        this.request.send();

        // const request : XMLHttpRequest = new XMLHttpRequest;
        // request.addEventListener('load', responseReceiveListener);
        // request.open(method,destination);
        // request.send();
    }
    protected responseReceiveListener = (event : ProgressEvent):void => {
        this.hideLoading();
        const request : XMLHttpRequest = <XMLHttpRequest> event.target;
        const responseJson :string = request.response;
        const response : SearchResponse = <SearchResponse> window.JSON.parse(responseJson);
        const itemsCount :number = response.count ;
        this.clearResult();
        this.showResult();
        if(itemsCount==0)
            return this.notFoundResult();

        const products : Product[] = response.products ;
        this.printProductsToResult(products);
    }
    protected clearHtml(element : HTMLElement):void {
        element.innerHTML ="";
    }
    protected showElement(element : HTMLElement ):void {
        element.classList.add("dis-block");
    }
    protected hideElement(element:HTMLElement):void {
        element.classList.remove('dis-block');
    }
    protected showLoading():void {
        this.showElement(<HTMLElement>this.loading);
    }
    protected hideLoading():void {
        this.hideElement(<HTMLElement> this.loading);
    }
    protected showResult():void {
        this.showElement(<HTMLElement>this.result);
    }
    protected hideResult():void {
        this.hideElement(<HTMLElement> this.result);
    }
    protected notFoundMessageElement():HTMLElement {
        const message : HTMLElement = window.document.createElement('h2');
        message.innerText = "Not Found Any Result !!!";
        return message;
    }
    protected notFoundResult():void {
        const messageElement : HTMLElement = this.notFoundMessageElement();
        this.result?.appendChild(messageElement);
    }
    protected clearResult():void {
        this.clearHtml(<HTMLElement> this.result);
    }
    protected printProductsToResult(products : Product[]):void {
        const search : string = <string>this.search?.value;
        this.highlightProductsBySearchValue(products,search);
        for (const product of products) {
            const productComponent = this.searchProductComponent(product);
            this.result?.appendChild(productComponent);
        }
    }
    protected highlightProductBySearchValue(product : Product , search : string ):Product{
        const pattern : RegExp = new RegExp(`(${search})`,"gi");
        const replaced :string = "<b class='search-highlight'>$1</b>";

        const title :string = product.title.replace(pattern ,replaced) ;
        const describe : string = product.describe.replace(pattern,replaced);

        product.title = title ;
        product.describe = describe;

        return product;
    }
    protected highlightProductsBySearchValue(products : Product[] , search : string ):void{
        for (const product of products)
            this.highlightProductBySearchValue(product,search);
    }
    protected getProductThumbnail(product:Product):string {
        if(product.thumbnail == null)
            return "default.png";
        return product.thumbnail;
    }
    protected searchProductComponent(product:Product):HTMLElement {
        const productElement :HTMLElement = window.document.createElement("section");
        const thumbnail : string = this.getProductThumbnail(product);
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
        productElement.innerHTML = body ;
        return productElement;
    }
}
export default Program;