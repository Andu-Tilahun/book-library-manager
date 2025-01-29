import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {MENU} from './menu';
import {MenuItem} from '../models/menu.model';
import {User} from '@app/user-management/user/models/user.model';
import {TranslateService} from '@ngx-translate/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements OnInit, OnChanges {
  @Input() isCondensed = false;
  @Output() menuToggleButtonClicked = new EventEmitter();

  countStatus= [];

  userDetails$?: Observable<User>;

  menuItems: MenuItem[] = [];
  menuItemsTranslated: MenuItem[] = [];
  currentMainMenuId:any;
  currentSelectedMenuId:any;
  isMenuOpen = false;
  filteredMenuItems: MenuItem[] = [];
  roleBasedItems : MenuItem[] = []
  isFirstTime:Boolean=true
  menuState: { [key: string]: boolean } = {}; // Tracks open/close state by ID
  searchQuery: string = '';

  constructor(
    private authService: AuthService,
    private translateService: TranslateService, private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  ngOnInit() {
    this.initializeMenuState(this.menuItems);
    this.authService
      .getLoggedInUser()
      .pipe(take(1))
      .subscribe((user: User) => {
        if (this.isFirstTime) {
          if (user.role) {
            const userRoles = user.role;

            for (let menuItem of MENU) {

              if (this.checkRole(userRoles, menuItem)) {
                // If the menu item is accessible, add it to the list
                this.roleBasedItems.push(menuItem);
                this.filteredMenuItems.push(menuItem);

                // Filter sub-menu items recursively
                if (menuItem.subMenuItems) {
                  menuItem.subMenuItems = this.filterSubMenus(userRoles, menuItem.subMenuItems);
                }
              }
            }

            this.menuItems = this.filteredMenuItems;
            // Automatically redirect to the first accessible dashboard link
            this.redirectToDashboard(this.menuItems);
          } else {
            //TODO once all users have a role, the below else case has to be cleared out
            this.menuItems = MENU;
          }

          if (this.menuItems.length > 0) {
            this.currentMainMenuId = this.menuItems[0].id;
          }
          this.isFirstTime = false;
        }
      });
  }

  redirectToDashboard(menuItems: MenuItem[]) {
    for (const menuItem of menuItems) {
      if (menuItem.subMenuItems) {
        for (const subMenuItem of menuItem.subMenuItems) {
          if (subMenuItem.link && subMenuItem.link.includes('dashboard')) {
            this.router.navigate([subMenuItem.link]);
            return; // Redirect to the first dashboard link found
          }
        }
      }
    }
  }

  initializeMenuState(menuItems: MenuItem[]) {
    menuItems.forEach(item => {
      this.menuState[item.id] = false; // Set initial state to collapsed
      if (item.subMenuItems) {
        this.initializeMenuState(item.subMenuItems); // Recursively initialize submenus
      }
    });
  }

// Helper function to check if a menu item should be included based on user roles
  checkRole(userRole: string, menuItem: MenuItem): any {
    return !menuItem.role?.length || (menuItem.role && menuItem.role.some(role => userRole==role));
  }

// Helper function to filter sub-menus recursively
  filterSubMenus(userRoles: string, subMenus: MenuItem[]): MenuItem[] {
    let filteredSubMenus: MenuItem[] = [];

    for (let subMenu of subMenus) {
      if (this.checkRole(userRoles, subMenu)) {
        // If the sub-menu item is accessible, add it to the list
        filteredSubMenus.push(subMenu);

        // Filter its sub-menu items recursively
        if (subMenu.subMenuItems) {
          subMenu.subMenuItems = this.filterSubMenus(userRoles, subMenu.subMenuItems);
        }
      }
    }

    return filteredSubMenus;
  }


  toggleSideMenu(event: any) {
    event.preventDefault();
    this.menuToggleButtonClicked.emit();
  }

  hasItems(item: MenuItem) {
    return item.subMenuItems !== undefined
      ? item.subMenuItems.length > 0
      : false;
  }

  onCollapseChanged(event: any) {
    if (event && !event.isCollapsed) {
      this.currentSelectedMenuId = event.id;
    }
  }

  toggleCollapse(menuItem: MenuItem) {
    this.currentMainMenuId =
      this.currentMainMenuId != menuItem.id ? menuItem.id : NaN;

  }
  // toggleCollapseSubMenu(subMenuItems: any) {
  //   this.currentSelectedMenuId =
  //     this.currentSelectedMenuId != subMenuItems.id ? subMenuItems.id : NaN;
  // }

  toggleCollapseSubMenu(subMenuItem: MenuItem) {
    // Toggle the state of the clicked submenu item
    this.menuState[subMenuItem.id] = !this.menuState[subMenuItem.id];
  }

  // @ts-ignore
  search(){
    const filteredMenu = MENU.filter(item => {
      return this.roleBasedItems.some(a2Item => a2Item.id === item.id);
    });
    const filteredMenu2 = MENU.filter(item => {
      return this.roleBasedItems.some(a2Item => a2Item.id === item.id);
    });
    if(this.searchQuery==null || this.searchQuery==''){

      this.menuItems=filteredMenu2;
      return;
    }
    console.log(this.roleBasedItems)
    const searchTerms: string[] = this.searchQuery.toLowerCase().split(" ");
    console.log(searchTerms)
    const filteredMenuItems: MenuItem[] = filteredMenu.filter(item => {
      const translatedLabel = this.translateService.instant(item.label).toLowerCase();
      // Check if any search term is found in the translated label
      return searchTerms.every(term => translatedLabel.includes(term));
    });

    const filteredSubMenuItems: MenuItem[] = [];
    filteredMenu.forEach(menuItem => {
      if(menuItem.subMenuItems){
        const filteredSubItems = menuItem.subMenuItems.filter(subItem => {
          const translatedSubLabel = this.translateService.instant(subItem.label).toLowerCase();
          // console.log(translatedSubLabel)
          // Check if any search term is found in the translated sub label
          return searchTerms.every(term => translatedSubLabel.includes(term));
        });
        filteredSubMenuItems.push(...filteredSubItems);
      }

    });

    this.menuItems = filteredMenuItems.concat(filteredSubMenuItems)

  }

  getKey(item: any): string {
    return Object.keys(item)[0];
  }
  getItem(item: any): string {
    return item[Object.keys(item)[0]];
  }
  // getCount(serviceName: any, status: any): any {
  //   if (serviceName !== undefined && status !== undefined) {
  //     // console.log("------------------",status)
  //     if (status == 'HISTORY'){
  //       this.authService
  //         .getLoggedInUser()
  //         .pipe(take(1))
  //         .subscribe((user: User) => {
  //           // console.log("------------------",user.role)
  //         })
  //     }
  //     return this.statusService.fetchStatusServiceName(serviceName, status).subscribe(
  //       (count: number) => {
  //         const countValue = { [status]: count };
  //         // Check if countValue already exists in this.countStatus
  //         const exists = this.countStatus.some(item => JSON.stringify(item) === JSON.stringify(countValue));
  //
  //         if (!exists) {
  //           // @ts-ignore
  //           this.countStatus.push(countValue);
  //         }
  //
  //       },
  //       (error: any) => {
  //         console.error(error);
  //         // Handle errors if needed
  //       }
  //     );
  //   }
  // }
}
