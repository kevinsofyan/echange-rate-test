import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import {CurrencyComponent} from "@app/shared/currency/currency.component";
import { CurrencyService } from './currency/currency.service';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyModalComponent } from './currency/currency-modal/currency-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        NgbModalModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoaderComponent,
        CurrencyComponent,
        CurrencyModalComponent
    ],
    providers: [CurrencyService],
    exports: [
        LoaderComponent,
        CurrencyComponent
    ]
})
export class SharedModule { }
