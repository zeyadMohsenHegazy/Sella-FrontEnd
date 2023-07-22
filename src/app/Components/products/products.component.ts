import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Model/IProduct';
import { ICategory } from 'src/app/Model/icategory';
import { CartDetialsService } from 'src/app/Services/cart-detials.service';
import { CartService } from 'src/app/Services/cart.service';
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

  Categories : any;

  constructor(private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private cartserv: CartService,
    private serve: CartDetialsService){

    this.listFilter = "";
  }

  ngOnInit(): void {
      this.productService.GetAllProducts().subscribe({
      next: (products) => {
        this.Products = products;
        this.filterProducts = this.Products;
        this.filterCategories = products;
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

//   filterCategory(filterBy: string){
//   filterBy = filterBy.toLocaleLowerCase();
//   this.filterProducts = this.filterProducts.filter((product: IProduct) =>
//     product.categoryName.toLocaleLowerCase().includes(filterBy)
//   );
// }
// filterCategory(event: Event) {
//   const selectElement = event.target as HTMLSelectElement;
//   const filterBy = selectElement.value;
//   console.log(filterBy);

//   for (let i = 0; i < this.filterCategories.length; i++) {
//     if (this.filterCategories[i].category.categoryName === filterBy) {
//       this.FilteredProducts.push(this.filterCategories[i]);
//     }
//     console.log(this.FilteredProducts)
//     console.log(this.filterCategories)
//   }

//   this.filterProducts = this.FilteredProducts;
// }
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

  sliderValue1! :number;
  sliderValue2! :number;
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
