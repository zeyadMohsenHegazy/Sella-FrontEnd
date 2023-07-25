import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'jquery';
import { IProduct } from 'src/app/Model/IProduct';
import { ICategory } from 'src/app/Model/icategory';
import { Item } from 'src/app/Model/pagination';
import { CartDetialsService } from 'src/app/Services/cart-detials.service';
import { CartService } from 'src/app/Services/cart.service';
import { ImagesService } from 'src/app/Services/images.service';
import { ItemService } from 'src/app/Services/item-service.service';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  implements OnInit {

  Products: IProduct[] = [];
  filterProducts: IProduct[] = [];
  filterCategories: any;
  private _listFilter: string = "";
  currentPage = 1; 
  productsPerPage = 18; 
  totalPages = 0; 
  Categories : any;
  items: Item[] = [];

  constructor(private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private cartserv: CartService,
    private serve: CartDetialsService,
    public itemService: ItemService,
    private ImgService : ImagesService){

    this.listFilter = "";
  }

  ngOnInit(): void {
      this.productService.GetAllProducts().subscribe({
      next: (products) => {
        this.Products = products;
        this.totalPages = Math.ceil(this.Products.length / this.productsPerPage);
        this.filterProducts = this.Products.slice(0, this.productsPerPage);
        this.filterCategories = products;
        this.GetImgsandAssigntoproducts();
      },
      error: (error) => {
        console.log(error);
      }
    })

    this.productService.GetAllCategories().subscribe({
      next: (categories) => {
        this.Categories = categories;
      },
      error: (error) => {
        console.log(error);
      }
    })

    this.loadItems();
  }

  GetImgsandAssigntoproducts(){
    this.filterProducts.forEach(element => {
      this.ImgService.GetProductImages(element.productID)
      .subscribe({
        next:(Img:any)=>{
          element.ImgPaths=Img;
        },
        error:(err)=>{
          console.log(err);
        }
      })
    });
  }


  loadItems() {
    this.items = this.itemService.getItemsForPage(this.itemService.currentPage);
  }

  changePage(page: number) {
    const start = (page - 1) * this.productsPerPage;
    const end = start + this.productsPerPage;
    this.filterProducts = this.Products.slice(start, end);
    this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  public get listFilter(): string {
  return this._listFilter;
  }
  public set listFilter(value: string) {
    this._listFilter = value;
    this.filterProducts = this.performFilter(value);
  }
  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.Products.filter((product: IProduct) =>
      product.productName.includes(filterBy)
    );
  }
  

  viewDetails(id: number) {
    this.router.navigate(['/product/' + id]);
  }

  onBack() {
    this.router.navigate(['/home']);
  }

  addtocart(item: any, proid: number) {
    console.log(item);
    console.log(proid);
    this.serve.addtocart(item); 
  }

filterCategory(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  const filterBy = selectElement.value;
  let FilteredProducts = [];
  if(filterBy != 'AllCategories'){
  for (let i = 0; i < this.filterCategories.length; i++) {
    if (this.filterCategories[i].category.categoryName === filterBy) {
      FilteredProducts.push(this.filterCategories[i]);
    }
  }
   this.filterProducts=FilteredProducts;
  }else{
    this.filterProducts= this.filterCategories
  }
}

  filterColor(event: Event){
    const selectElement = event.target as HTMLSelectElement;
    const filterBy = selectElement.value;
    if(filterBy != 'AllColors'){
      let FilteredProducts = [];
      for (let i = 0; i < this.filterCategories.length; i++) {
        if (this.filterCategories[i].color === filterBy) {
          FilteredProducts.push(this.filterCategories[i]);
        }
      }
       this.filterProducts=FilteredProducts;
    }else{
      this.filterProducts= this.filterCategories
    }
  }

  sliderValue1 :number =0;
  sliderValue2 :number =100;
  updateValue1(event: Event) {
    this.sliderValue1 = (event.target as HTMLInputElement).valueAsNumber;
    this.filterByPrice(this.sliderValue1,this.sliderValue2);
  }

  updateValue2(event: Event) {
    this.sliderValue2 = (event.target as HTMLInputElement).valueAsNumber;
    this.filterByPrice(this.sliderValue1,this.sliderValue2);
  }

  filterByPrice(value1 :number, value2: number){
      let FilteredProducts = [];
      for (let i = 0; i < this.filterCategories.length; i++) {
        if (this.filterCategories[i].price >= value1 && this.filterCategories[i].price <= value2) {
          FilteredProducts.push(this.filterCategories[i]);
        }
      }
       this.filterProducts=FilteredProducts;
    }
    
  
}
