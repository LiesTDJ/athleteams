import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-authentificator',
  templateUrl: './authentificator.component.html',
  styleUrls: ['./authentificator.component.css']
})
export class AuthentificatorComponent implements OnInit {
  state = AuthentificatorCompState.LOGIN;
  firebasetsAuth: FirebaseTSAuth;
  constructor(private bottomSheetRef: MatBottomSheetRef) {
    this.firebasetsAuth = new FirebaseTSAuth();
  }

  ngOnInit(): void {
  }
  
  onResetClick(
    resetEmail: HTMLInputElement
  ) {
    let email = resetEmail.value;
    if (this.isNotEmpty(email)) {
      this.firebasetsAuth.sendPasswordResetEmail(
        {
          email: email,
          onComplete: (err) => {
            this.bottomSheetRef.dismiss();
          }
        }
      );
    }
  } 

  onLogin(
    loginEmail: HTMLInputElement,
    loginPassword: HTMLInputElement
  ) {
    let email = loginEmail.value;
    let password = loginPassword.value;

    if(this.isNotEmpty(email) && this.isNotEmpty(password)) {
      this.firebasetsAuth.signInWith(
        {
          email: email,
          password: password,
          onComplete: (uc) => {
            this.bottomSheetRef.dismiss();
          },
          onFail: (err) => {
            alert(err);
          },
        }
      )
    }

  }

  onRegisterClick(
    registerEmail: HTMLInputElement,
    registerPassword: HTMLInputElement,
    registerConfirmationPassword: HTMLInputElement,
  ) {
    console.log('onRegisterClick');
    let email = registerEmail.value;
    let password = registerPassword.value;
    let confirmPassword = registerConfirmationPassword.value;

    if (
      this.isNotEmpty(email) &&
      this.isNotEmpty(password) &&
      this.isNotEmpty(confirmPassword) &&
      this.isAMatch(password, confirmPassword)
    ) {
      this.firebasetsAuth.createAccountWith(
        {
          email: email,
          password: password,
          onComplete: (uc) => {
            this.bottomSheetRef.dismiss();

          },
          onFail: (err) => {
            alert("Echec de la création de compte")
          }
        }
      );
    }
  }

  isNotEmpty(text: string) {
    return text != null && text.length > 0;
  }

  isAMatch(text: string, comparedWith: string) {
    return text == comparedWith;
  }

  passwordClick() {
    this.state = AuthentificatorCompState.PASSWORD;
  }
  
  newMemberClick() {
    this.state = AuthentificatorCompState.NEW;
  }
  
  ConnectClick() {
    this.state = AuthentificatorCompState.LOGIN;

  }

  isLoginState() {
    return this.state == AuthentificatorCompState.LOGIN;
  }
  
  isNewState() {
    return this.state == AuthentificatorCompState.NEW;
  }
  
  isPasswordState() {
    return this.state == AuthentificatorCompState.PASSWORD;
  }

  stateText() {
    switch (this.state) {
      case AuthentificatorCompState.LOGIN:
        return "Se connecter";
        break;
      case AuthentificatorCompState.NEW:
        return "Créez un compte";
        break;
      case AuthentificatorCompState.PASSWORD:
        return "Mot de passe oublié";
        break;
    }
  }

}

export enum AuthentificatorCompState {
  LOGIN,
  NEW,
  PASSWORD
}