import { Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { ChatComponent } from './components/chat/chat.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signin', component: SigninComponent },
    { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
];
