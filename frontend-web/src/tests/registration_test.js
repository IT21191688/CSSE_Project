const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function registerUser() {
    // Configure Chrome options
    const chromeOptions = new chrome.Options();

    // Initialize the WebDriver with Chrome options
    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .build();

    try {
        // Navigate to the registration page
        await driver.get('http://localhost:8080/auth/register');

        // Find the registration form elements and interact with them
        const firstName = await driver.findElement(By.id('firstName'));
        const lastName = await driver.findElement(By.id('lastName'));
        const email = await driver.findElement(By.id('email'));
        const age = await driver.findElement(By.id('age'));
        const dob = await driver.findElement(By.id('dob'));
        const password = await driver.findElement(By.id('password'));
        const submitButton = await driver.findElement(By.xpath('//button[@type="submit"]'));

        // Fill in the form
        await firstName.sendKeys('John');
        await lastName.sendKeys('Doe');
        await email.sendKeys('johndoe@example.com');
        await age.sendKeys('30');
        await dob.sendKeys('1993-01-01');
        await password.sendKeys('your_password');

        // Submit the form
        await submitButton.click();

        // Wait for the registration process to complete (you might need to customize this)
        await driver.sleep(2000);

        // Verify the registration success, for example, by checking the landing page or a success message

    } finally {
        // Close the browser
        await driver.quit();
    }
}

// Call the registration function
registerUser();
