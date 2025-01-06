import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDestroyComponent } from './user-destroy.component';

describe('UserDestroyComponent', () => {
  let component: UserDestroyComponent;
  let fixture: ComponentFixture<UserDestroyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDestroyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDestroyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
