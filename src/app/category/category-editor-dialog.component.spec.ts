import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEditorDialogComponent } from './category-editor-dialog.component';

describe('CategoryEditorDialogComponent', () => {
  let component: CategoryEditorDialogComponent;
  let fixture: ComponentFixture<CategoryEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryEditorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
