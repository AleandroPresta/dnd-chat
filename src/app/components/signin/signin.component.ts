import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
            this.authService
                .login(email, password)
                .then(() => {
                    this.loading = false;
                    this.authenticated.emit();
                })
                .catch((error) => {
                    this.loading = false;
                    this.error = error.message;
                });
        }
    }
}
