import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./components/auth/login/login.component";
import { RegisterComponent } from "./components/auth/register/register.component";
import { FormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/templates/header/header.component";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
    ],
    imports: [
        BrowserModule,
        HttpClient,
        RouterModule,
        FormsModule,
        CommonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}