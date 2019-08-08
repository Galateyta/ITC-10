package pages;
import constants.SignInConstant;
import helperFunctions.HelperFunctions;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import tests.*;


import org.openqa.selenium.WebElement;

public class SignInPage {
    @FindBy(xpath = SignInConstant.signInText)
    private  WebElement signInText;
    @FindBy(xpath = SignInConstant.forgotPasswordButton)
    private WebElement forgotPasswordButton;
    @FindBy(xpath = SignInConstant.password)
    private WebElement password;

    private static SignInPage pageInstance;

    public SignInPage(){
        PageFactory.initElements(BasePage.driver, this);
    }

    //Conflict using singleton pattern
    public static SignInPage getInstance() {
        HelperFunctions.sleepSpecificTime(2);
        HelperFunctions.waitToElement(BasePage.driver, 7, SignInConstant.signInText);
        if (pageInstance == null) {
            pageInstance = new SignInPage();
        }
        return pageInstance;
    }

    public WebElement getSignInText() {
        return signInText;
    }

    public void setSignInText(WebElement signInText) {
        this.signInText = signInText;
    }

    public WebElement getForgotPasswordButton() {
        return forgotPasswordButton;
    }

    public void setForgotPasswordButton(WebElement forgotPasswordButton) {
        this.forgotPasswordButton = forgotPasswordButton;
    }

    public WebElement getPassword() {
        return password;
    }

    public void setPassword(WebElement password) {
        this.password = password;
    }

    public ForgotPasswordPage clickForgotPasswordButton(){
        getForgotPasswordButton().click();
        return ForgotPasswordPage.getInstance();
    }
}
