package tests;

import constants.*;
import helperFunctions.HelperFunctions;
import org.openqa.selenium.*;
import org.testng.Assert;
import org.testng.annotations.*;
import pages.ForgotPasswordPage;
import pages.SignInPage;

public class ForgotPasswordPageTests extends BasePage {
    private ForgotPasswordPage pageInstance;

    @BeforeMethod
    public void createWebDriver() {
        try {
            pageInstance.getForgotPasswordText().click();
        } catch (Exception e) {
            pageInstance = SignInPage.getInstance().clickForgotPasswordButton();
            HelperFunctions.sleepSpecificTime(3);

        }
    }

    @AfterSuite
    public void quitDriver() {
        BasePage.driver.quit();
    }

    //verify page text is display in the forgot password page
    @Test
    public void verifyForgotPasswordPageText(){
        Assert.assertEquals(pageInstance.getForgotPasswordText().getText(), "Forgot password", "Not equals");
    }

    //verify reset button is display in the forgot password page
    @Test
    public void verifyForgotPasswordPageResetButton(){
        Assert.assertTrue(pageInstance.getResetButton().isDisplayed(), "Reset button does not exists");
    }

    //verify email field is display in the forgot password page
    @Test
    public void verifyForgotPasswordPageEmailField(){
        Assert.assertTrue(pageInstance.getEmailField().isDisplayed(), "Email field does not exists");
    }

    //verify correct format but invalid email address functionality
    @Test
    public void verifyInvalidEmailAddressFunctionality() {
        pageInstance.fillEmailField(ForgotPasswordConstants.incorrectEmailAddres);
        try {
            pageInstance.clickResetButton(ForgotPasswordPage.class);
        } catch (UnhandledAlertException f) {
            try {
                Alert alert = BasePage.driver.switchTo().alert();
                alert.accept();
            } catch (NoAlertPresentException e) {
                e.printStackTrace();
            }
        }
        Assert.assertTrue(pageInstance.getForgotPasswordText().isDisplayed(), "Page change after inputing invalid email address!!!");
    }

    // verifyI incorrect format email address functionality
    @Test
    public void verifyIncorrectEmailAddressFunctionality() {
        pageInstance.fillEmailField(ForgotPasswordConstants.incorrectFormatEmailAddres);
        try {
            pageInstance.clickResetButton(ForgotPasswordPage.class);
        } catch (UnhandledAlertException f) {
            try {
                Alert alert = BasePage.driver.switchTo().alert();
                alert.accept();
            } catch (NoAlertPresentException e) {
                e.printStackTrace();
            }
        }
        Assert.assertTrue(pageInstance.getForgotPasswordText().isDisplayed(), "Page change after inputing invalid email address!!!");
    }

    //verify valid email address functionality
    @Test
    public void verifyValidEmailAddressFunctionality() {
        pageInstance.fillEmailField(ForgotPasswordConstants.correctEmailAddres);
        SignInPage signInPage = null;
        try {
            signInPage = pageInstance.clickResetButton(SignInPage.class);
            Assert.assertTrue(signInPage.getSignInText().isDisplayed(), "Sign up page does not appeared");

        } catch (UnhandledAlertException f) {
            try {
                Alert alert = BasePage.driver.switchTo().alert();
                String alertText = alert.getText();
                System.out.println("Alert data: " + alertText);
                alert.accept();
            } catch (NoAlertPresentException e) {
                e.printStackTrace();
            }
        }
    }
}
