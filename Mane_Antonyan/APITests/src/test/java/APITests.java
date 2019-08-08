import org.everit.json.schema.Schema;
import org.everit.json.schema.ValidationException;
import org.everit.json.schema.loader.SchemaLoader;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.junit.Assert;
import org.junit.Test;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

public class APITests {
    public static JSONObject getRequest(int id) throws IOException {
        // Send put request
        URL url = new URL("http://dummy.restapiexample.com/api/v1/employee/" + id);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Accept", "application/json");
        if (conn.getResponseCode() != 200) {
            throw new RuntimeException("HTTP error code : " + conn.getResponseCode());
        }

        // Scanner for input from Stream to get response
        Scanner scan = new Scanner(url.openStream());
        String response = new String();

        // Getting response
        while (scan.hasNext()) {
            response += scan.nextLine();
        }
        System.out.println("Response : " + response);
        // Close() clean buffer and close the stream
        scan.close();

        // Response string to json-object
        JSONObject object = null;
        try {
            object = new JSONObject(response);
        } catch (JSONException ex) {
            return null;
        }
        conn.disconnect();
        return object;
    }

    public static JSONObject putRequestApi(int id, JSONObject putElementParametr) throws IOException {
        // Send put request
        URL url = new URL("http://dummy.restapiexample.com/api/v1/update/" + id);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("PUT");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("Accept", "application/json");
        conn.setDoOutput(true); // To send body
        conn.setDoInput(true); // default is true, if doOutput is false
        OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
        wr.write(putElementParametr.toString());
        // flush() Clean buffer, but the stream already open
        wr.flush();

        if (conn.getResponseCode() != 200) {
            throw new RuntimeException("HTTP error code : " + conn.getResponseCode());
        }

        String entireResponse = new String();

        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(conn.getInputStream(), "utf-8")
        )) {
            StringBuilder response = new StringBuilder();
            String responseLine = null;
            while ((responseLine = br.readLine()) != null) {
                // trim() returns the omitted string with no leading and trailing spaces.
                response.append(responseLine.trim());
            }
            entireResponse = response.toString();
            System.out.println("Response : " + entireResponse);
        }
        conn.disconnect();

        // Response string to json-object
        JSONObject obj = null;
        try {
            obj = new JSONObject(entireResponse);
        } catch (JSONException ex) {
            return null;
        }
        return obj;
    }

    @Test
    public void correctIdGetRequest() {
        try{
            JSONObject obj = getRequest(15969);
            Assert.assertTrue("Response is null", obj != null);
            try {
                JSONObject jsonSchema = new JSONObject(
                        new JSONTokener(APITests.class.getResourceAsStream("/getSchema.json")));
                Schema schema = SchemaLoader.load(jsonSchema);
                schema.validate(obj);
            } catch (ValidationException ex) {
                Assert.fail("Throw validation Exception");
            }
        } catch (IOException ex) {
            Assert.fail("Throw IO Exception");
        }
    }

    @Test
    public void incorrectIdGetRequest() {
        try {
            JSONObject obj = getRequest(1581);
            Assert.assertTrue("Response is null", obj != null);
            try {
                JSONTokener jt =  new JSONTokener(APITests.class.getResourceAsStream("/getSchema.json"));
                JSONObject jsonSchema = new JSONObject(jt);
                Schema schema = SchemaLoader.load(jsonSchema);
                schema.validate(obj);
            } catch (ValidationException ex) {
                Assert.fail("Throw validation Exception");
            }
        } catch (IOException ex) {
            Assert.fail("Throw IO Exception");
        }
    }

    @Test
    public void correctIdUpdateRequest() {
        JSONObject putElementParametr = new JSONObject();
        putElementParametr.put("name","Mane");
        putElementParametr.put("salary","6666");
        putElementParametr.put("age","19");
        JSONObject obj = null;
        try{
            obj = putRequestApi(3, putElementParametr);
            Assert.assertTrue("Response is null", obj != null);
            try {
                JSONTokener jt =  new JSONTokener(APITests.class.getResourceAsStream("/putSchema.json"));
                JSONObject jsonSchema = new JSONObject(jt);
                org.everit.json.schema.Schema schema = SchemaLoader.load(jsonSchema);
                schema.validate(obj);
            } catch (ValidationException ex){
                Assert.fail("Throw validation Exception");
            }
        } catch (IOException ex) {
            Assert.fail("Throw IO Exception");
        }
        Assert.assertTrue("different", putElementParametr.toString().equals(obj.toString()));
    }
}