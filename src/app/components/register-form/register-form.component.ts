import { Component, OnInit } from '@angular/core';
import { TalkWithApiService } from 'src/app/services/talk-with-api.service';
import { USER } from '../../USER';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  userName: string = "";
  email: string = "";
  dateOfBirth: string = "";
  password: string = "";
  reEnteredPassword: string = "";
  errorMessage: string = "";
  birthday: string = "";

  showOrHidePassword: string = "hide";
  showOrHideConfirmPassword: string = "hide";
  suggestionForPassword: string = "You should use Lower case Letters, Upper case Letters, Symbols, Digits to make your password secure";

  userNameErrMsg: string = "";
  emailErrMsg: string = "";
  dobErrMsg: string = "";
  passwordErrMsg: string = "";
  rePasswordErrMsg: string = "";
  passwordStrengthMsg: string = "";

  colorShadesForPasswordMsg: string = "#FF4949";

  constructor( private api: TalkWithApiService ) { }

  ngOnInit(): void {
  }

  togglePasswordVisibility() {
    const passwordElement: any = document.getElementById("password");
    if (this.showOrHidePassword === "hide") {
      this.showOrHidePassword = "show"
      passwordElement.type="text";
    } else if (this.showOrHidePassword === "show") {
      this.showOrHidePassword = "hide"
      passwordElement.type="password";
    }
  }

  toggleConfirmPasswordVisibility() {
    const passwordElement: any = document.getElementById("reEnteredPassword");
    if (this.showOrHideConfirmPassword === "hide") {
      this.showOrHideConfirmPassword = "show"
      passwordElement.type="text";
    } else if (this.showOrHideConfirmPassword === "show") {
      this.showOrHideConfirmPassword = "hide"
      passwordElement.type="password";
    }
  }

  getDate(date: string) {
    const a: string[] = date.split("-")
    return new Date(parseInt(a[0]), parseInt(a[1]), parseInt(a[2]));
  }

  removeErrorBox() {
    this.errorMessage = ""
  }

  validateUsername(showErrorBoxOrNot: boolean) {
    this.userName = this.userName.trim()
    if (!this.userName) {
      if (showErrorBoxOrNot) {
        this.errorMessage = "Username can not be empty"
      }
      return false
    }
    if (showErrorBoxOrNot) {
      this.removeErrorBox()
    }
    return true
  }

  validateEmail(showErrorBoxOrNot: boolean) {
    this.email = this.email.trim()
    if (!this.email) {
      if (showErrorBoxOrNot) {
        this.errorMessage = "Email must be filled up"
      }
      return false
    }
    const mailFormat: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(:\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    if (this.email.match(mailFormat)) {
      this.removeErrorBox()
      return true
    }
    if (showErrorBoxOrNot) {
      this.errorMessage = "Please provide a valid email"
    }
    return false
  }

  getBirthDay(dob: Date) {
    return dob.getFullYear().toString() + "-" + dob.getMonth().toString() + "-" + dob.getDate().toString()
  }

  validateAge(showErrorBoxOrNot: boolean) {
    if (!this.dateOfBirth) {
      if (showErrorBoxOrNot) {
        this.errorMessage = "Date Of Birth Not Selected"
      }
      return false
    }
    const dob: Date = this.getDate(this.dateOfBirth)
    const today: Date = new Date()
    const yearsLived: number = (today.getFullYear() - dob.getFullYear())
    if (yearsLived > 18) {
      this.removeErrorBox()
      this.birthday = this.getBirthDay(dob)
      return true
    } else if (yearsLived == 18) {
      if (today.getMonth() > dob.getMonth()) {
        this.removeErrorBox()
        this.birthday = this.getBirthDay(dob)
        return true
      } else if (today.getMonth() == dob.getMonth()) {
        if (today.getDate() >= dob.getDate()) {
          this.removeErrorBox()
          this.birthday = this.getBirthDay(dob)
          return true
        }
      }
    }
    if (showErrorBoxOrNot) {
      this.errorMessage = "You are not 18 yet."
    }
    return false
  }

  commentOnPasswordStrength(strength: number) {
    let comment: string = ""
    if (strength < 1) {
      comment = "Very Weak Password."
      this.colorShadesForPasswordMsg = "#FF4949"
    } else if (strength == 1) {
      comment = "Weak Password."
      this.colorShadesForPasswordMsg = "#FF4949"
    } else if (strength == 2) {
      comment = "Medium Password."
      this.colorShadesForPasswordMsg = "#FFCD38"
    } else if (strength == 3) {
      comment = "Good Password."
      this.colorShadesForPasswordMsg = "#FFCD38"
    } else if (strength == 4) {
      comment = "Strong Password."
      this.colorShadesForPasswordMsg = "#36AE7C"
    } else if (strength == 5) {
      comment = "Very Strong Password."
      this.colorShadesForPasswordMsg = "#764AF1"
    } else {
      comment = "Ultra Strong Password."
      this.colorShadesForPasswordMsg = "#333C83"
    }
    return comment;
  }

  checkStrengthOfPass(pass: string) {
    let strength: number = 0;
    pass = pass.trim();
    if (pass.length < 8) {
      strength = 0;
    } else {
      let lowercase: boolean = false;
      //  -> 1
      let uppercase: boolean = false;
      //  -> 2
      let numbers: boolean = false;
      //  -> 3
      let symbols: boolean = false;
      //  -> 4
      let spaces: boolean = false;
      //  -> 5
      const charactaristicsArray: number[] = [];
      for (let i: number = 0; i < pass.length; i++) {
        if (pass[i] >= 'a' && pass[i] <= 'z') {
          lowercase = true;
          charactaristicsArray.push(1);
        } else if (pass[i] >= 'A' && pass[i] <= 'Z') {
          charactaristicsArray.push(2);
          uppercase = true;
        } else if (pass[i] >= '0' && pass[i] <= '9') {
          charactaristicsArray.push(3);
          numbers = true;
        } else if (pass[i] == ' ') {
          charactaristicsArray.push(5);
          spaces = true;
        } else {
          charactaristicsArray.push(4);
          symbols = true;
        }
      }

      if (lowercase) {
        strength += 1;
      }
      if (uppercase) {
        strength += 1;
      }
      if (spaces) {
        strength += 1;
      }
      if (symbols) {
        strength += 1;
      }
      if (numbers) {
        strength += 1;
      }

      if (pass.length > 15) {
        strength += 1;
      }

      if (strength == 1 && symbols) {
        strength += 1;
      }

    }
    return strength;
  }

  validatePassword(showErrorBoxOrNot: boolean) {
    this.password = this.password.trim()
    if (!this.password) {
      if (showErrorBoxOrNot) {
        this.errorMessage = "Password Not Entered"
      }
      return false;
    }
    const strengthOfPassword: number = this.checkStrengthOfPass(this.password)
    this.passwordStrengthMsg = this.commentOnPasswordStrength(strengthOfPassword)
    if (strengthOfPassword < 1) {
      if (showErrorBoxOrNot) {
        this.errorMessage = "Password Not Strong Enough. Please Give A Stronger One"
      }
      return false;
    } else {
      return true;
    }
    return false;
  }

  validateConfirmPassword(showErrorBoxOrNot: boolean) {
    this.reEnteredPassword = this.reEnteredPassword.trim()
    if (this.reEnteredPassword === this.password) {
      this.removeErrorBox()
      return true
    } else {
      if (showErrorBoxOrNot) {
        this.errorMessage = "The Passwords Doesn't Match"
      }
      return false
    }
  }

  userNameOnBlur() {
    if (!this.validateUsername(false)) {
      this.userNameErrMsg = "Username not filled properly"
    } else {
      this.userNameErrMsg = ""
    }
  }

  emailOnBlur() {
    if (!this.validateEmail(false)) {
      this.emailErrMsg = "Email not filled properly"
    } else {
      this.emailErrMsg = ""
    }
  }

  dobOnBlur() {
    if (!this.validateAge(false)) {
      this.dobErrMsg = "Age not 18+"
    } else {
      this.dobErrMsg = ""
    }
  }

  passwordOnBlur() {
    if (!this.validatePassword(false)) {
      this.passwordErrMsg = "Password not filled properly. " + this.suggestionForPassword
    } else {
      this.passwordErrMsg = this.passwordStrengthMsg
    }
  }


  onSubmit() {
    if (this.validateUsername(true)) {
      if (this.validateEmail(true)) {
        if (this.validateAge(true)) {
          if (this.validatePassword(true)) {
            if (this.validateConfirmPassword(true)) {
              const newUserToRegister: USER = {
                "username": this.userName,
                "email": this.email,
                "birthday": this.birthday,
                "password": this.password,
                "confirmPassword": this.reEnteredPassword
              }
              // console.log(newUserToRegister)
              const res = this.api.registerUser(newUserToRegister).subscribe(data => {
                console.log(data)
              }, error => {
                console.log(error)
              })
            }
          }
        }
      }
    }
  }
}
