package pages;
import constants.ForgotPasswordConstants;
import helperFunctions.HelperFunctions;
import org.openqa.selenium.By;
import tests.*;
import org.openqa.selenium.WebElement;

public class ForgotPasswordPage {
    private WebElement forgotPasswordText;
    private WebElement resetButton;
    private WebElement emailField;
    static ForgotPasswordPage forgotPasswordPage;

    public ForgotPasswordPage() {
        forgotPasswordText = BasePage.driver.findElement(By.xpath(ForgotPasswordConstants.forgotPasswordPageText));
        emailField = BasePage.driver.findElement(By.xpath(ForgotPasswordConstants.forgotPasswordPageEmailInput));
        resetButton = BasePage.driver.findElement(By.xpath(ForgotPasswordConstants.forgotPasswordPageResetButton));
    }

    public static ForgotPasswordPage getInstance(){
        HelperFunctions.sleepSpecificTime(2);
        HelperFunctions.waitToElement(BasePage.driver, 5, ForgotPasswordConstants.forgotPasswordPageText);
        if(forgotPasswordPage == null){
            forgotPasswordPage = new ForgotPasswordPage();
        }
        return forgotPasswordPage;
    }

    public WebElement getForgotPasswordText() {
        return forgotPasswordText;
    }

    public void setForgotPasswordText(WebElement forgotPasswordText) {
        this.forgotPasswordText = forgotPasswordText;
    }

    public WebElement getResetButton() {
        return resetButton;
    }

    public void setResetButton(WebElement resetButton) {
        this.resetButton = resetButton;
    }

    public WebElement getEmailField() {
        return emailField;
    }

    public void setEmailField(WebElement emailField) {
        this.emailField = emailField;
    }

    public <T> T clickResetButton(Class<T> currentClass) {
        resetButton.click();
        HelperFunctions.sleepSpecificTime(2);
        return HelperFunctions.getInstanceForSpecificClass(currentClass);
    }

    public void fillEmailField(String text) {
        emailField.clear();
        emailField.sendKeys(text);
    }

}
