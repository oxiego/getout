import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditorDialogComponent } from './item-editor-dialog.component';

describe('ItemEditorDialogComponent', () => {
  let component: ItemEditorDialogComponent;
  let fixture: ComponentFixture<ItemEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemEditorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
