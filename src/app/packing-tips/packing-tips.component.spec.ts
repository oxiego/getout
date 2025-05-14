import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingTipsComponent } from './packing-tips.component';

describe('PackingTipsComponent', () => {
  let component: PackingTipsComponent;
  let fixture: ComponentFixture<PackingTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackingTipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackingTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
