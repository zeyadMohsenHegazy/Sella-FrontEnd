import { FormGroup } from "@angular/forms";

export function ConfirmPasswordValidator(ControlName : string ,MatchControlName : string){
    return(formGroup:FormGroup) =>{
        const PasswordControl = formGroup.controls[ControlName];
        const ConfirmPasswordControl = formGroup.controls[MatchControlName];
        if(ConfirmPasswordControl.errors && ConfirmPasswordControl.errors['confirmPasswordValidator']){
            return;
        }
        if(PasswordControl.value !== ConfirmPasswordControl.value){
            ConfirmPasswordControl.setErrors({confirmPasswordValidator : true})
        }else{
            ConfirmPasswordControl.setErrors(null);
        }
    }
}