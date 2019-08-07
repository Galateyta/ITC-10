import org.everit.json.schema.ValidationException;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.junit.Assert;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Scanner;

import org.everit.json.schema.Schema;
import org.everit.json.schema.loader.SchemaLoader;
/**
 * Unit test for simple App.
 */

public class APItesting {
    public JSONObject getEmployees(int id) {
       String entireResponse = new String();
        try {
            URL url = new URL("http://dummy.restapiexample.com/api/v1/employee/" + id);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
            Scanner scan = new Scanner(url.openStream());

            while (scan.hasNext())
                entireResponse += scan.nextLine();
            System.out.println(entireResponse);

            if (conn.getResponseCode() != 200) {
                throw new RuntimeException(" HTTP error code : " + conn.getResponseCode());
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
            System.out.println("exaption1-----------------------");
        } catch (IOException e) {

            e.printStackTrace();
            System.out.println("exaption2-----------------------");
        }
        return new JSONObject(entireResponse );
    }

    @Test
    public  void getEmployeesTest() {
        JSONObject obj =  getEmployees(15901);
        System.out.println(obj);
        try {
            InputStream inputStream = getClass().getResourceAsStream("/src/main/resources/schema.json");
            JSONObject rawSchema = new JSONObject(new JSONTokener(inputStream));
            Schema schema = SchemaLoader.load(rawSchema);
            schema.validate(new JSONObject(obj)); // throws a ValidationException if this object is invalid
        } catch (ValidationException e){
            Assert.fail("Not valid object");
        }

    }

}
