import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements Resolve<void>{
categoryListName = 'AppCategoryList';

categoriesList: string[] = [];

constructor() {}

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void | Observable<void> | Promise<void> {
    return new Promise((resolve) => {
      this.load().finally(() => {
        resolve();
      })
    });
}

load() {
  return new Promise<string[]> ((resolve) => {
    const categoriesData = localStorage.getItem(this.categoryListName);
    if (categoriesData !== null) {
      this.categoriesList = JSON.parse(categoriesData);
      resolve(this.categoriesList);
    } else {
      this.categoriesList.push('To Do');
      this.categoriesList.push('Notes');
      this.save();
      resolve(this.categoriesList);
    }
  })
}

save(categoryList?: string[]) {
  if (categoryList) {
    this.categoriesList = categoryList;
  }
  const categoriesData = JSON.stringify(this.categoriesList);
  localStorage.setItem(this.categoryListName, categoriesData);
}

}
