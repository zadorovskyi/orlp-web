import { OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SignupService } from "./signup.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { User } from "./User";
export declare class SignUpComponent implements OnInit {
    private router;
    private signupService;
    private formBuilder;
    userForm: FormGroup;
    user: User;
    errorMessage: String;
    success: boolean;
    error: boolean;
    errorEmailExists: boolean;
    constructor(router: Router, signupService: SignupService, formBuilder: FormBuilder);
    ngOnInit(): void;
    register(): void;
    transferingDataFromFormToUserObj(): void;
    private processError(response);
}