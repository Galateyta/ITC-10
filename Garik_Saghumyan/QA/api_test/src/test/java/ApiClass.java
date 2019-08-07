import org.everit.json.schema.Schema;
import org.everit.json.schema.loader.SchemaLoader;
import org.json.JSONObject;
import org.junit.Assert;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.Scanner;

public class ApiClass {

    public int getAllEmployes() throws IOException {
            URL url = new URL("http://dummy.restapiexample.com/api/v1/employees");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
            int responseCode = conn.getResponseCode();
            conn.disconnect();
            return responseCode;
    }
    public JSONObject getEmployeeById(int id) throws IOException {
        URL url = new URL("http://dummy.restapiexample.com/api/v1/employee/" + id );
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Accept", "application/json");
        Scanner scan = new Scanner(url.openStream());
        String entireResponse = new String();
        while (scan.hasNext())
            entireResponse += scan.nextLine();

        scan.close();
        JSONObject obj = new JSONObject(entireResponse );
//        System.out.println("Response : "+entireResponse);
        return obj;
    }

    public void createEmployee(JSONObject employee) throws IOException {
        URL url = new URL("http://dummy.restapiexample.com/api/v1/create");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json; utf-8");
        conn.setRequestProperty("Accept", "application/json");
        conn.setDoOutput(true);
        OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
        wr.write(employee.toString());

        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
        StringBuilder response = new StringBuilder();
        String responseLine;
        while ((responseLine = br.readLine()) != null) {
            response.append(responseLine.trim());
        }
        System.out.println(response);


    }
}

