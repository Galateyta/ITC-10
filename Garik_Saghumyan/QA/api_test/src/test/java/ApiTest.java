import org.everit.json.schema.Schema;
import org.everit.json.schema.ValidationException;
import org.everit.json.schema.loader.SchemaLoader;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.junit.Assert;
import org.junit.Test;

import java.io.IOException;


public class ApiTest {
    ApiClass api = new ApiClass();


    @Test
    public void getMethodTest() throws IOException {
        int responseCode = api.getAllEmployes();
        Assert.assertEquals( "Get request faled",200, responseCode );
    }
    @Test
    public void getEmployeeByIdPositive() throws IOException {
        JSONObject obj = api.getEmployeeById(38718);
        JSONObject jsonSubject = new JSONObject(new JSONTokener(ApiTest.class.getResourceAsStream("/schema.json")));
        Schema schema = SchemaLoader.load(jsonSubject);
        try {
            schema.validate(obj);
        }catch (ValidationException e){
            Assert.fail("Validation exeption");
        }
    }

    @Test
    public void createNewEmployee() throws IOException {
        JSONObject employee = new JSONObject();
        employee.put("employee_age", "50");
        employee.put("employee_salary", "20525");
        employee.put("employee_name", "vochxar");
        api.createEmployee(employee);
    }
}



