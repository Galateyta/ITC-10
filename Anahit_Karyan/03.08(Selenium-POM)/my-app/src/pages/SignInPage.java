package PageFactory;

import org.openqa.selenium.WebDriver;

import org.openqa.selenium.WebElement;

import org.openqa.selenium.support.FindBy;

import org.openqa.selenium.support.PageFactory;

public class SignInPage {
	/*
     All WebElements are identified by @FindBy annotation
	*/

	WebDriver driver;

	@FindBy(id="name")
	WebElement name;	
    @FindBy(id="password")
    WebElement password;
    @FindBy(css="button[type=\"submit\"]")
    WebElement btnSignIn;;

    public SignInPage(WebDriver driver){

        this.driver = driver;

        //This initElements method will create all WebElements

        PageFactory.initElements(driver, this);

    }

    //Set user name in textbox

    public void setUserName(String strUserName){

        name.sendKeys(strUserName);     
    }


    //Set password in password textbox

    public void setPassword(String strPassword){

    	password.sendKeys(strPassword);

    }

    //Click on sign up button

    public void clickSignIn(){

        btnSignIn.click();

    }  

    //Get the title of signIn Page

    public String getSignUpTitle(){

    	return    driver.getTitle();

    }

    /**

     * This POM method will be exposed in test case to signIn in the application

     * @param strUserName

     * @param strPasword

     * @return

     */

    public void signInTo(String strUserName, String strPasword){

        //Fill user name

        this.setUserName(strUserName);


        //Fill user surname

        //Fill password

        this.setPassword(strPasword);

        //Click signIn button

        this.clickSignIn();           

    }

}
