import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class AuthComponent {
    loginForm: FormGroup;
    error: string = '';
    loading = false;

    @Output() authenticated = new EventEmitter<void>();

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    onSubmit() {
        this.error = '';
        this.loading = true;

        if (this.loginForm.valid) {
            const { email, password } = this.loginForm.value;
            this.authService.login(email, password).subscribe({
                next: () => {
                    this.loading = false;
                    this.authenticated.emit();
                },
                error: (error) => {
                    this.error =
                        error.error?.message ||
                        'Login failed. Please try again.';
                    this.loading = false;
                },
            });
        }
    }
}
