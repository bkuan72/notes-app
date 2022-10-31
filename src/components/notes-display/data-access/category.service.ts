import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';



/**
 *This service implements the methods to load/save/update/add/delete of category
 *
 * @export
 * @class CategoryService
 * @implements {Resolve<void>}
 */
@Injectable({
  providedIn: 'root'
})
export class CategoryService implements Resolve<void>{
categoryListName = 'AppCategoryList';

categoriesList: string[] = [];

constructor() {}

/**
 * Resolver for the router to resolve data during navigation
 * @param route Contains the information about a route associated with a component loaded in an outlet at a particular moment in time
 * @param state Represents the state of the router at a moment in time.
 * @returns
 */
resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void | Observable<void> | Promise<void> {
    return new Promise((resolve) => {
      this.load().finally(() => {
        resolve();
      })
    });
}

/**
 * Load Category list from data source
 * @returns category list
 */
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

/**
 * Save the category list
 * @param categoryList (optional) new category list to override current category list
 * @returns
 */
save(categoryList?: string[]) {
  if (categoryList) {
    this.categoriesList = categoryList;
  }
  const categoriesData = JSON.stringify(this.categoriesList);
  localStorage.setItem(this.categoryListName, categoriesData);
  return true;
}

}
