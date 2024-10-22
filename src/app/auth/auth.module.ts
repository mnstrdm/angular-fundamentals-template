import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SessionStorageService } from "./services/session-storage.service";
import { AuthService } from "./services/auth.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { windowProvider } from "./services/window.provider";
import { RouterModule } from "@angular/router";
import { TokenInterceptor } from "./interceptors/token.interceptor";

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [
    SessionStorageService,
    AuthService,
    windowProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
