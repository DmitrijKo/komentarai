import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { KomentaraiService } from '../komentarai.service';
import { Komentaras } from '../komentaras.model';

@Component({
  selector: 'app-komentarai',
  templateUrl: './komentarai.component.html',
  styleUrls: ['./komentarai.component.css'],
})
export class KomentaraiComponent implements OnInit, OnDestroy {

  public komentarai: Komentaras[] = [];
  loading: boolean = false;
  error: string;
  errorSubscription: Subscription;
  @ViewChild ('email', {static: true}) email: ElementRef;
  @ViewChild ('text', {static: true}) text: ElementRef;

  constructor(private komentaraiService: KomentaraiService) {}

  ngOnInit(): void {
    this.errorSubscription = this.komentaraiService.error.subscribe((error) => {
      this.error = error;
    });
    this.loadKomentarai();
  }

  send(email: string, text: string) {
    this.komentaraiService.postKomentaras(email, text).subscribe(
      () => {
        this.loadKomentarai();
      },
      (error) => {
        this.error = error.message;
      }
    );
    this.email.nativeElement.value="";
    this.text.nativeElement.value="";
  }

  loadKomentarai() {
    this.loading = true;
    this.komentaraiService.getKomentarai().subscribe(
      (data) => {
        this.komentarai = data;
        this.loading = false;
      },
      (error) => {
        this.error = error.message;
      }
    );
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
}
