package pages;
import constants.ForgotPasswordConstants;
import helperFunctions.HelperFunctions;
import org.openqa.selenium.By;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import tests.*;
import org.openqa.selenium.WebElement;

public class ForgotPasswordPage {
    @FindBy(xpath = ForgotPasswordConstants.forgotPasswordPageText)
    private WebElement forgotPasswordText;
    @FindBy(xpath = ForgotPasswordConstants.forgotPasswordPageResetButton)
    private WebElement resetButton;
    @FindBy(xpath = ForgotPasswordConstants.forgotPasswordPageEmailInput)
    private WebElement emailField;

    static ForgotPasswordPage forgotPasswordPage;

    public ForgotPasswordPage() {
        PageFactory.initElements(BasePage.driver, this);
    }

    //Conflict using singleton pattern
    public static ForgotPasswordPage getInstance(){
        HelperFunctions.sleepSpecificTime(2);
        HelperFunctions.waitToElement(BasePage.driver, 5, ForgotPasswordConstants.forgotPasswordPageText);
        if(forgotPasswordPage == null){
            forgotPasswordPage = new ForgotPasswordPage();
        }
        return forgotPasswordPage;
    }

    public WebElement getForgotPasswordText() {
        return forgotPasswordText = BasePage.driver.findElement(By.xpath(ForgotPasswordConstants.forgotPasswordPageText));
    }

    public void setForgotPasswordText(WebElement forgotPasswordText) {
        this.forgotPasswordText = forgotPasswordText;
    }

    public WebElement getResetButton() {
        return resetButton = BasePage.driver.findElement(By.xpath(ForgotPasswordConstants.forgotPasswordPageResetButton));
    }

    public void setResetButton(WebElement resetButton) {
        this.resetButton = resetButton;
    }

    public WebElement getEmailField() {
        return emailField = BasePage.driver.findElement(By.xpath(ForgotPasswordConstants.forgotPasswordPageEmailInput));
    }

    public void setEmailField(WebElement emailField) {
        this.emailField = emailField;
    }

    public <T> T clickResetButton(Class<T> currentClass) {
        getResetButton().click();
        HelperFunctions.sleepSpecificTime(2);
        return HelperFunctions.getInstanceForSpecificClass(currentClass);
    }

    public void fillEmailField(String text) {
        getEmailField().clear();
        emailField.sendKeys(text);
    }

}
