import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class SigninComponent {
    loginForm: FormGroup;
    error: string = '';
    loading = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            rememberMe: [false], // Add remember me checkbox with default false
        });
    }

    onSubmit() {
        this.error = '';
        this.loading = true;

        if (this.loginForm.valid) {
            const { email, password, rememberMe } = this.loginForm.value;
            this.authService
                .login(email, password, rememberMe)
                .then(() => {
                    this.loading = false;
                    this.router.navigate(['/chat']);
                })
                .catch((error) => {
                    this.loading = false;
                    this.error = error.message;
                });
        }
    }
}
