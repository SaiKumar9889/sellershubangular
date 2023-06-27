import { Component, OnInit, ViewChild } from "@angular/core";
import { TrackMenus } from "src/app/_models/menuForTrack";
import { pages } from "src/app/_models/pages";
import { subMenus } from "src/app/_models/subMenuTrack";
import { usertrackInput } from "src/app/_models/usertrackInput";
import { ToastTypes } from "src/app/_models/_toaster";
import { AppTrackingService } from "src/app/_service/app-tracking.service";
import { ToasterService } from "src/app/_service/toaster.service";
import { CategoryService } from "../services/category.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
declare var $: any;
@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  loading: boolean = false;
  categoryName: any = "";
  subcategoryName: any = "";
  subcategory: any[] = [];
  categoryDesc: any = "";
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: any[] = ["category", "description", "path", "action"];
  constructor(
    private appTrackingService: AppTrackingService,
    private toasterService: ToasterService,
    private categoryService: CategoryService
  ) {
    // let ip: usertrackInput = { menu: TrackMenus.INVENTORY, submenu: subMenus.CATEGORIES, page: pages.CATEGORIESPAGE, function: "", descrption: "Categories page loaded" };
    // this.appTrackingService.trackUserActivity(ip);
  }

  ngOnInit(): void {
    this.getCategories();
  }
  auditTrack(type: any) {
    // let ip: usertrackInput;
    // if (type == 1)
    //   ip = { menu: TrackMenus.INVENTORY, submenu: subMenus.CATEGORIES, page: pages.CATEGORIESPAGE, function: "", descrption: "Add Category button is clicked" };
    // if (type == 2)
    //   ip = { menu: TrackMenus.INVENTORY, submenu: subMenus.CATEGORIES, page: pages.CATEGORIESPAGE, function: "", descrption: "Edit button is clicked" };
    // if (type == 3)
    //   ip = { menu: TrackMenus.INVENTORY, submenu: subMenus.CATEGORIES, page: pages.CATEGORIESPAGE, function: "", descrption: "Delete button is clicked" };
    // this.appTrackingService.trackUserActivity(ip);
  }
  modalclosed() {
    $("#category-modal").modal("hide");
  }
  openModal() {
    this.isEditTrue = false;
    this.isAddSubcategory = false;
    this.categoryName = "";
    this.categoryDesc = "";
    this.subcategoryName = "";
    $("#category-modal").modal("show");
  }
  saveSelectedCate() {
    let ip = {
      details: this.categoryDesc,
      display: true,
      id: null,
      kartzhubUserId: null,
      name: this.categoryName,
      parentCategory: null,
      parentId: null,
      path: null,
      subCategories: this.subcategory,
    };
    this.categoryService.saveCategory(ip).subscribe((res) => {
      this.getCategories();
      this.toasterService.openToastMessage(
        ToastTypes.success,
        "Category",
        "Created successfully"
      );
    });
  }
  allCategories: any = [];
  getCategories() {
    this.loading = true;
    this.isEditTrue = false;
    this.categoryService.getProductCategories().subscribe((res: any) => {
      if (res.length !== 0) {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.dataSource = new MatTableDataSource([]);
      }
      this.allCategories = res;
      this.loading = false;
    });
  }
  isEditTrue: boolean = false;
  isAddSubcategory: boolean = false;
  selectedCat: any;
  openCategory(category: any) {
    this.isEditTrue = true;
    this.isAddSubcategory = false;
    this.selectedCat = category;
    this.categoryDesc = this.selectedCat.details;
    this.categoryName = this.selectedCat.name;
    // this.subcategoryName = this.selectedCat.subCategories;
    $("#category-modal").modal("show");
  }
  openSubCategory(category: any) {
    this.isEditTrue = false;
    this.isAddSubcategory = true;
    this.selectedCat = category;
    this.categoryDesc = this.selectedCat.details;
    this.categoryName = this.selectedCat.name;
    // this.subcategoryName = this.selectedCat.subCategories;
    $("#category-modal").modal("show");
  }
  updateSelectedCate() {
    console.log(this.subcategoryName);
    this.subcategory.push(this.subcategoryName);
    console.log(this.subcategory);
    let ip = {
      details: this.categoryDesc,
      display: this.selectedCat.kartzhubUserId,
      id: this.selectedCat.id,
      kartzhubUserId: this.selectedCat.kartzhubUserId,
      name: this.categoryName,
      parentCategory: this.selectedCat.parentCategory,
      parentId: this.selectedCat.parentId,
      path: this.selectedCat.path,
      subCategories: this.subcategory,
    };
    this.categoryService.saveCategory(ip).subscribe((res) => {
      this.getCategories();
      this.toasterService.openToastMessage(
        ToastTypes.success,
        "Category",
        "Updated successfully"
      );
    });
  }
  addSubcategory() {
    let ip = {
      details: this.categoryDesc,
      display: this.selectedCat.kartzhubUserId,
      // "id": this.selectedCat.id,
      kartzhubUserId: this.selectedCat.kartzhubUserId,
      name: this.subcategoryName,
      // "parentCategory": this.categoryName,
      parentId: this.selectedCat.id,
      path: this.selectedCat.path,
      subCategories: [],
    };
    this.categoryService.saveCategory(ip).subscribe((res) => {
      this.getCategories();
      this.toasterService.openToastMessage(
        ToastTypes.success,
        "Category",
        "Subcategories added successfully"
      );
    });
  }
  delete(data: any) {
    this.selectedCat = data;
    let ip = {
      details: this.categoryDesc,
      display: this.selectedCat.kartzhubUserId,
      id: this.selectedCat.id,
      kartzhubUserId: this.selectedCat.kartzhubUserId,
      name: this.categoryName,
      parentCategory: this.selectedCat.parentCategory,
      parentId: this.selectedCat.parentId,
      path: this.selectedCat.path,
      subCategories: this.selectedCat.subCategories,
    };
    this.categoryService.delete(this.selectedCat.id).subscribe(
      (res) => {
        this.getCategories();
        this.toasterService.openToastMessage(
          ToastTypes.success,
          "Category",
          "Updated successfully"
        );
      },
      (error) => {
        if (
          error.error.message == "could not execute statement" ||
          error.error.message == "Access denied"
        ) {
          this.toasterService.openToastMessage(
            ToastTypes.warning,
            "Access denied",
            "this category has been associate with the products"
          );
        }
      }
    );
  }
}
