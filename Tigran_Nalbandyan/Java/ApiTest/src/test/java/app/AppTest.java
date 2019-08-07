package app;

import org.json.JSONObject;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

public class AppTest {

    public static HttpConnection myConnection;

    @BeforeClass
    public static void initialization() {
        myConnection = new HttpConnection();
    }

    @Test
    public void checkGetEmployees() {
        JSONObject employeeData = myConnection.getEmployees();
        Assert.assertTrue(employeeData.length() != 0);
    }

    @Test
    public void checkGetEmployee() {
        JSONObject employeeData = myConnection.getEmployees();
        String id = employeeData.getJSONArray("response").getJSONObject(0).get("id").toString();
        JSONObject response = myConnection.getEmployee(id);
        Assert.assertTrue(response != null);
    }

    @Test
    public void checkDeleteEmployee() {
        JSONObject employeeData = myConnection.getEmployees();
        String id = employeeData.getJSONArray("response").getJSONObject(0).get("id").toString();
        String response = myConnection.deleteEmployee(id);
        Assert.assertTrue(response != null);
    }
}