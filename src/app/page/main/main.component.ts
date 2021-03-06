import {Component, OnInit} from '@angular/core';
import {DeckPublic} from '../../dto/DeckDTO/public.deck.DTO';
import {DeckService} from './search/deck.service';
import {LogoutService} from '../logout/logout.service';
import {Router} from '@angular/router';
import {MainService} from './main.service';
import {UserDetailsDto} from '../../dto/UserDetailsDto';
import {CourseService} from './search/course.service';
import {CategoriesPublic} from '../../dto/CategoryDTO/public.categories';
import {CategoryService} from './search/category.service';
import {AdminGuardService} from '../admin/admin.main.guard.service';
import {CourseLink} from '../../dto/CourseDTO/link.course.DTO';

@Component({
  selector: 'app-page',
  templateUrl: ('./main.component.html'),
  styleUrls: ['./main.css', './dropdown.css']
})

export class MainComponent implements OnInit {
  public categories: CategoriesPublic[];
  public courses: CourseLink[];
  public decks: DeckPublic[];
  public listFilter: string;
  public isAuthorized: boolean;
  public isAuthorizedAdmin: boolean;
  public userDetails: UserDetailsDto;
  public showSearchResult: boolean;

  constructor(private categoryService: CategoryService,
              private courseService: CourseService,
              private deckService: DeckService,
              private logoutService: LogoutService,
              private router: Router,
              private mainService: MainService,
              private adminGuard: AdminGuardService) {
  }

  ngOnInit(): void {
    this.isAuthorized = this.logoutService.isAuthorized();
    if (this.isAuthorized) {
      this.mainService.getUserDetails()
        .subscribe(user => {
          this.userDetails = user;
          this.isAuthorizedAdmin = user.authorities.includes('ROLE_ADMIN');
          this.setAdmin();
        });
    }
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
    this.courseService.getCourses().subscribe(courses => this.courses = courses);
    this.deckService.getDecks().subscribe(decks => this.decks = decks);
  }

  logoutUser() {
    if (this.logoutService.logout()) {
      this.isAuthorized = false;
      this.isAuthorizedAdmin = false;
      this.router.navigate(['main']);
    }
  }

  setAdmin(): void {
    this.adminGuard.isAdmin = this.isAuthorizedAdmin;
  }
}
