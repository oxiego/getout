import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacklistOpenDialogComponent } from './packlist-open-dialog.component';

describe('PacklistOpenDialogComponent', () => {
  let component: PacklistOpenDialogComponent;
  let fixture: ComponentFixture<PacklistOpenDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacklistOpenDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacklistOpenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
