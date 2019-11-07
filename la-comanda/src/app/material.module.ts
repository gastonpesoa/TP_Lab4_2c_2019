import { NgModule } from '@angular/core'
import {
    MatButtonModule,
    MatSliderModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSelectModule,
    MatMenuModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatRadioModule
} from '@angular/material'

const MaterialComponents = [
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    MatSliderModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatMenuModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatRadioModule
]

@NgModule({
    imports: [MaterialComponents],
    exports: [MaterialComponents]
})
export class MaterialModule { }