import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KomentaraiComponent } from './komentarai.component';

describe('KomentaraiComponent', () => {
  let component: KomentaraiComponent;
  let fixture: ComponentFixture<KomentaraiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KomentaraiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KomentaraiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
