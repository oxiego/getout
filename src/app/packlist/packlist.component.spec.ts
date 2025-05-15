import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacklistComponent } from './packlist.component';

describe('PacklistComponent', () => {
  let component: PacklistComponent;
  let fixture: ComponentFixture<PacklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacklistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
