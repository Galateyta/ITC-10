package com.itc;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;

import java.io.IOException;
import java.io.*;

public class Tester {
    private WebDriver driver;

    private void waitForAlert(WebDriver driver) {
        int i = 0;
        while (i++ < 5) {
            try {
                driver.switchTo().alert();
                break;
            } catch (NoAlertPresentException e) {
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException ex) {
                    ex.printStackTrace();
                }
            }
        }
    }

    public void executeCommand(String command) {
        String s;

        try {
            Process p = Runtime.getRuntime().exec(command);

            BufferedReader stdInput = new BufferedReader(new
                    InputStreamReader(p.getInputStream()));

            BufferedReader stdError = new BufferedReader(new
                    InputStreamReader(p.getErrorStream()));

            // read the output from the command
            System.out.println("Here is the standard output of the command:\n");
            while ((s = stdInput.readLine()) != null) {
                System.out.println(s);
            }

            // read any errors from the attempted command
            System.out.println("Here is the standard error of the command (if any):\n");
            while ((s = stdError.readLine()) != null) {
                System.out.println(s);
            }

            System.exit(0);
        } catch (IOException e) {
            System.out.println("exception happened - here's what I know: ");
            e.printStackTrace();
            System.exit(-1);
        }
    }

    @BeforeSuite
    public void runServers() {
        // TODO: Fix executeCommand to run servers before tests

//        executeCommand("node \"E:\\Instigate ITC\\Auth-Microservice-master\"");
//        executeCommand("npm start --prefix \"E:\\Instigate ITC\\Auth-Microservice-master\\reactaplication\\package.json\"");
    }

    @BeforeClass
    public void initWebDriver() {
        System.setProperty("webdriver.chrome.driver", "src/main/resources/chromedriver.exe");
        driver = new ChromeDriver();
    }

    @Test
    public void checkPageTitle() {
        driver.get("http://localhost:3000/");

        final String expected = "React App";
        final String title = driver.getTitle();

        Assert.assertEquals(title, expected, "Title assertion is failed!");
    }

    @Test
    public void checkSignUp() {
        final String name = "Tigran";
        final String surname = "Nalbandyan";
        final String age = "20";
        final String email = "tigran.nalbandyan03@gmail.com";
        final String password = "Tigrantest12";

        final String buttonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div[3]/div[1]/a/button";
        final String nameInputXPath = "//input[@id=\"name\"]";
        final String surnameInputXPath = "//input[@id=\"surname\"]";
        final String ageInputXPath = "//input[@id=\"age\"]";
        final String emailInputXPath = "//input[@id=\"email\"]";
        final String genderButtonXPath = "//*[@id=\"gender\"][@value=\"male\"]";
        final String passwordInputXPath = "//input[@id=\"password\"]";
        final String submitButtonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div/div[8]/button";

        driver.get("http://localhost:3000/");

        final WebElement button = driver.findElement(By.xpath(buttonXPath));
        button.click();
        driver.findElement(By.xpath(nameInputXPath)).sendKeys(name);
        driver.findElement(By.xpath(surnameInputXPath)).sendKeys(surname);
        driver.findElement(By.xpath(ageInputXPath)).sendKeys(age);
        driver.findElement(By.xpath(emailInputXPath)).sendKeys(email);
        driver.findElement(By.xpath(genderButtonXPath)).click();
        driver.findElement(By.xpath(passwordInputXPath)).sendKeys(password);

        driver.findElement(By.xpath(submitButtonXPath)).click();

        final String expectedUrl = "http://localhost:3000/";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Sign up with correct data is failed!");
    }

    @Test
    public void checkSignUpNameAbsent() {
        final String name = "";
        final String surname = "Nalbandyan";
        final String age = "20";
        final String email = "tigran.nalbandyan03@gmail.com";
        final String password = "Tigrantest12";

        final String buttonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div[3]/div[1]/a/button";
        final String nameInputXPath = "//input[@id=\"name\"]";
        final String surnameInputXPath = "//input[@id=\"surname\"]";
        final String ageInputXPath = "//input[@id=\"age\"]";
        final String emailInputXPath = "//input[@id=\"email\"]";
        final String genderButtonXPath = "//*[@id=\"gender\"][@value=\"male\"]";
        final String passwordInputXPath = "//input[@id=\"password\"]";
        final String submitButtonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div/div[8]/button";

        driver.get("http://localhost:3000/");

        final WebElement button = driver.findElement(By.xpath(buttonXPath));
        button.click();
        driver.findElement(By.xpath(nameInputXPath)).sendKeys(name);
        driver.findElement(By.xpath(surnameInputXPath)).sendKeys(surname);
        driver.findElement(By.xpath(ageInputXPath)).sendKeys(age);
        driver.findElement(By.xpath(emailInputXPath)).sendKeys(email);
        driver.findElement(By.xpath(genderButtonXPath)).click();
        driver.findElement(By.xpath(passwordInputXPath)).sendKeys(password);

        driver.findElement(By.xpath(submitButtonXPath)).click();

        final String expectedUrl = "http://localhost:3000/registry";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Signed up without name!");
    }

    @Test
    public void checkSignUpSurnameAbsent() {
        final String name = "Tigran";
        final String surname = "";
        final String age = "20";
        final String email = "tigran.nalbandyan03@gmail.com";
        final String password = "Tigrantest12";

        final String buttonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div[3]/div[1]/a/button";
        final String nameInputXPath = "//input[@id=\"name\"]";
        final String surnameInputXPath = "//input[@id=\"surname\"]";
        final String ageInputXPath = "//input[@id=\"age\"]";
        final String emailInputXPath = "//input[@id=\"email\"]";
        final String genderButtonXPath = "//*[@id=\"gender\"][@value=\"male\"]";
        final String passwordInputXPath = "//input[@id=\"password\"]";
        final String submitButtonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div/div[8]/button";

        driver.get("http://localhost:3000/");

        final WebElement button = driver.findElement(By.xpath(buttonXPath));
        button.click();
        driver.findElement(By.xpath(nameInputXPath)).sendKeys(name);
        driver.findElement(By.xpath(surnameInputXPath)).sendKeys(surname);
        driver.findElement(By.xpath(ageInputXPath)).sendKeys(age);
        driver.findElement(By.xpath(emailInputXPath)).sendKeys(email);
        driver.findElement(By.xpath(genderButtonXPath)).click();
        driver.findElement(By.xpath(passwordInputXPath)).sendKeys(password);

        driver.findElement(By.xpath(submitButtonXPath)).click();

        final String expectedUrl = "http://localhost:3000/registry";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Signed up without surname!");
    }

    @Test
    public void checkSignUpAgeAbsent() {
        final String name = "Tigran";
        final String surname = "Nalbandyan";
        final String age = "";
        final String email = "tigran.nalbandyan03@gmail.com";
        final String password = "Tigrantest12";

        final String buttonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div[3]/div[1]/a/button";
        final String nameInputXPath = "//input[@id=\"name\"]";
        final String surnameInputXPath = "//input[@id=\"surname\"]";
        final String ageInputXPath = "//input[@id=\"age\"]";
        final String emailInputXPath = "//input[@id=\"email\"]";
        final String genderButtonXPath = "//*[@id=\"gender\"][@value=\"male\"]";
        final String passwordInputXPath = "//input[@id=\"password\"]";
        final String submitButtonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div/div[8]/button";

        driver.get("http://localhost:3000/");

        final WebElement button = driver.findElement(By.xpath(buttonXPath));
        button.click();
        driver.findElement(By.xpath(nameInputXPath)).sendKeys(name);
        driver.findElement(By.xpath(surnameInputXPath)).sendKeys(surname);
        driver.findElement(By.xpath(ageInputXPath)).sendKeys(age);
        driver.findElement(By.xpath(emailInputXPath)).sendKeys(email);
        driver.findElement(By.xpath(genderButtonXPath)).click();
        driver.findElement(By.xpath(passwordInputXPath)).sendKeys(password);

        driver.findElement(By.xpath(submitButtonXPath)).click();

        final String expectedUrl = "http://localhost:3000/registry";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Signed up without age!");
    }

    @Test
    public void checkSignUpEmailAbsent() {
        final String name = "Tigran";
        final String surname = "Nalbandyan";
        final String age = "20";
        final String email = "";
        final String password = "Tigrantest12";

        final String buttonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div[3]/div[1]/a/button";
        final String nameInputXPath = "//input[@id=\"name\"]";
        final String surnameInputXPath = "//input[@id=\"surname\"]";
        final String ageInputXPath = "//input[@id=\"age\"]";
        final String emailInputXPath = "//input[@id=\"email\"]";
        final String genderButtonXPath = "//*[@id=\"gender\"][@value=\"male\"]";
        final String passwordInputXPath = "//input[@id=\"password\"]";
        final String submitButtonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div/div[8]/button";

        driver.get("http://localhost:3000/");

        final WebElement button = driver.findElement(By.xpath(buttonXPath));
        button.click();
        driver.findElement(By.xpath(nameInputXPath)).sendKeys(name);
        driver.findElement(By.xpath(surnameInputXPath)).sendKeys(surname);
        driver.findElement(By.xpath(ageInputXPath)).sendKeys(age);
        driver.findElement(By.xpath(emailInputXPath)).sendKeys(email);
        driver.findElement(By.xpath(genderButtonXPath)).click();
        driver.findElement(By.xpath(passwordInputXPath)).sendKeys(password);

        driver.findElement(By.xpath(submitButtonXPath)).click();

        final String expectedUrl = "http://localhost:3000/registry";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Signed up without email!");
    }

    @Test
    public void checkSignUpInvalidEmail() {
        final String name = "Tigran";
        final String surname = "Nalbandyan";
        final String age = "20";
        final String email = "An%invalid.email@";
        final String password = "Tigrantest12";

        final String buttonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div[3]/div[1]/a/button";
        final String nameInputXPath = "//input[@id=\"name\"]";
        final String surnameInputXPath = "//input[@id=\"surname\"]";
        final String ageInputXPath = "//input[@id=\"age\"]";
        final String emailInputXPath = "//input[@id=\"email\"]";
        final String genderButtonXPath = "//*[@id=\"gender\"][@value=\"male\"]";
        final String passwordInputXPath = "//input[@id=\"password\"]";
        final String submitButtonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div/div[8]/button";

        driver.get("http://localhost:3000/");

        final WebElement button = driver.findElement(By.xpath(buttonXPath));
        button.click();
        driver.findElement(By.xpath(nameInputXPath)).sendKeys(name);
        driver.findElement(By.xpath(surnameInputXPath)).sendKeys(surname);
        driver.findElement(By.xpath(ageInputXPath)).sendKeys(age);
        driver.findElement(By.xpath(emailInputXPath)).sendKeys(email);
        driver.findElement(By.xpath(genderButtonXPath)).click();
        driver.findElement(By.xpath(passwordInputXPath)).sendKeys(password);

        driver.findElement(By.xpath(submitButtonXPath)).click();

        final String expectedUrl = "http://localhost:3000/registry";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Signed up with invalid email!");
    }

    @Test
    public void checkSignUpPasswordAbsent() {
        final String name = "Tigran";
        final String surname = "Nalbandyan";
        final String age = "20";
        final String email = "tigran.nalbandyan03@gmail.com";
        final String password = "";

        final String buttonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div[3]/div[1]/a/button";
        final String nameInputXPath = "//input[@id=\"name\"]";
        final String surnameInputXPath = "//input[@id=\"surname\"]";
        final String ageInputXPath = "//input[@id=\"age\"]";
        final String emailInputXPath = "//input[@id=\"email\"]";
        final String genderButtonXPath = "//*[@id=\"gender\"][@value=\"male\"]";
        final String passwordInputXPath = "//input[@id=\"password\"]";
        final String submitButtonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div/div[8]/button";

        driver.get("http://localhost:3000/");

        final WebElement button = driver.findElement(By.xpath(buttonXPath));
        button.click();
        driver.findElement(By.xpath(nameInputXPath)).sendKeys(name);
        driver.findElement(By.xpath(surnameInputXPath)).sendKeys(surname);
        driver.findElement(By.xpath(ageInputXPath)).sendKeys(age);
        driver.findElement(By.xpath(emailInputXPath)).sendKeys(email);
        driver.findElement(By.xpath(genderButtonXPath)).click();
        driver.findElement(By.xpath(passwordInputXPath)).sendKeys(password);

        driver.findElement(By.xpath(submitButtonXPath)).click();

        final String expectedUrl = "http://localhost:3000/registry";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Signed up without password!");
    }

    @Test
    public void checkSignUpGenderAbsent() {
        final String name = "Tigran";
        final String surname = "Nalbandyan";
        final String age = "20";
        final String email = "tigran.nalbandyan03@gmail.com";
        final String password = "Tigrantest12";

        final String buttonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div[3]/div[1]/a/button";
        final String nameInputXPath = "//input[@id=\"name\"]";
        final String surnameInputXPath = "//input[@id=\"surname\"]";
        final String ageInputXPath = "//input[@id=\"age\"]";
        final String emailInputXPath = "//input[@id=\"email\"]";
        final String passwordInputXPath = "//input[@id=\"password\"]";
        final String submitButtonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div/div[8]/button";

        driver.get("http://localhost:3000/");

        final WebElement button = driver.findElement(By.xpath(buttonXPath));
        button.click();
        driver.findElement(By.xpath(nameInputXPath)).sendKeys(name);
        driver.findElement(By.xpath(surnameInputXPath)).sendKeys(surname);
        driver.findElement(By.xpath(ageInputXPath)).sendKeys(age);
        driver.findElement(By.xpath(emailInputXPath)).sendKeys(email);
        driver.findElement(By.xpath(passwordInputXPath)).sendKeys(password);

        driver.findElement(By.xpath(submitButtonXPath)).click();

        final String expectedUrl = "http://localhost:3000/registry";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Signed up without gender!");
    }

    @Test
    public void checkSignUpWeakPassword() {
        final String name = "Tigran";
        final String surname = "Nalbandyan";
        final String age = "20";
        final String email = "tigran.nalbandyan03@gmail.com";
        final String password = "qwerty";

        final String buttonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div[3]/div[1]/a/button";
        final String nameInputXPath = "//input[@id=\"name\"]";
        final String surnameInputXPath = "//input[@id=\"surname\"]";
        final String ageInputXPath = "//input[@id=\"age\"]";
        final String emailInputXPath = "//input[@id=\"email\"]";
        final String genderButtonXPath = "//*[@id=\"gender\"][@value=\"male\"]";
        final String passwordInputXPath = "//input[@id=\"password\"]";
        final String submitButtonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div/div[8]/button";

        driver.get("http://localhost:3000/");

        final WebElement button = driver.findElement(By.xpath(buttonXPath));
        button.click();
        driver.findElement(By.xpath(nameInputXPath)).sendKeys(name);
        driver.findElement(By.xpath(surnameInputXPath)).sendKeys(surname);
        driver.findElement(By.xpath(ageInputXPath)).sendKeys(age);
        driver.findElement(By.xpath(emailInputXPath)).sendKeys(email);
        driver.findElement(By.xpath(genderButtonXPath)).click();
        driver.findElement(By.xpath(passwordInputXPath)).sendKeys(password);

        driver.findElement(By.xpath(submitButtonXPath)).click();

        final String expectedUrl = "http://localhost:3000/registry";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Signed up with weak password!");
    }

    @Test
    public void checkSignUpBigAge() {
        final String name = "Tigran";
        final String surname = "Nalbandyan";
        final String age = "2000";
        final String email = "tigran.nalbandyan03@gmail.com";
        final String password = "qwerty";

        final String buttonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div[3]/div[1]/a/button";
        final String nameInputXPath = "//input[@id=\"name\"]";
        final String surnameInputXPath = "//input[@id=\"surname\"]";
        final String ageInputXPath = "//input[@id=\"age\"]";
        final String emailInputXPath = "//input[@id=\"email\"]";
        final String genderButtonXPath = "//*[@id=\"gender\"][@value=\"male\"]";
        final String passwordInputXPath = "//input[@id=\"password\"]";
        final String submitButtonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div/div[8]/button";

        driver.get("http://localhost:3000/");

        final WebElement button = driver.findElement(By.xpath(buttonXPath));
        button.click();
        driver.findElement(By.xpath(nameInputXPath)).sendKeys(name);
        driver.findElement(By.xpath(surnameInputXPath)).sendKeys(surname);
        driver.findElement(By.xpath(ageInputXPath)).sendKeys(age);
        driver.findElement(By.xpath(emailInputXPath)).sendKeys(email);
        driver.findElement(By.xpath(genderButtonXPath)).click();
        driver.findElement(By.xpath(passwordInputXPath)).sendKeys(password);

        driver.findElement(By.xpath(submitButtonXPath)).click();

        final String expectedUrl = "http://localhost:3000/registry";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Signed up with big age");
    }

    @Test
    public void checkSignUpSmallAge() {
        final String name = "Tigran";
        final String surname = "Nalbandyan";
        final String age = "-10";
        final String email = "tigran.nalbandyan03@gmail.com";
        final String password = "qwerty";

        final String buttonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div[3]/div[1]/a/button";
        final String nameInputXPath = "//input[@id=\"name\"]";
        final String surnameInputXPath = "//input[@id=\"surname\"]";
        final String ageInputXPath = "//input[@id=\"age\"]";
        final String emailInputXPath = "//input[@id=\"email\"]";
        final String genderButtonXPath = "//*[@id=\"gender\"][@value=\"male\"]";
        final String passwordInputXPath = "//input[@id=\"password\"]";
        final String submitButtonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div/div[8]/button";

        driver.get("http://localhost:3000/");

        final WebElement button = driver.findElement(By.xpath(buttonXPath));
        button.click();
        driver.findElement(By.xpath(nameInputXPath)).sendKeys(name);
        driver.findElement(By.xpath(surnameInputXPath)).sendKeys(surname);
        driver.findElement(By.xpath(ageInputXPath)).sendKeys(age);
        driver.findElement(By.xpath(emailInputXPath)).sendKeys(email);
        driver.findElement(By.xpath(genderButtonXPath)).click();
        driver.findElement(By.xpath(passwordInputXPath)).sendKeys(password);

        driver.findElement(By.xpath(submitButtonXPath)).click();

        final String expectedUrl = "http://localhost:3000/registry";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Signed up with small age!");
    }

    @Test
    public void checkSignUpInvalidName() {
        final String name = "3.14";
        final String surname = "Nalbandyan";
        final String age = "20";
        final String email = "tigran.nalbandyan03@gmail.com";
        final String password = "qwerty";

        final String buttonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div[3]/div[1]/a/button";
        final String nameInputXPath = "//input[@id=\"name\"]";
        final String surnameInputXPath = "//input[@id=\"surname\"]";
        final String ageInputXPath = "//input[@id=\"age\"]";
        final String emailInputXPath = "//input[@id=\"email\"]";
        final String genderButtonXPath = "//*[@id=\"gender\"][@value=\"male\"]";
        final String passwordInputXPath = "//input[@id=\"password\"]";
        final String submitButtonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div/div[8]/button";

        driver.get("http://localhost:3000/");

        final WebElement button = driver.findElement(By.xpath(buttonXPath));
        button.click();
        driver.findElement(By.xpath(nameInputXPath)).sendKeys(name);
        driver.findElement(By.xpath(surnameInputXPath)).sendKeys(surname);
        driver.findElement(By.xpath(ageInputXPath)).sendKeys(age);
        driver.findElement(By.xpath(emailInputXPath)).sendKeys(email);
        driver.findElement(By.xpath(genderButtonXPath)).click();
        driver.findElement(By.xpath(passwordInputXPath)).sendKeys(password);

        driver.findElement(By.xpath(submitButtonXPath)).click();

        final String expectedUrl = "http://localhost:3000/registry";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Signed up with invalid name!");
    }

    @Test
    public void checkSignUpInvalidSurname() {
        final String name = "Tigran";
        final String surname = "2,592e+6";
        final String age = "20";
        final String email = "tigran.nalbandyan03@gmail.com";
        final String password = "qwerty";

        final String buttonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div[3]/div[1]/a/button";
        final String nameInputXPath = "//input[@id=\"name\"]";
        final String surnameInputXPath = "//input[@id=\"surname\"]";
        final String ageInputXPath = "//input[@id=\"age\"]";
        final String emailInputXPath = "//input[@id=\"email\"]";
        final String genderButtonXPath = "//*[@id=\"gender\"][@value=\"male\"]";
        final String passwordInputXPath = "//input[@id=\"password\"]";
        final String submitButtonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div/div[8]/button";

        driver.get("http://localhost:3000/");

        final WebElement button = driver.findElement(By.xpath(buttonXPath));
        button.click();
        driver.findElement(By.xpath(nameInputXPath)).sendKeys(name);
        driver.findElement(By.xpath(surnameInputXPath)).sendKeys(surname);
        driver.findElement(By.xpath(ageInputXPath)).sendKeys(age);
        driver.findElement(By.xpath(emailInputXPath)).sendKeys(email);
        driver.findElement(By.xpath(genderButtonXPath)).click();
        driver.findElement(By.xpath(passwordInputXPath)).sendKeys(password);

        driver.findElement(By.xpath(submitButtonXPath)).click();

        final String expectedUrl = "http://localhost:3000/registry";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Signed up with invalid name!");
    }

    @Test(skipFailedInvocations = true)
    public void checkForgotPasswordInvalidEmail() {
        final String email = "best@email?ever.@@";

        final String buttonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div[3]/div[2]/a/button";
        final String emailInputXPath = "//input[@id=\"email\"]";
        final String submitButtonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div/div[3]/button";

        driver.get("http://localhost:3000/");

        final WebElement button = driver.findElement(By.xpath(buttonXPath));
        button.click();

        driver.findElement(By.xpath(emailInputXPath)).sendKeys(email);

        driver.findElement(By.xpath(submitButtonXPath)).click();
        waitForAlert(driver);
        try {
            Alert alert = driver.switchTo().alert();
            String alertMessage = driver.switchTo().alert().getText();
            System.out.println(alertMessage);
            alert.accept();
        } catch (NoAlertPresentException e) {
            e.printStackTrace();
        }

        final String expectedUrl = "http://localhost:3000/reset";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Successfully forgot password with invalid email!");
    }

    @Test
    public void checkForgotPasswordNotRegisteredEmail() {
        final String email = "100percent.not.registered.email@gmail.com";

        final String buttonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div[3]/div[2]/a/button";
        final String emailInputXPath = "//input[@id=\"email\"]";
        final String submitButtonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div/div[3]/button";

        driver.get("http://localhost:3000/");

        final WebElement button = driver.findElement(By.xpath(buttonXPath));
        button.click();

        driver.findElement(By.xpath(emailInputXPath)).sendKeys(email);

        driver.findElement(By.xpath(submitButtonXPath)).click();
        try {
            waitForAlert(driver);
            Alert alert = driver.switchTo().alert();
            String alertMessage = driver.switchTo().alert().getText();
            System.out.println(alertMessage);
            alert.accept();
        } catch (NoAlertPresentException e) {
            e.printStackTrace();
        }

        final String expectedUrl = "http://localhost:3000/reset";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Successfully forgot password with email that not registered!");
    }

    @Test
    public void checkForgotPassword() {
        final String email = "tigran.nalbandyan03@gmail.com";

        final String buttonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div[3]/div[2]/a/button";
        final String emailInputXPath = "//input[@id=\"email\"]";
        final String submitButtonXPath = "//*[@id=\"root\"]/div/div/div/form/div/div/div[3]/button";

        driver.get("http://localhost:3000/");

        final WebElement button = driver.findElement(By.xpath(buttonXPath));
        button.click();

        driver.findElement(By.xpath(emailInputXPath)).sendKeys(email);

        driver.findElement(By.xpath(submitButtonXPath)).click();
        waitForAlert(driver);
        try {
            Alert alert = driver.switchTo().alert();
            String alertMessage = driver.switchTo().alert().getText();
            System.out.println(alertMessage);
            alert.accept();
        } catch (NoAlertPresentException e) {
            e.printStackTrace();
        }

        final String expectedUrl = "http://localhost:3000/";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Forgot password with correct data is failed!");
    }

    @AfterClass
    public void endTest() {
        driver.quit();
    }
}
