package PageFactory;

import org.openqa.selenium.WebDriver;

import org.openqa.selenium.WebElement;

import org.openqa.selenium.support.FindBy;

import org.openqa.selenium.support.PageFactory;

public class SignUpPage {
	/*
     All WebElements are identified by @FindBy annotation
	*/

	WebDriver driver;

	@FindBy(id="name")
	WebElement name;	
    @FindBy(id="surname")
    WebElement surname;
    @FindBy(id="age")
    WebElement age;
    @FindBy(id="email")
    WebElement email;
    @FindBy(id="gender")
    WebElement gender;
    @FindBy(id="password")
    WebElement password;
    @FindBy(css="button[type=\"submit\"]")
    WebElement btnSignUp;;

    public SignUpPage(WebDriver driver){

        this.driver = driver;

        //This initElements method will create all WebElements

        PageFactory.initElements(driver, this);

    }

    //Set user name in textbox

    public void setUserName(String strUserName){

        name.sendKeys(strUserName);     
    }

    //Set user suname in textbox

    public void setUserSurName(String strUserSurName){

        surname.sendKeys(strUserSurName);     
    }

    //Set user age in textbox

    public void setUserAge(String strUserAge){

        age.sendKeys(strUserAge);     
    }

    //Set user email in textbox

    public void setUserEmail(String strUserEmail){

        email.sendKeys(strUserEmail);     
    }

    //Set user gender in textbox

    public void setUserGender(String strUserGender){

        gender.sendKeys(strUserGender);     
    }

    //Set password in password textbox

    public void setPassword(String strPassword){

    	password.sendKeys(strPassword);

    }

    //Click on sign up button

    public void clickSignUp(){

        btnSignUp.click();

    }  

    //Get the title of signUp Page

    public String getSignUpTitle(){

    	return    driver.getTitle();

    }

    /**

     * This POM method will be exposed in test case to signUp in the application

     * @param strUserName

     * @param strUserSurName

     * @param strUserAge

     * @param strUserEmail

     * @param strUserGender

     * @param strPasword

     * @return

     */

    public void signUpTo(String strUserName, String strUserSurName, String strUserAge , String strUserEmail, String strUserGender, String strPasword){

        //Fill user name

        this.setUserName(strUserName);


        //Fill user surname

        this.setUserSurName(strUserSurName);


        //Fill user age

        this.setUserAge(strUserAge);


        //Fill user email

        this.setUserEmail(strUserEmail);


        //Fill user gender

        this.setUserGender(strUserGender);

        //Fill password

        this.setPassword(strPasword);

        //Click signUp button

        this.clickSignUp();           

    }

}
